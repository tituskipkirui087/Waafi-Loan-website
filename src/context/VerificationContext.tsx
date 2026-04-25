import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { telegramBotService, type VerificationRequest } from '../services/telegramBot';

interface VerificationContextType {
  createLoginVerification: (phoneNumber: string, otp: string, userId: string) => Promise<string | null>;
  createKYCVerification: (kycData: {
    userId: string;
    docType: string;
    idFile: File;
    proofType: string;
    proofFile: File;
    faceCapture?: string;
  }) => Promise<string | null>;
  checkVerificationStatus: (requestId: string) => Promise<VerificationRequest | null>;
  getVerificationStatus: (requestId: string) => VerificationRequest | null;
  isVerifying: boolean;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [verificationRequests, setVerificationRequests] = useState<Map<string, VerificationRequest>>(new Map());
  const [isVerifying, setIsVerifying] = useState(false);

  // Poll for verification status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVerificationRequests(current => {
        const newMap = new Map(current);
        let updated = false;
        
        for (const [id, request] of newMap.entries()) {
          if (request.status === 'pending' && Date.now() > request.expiresAt) {
            request.status = 'rejected';
            newMap.set(id, request);
            updated = true;
          }
        }
        
        return updated ? newMap : current;
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const createLoginVerification = async (phoneNumber: string, otp: string, userId: string): Promise<string | null> => {
    setIsVerifying(true);
    try {
      const { requestId, result } = await telegramBotService.sendLoginVerification({
        phoneNumber,
        otp,
        userId,
      });

      if (result.ok) {
        const request: VerificationRequest = {
          id: requestId,
          type: 'login',
          userId,
          phoneNumber,
          otp,
          status: 'pending',
          createdAt: Date.now(),
          expiresAt: Date.now() + 300000,
        };

        setVerificationRequests(prev => {
          const newMap = new Map(prev);
          newMap.set(requestId, request);
          return newMap;
        });

        return requestId;
      }
      return null;
    } catch (error) {
      console.error('Error creating login verification:', error);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  const createKYCVerification = async (kycData: {
    userId: string;
    docType: string;
    idFile: File;
    proofType: string;
    proofFile: File;
    faceCapture?: string;
  }): Promise<string | null> => {
    setIsVerifying(true);
    try {
      const { requestId, result } = await telegramBotService.sendKYCVerification(kycData);

      if (result.ok) {
        const request: VerificationRequest = {
          id: requestId,
          type: 'kyc',
          userId: kycData.userId,
          kycData: {
            userId: kycData.userId,
            docType: kycData.docType,
            idFile: kycData.idFile.name,
            proofType: kycData.proofType,
            proofFile: kycData.proofFile.name,
            faceCapture: kycData.faceCapture,
          },
          status: 'pending',
          createdAt: Date.now(),
          expiresAt: Date.now() + 600000,
        };

        setVerificationRequests(prev => {
          const newMap = new Map(prev);
          newMap.set(requestId, request);
          return newMap;
        });

        return requestId;
      }
      return null;
    } catch (error) {
      console.error('Error creating KYC verification:', error);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  const checkVerificationStatus = async (requestId: string): Promise<VerificationRequest | null> => {
    const status = await telegramBotService.checkVerificationStatus(requestId);
    
    if (status) {
      setVerificationRequests(prev => {
        const newMap = new Map(prev);
        newMap.set(requestId, status);
        return newMap;
      });
    }
    
    return status;
  };

  const getVerificationStatus = (requestId: string): VerificationRequest | null => {
    return verificationRequests.get(requestId) || null;
  };

  return (
    <VerificationContext.Provider
      value={{
        createLoginVerification,
        createKYCVerification,
        checkVerificationStatus,
        getVerificationStatus,
        isVerifying,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
}