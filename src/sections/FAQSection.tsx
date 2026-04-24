import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I get a loan?",
    answer: "Once your eligibility is confirmed and identity is verified, loans are typically disbursed within 24–48 hours directly to your WAAFI wallet or linked bank account.",
  },
  {
    question: "What is the minimum credit score required?",
    answer: "We accept applicants starting from fair credit (550+). Your income and employment status also play a significant role in our decision.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "None. WAAFI is fully transparent — you'll see a complete breakdown of interest, monthly payments, and total repayment before you commit to anything.",
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes. WAAFI allows early repayment with zero prepayment penalties. Paying early saves you on interest and improves your credit profile with us.",
  },
  {
    question: "What documents do I need?",
    answer: "Typically a valid government ID, proof of income (recent pay slips or 3 months of bank statements), and proof of address. The entire process is digital.",
  },
  {
    question: "Is my data safe with WAAFI?",
    answer: "We use 256-bit TLS encryption, secure cloud infrastructure, and comply with international data protection regulations to keep your data safe.",
  },
  {
    question: "Can I apply if I'm self-employed?",
    answer: "Yes. Self-employed applicants can apply using bank statements or tax returns as proof of income. Business owners are also eligible for our Business Loan.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="help" className="py-14 bg-white">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-waafi-soft-purple text-waafi-purple px-3 py-1 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about WAAFI loans.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-ghost-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/60 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-3 text-sm">
                  {faq.question}
                </span>
                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${open === i ? "bg-waafi-soft-purple text-waafi-purple" : "bg-white text-slate-400"}`}>
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-200/50 pt-2.5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
