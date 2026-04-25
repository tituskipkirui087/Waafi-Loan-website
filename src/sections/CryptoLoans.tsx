import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Up to 70% LTV ratio",
  "No credit checks required",
  "Instant approval",
  "Flexible repayment terms",
];

export default function CryptoLoans() {
  return (
    <section id="crypto" className="bg-ghost-white py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left - Content */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-waafi-soft-purple text-waafi-purple px-3 py-1.5 rounded-full mb-4">
              New Feature
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Crypto-Backed Loans
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Use your cryptocurrency as collateral. No need to sell your assets — borrow USD
              instantly against your BTC, ETH, or stablecoins.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="h-[52px] px-8 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl transition-colors duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              Explore Crypto Loans
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Right - Crypto Card Visual */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full max-w-[420px]"
          >
            <div className="bg-white rounded-[20px] card-shadow hover:card-shadow-hover overflow-hidden transition-all duration-300">
              {/* Gradient Header */}
              <div className="h-[120px] gradient-purple-teal relative">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center">
                  <img
                    src="/crypto-visual.jpg"
                    alt="Crypto coins"
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-10 pb-6 px-6 text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Your Collateral
                </p>
                <p className="text-2xl font-bold text-slate-900 mb-1">2.45 BTC</p>
                <p className="text-sm text-slate-500 mb-6">
                  ≈ $234,500.00
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Available to Borrow
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mb-1">$164,150.00</p>
                  <p className="text-sm text-slate-500 mb-4">at 70% LTV</p>

                  <button className="text-waafi-purple font-semibold text-sm hover:text-[#15803d] inline-flex items-center gap-1 transition-colors">
                    Borrow Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
