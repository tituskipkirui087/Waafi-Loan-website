import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function CreditGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const maxScore = 1000;
  const percentage = score / maxScore;
  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - arcLength * percentage;

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const startVal = 0;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(startVal + (score - startVal) * eased));
      if (now - startTime < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={200} height={160} viewBox="0 0 200 160">
          {/* Background arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={-circumference * 0.125}
            strokeLinecap="round"
          />
          {/* Active arc */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength - circumference * 0.125 }}
            whileInView={{ strokeDashoffset: strokeDashoffset - circumference * 0.125 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className="text-5xl font-bold text-waafi-purple">{animatedScore}</span>
        </div>
      </div>
      <span className="mt-2 inline-block text-sm font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
        Excellent
      </span>
    </div>
  );
}

const loanData = [
  { name: "Personal", value: 7740, color: "#8B5CF6" },
  { name: "Business", value: 5160, color: "#14B8A6" },
  { name: "Emergency", value: 2580, color: "#F59E0B" },
  { name: "Education", value: 1720, color: "#3B82F6" },
];

const factors = [
  { label: "Payment History", value: 98, color: "bg-waafi-purple" },
  { label: "Credit Utilization", value: 32, color: "bg-waafi-teal" },
  { label: "Account Age", value: 70, color: "bg-blue-500" },
];

export default function CreditAnalytics() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(factors.map(() => 0));

  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(factors.map((f) => Math.round(f.value * eased)));
      if (now - startTime < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <section className="bg-ghost-white py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Credit Score Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[20px] card-shadow p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Your Credit Score</h3>
            <CreditGauge score={742} />

            <div className="mt-8 space-y-5">
              {factors.map((factor, i) => (
                <div key={factor.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">{factor.label}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {factor.label === "Account Age" ? `${animatedValues[i] / 10} years` : `${animatedValues[i]}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${factor.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className={`h-full ${factor.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Loan Usage Analytics */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-[20px] card-shadow p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Loan Usage</h3>

            <div className="flex flex-col items-center">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loanData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {loanData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm font-semibold text-slate-700 -mt-4 mb-6">
                Total: $17,200
              </p>

              <div className="w-full space-y-3">
                {loanData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
