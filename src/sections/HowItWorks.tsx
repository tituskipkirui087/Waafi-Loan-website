import { motion } from "framer-motion";
import { ClipboardCheck, SlidersHorizontal, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: ClipboardCheck,
    title: "Check Eligibility",
    description: "Answer 3 quick questions about your income and credit. Get your result in under 60 seconds.",
    color: "text-waafi-purple",
    iconBg: "bg-waafi-soft-purple",
    accentBar: "from-waafi-purple to-green-400",
  },
  {
    number: "02",
    Icon: SlidersHorizontal,
    title: "Calculate Your Loan",
    description: "Slide to your ideal amount and term. See your exact monthly payment update in real time.",
    color: "text-waafi-teal",
    iconBg: "bg-waafi-soft-teal",
    accentBar: "from-waafi-teal to-teal-400",
  },
  {
    number: "03",
    Icon: ShieldCheck,
    title: "Review & Confirm",
    description: "See a full cost breakdown — monthly payment, total interest, total repayment — then apply.",
    color: "text-blue-600",
    iconBg: "bg-blue-50",
    accentBar: "from-blue-500 to-blue-400",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 bg-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-waafi-soft-teal text-waafi-teal px-3 py-1 rounded-full mb-3">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            3 Steps to Your Loan
          </h2>
          <p className="text-sm text-slate-500 max-w-[380px] mx-auto">
            No paperwork. No branch visits. Fully online in minutes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative bg-white rounded-2xl card-shadow overflow-hidden"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${step.accentBar}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-slate-100 select-none leading-none">
                    {step.number}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${step.iconBg} flex items-center justify-center`}>
                    <step.Icon size={20} className={step.color} />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center text-slate-400 text-xs mt-6"
        >
          Average time from start to approval:{" "}
          <span className="text-slate-600 font-semibold">under 5 minutes</span>
        </motion.p>
      </div>
    </section>
  );
}
