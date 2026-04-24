import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { useLoan, FIXED_RATE } from "../context/LoanContext";
import { useNavigate } from "react-router-dom";

export default function LoanCalculator() {
  const { loanData, setLoanData } = useLoan();
  const [amount, setAmount] = useState(loanData.amount);
  const duration = 12;
  const [animatedPayment, setAnimatedPayment] = useState(0);
  const [animatedInterest, setAnimatedInterest] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const navigate = useNavigate();
  const maxAmount = loanData.eligibleAmount;

  // Update context when calculator values change
  useEffect(() => {
    setLoanData({ amount, duration });
  }, [amount, duration]);

  const monthlyPayment = useMemo(() => {
    const r = FIXED_RATE / 100 / 12;
    const n = duration;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, duration]);

  const totalRepayment = monthlyPayment * duration;
  const totalInterest = totalRepayment - amount;

  useEffect(() => {
    const duration = 400;
    const startTime = Date.now();
    const startPayment = animatedPayment;
    const startInterest = animatedInterest;
    const startTotal = animatedTotal;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPayment(startPayment + (monthlyPayment - startPayment) * eased);
      setAnimatedInterest(startInterest + (totalInterest - startInterest) * eased);
      setAnimatedTotal(startTotal + (totalRepayment - startTotal) * eased);
      if (now - startTime < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyPayment, totalInterest, totalRepayment]);

   const formatCurrency = (val: number) =>
     "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

   const handleApplyForLoan = () => {
      setLoanData({ amount, duration });
      navigate("/loan-preview");
    };

   return (
    <section id="calculator" className="bg-ghost-white py-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-[20px] card-shadow p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-waafi-soft-purple flex items-center justify-center mx-auto mb-4">
              <Calculator size={24} className="text-waafi-purple" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Loan Calculator</h2>
            <p className="text-slate-500">Estimate your monthly payments</p>
          </div>

          {/* Inputs */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {/* Loan Amount */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label className="text-sm font-medium text-slate-700 mb-2 block">Loan Amount</label>
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1000, Math.min(maxAmount, Number(e.target.value))))}
                  className="w-full h-12 pl-8 pr-4 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={maxAmount}
                step={500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
                style={{ background: `linear-gradient(to right, #16a34a ${(amount - 1000) / (maxAmount - 1000) * 100}%, #e2e8f0 ${(amount - 1000) / (maxAmount - 1000) * 100}%)` }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$1,000</span>
                <span>${maxAmount.toLocaleString()}</span>
              </div>
            </motion.div>

            {/* Interest Rate - Fixed */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="text-sm font-medium text-slate-700 mb-2 block">Interest Rate</label>
              <div className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <span className="text-slate-900 font-semibold">Fixed Rate</span>
                <span className="text-waafi-purple font-bold">{FIXED_RATE}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Standard fixed rate applied</p>
            </motion.div>

            {/* Duration — fixed at 12 months */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label className="text-sm font-medium text-slate-700 mb-2 block">Repayment Period</label>
              <div className="h-12 px-4 rounded-xl border border-waafi-purple/30 bg-waafi-soft-purple/40 flex items-center justify-between">
                <span className="font-bold text-waafi-purple text-sm">12 months</span>
                <span className="text-[11px] text-waafi-purple/70 bg-waafi-purple/10 px-2 py-0.5 rounded-full font-medium">Fixed term</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">All WAAFI loans are on a standard 12-month term</p>
            </motion.div>
          </div>

          {/* Result Card */}
          <div className="border-l-4 border-waafi-purple bg-gradient-to-r from-waafi-soft-purple/50 to-transparent rounded-r-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(animatedPayment)}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-slate-500">Total Interest</p>
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(animatedInterest)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Repayment</p>
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(animatedTotal)}</p>
                </div>
              </div>
            </div>
          </div>

           {/* CTA */}
           <motion.button
             whileHover={{ scale: 1.01, y: -1 }}
             whileTap={{ scale: 0.99 }}
             onClick={handleApplyForLoan}
             className="w-full h-[52px] bg-waafi-purple hover:bg-[#15803d] text-white font-semibold rounded-2xl btn-shadow transition-colors duration-200 cursor-pointer"
           >
             Apply for This Loan
           </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
