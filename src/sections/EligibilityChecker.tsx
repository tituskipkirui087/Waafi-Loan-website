import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EligibilityCheckerProps {
  onStartApplication?: (loanData: any) => void;
}

export default function EligibilityChecker({ onStartApplication }: EligibilityCheckerProps) {
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState("");
  const [creditRange, setCreditRange] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    if (income && employment && creditRange) {
      setShowResult(true);
    }
  };

  const handleStartApplication = () => {
    // Calculate loan amount based on inputs (simplified)
    const annualIncome = parseInt(income) * 12;
    const loanAmount = annualIncome * 0.3; // 30% of annual income
    const eligibleAmount = Math.min(loanAmount, 50000); // Cap at 50k
    const loanData = {
      amount: eligibleAmount,
      rate: 8.5, // Default rate
      duration: 24, // Default 24 months
      eligibleAmount: eligibleAmount,
    };

    if (onStartApplication) {
      onStartApplication(loanData);
    }
  };

  return (
    <section className="py-20 gradient-purple-teal animate-gradient-shift relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Check Your Eligibility
          </h2>
          <p className="text-lg text-white/80">
            Find out how much you can borrow in under 60 seconds
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 relative"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              placeholder="Monthly Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full h-14 pl-8 pr-4 rounded-xl bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="flex-1"
          >
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer"
            >
              <option value="">Employment Status</option>
              <option value="employed">Employed Full-time</option>
              <option value="self-employed">Self-employed</option>
              <option value="business">Business Owner</option>
              <option value="freelance">Freelancer</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26 }}
            className="flex-1"
          >
            <select
              value={creditRange}
              onChange={(e) => setCreditRange(e.target.value)}
              className="w-full h-14 px-4 rounded-xl bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer"
            >
              <option value="">Credit Score Range</option>
              <option value="excellent">Excellent (750+)</option>
              <option value="good">Good (650-749)</option>
              <option value="fair">Fair (550-649)</option>
              <option value="poor">Poor (Below 550)</option>
            </select>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.34 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheck}
            className="h-14 px-8 bg-white text-waafi-purple font-semibold rounded-xl hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
          >
            Check Now
          </motion.button>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mt-8 bg-white rounded-[20px] p-6 sm:p-8 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-waafi-purple mb-2">
                You may qualify for up to $25,000
              </p>
              <p className="text-slate-500 mb-6">
                Based on your income and credit profile
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartApplication}
                className="h-[52px] px-8 bg-waafi-purple hover:bg-[#7C3AED] text-white font-semibold rounded-2xl btn-shadow transition-colors cursor-pointer"
              >
                Start Application
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
