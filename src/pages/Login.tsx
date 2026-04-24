import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Shield, CheckCircle, Clock, Camera, Upload,
  ChevronRight, ArrowLeft, Eye, EyeOff, Star,
  PartyPopper, Mail, Phone, Lock, AlertCircle,
} from "lucide-react";

const countries = [
  { code: "SO", name: "Somalia",              phone: "+252", flag: "🇸🇴", digits: 7  },
  { code: "DJ", name: "Djibouti",             phone: "+253", flag: "🇩🇯", digits: 6  },
  { code: "KE", name: "Kenya",                phone: "+254", flag: "🇰🇪", digits: 9  },
  { code: "ET", name: "Ethiopia",             phone: "+251", flag: "🇪🇹", digits: 9  },
  { code: "UG", name: "Uganda",               phone: "+256", flag: "🇺🇬", digits: 9  },
  { code: "TZ", name: "Tanzania",             phone: "+255", flag: "🇹🇿", digits: 9  },
  { code: "RW", name: "Rwanda",               phone: "+250", flag: "🇷🇼", digits: 9  },
  { code: "BI", name: "Burundi",              phone: "+257", flag: "🇧🇮", digits: 8  },
  { code: "SS", name: "South Sudan",          phone: "+211", flag: "🇸🇸", digits: 9  },
  { code: "SD", name: "Sudan",                phone: "+249", flag: "🇸🇩", digits: 9  },
  { code: "YE", name: "Yemen",                phone: "+967", flag: "🇾🇪", digits: 9  },
  { code: "AE", name: "United Arab Emirates", phone: "+971", flag: "🇦🇪", digits: 9  },
  { code: "SA", name: "Saudi Arabia",         phone: "+966", flag: "🇸🇦", digits: 9  },
  { code: "QA", name: "Qatar",                phone: "+974", flag: "🇶🇦", digits: 8  },
  { code: "OM", name: "Oman",                 phone: "+968", flag: "🇴🇲", digits: 8  },
  { code: "BH", name: "Bahrain",              phone: "+973", flag: "🇧🇭", digits: 8  },
  { code: "KW", name: "Kuwait",               phone: "+965", flag: "🇰🇼", digits: 8  },
  { code: "GB", name: "United Kingdom",       phone: "+44",  flag: "🇬🇧", digits: 10 },
  { code: "SE", name: "Sweden",               phone: "+46",  flag: "🇸🇪", digits: 9  },
  { code: "NO", name: "Norway",               phone: "+47",  flag: "🇳🇴", digits: 8  },
  { code: "DK", name: "Denmark",              phone: "+45",  flag: "🇩🇰", digits: 8  },
  { code: "FI", name: "Finland",              phone: "+358", flag: "🇫🇮", digits: 9  },
  { code: "NL", name: "Netherlands",          phone: "+31",  flag: "🇳🇱", digits: 9  },
  { code: "DE", name: "Germany",              phone: "+49",  flag: "🇩🇪", digits: 10 },
  { code: "FR", name: "France",               phone: "+33",  flag: "🇫🇷", digits: 9  },
  { code: "BE", name: "Belgium",              phone: "+32",  flag: "🇧🇪", digits: 9  },
  { code: "CH", name: "Switzerland",          phone: "+41",  flag: "🇨🇭", digits: 9  },
  { code: "IT", name: "Italy",                phone: "+39",  flag: "🇮🇹", digits: 10 },
  { code: "ES", name: "Spain",                phone: "+34",  flag: "🇪🇸", digits: 9  },
  { code: "IE", name: "Ireland",              phone: "+353", flag: "🇮🇪", digits: 9  },
  { code: "AT", name: "Austria",              phone: "+43",  flag: "🇦🇹", digits: 10 },
  { code: "US", name: "United States",        phone: "+1",   flag: "🇺🇸", digits: 10 },
  { code: "CA", name: "Canada",               phone: "+1",   flag: "🇨🇦", digits: 10 },
  { code: "AU", name: "Australia",            phone: "+61",  flag: "🇦🇺", digits: 9  },
  { code: "NZ", name: "New Zealand",          phone: "+64",  flag: "🇳🇿", digits: 9  },
  { code: "ZA", name: "South Africa",         phone: "+27",  flag: "🇿🇦", digits: 9  },
  { code: "EG", name: "Egypt",                phone: "+20",  flag: "🇪🇬", digits: 10 },
  { code: "TR", name: "Turkey",               phone: "+90",  flag: "🇹🇷", digits: 10 },
  { code: "MY", name: "Malaysia",             phone: "+60",  flag: "🇲🇾", digits: 10 },
  { code: "IN", name: "India",                phone: "+91",  flag: "🇮🇳", digits: 10 },
  { code: "PK", name: "Pakistan",             phone: "+92",  flag: "🇵🇰", digits: 10 },
  { code: "NG", name: "Nigeria",              phone: "+234", flag: "🇳🇬", digits: 10 },
];

type DocType   = "" | "passport" | "national_id" | "driver_license";
type ProofType = "" | "utility_bill" | "bank_statement" | "lease" | "tax_return";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-[11px] text-red-500 mt-1"
    >
      <AlertCircle size={10} /> {msg}
    </motion.p>
  );
}

function inputCls(valid: boolean, error: boolean) {
  const base = "w-full h-10 pl-9 pr-3 rounded-xl border text-slate-900 text-sm bg-slate-50 focus:bg-white transition-all focus:outline-none focus:ring-2";
  if (error)  return `${base} border-red-400 focus:border-red-400 focus:ring-red-400/20`;
  if (valid)  return `${base} border-emerald-400 focus:border-emerald-500 focus:ring-emerald-400/20`;
  return `${base} border-slate-200 focus:border-waafi-purple focus:ring-waafi-purple/20`;
}

export default function Login() {
  const navigate = useNavigate();

  // navigation
  const [step, setStep]           = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  // step-1 fields
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber]   = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [touched1, setTouched1] = useState<Record<string, boolean>>({});

  // step-2 fields
  const [docType,   setDocType]   = useState<DocType>("");
  const [idFile,    setIdFile]    = useState<File | null>(null);
  const [proofType, setProofType] = useState<ProofType>("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [touched2, setTouched2] = useState<Record<string, boolean>>({});

  // camera
  const [faceCapture, setFaceCapture] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);
  useEffect(() => () => { stream?.getTracks().forEach(t => t.stop()); }, [stream]);

  // ── Validation ──────────────────────────────────────
  const emailValid   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid   = phoneNumber.length === selectedCountry.digits;
  const passValid  = password.length > 0;
  const step1Ready = emailValid && phoneValid && passValid;
  const step2Ready = docType !== "" && idFile !== null && proofType !== "" && proofFile !== null;

  // ── Handlers ────────────────────────────────────────
  const blurField1 = (key: string) => setTouched1(p => ({ ...p, [key]: true }));
  const blurField2 = (key: string) => setTouched2(p => ({ ...p, [key]: true }));

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched1({ email: true, phone: true, password: true });
    if (step1Ready) setStep(2);
  };

  const handleSubmitKYC = () => {
    setTouched2({ docType: true, idFile: true, proofType: true, proofFile: true });
    if (step2Ready) setSubmitted(true);
  };

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(s); setCameraActive(true);
    } catch { alert("Camera access denied. Please allow camera access to continue."); }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const c = canvasRef.current;
    c.width = videoRef.current.videoWidth;
    c.height = videoRef.current.videoHeight;
    c.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setFaceCapture(c.toDataURL("image/jpeg"));
    stream?.getTracks().forEach(t => t.stop());
    setStream(null); setCameraActive(false);
  };

  const retakePhoto = () => { setFaceCapture(null); startCamera(); };
  const trunc = (n: string) => n.length > 28 ? n.slice(0, 28) + "…" : n;

  const handleCountrySelect = (c: typeof countries[0]) => {
    setSelectedCountry(c);
    setPhoneNumber("");
    setShowDropdown(false);
  };

  // ── Reusable upload area ─────────────────────────────
  const UploadArea = ({
    file, onChange, error,
  }: { file: File | null; onChange: (f: File | null) => void; error?: boolean }) => (
    <label className={`flex flex-col items-center justify-center h-16 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
      file ? "border-emerald-400 bg-emerald-50/40"
      : error ? "border-red-400 bg-red-50/30"
      : "border-slate-200 hover:border-waafi-purple/40 hover:bg-waafi-soft-purple/20"
    }`}>
      <input type="file" accept="image/*,.pdf" className="hidden"
        onChange={e => onChange(e.target.files?.[0] || null)} />
      {file ? (
        <><CheckCircle size={14} className="text-emerald-500 mb-0.5" />
          <p className="text-[11px] text-emerald-600 font-semibold">{trunc(file.name)}</p></>
      ) : (
        <><Upload size={14} className={error ? "text-red-400 mb-0.5" : "text-slate-400 mb-0.5"} />
          <p className="text-[11px] text-slate-500">Click to upload · JPG, PNG, PDF · Max 5MB</p></>
      )}
    </label>
  );

  // ── KYC section card header ──────────────────────────
  const KycHeader = ({
    num, icon, title, sub, done,
  }: { num: string; icon: React.ReactNode; title: string; sub: string; done: boolean }) => (
    <div className="flex items-center gap-2.5 mb-3">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${done ? "bg-emerald-50" : "bg-slate-100"}`}>
        {done ? <CheckCircle size={15} className="text-emerald-500" /> : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-900">{title}</p>
        <p className="text-[10px] text-slate-400">{sub}</p>
      </div>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${done ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
        {done ? "✓" : num}
      </span>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden">

      {/* ══════════ LEFT: Branding Panel ══════════ */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[38%] flex-col bg-gradient-to-br from-slate-950 via-[#052e16] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
        <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-9 py-9 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
              <img src="/favicon.ico" alt="WAAFI" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">WAAFI</span>
          </div>

          <div className="my-auto py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-[28px] font-extrabold text-white leading-tight mb-3">
                Your trusted<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#2dd4bf]">
                  financial partner
                </span>
              </h2>
              <p className="text-white/50 text-xs leading-relaxed mb-6 max-w-[260px]">
                Secure, fast, and transparent loans for millions worldwide.
              </p>

              <div className="flex items-center gap-1.5 mb-6">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}</div>
                <span className="text-white/40 text-[11px]">4.9 / 5 · 12,000+ reviews</span>
              </div>

              {/* Stats */}
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-6">
                {[
                  { label: "Active Customers", value: "2.5M+", color: "text-[#4ade80]" },
                  { label: "Countries Served",  value: "54+",   color: "text-[#2dd4bf]" },
                  { label: "Approval Rate",     value: "95%",   color: "text-amber-400" },
                  { label: "Disbursement Time", value: "24hr",  color: "text-blue-400"  },
                ].map((s, i, arr) => (
                  <div key={s.label} className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-white/8" : ""}`}>
                    <span className="text-white/45 text-[11px]">{s.label}</span>
                    <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Phone mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-waafi-purple/20 rounded-[24px] blur-2xl scale-90" />
                  <img src="/images/frame7.webp" alt="WAAFI App"
                    className="relative w-[130px] rounded-[22px] shadow-2xl opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-5 border-t border-white/10 shrink-0">
            {[{ Icon: Shield, label: "Bank-level Security" }, { Icon: CheckCircle, label: "No Hidden Fees" }, { Icon: Clock, label: "24hr Disbursement" }].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/40 text-[10px]">
                <Icon size={10} className="text-emerald-400" />{label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ RIGHT: Form Panel ══════════ */}
      <div className="flex-1 bg-[#f8fafc] overflow-y-auto">
        <div className="min-h-full flex items-start justify-center px-5 py-7 sm:px-8">
          <div className="w-full max-w-[410px]">

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-5">
              {[{ n: 1, label: "Sign In" }, { n: 2, label: "KYC Verification" }].map(({ n, label }, idx) => (
                <div key={n} className="flex items-center gap-2">
                  {idx > 0 && <div className={`w-10 h-px ${step > 1 ? "bg-waafi-purple" : "bg-slate-200"}`} />}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step >= n ? "bg-waafi-purple text-white" : "bg-slate-200 text-slate-400"}`}>
                    {step > n ? "✓" : n}
                  </div>
                  <span className={`text-[11px] font-semibold ${step === n ? "text-slate-800" : "text-slate-400"}`}>{label}</span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* ══ STEP 1: Sign In ══ */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                    <h2 className="text-lg font-bold text-slate-900 mb-0.5">Welcome back</h2>
                    <p className="text-[11px] text-slate-400 mb-4">Sign in to continue your loan application</p>

                    <form className="space-y-3" onSubmit={handleContinue} noValidate>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Email Address</label>
                        <div className="relative">
                          <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input
                            type="email" value={email}
                            onChange={e => setEmail(e.target.value)}
                            onBlur={() => blurField1("email")}
                            placeholder="name@example.com"
                            className={inputCls(emailValid && touched1.email, !emailValid && !!touched1.email)}
                          />
                          {emailValid && <CheckCircle size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />}
                        </div>
                        {touched1.email && !emailValid && <FieldError msg="Enter a valid email address" />}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Phone Number</label>
                        <div className="flex gap-2">
                          {/* Country selector */}
                          <div className="relative shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowDropdown(v => !v)}
                              className="h-10 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-waafi-purple/40 focus:outline-none focus:ring-2 focus:ring-waafi-purple/20 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <span className="text-base leading-none">{selectedCountry.flag}</span>
                              <span className="text-xs font-semibold text-slate-700">{selectedCountry.phone}</span>
                              <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {showDropdown && (
                              <div className="absolute top-full left-0 mt-1 w-[280px] max-h-[220px] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-50">
                                {countries.map(c => (
                                  <button key={c.code} type="button" onClick={() => handleCountrySelect(c)}
                                    className={`w-full px-3 py-2 flex items-center gap-2.5 hover:bg-slate-50 text-sm ${selectedCountry.code === c.code ? "bg-waafi-soft-purple" : ""}`}
                                  >
                                    <span className="text-base leading-none">{c.flag}</span>
                                    <span className="flex-1 text-left text-slate-800 text-xs font-medium">{c.name}</span>
                                    <span className="text-slate-400 text-[10px]">{c.phone} · {c.digits} digits</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Phone input */}
                          <div className="flex-1 relative">
                            <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                              type="tel" value={phoneNumber}
                              onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, selectedCountry.digits))}
                              onBlur={() => blurField1("phone")}
                              placeholder={`${selectedCountry.digits} digits`}
                              className={inputCls(phoneValid && !!touched1.phone, !phoneValid && !!touched1.phone)}
                            />
                            {/* digit counter badge */}
                            <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded-full pointer-events-none ${
                              phoneValid ? "bg-emerald-100 text-emerald-600"
                              : phoneNumber.length > 0 ? "bg-amber-100 text-amber-600"
                              : "bg-slate-100 text-slate-400"
                            }`}>
                              {phoneNumber.length}/{selectedCountry.digits}
                            </span>
                          </div>
                        </div>
                        {touched1.phone && !phoneValid && (
                          <FieldError msg={`${selectedCountry.name} requires ${selectedCountry.digits} digits (${phoneNumber.length} entered)`} />
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Password</label>
                        <div className="relative">
                          <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          <input
                            type={showPassword ? "text" : "password"} value={password}
                            onChange={e => setPassword(e.target.value)}
                            onBlur={() => blurField1("password")}
                            placeholder="Enter your password"
                            className={inputCls(passValid && !!touched1.password, !passValid && !!touched1.password) + " pr-9"}
                          />
                          <button type="button" onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                            {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                        {touched1.password && !passValid && <FieldError msg="Password is required" />}
                      </div>

                      <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer select-none">
                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-waafi-purple focus:ring-waafi-purple cursor-pointer" />
                        Remember me on this device
                      </label>

                      <button type="submit"
                        className={`w-full h-10 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          step1Ready ? "bg-waafi-purple hover:bg-[#15803d] btn-shadow" : "bg-slate-300 cursor-not-allowed"
                        }`}
                      >
                        Continue to Verification <ChevronRight size={14} />
                      </button>
                    </form>
                  </div>

                </motion.div>
              )}

              {/* ══ STEP 2: KYC ══ */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <button onClick={() => setStep(1)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-waafi-purple/40 hover:text-waafi-purple transition-colors cursor-pointer shrink-0">
                      <ArrowLeft size={13} />
                    </button>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 leading-tight">KYC Verification</h2>
                      <p className="text-[10px] text-slate-400">All fields required · 256-bit encrypted</p>
                    </div>
                    <span className="ml-auto text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {[docType, idFile, proofType, proofFile].filter(Boolean).length}/4 done
                    </span>
                  </div>

                  <div className="space-y-2.5">

                    {/* ── 1. Government ID ── */}
                    <div className={`bg-white rounded-2xl border p-3.5 transition-colors ${touched2.docType && !docType ? "border-red-200" : "border-slate-100"}`}>
                      <KycHeader num="1" icon={<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
                        title="Government Issued ID" sub="Passport · National ID · Driver's License" done={!!docType && !!idFile} />
                      <select value={docType} onChange={e => { setDocType(e.target.value as DocType); blurField2("docType"); }}
                        className={`w-full h-9 px-3 rounded-xl border text-xs text-slate-700 bg-slate-50 mb-2 focus:outline-none focus:ring-2 focus:ring-waafi-purple/20 focus:border-waafi-purple transition-all ${touched2.docType && !docType ? "border-red-400" : "border-slate-200"}`}>
                        <option value="">Select document type *</option>
                        <option value="passport">Passport</option>
                        <option value="national_id">National Identity Card</option>
                        <option value="driver_license">Driver's License</option>
                      </select>
                      {touched2.docType && !docType && <FieldError msg="Please select a document type" />}
                      <UploadArea file={idFile} onChange={f => { setIdFile(f); blurField2("idFile"); }} error={!!touched2.idFile && !idFile} />
                      {touched2.idFile && !idFile && <FieldError msg="Please upload your ID document" />}
                    </div>

                    {/* ── 2. Proof of Residence ── */}
                    <div className={`bg-white rounded-2xl border p-3.5 transition-colors ${touched2.proofType && !proofType ? "border-red-200" : "border-slate-100"}`}>
                      <KycHeader num="2" icon={<svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                        title="Proof of Residence" sub="Utility bill · Bank statement · Lease (last 3 months)" done={!!proofType && !!proofFile} />
                      <select value={proofType} onChange={e => { setProofType(e.target.value as ProofType); blurField2("proofType"); }}
                        className={`w-full h-9 px-3 rounded-xl border text-xs text-slate-700 bg-slate-50 mb-2 focus:outline-none focus:ring-2 focus:ring-waafi-purple/20 focus:border-waafi-purple transition-all ${touched2.proofType && !proofType ? "border-red-400" : "border-slate-200"}`}>
                        <option value="">Select proof type *</option>
                        <option value="utility_bill">Utility Bill</option>
                        <option value="bank_statement">Bank Statement</option>
                        <option value="lease">Lease / Tenancy Agreement</option>
                        <option value="tax_return">Tax Return</option>
                      </select>
                      {touched2.proofType && !proofType && <FieldError msg="Please select a proof type" />}
                      <UploadArea file={proofFile} onChange={f => { setProofFile(f); blurField2("proofFile"); }} error={!!touched2.proofFile && !proofFile} />
                      {touched2.proofFile && !proofFile && <FieldError msg="Please upload proof of residence" />}
                    </div>

                    {/* ── 3. Face Verification ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-3.5">
                      <KycHeader num="3" icon={<Camera size={14} className="text-purple-500" />}
                        title="Face Verification" sub="Live selfie to confirm identity (recommended)" done={!!faceCapture} />
                      {faceCapture ? (
                        <div className="relative rounded-xl overflow-hidden">
                          <img src={faceCapture} alt="Face" className="w-full h-[120px] object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-between p-2">
                            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><CheckCircle size={8} /> Verified</span>
                            <button onClick={retakePhoto} className="bg-white/90 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-medium hover:bg-white cursor-pointer">Retake</button>
                          </div>
                        </div>
                      ) : cameraActive ? (
                        <div className="relative rounded-xl overflow-hidden">
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-[120px] object-cover bg-black" />
                          <canvas ref={canvasRef} className="hidden" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-18 h-22 border-2 border-white/70 rounded-2xl" />
                          </div>
                          <button onClick={capturePhoto}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 h-7 px-4 bg-white text-slate-800 text-[11px] font-bold rounded-full shadow-lg flex items-center gap-1 cursor-pointer hover:bg-slate-100">
                            <Camera size={10} /> Capture
                          </button>
                        </div>
                      ) : (
                        <button onClick={startCamera}
                          className="w-full h-14 border-2 border-dashed border-slate-200 hover:border-purple-400/50 hover:bg-purple-50/20 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
                          <Camera size={15} className="text-slate-400" />
                          <span className="text-[11px] text-slate-500">Click to start face verification</span>
                        </button>
                      )}
                    </div>

                    {/* Submit */}
                    <button onClick={handleSubmitKYC}
                      className={`w-full h-10 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        step2Ready ? "bg-waafi-purple hover:bg-[#15803d] btn-shadow" : "bg-slate-300 cursor-not-allowed"
                      }`}
                    >
                      Submit Application <ChevronRight size={14} />
                    </button>

                    {!step2Ready && (
                      <p className="text-center text-[10px] text-amber-600 flex items-center justify-center gap-1">
                        <AlertCircle size={10} /> Complete all required fields above to submit
                      </p>
                    )}

                    <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 pb-1">
                      <Shield size={9} className="text-emerald-500" />
                      Documents encrypted with 256-bit TLS — never shared with third parties
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ══════════ Success Popup ══════════ */}
      <AnimatePresence>
        {submitted && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 32 }}
              transition={{ type: "spring", damping: 20, stiffness: 280 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl w-full max-w-[370px] overflow-hidden shadow-2xl text-center">
                <div className="gradient-purple-teal py-7 px-6 relative overflow-hidden">
                  <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", damping: 14 }}
                    className="relative w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={30} className="text-white" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Application Received</p>
                    <h3 className="text-lg font-extrabold text-white">Documents Submitted!</h3>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2 bg-waafi-soft-purple rounded-2xl px-4 py-2.5 mb-4">
                    <Clock size={15} className="text-waafi-purple shrink-0" />
                    <p className="text-waafi-purple text-sm font-bold">Approval within 24 hours</p>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4">
                    Your documents are under review. Once approved, funds will be disbursed directly to your{" "}
                    <span className="font-semibold text-slate-700">WAAFI wallet</span>.
                  </p>
                  <div className="space-y-2 mb-5 text-left">
                    {[
                      { n: "01", label: "Document Review",    sub: "Our team verifies your submission",  done: true  },
                      { n: "02", label: "Credit Assessment",  sub: "Automated scoring in progress",      done: false },
                      { n: "03", label: "Funds Disbursement", sub: "Sent to your WAAFI wallet",          done: false },
                    ].map(s => (
                      <div key={s.n} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${s.done ? "bg-waafi-purple text-white" : "bg-slate-100 text-slate-400"}`}>
                          {s.done ? "✓" : s.n}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${s.done ? "text-slate-900" : "text-slate-400"}`}>{s.label}</p>
                          <p className="text-[10px] text-slate-400">{s.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate("/")}
                      className="flex-1 h-9 bg-waafi-purple hover:bg-[#15803d] text-white text-xs font-semibold rounded-xl btn-shadow transition-colors cursor-pointer">
                      Back to Home
                    </button>
                    <button onClick={() => { setSubmitted(false); navigate("/"); }}
                      className="h-9 px-3 border border-slate-200 text-slate-400 text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                      <PartyPopper size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                    <Shield size={9} className="text-emerald-500" /> You will be notified via SMS and email
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
