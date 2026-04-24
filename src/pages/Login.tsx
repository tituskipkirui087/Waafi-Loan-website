import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, CheckCircle, Clock, Camera, Upload,
  ChevronRight, ArrowLeft, Eye, EyeOff, Star,
} from "lucide-react";

const countries = [
  { code: "SO", name: "Somalia", phone: "+252", flag: "🇸🇴" },
  { code: "DJ", name: "Djibouti", phone: "+253", flag: "🇩🇯" },
  { code: "KE", name: "Kenya", phone: "+254", flag: "🇰🇪" },
  { code: "ET", name: "Ethiopia", phone: "+251", flag: "🇪🇹" },
  { code: "UG", name: "Uganda", phone: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", phone: "+255", flag: "🇹🇿" },
  { code: "RW", name: "Rwanda", phone: "+250", flag: "🇷🇼" },
  { code: "BI", name: "Burundi", phone: "+257", flag: "🇧🇮" },
  { code: "SS", name: "South Sudan", phone: "+211", flag: "🇸🇸" },
  { code: "SD", name: "Sudan", phone: "+249", flag: "🇸🇩" },
  { code: "YE", name: "Yemen", phone: "+967", flag: "🇾🇪" },
  { code: "AE", name: "United Arab Emirates", phone: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", phone: "+966", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", phone: "+974", flag: "🇶🇦" },
  { code: "OM", name: "Oman", phone: "+968", flag: "🇴🇲" },
  { code: "BH", name: "Bahrain", phone: "+973", flag: "🇧🇭" },
  { code: "KW", name: "Kuwait", phone: "+965", flag: "🇰🇼" },
  { code: "GB", name: "United Kingdom", phone: "+44", flag: "🇬🇧" },
  { code: "SE", name: "Sweden", phone: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", phone: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", phone: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", phone: "+358", flag: "🇫🇮" },
  { code: "NL", name: "Netherlands", phone: "+31", flag: "🇳🇱" },
  { code: "DE", name: "Germany", phone: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", phone: "+33", flag: "🇫🇷" },
  { code: "BE", name: "Belgium", phone: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", phone: "+41", flag: "🇨🇭" },
  { code: "IT", name: "Italy", phone: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", phone: "+34", flag: "🇪🇸" },
  { code: "IE", name: "Ireland", phone: "+353", flag: "🇮🇪" },
  { code: "AT", name: "Austria", phone: "+43", flag: "🇦🇹" },
  { code: "US", name: "United States", phone: "+1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", phone: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", phone: "+61", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", phone: "+64", flag: "🇳🇿" },
  { code: "ZA", name: "South Africa", phone: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", phone: "+20", flag: "🇪🇬" },
  { code: "TR", name: "Turkey", phone: "+90", flag: "🇹🇷" },
  { code: "MY", name: "Malaysia", phone: "+60", flag: "🇲🇾" },
  { code: "IN", name: "India", phone: "+91", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", phone: "+92", flag: "🇵🇰" },
  { code: "NG", name: "Nigeria", phone: "+234", flag: "🇳🇬" },
];

type DocType = "" | "passport" | "national_id" | "driver_license";
type ProofType = "" | "utility_bill" | "bank_statement" | "lease" | "tax_return";

export default function Login() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [docType, setDocType] = useState<DocType>("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [proofType, setProofType] = useState<ProofType>("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [faceCapture, setFaceCapture] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, [stream]);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(s);
      setCameraActive(true);
    } catch {
      alert("Camera access denied. Please allow camera access to continue.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setFaceCapture(canvas.toDataURL("image/jpeg"));
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setCameraActive(false);
  };

  const retakePhoto = () => {
    setFaceCapture(null);
    startCamera();
  };

  const truncate = (name: string) => name.length > 26 ? name.slice(0, 26) + "…" : name;

  return (
    <div className="flex min-h-[calc(100vh-72px)]">

      {/* ── LEFT: Branding Panel ── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[40%] flex-col bg-gradient-to-br from-slate-950 via-[#052e16] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-56 h-56 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
        <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-10 py-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
              <img src="/favicon.ico" alt="WAAFI" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">WAAFI</span>
          </div>

          {/* Center */}
          <div className="my-auto pt-10 pb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                Your trusted<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#2dd4bf]">
                  financial partner
                </span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-[270px]">
                Secure, fast, and transparent loans for millions worldwide.
              </p>

              <div className="flex items-center gap-2 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-white/40 text-[11px]">4.9 / 5 · 12,000+ reviews</span>
              </div>

              <div className="space-y-0 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                {[
                  { label: "Active Customers", value: "2.5M+", color: "text-[#4ade80]" },
                  { label: "Countries Served", value: "54+", color: "text-[#2dd4bf]" },
                  { label: "Approval Rate", value: "95%", color: "text-amber-400" },
                ].map((s, i, arr) => (
                  <div key={s.label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}>
                    <span className="text-white/45 text-xs">{s.label}</span>
                    <span className={`font-bold text-sm ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <img
                  src="/images/frame7.webp"
                  alt="WAAFI App"
                  className="w-[140px] rounded-[20px] shadow-2xl opacity-70 mx-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom badges */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-5 border-t border-white/10">
            {[
              { Icon: Shield, label: "Bank-level Security" },
              { Icon: CheckCircle, label: "No Hidden Fees" },
              { Icon: Clock, label: "24hr Disbursement" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-white/40 text-[10px]">
                <Icon size={10} className="text-emerald-400" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="flex-1 bg-ghost-white overflow-y-auto">
        <div className="min-h-full flex items-start justify-center px-5 py-8 sm:px-10">
          <div className="w-full max-w-[420px]">

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { n: 1, label: "Sign In" },
                { n: 2, label: "Verify Identity" },
              ].map(({ n, label }, idx) => (
                <div key={n} className="flex items-center gap-2">
                  {idx > 0 && <div className={`w-8 h-px ${step > 1 ? "bg-waafi-purple" : "bg-slate-200"}`} />}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= n ? "bg-waafi-purple text-white" : "bg-slate-200 text-slate-400"}`}>
                    {step > n ? "✓" : n}
                  </div>
                  <span className={`text-xs font-semibold ${step === n ? "text-slate-800" : "text-slate-400"}`}>{label}</span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* ─── STEP 1: Sign In ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="bg-white rounded-2xl card-shadow p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-0.5">Welcome back</h2>
                    <p className="text-xs text-slate-500 mb-5">Sign in to continue your loan application</p>

                    <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          className="w-full h-10 pl-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple focus:bg-white transition-all"
                          placeholder="name@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">Phone Number</label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowDropdown(!showDropdown)}
                              className="h-10 px-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-waafi-purple/40 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 transition-all flex items-center gap-1.5 min-w-[105px] text-sm cursor-pointer"
                            >
                              <span>{selectedCountry.flag}</span>
                              <span className="font-medium text-slate-800">{selectedCountry.phone}</span>
                              <svg className="w-3 h-3 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {showDropdown && (
                              <div className="absolute top-full left-0 mt-1 w-[260px] max-h-[240px] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-50">
                                {countries.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => { setSelectedCountry(c); setShowDropdown(false); }}
                                    className={`w-full px-3 py-2 flex items-center gap-2.5 hover:bg-slate-50 text-sm ${selectedCountry.code === c.code ? "bg-waafi-soft-purple" : ""}`}
                                  >
                                    <span>{c.flag}</span>
                                    <span className="flex-1 text-left text-slate-900 font-medium">{c.name}</span>
                                    <span className="text-slate-400 text-xs">{c.phone}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 15))}
                            className="flex-1 h-10 pl-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple focus:bg-white transition-all"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple focus:bg-white transition-all"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-waafi-purple focus:ring-waafi-purple cursor-pointer" />
                        Remember me on this device
                      </label>

                      <button
                        type="submit"
                        className="w-full h-10 bg-waafi-purple hover:bg-[#15803d] text-white text-sm font-semibold rounded-xl btn-shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Continue <ChevronRight size={14} />
                      </button>
                    </form>
                  </div>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    New to WAAFI?{" "}
                    <a href="#" className="text-waafi-purple font-semibold hover:underline">Create an account</a>
                  </p>
                </motion.div>
              )}

              {/* ─── STEP 2: KYC ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setStep(1)}
                      className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-waafi-purple/40 hover:text-waafi-purple transition-colors cursor-pointer shrink-0"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">Verify Your Identity</h2>
                      <p className="text-[10px] text-slate-400">Required for loan processing · 256-bit encrypted</p>
                    </div>
                  </div>

                  <div className="space-y-3">

                    {/* ── Government ID ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900">Government Issued ID</p>
                          <p className="text-[10px] text-slate-400">Passport · National ID · Driver's License</p>
                        </div>
                        {idFile && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
                      </div>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as DocType)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 mb-2.5 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple"
                      >
                        <option value="">Select document type</option>
                        <option value="passport">Passport</option>
                        <option value="national_id">National Identity Card</option>
                        <option value="driver_license">Driver's License</option>
                      </select>
                      <label className={`flex flex-col items-center justify-center h-[68px] border-2 border-dashed rounded-xl cursor-pointer transition-all ${idFile ? "border-emerald-400 bg-emerald-50/40" : "border-slate-200 hover:border-waafi-purple/40 hover:bg-waafi-soft-purple/20"}`}>
                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setIdFile(e.target.files?.[0] || null)} />
                        {idFile ? (
                          <>
                            <CheckCircle size={15} className="text-emerald-500 mb-0.5" />
                            <p className="text-[11px] text-emerald-600 font-semibold">{truncate(idFile.name)}</p>
                          </>
                        ) : (
                          <>
                            <Upload size={15} className="text-slate-400 mb-0.5" />
                            <p className="text-[11px] text-slate-500">Click to upload ID document</p>
                            <p className="text-[10px] text-slate-400">JPG, PNG, PDF · Max 5MB</p>
                          </>
                        )}
                      </label>
                    </div>

                    {/* ── Proof of Residence ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900">Proof of Residence</p>
                          <p className="text-[10px] text-slate-400">Utility bill · Bank statement · Lease (last 3 months)</p>
                        </div>
                        {proofFile && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
                      </div>
                      <select
                        value={proofType}
                        onChange={(e) => setProofType(e.target.value as ProofType)}
                        className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 mb-2.5 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple"
                      >
                        <option value="">Select proof type</option>
                        <option value="utility_bill">Utility Bill</option>
                        <option value="bank_statement">Bank Statement</option>
                        <option value="lease">Lease / Tenancy Agreement</option>
                        <option value="tax_return">Tax Return</option>
                      </select>
                      <label className={`flex flex-col items-center justify-center h-[68px] border-2 border-dashed rounded-xl cursor-pointer transition-all ${proofFile ? "border-emerald-400 bg-emerald-50/40" : "border-slate-200 hover:border-waafi-purple/40 hover:bg-waafi-soft-purple/20"}`}>
                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setProofFile(e.target.files?.[0] || null)} />
                        {proofFile ? (
                          <>
                            <CheckCircle size={15} className="text-emerald-500 mb-0.5" />
                            <p className="text-[11px] text-emerald-600 font-semibold">{truncate(proofFile.name)}</p>
                          </>
                        ) : (
                          <>
                            <Upload size={15} className="text-slate-400 mb-0.5" />
                            <p className="text-[11px] text-slate-500">Click to upload proof document</p>
                            <p className="text-[10px] text-slate-400">JPG, PNG, PDF · Max 5MB</p>
                          </>
                        )}
                      </label>
                    </div>

                    {/* ── Face Verification ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                          <Camera size={14} className="text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900">Face Verification</p>
                          <p className="text-[10px] text-slate-400">Live selfie to confirm your identity</p>
                        </div>
                        {faceCapture && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
                      </div>

                      {faceCapture ? (
                        <div className="relative rounded-xl overflow-hidden">
                          <img src={faceCapture} alt="Face capture" className="w-full h-[130px] object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-between p-2">
                            <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              <CheckCircle size={8} /> Verified
                            </span>
                            <button
                              onClick={retakePhoto}
                              className="bg-white/90 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-medium hover:bg-white transition-colors cursor-pointer"
                            >
                              Retake
                            </button>
                          </div>
                        </div>
                      ) : cameraActive ? (
                        <div className="relative rounded-xl overflow-hidden">
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-[130px] object-cover bg-black" />
                          <canvas ref={canvasRef} className="hidden" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-20 h-24 border-2 border-white/70 rounded-2xl" />
                          </div>
                          <button
                            onClick={capturePhoto}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 h-7 px-4 bg-white text-slate-800 text-[11px] font-bold rounded-full shadow-lg flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <Camera size={10} /> Capture
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={startCamera}
                          className="w-full h-[68px] border-2 border-dashed border-slate-200 hover:border-purple-400/50 hover:bg-purple-50/20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Camera size={16} className="text-slate-400" />
                          <p className="text-[11px] text-slate-500">Click to start face verification</p>
                          <p className="text-[10px] text-slate-400">Camera access required</p>
                        </button>
                      )}
                    </div>

                    {/* ── Income & Employment ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 bg-waafi-soft-purple rounded-xl flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-waafi-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Financial Information</p>
                          <p className="text-[10px] text-slate-400">Income details for loan assessment</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Monthly Income</label>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">$</span>
                            <input type="number" placeholder="e.g. 3000" className="w-full h-9 pl-6 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple focus:bg-white transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Employment</label>
                          <select className="w-full h-9 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple appearance-none cursor-pointer">
                            <option value="">Status</option>
                            <option value="employed">Employed</option>
                            <option value="self">Self-employed</option>
                            <option value="business">Business Owner</option>
                            <option value="freelance">Freelancer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Credit Score</label>
                          <select className="w-full h-9 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple appearance-none cursor-pointer">
                            <option value="">Range</option>
                            <option value="excellent">750+ Excellent</option>
                            <option value="good">650–749 Good</option>
                            <option value="fair">550–649 Fair</option>
                            <option value="poor">Below 550</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Loan Purpose</label>
                          <select className="w-full h-9 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple appearance-none cursor-pointer">
                            <option value="">Purpose</option>
                            <option value="personal">Personal</option>
                            <option value="business">Business</option>
                            <option value="education">Education</option>
                            <option value="emergency">Emergency</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full h-10 bg-waafi-purple hover:bg-[#15803d] text-white text-sm font-semibold rounded-xl btn-shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Submit & Complete Verification <ChevronRight size={14} />
                    </button>

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
    </div>
  );
}
