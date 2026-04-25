import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle, Star } from "lucide-react";
import { useUI } from "../context/UIContext";

export default function HeroDashboard() {
  const { openEligibility } = useUI();

  return (
    <section
      id="dashboard"
      className="pt-[72px] bg-gradient-to-br from-slate-950 via-[#052e16] to-slate-900 relative overflow-hidden sm:min-h-[80vh] flex items-center"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/4 w-[140px] h-[140px] sm:w-[360px] sm:h-[360px] bg-green-600/20 rounded-full blur-[50px] sm:blur-[100px]" />
        <div className="absolute bottom-8 right-1/4 w-[100px] h-[100px] sm:w-[280px] sm:h-[280px] bg-waafi-teal/15 rounded-full blur-[40px] sm:blur-[80px]" />
        <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.05]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-3 sm:px-6 py-3 sm:py-12 w-full">
        {/* Two-column on ALL screen sizes: text left, phone right */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-6 lg:gap-10 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2 py-1 mb-1.5 sm:mb-5"
            >
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
              <span className="text-white/90 text-[9px] sm:text-xs font-medium leading-none">
                <span className="hidden sm:inline">Now serving </span>54+ countries
              </span>
            </motion.div>

            {/* Headline — fluid across all screen widths */}
            <h1
              className="font-extrabold text-white leading-[1.15] mb-1 sm:mb-4"
              style={{ fontSize: "clamp(0.95rem, 4.5vw, 3rem)" }}
            >
              Get Fast,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#2dd4bf]">
                Flexible
              </span>{" "}
              Loans with WAAFI
            </h1>

            {/* Description — hidden on smallest screens */}
            <p
              className="hidden sm:block text-white/65 mb-3 sm:mb-6 leading-relaxed max-w-[440px]"
              style={{ fontSize: "clamp(0.7rem, 1.8vw, 1rem)" }}
            >
              Access up to <span className="text-white font-semibold">$50,000</span> in minutes.
              Low fixed rates, instant approval, flexible repayment terms.
            </p>

            {/* Short tagline for mobile only */}
            <p className="sm:hidden text-white/55 mb-2 leading-snug" style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.8rem)" }}>
              Up to <span className="text-white font-semibold">$50,000</span> · instant approval
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-1.5 sm:gap-3 mb-2 sm:mb-7">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={openEligibility}
                className="bg-waafi-purple hover:bg-[#15803d] text-white font-semibold rounded-lg sm:rounded-xl btn-shadow transition-colors cursor-pointer whitespace-nowrap"
                style={{ fontSize: "clamp(0.6rem, 2.2vw, 0.875rem)", padding: "clamp(0.3rem, 1.2vw, 0.625rem) clamp(0.5rem, 2vw, 1.5rem)" }}
              >
                Apply Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={openEligibility}
                className="hidden sm:block bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl transition-colors cursor-pointer backdrop-blur-sm text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3"
              >
                Check Eligibility
              </motion.button>
            </div>

            {/* Trust badges — desktop only */}
            <div className="hidden sm:flex flex-wrap gap-3 sm:gap-4 mb-4 justify-start">
              {[
                { Icon: Shield,      color: "text-emerald-400", label: "Bank-Level Security" },
                { Icon: Clock,       color: "text-waafi-teal",  label: "Instant Approval"   },
                { Icon: CheckCircle, color: "text-waafi-purple", label: "No Hidden Fees"     },
              ].map(({ Icon, color, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/65">
                  <Icon size={13} className={color} />
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* Star rating — desktop only */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white/50 text-xs">4.9 / 5 from 12,000+ reviews</span>
            </div>
          </motion.div>

          {/* ── Right: Phone mockup — visible on ALL screens ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center items-center"
          >
            {/* Container scales: mobile → sm → lg */}
            <div className="relative w-[120px] h-[155px] sm:w-[210px] sm:h-[270px] lg:w-[300px] lg:h-[380px]">
              {/* Glow */}
              <div className="absolute inset-0 bg-waafi-purple/25 rounded-[30px] blur-2xl scale-75 translate-y-4" />

              {/* Main phone */}
              <img
                src="/images/frame7.webp"
                alt="WAAFI App"
                className="absolute left-1/2 -translate-x-1/2 top-0 rounded-[16px] sm:rounded-[22px] lg:rounded-[28px] shadow-2xl z-10 w-[95px] sm:w-[170px] lg:w-[240px]"
              />

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-2 lg:-top-4 lg:-right-2 z-20"
              >
                <img src="/images/frame10.svg" alt="" className="w-[52px] sm:w-[90px] lg:w-[120px] drop-shadow-lg" />
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-0 -left-5 sm:-left-7 lg:-left-8 z-20"
              >
                <img src="/images/frame9.svg" alt="" className="w-[46px] sm:w-[80px] lg:w-[110px] drop-shadow-lg" />
              </motion.div>

              {/* Floating badge — middle right */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-6 sm:-right-10 lg:-right-12 -translate-y-1/2 z-20"
              >
                <img src="/images/frame8.svg" alt="" className="w-[32px] sm:w-[55px] lg:w-[75px] drop-shadow-lg" />
              </motion.div>

              {/* Floating badge — top left */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-3 -left-6 sm:top-8 sm:-left-9 lg:-left-10 z-20"
              >
                <img src="/images/voice.svg" alt="" className="w-[40px] sm:w-[68px] lg:w-[95px] drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40H1440V14C1200 40 900 0 720 14C540 28 240 0 0 14V40Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
