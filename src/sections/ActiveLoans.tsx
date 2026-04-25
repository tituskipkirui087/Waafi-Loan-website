import { motion } from "framer-motion";

interface Loan {
  id: number;
  name: string;
  startDate: string;
  amount: number;
  paid: number;
  apr: number;
  monthsLeft: number;
}

const loans: Loan[] = [
  { id: 1, name: "Personal Loan", startDate: "Jan 15, 2025", amount: 5000, paid: 3250, apr: 8.5, monthsLeft: 13 },
  { id: 2, name: "Business Expansion", startDate: "Feb 20, 2025", amount: 12000, paid: 3600, apr: 10.2, monthsLeft: 22 },
];

const payments = [
  { date: "Apr 15, 2025", amount: "$434.72", status: "On track", active: true },
  { date: "May 15, 2025", amount: "$434.72", status: "Upcoming", active: false },
  { date: "Jun 15, 2025", amount: "$434.72", status: "Upcoming", active: false },
];

function CircularProgress({ percentage, size = 48 }: { percentage: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth={4}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-bold fill-slate-700 rotate-90"
        style={{ transformOrigin: "center" }}
        transform={`rotate(90, ${size / 2}, ${size / 2})`}
      >
        {percentage}%
      </text>
    </svg>
  );
}

export default function ActiveLoans() {
  return (
    <section className="bg-ghost-white py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Active Loans */}
          <div className="lg:w-[60%]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Your Active Loans</h3>
              <a href="#" className="text-sm font-medium text-waafi-purple hover:text-[#15803d]">
                View All
              </a>
            </div>

            <div className="space-y-4">
              {loans.map((loan, i) => {
                const percentPaid = Math.round((loan.paid / loan.amount) * 100);
                return (
                  <motion.div
                    key={loan.id}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-[20px] card-shadow hover:card-shadow-hover p-5 flex items-center gap-4 transition-all duration-300 cursor-pointer"
                  >
                    <CircularProgress percentage={percentPaid} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 truncate">{loan.name}</h4>
                      <p className="text-xs text-slate-500">Started: {loan.startDate}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        ${loan.amount.toLocaleString()} at {loan.apr}% APR
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-slate-700">
                        ${loan.paid.toLocaleString()} / ${loan.amount.toLocaleString()}
                      </p>
                      <p className={`text-xs mt-1 ${loan.monthsLeft <= 15 ? "text-amber-500" : "text-slate-400"}`}>
                        {loan.monthsLeft} months left
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - Repayment Schedule */}
          <div className="lg:w-[40%]">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Next Payments</h3>
            <div className="relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-[22px] top-3 bottom-3 w-[2px] bg-slate-200" />

              <div className="space-y-6">
                {payments.map((payment, i) => (
                  <motion.div
                    key={payment.date}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Node */}
                    <div
                      className={`relative z-10 w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                        payment.active ? "bg-waafi-purple" : "bg-slate-300"
                      }`}
                    />
                    {/* Card */}
                    <div className="bg-white rounded-xl card-shadow p-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-semibold ${payment.active ? "text-slate-900" : "text-slate-500"}`}>
                            {payment.date}
                          </p>
                          <p className="text-base font-bold text-slate-900 mt-1">{payment.amount}</p>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            payment.active
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-50 text-slate-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
