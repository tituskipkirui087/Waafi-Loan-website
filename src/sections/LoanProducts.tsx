import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useUI } from "../context/UIContext";

const loanTypes = [
  {
    title: "Personal Loan",
    description: "Fund your dreams, cover expenses, or consolidate debt with competitive rates.",
    amount: "$1,000 – $50,000",
    rate: "12%",
    term: "Up to 60 months",
    color: "text-waafi-purple",
    bg: "bg-waafi-soft-purple",
    border: "border-waafi-purple/20",
    image: "/images/card.svg",
  },
  {
    title: "Business Loan",
    description: "Scale your business with flexible financing for equipment, inventory, or expansion.",
    amount: "$5,000 – $200,000",
    rate: "14%",
    term: "Up to 84 months",
    color: "text-waafi-teal",
    bg: "bg-waafi-soft-teal",
    border: "border-waafi-teal/20",
    image: "/images/merchant.svg",
  },
  {
    title: "Emergency Loan",
    description: "Fast access to cash when life's unexpected moments require immediate funds.",
    amount: "$500 – $10,000",
    rate: "10%",
    term: "Up to 24 months",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    image: "/images/payments.svg",
  },
  {
    title: "Education Loan",
    description: "Invest in your future with affordable education financing for any level of study.",
    amount: "$2,000 – $30,000",
    rate: "8%",
    term: "Up to 72 months",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    image: "/images/goals.svg",
  },
];

export default function LoanProducts() {
  const { openEligibility } = useUI();
  return (
    <section id="products" className="py-14 bg-ghost-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-waafi-soft-purple text-waafi-purple px-3 py-1 rounded-full mb-3">
            Loan Products
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Find the Right Loan for You
          </h2>
          <p className="text-sm text-slate-500 max-w-[480px] mx-auto">
            From personal to business needs, WAAFI has flexible loan options designed around your life.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loanTypes.map((loan, i) => (
            <motion.div
              key={loan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-2xl card-shadow hover:card-shadow-hover border ${loan.border} p-4 flex flex-col transition-all duration-300 cursor-pointer group`}
              onClick={openEligibility}
            >
              <div className={`w-10 h-10 rounded-xl ${loan.bg} flex items-center justify-center mb-3 overflow-hidden`}>
                <img src={loan.image} alt={loan.title} className="w-6 h-6 object-contain" />
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1">{loan.title}</h3>
              <p className="text-xs text-slate-500 mb-3 flex-1 leading-relaxed">{loan.description}</p>

              <div className="space-y-1.5 mb-3 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Amount</span>
                  <span className="font-semibold text-slate-800">{loan.amount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Rate</span>
                  <span className={`font-bold ${loan.color}`}>{loan.rate} fixed</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Term</span>
                  <span className="font-semibold text-slate-800">{loan.term}</span>
                </div>
              </div>

              <button className={`flex items-center gap-1 text-xs font-semibold ${loan.color} group-hover:gap-2 transition-all`}>
                Apply Now <ArrowRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
