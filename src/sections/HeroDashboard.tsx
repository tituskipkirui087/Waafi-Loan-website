import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle, Star } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function HeroDashboard() {
  const { openEligibility } = useUI();

  return (
    <section
      id="dashboard"
      className="pt-[72px] bg-gradient-to-br from-slate-950 via-[#052e16] to-slate-900 relative overflow-hidden min-h-[80vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-[360px] h-[360px] bg-green-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-8 right-1/4 w-[280px] h-[280px] bg-waafi-teal/15 rounded-full blur-[80px]" />
        <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.05]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-5"
            >
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-medium">Now serving 54+ countries worldwide</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] mb-4">
              Get Fast,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#2dd4bf]">
                Flexible Loans
              </span>
              <br />
              with WAAFI
            </h1>

            <p className="text-base text-white/65 mb-6 leading-relaxed max-w-[440px]">
              Access up to <span className="text-white font-semibold">$50,000</span> in minutes.
              Low fixed rates, instant approval, and flexible repayment terms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openEligibility}
                className="h-11 px-6 bg-waafi-purple hover:bg-[#15803d] text-white font-semibold rounded-xl btn-shadow transition-colors cursor-pointer text-sm"
              >
                Apply Now — It's Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openEligibility}
                className="h-11 px-6 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl transition-colors cursor-pointer text-sm backdrop-blur-sm"
              >
                Check Eligibility
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-4 mb-5">
              {[
                { Icon: Shield, color: "text-emerald-400", label: "Bank-Level Security" },
                { Icon: Clock, color: "text-waafi-teal", label: "Instant Approval" },
                { Icon: CheckCircle, color: "text-waafi-purple", label: "No Hidden Fees" },
              ].map(({ Icon, color, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/65">
                  <Icon size={14} className={color} />
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white/50 text-xs">4.9 / 5 from 12,000+ reviews</span>
            </div>
          </motion.div>

          {/* Right — phone */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[300px] h-[380px]">
              <div className="absolute inset-0 bg-waafi-purple/25 rounded-[40px] blur-3xl scale-75 translate-y-6" />
              <img
                src="/images/frame7.webp"
                alt="WAAFI App"
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[240px] rounded-[28px] shadow-2xl z-10"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 z-20"
              >
                <img src="/images/frame10.svg" alt="" className="w-[120px] drop-shadow-lg" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-0 -left-8 z-20"
              >
                <img src="/images/frame9.svg" alt="" className="w-[110px] drop-shadow-lg" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12 -translate-y-1/2 z-20"
              >
                <img src="/images/frame8.svg" alt="" className="w-[75px] drop-shadow-lg" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-8 -left-10 z-20"
              >
                <img src="/images/voice.svg" alt="" className="w-[95px] drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40H1440V14C1200 40 900 0 720 14C540 28 240 0 0 14V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
