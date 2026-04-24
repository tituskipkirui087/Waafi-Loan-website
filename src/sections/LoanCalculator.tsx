import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { useLoan } from "../context/LoanContext";
import { useNavigate } from "react-router-dom";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(8.5);
  const [duration, setDuration] = useState(12);
  const [animatedPayment, setAnimatedPayment] = useState(0);
  const [animatedInterest, setAnimatedInterest] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const { setLoanData } = useLoan();
  const navigate = useNavigate();

  // Update context when calculator values change
  useEffect(() => {
    setLoanData({ amount, rate, duration });
  }, [amount, rate, duration]);

  const monthlyPayment = useMemo(() => {
    const r = rate / 100 / 12;
    const n = duration;
    if (r === 0) return amount / n;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, rate, duration]);

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
      // Calculate eligible amount (2x current amount, capped at 50k)
      const eligible = Math.min(amount * 2, 50000);
      
      // Set loan data in context (calculated values are derived automatically)
      setLoanData({
        amount,
        rate,
        duration,
        eligibleAmount: eligible,
      });

      // Navigate to loan preview
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
                  onChange={(e) => setAmount(Math.max(1000, Math.min(50000, Number(e.target.value))))}
                  className="w-full h-12 pl-8 pr-4 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                />
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
                style={{ background: `linear-gradient(to right, #8B5CF6 ${(amount - 1000) / 49000 * 100}%, #e2e8f0 ${(amount - 1000) / 49000 * 100}%)` }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$1,000</span>
                <span>$50,000</span>
              </div>
            </motion.div>

            {/* Interest Rate */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="text-sm font-medium text-slate-700 mb-2 block">Interest Rate</label>
              <div className="relative mb-3">
                <input
                  type="number"
                  value={rate}
                  step={0.1}
                  onChange={(e) => setRate(Math.max(3, Math.min(25, Number(e.target.value))))}
                  className="w-full h-12 px-4 pr-8 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
              <input
                type="range"
                min={3}
                max={25}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full"
                style={{ background: `linear-gradient(to right, #8B5CF6 ${(rate - 3) / 22 * 100}%, #e2e8f0 ${(rate - 3) / 22 * 100}%)` }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>3%</span>
                <span>25%</span>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label className="text-sm font-medium text-slate-700 mb-2 block">Duration (months)</label>
              <div className="relative mb-3">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(3, Math.min(60, Number(e.target.value))))}
                  className="w-full h-12 px-4 pr-20 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">months</span>
              </div>
              <input
                type="range"
                min={3}
                max={60}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
                style={{ background: `linear-gradient(to right, #8B5CF6 ${(duration - 3) / 57 * 100}%, #e2e8f0 ${(duration - 3) / 57 * 100}%)` }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>3</span>
                <span>60</span>
              </div>
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
             className="w-full h-[52px] bg-waafi-purple hover:bg-[#7C3AED] text-white font-semibold rounded-2xl btn-shadow transition-colors duration-200 cursor-pointer"
           >
             Apply for This Loan
           </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
