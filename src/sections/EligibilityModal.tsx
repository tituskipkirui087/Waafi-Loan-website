import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { FIXED_RATE, useLoan } from "../context/LoanContext";
import { useUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";

export default function EligibilityModal() {
  const { eligibilityOpen, closeEligibility } = useUI();
  const { setLoanData } = useLoan();
  const navigate = useNavigate();

  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("");
  const [creditRange, setCreditRange] = useState("");
  const [showResult, setShowResult] = useState(false);

  const eligibleAmount = Math.min(Math.floor((parseInt(income || "0") * 12) * 0.3), 50000);

  const handleCheck = () => {
    if (income && employment && creditRange) setShowResult(true);
  };

  const handleStart = () => {
    setLoanData({ amount: eligibleAmount, rate: FIXED_RATE, duration: 24, eligibleAmount });
    handleClose();
    navigate("/calculator");
  };

  const handleClose = () => {
    closeEligibility();
    setIncome("");
    setEmployment("");
    setCreditRange("");
    setShowResult(false);
  };

  return (
    <AnimatePresence>
      {eligibilityOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.3, type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl w-full max-w-[460px] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="gradient-purple-teal p-6 relative overflow-hidden">
                <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full mb-2">
                      Quick Check
                    </span>
                    <h3 className="text-xl font-bold text-white">Check Your Eligibility</h3>
                    <p className="text-white/65 text-xs mt-1">Find out how much you qualify for in 60 seconds</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">$</span>
                        <input
                          type="number"
                          placeholder="Monthly Income"
                          value={income}
                          onChange={(e) => setIncome(e.target.value)}
                          className="w-full h-11 pl-7 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple focus:bg-white transition-all"
                        />
                      </div>
                      <select
                        value={employment}
                        onChange={(e) => setEmployment(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Employment Status</option>
                        <option value="employed">Employed Full-time</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="business">Business Owner</option>
                        <option value="freelance">Freelancer</option>
                      </select>
                      <select
                        value={creditRange}
                        onChange={(e) => setCreditRange(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-waafi-purple/25 focus:border-waafi-purple transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Credit Score Range</option>
                        <option value="excellent">Excellent (750+)</option>
                        <option value="good">Good (650–749)</option>
                        <option value="fair">Fair (550–649)</option>
                        <option value="poor">Poor (Below 550)</option>
                      </select>
                      <button
                        onClick={handleCheck}
                        disabled={!income || !employment || !creditRange}
                        className="w-full h-11 bg-waafi-purple hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl btn-shadow transition-colors cursor-pointer"
                      >
                        Check Eligibility
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-2"
                    >
                      <div className="w-14 h-14 bg-waafi-soft-purple rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle size={26} className="text-waafi-purple" />
                      </div>
                      <p className="text-xs text-slate-500 mb-1">You may qualify for up to</p>
                      <p className="text-3xl font-extrabold text-waafi-purple mb-1">
                        ${eligibleAmount.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-slate-400 mb-6">Based on your income and credit profile</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowResult(false)}
                          className="flex-1 h-10 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleStart}
                          className="flex-[2] h-10 bg-waafi-purple hover:bg-[#15803d] text-white text-sm font-semibold rounded-xl btn-shadow transition-colors cursor-pointer"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
