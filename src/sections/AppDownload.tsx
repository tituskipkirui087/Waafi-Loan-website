import { motion } from "framer-motion";

export default function AppDownload() {
  return (
    <section className="py-12 gradient-purple-teal animate-gradient-shift relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <img src="/images/exp-wallpaper.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full mb-4">
              Mobile App
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Manage Your Loan<br className="hidden sm:block" /> Anywhere, Anytime
            </h2>
            <p className="text-sm text-white/75 mb-6 max-w-[420px] mx-auto lg:mx-0 leading-relaxed">
              Apply for loans, track repayments, pay bills, and send money — all from the WAAFI mobile app.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#" className="cursor-pointer">
                <img src="/images/download-ios.svg" alt="Download on the App Store" className="h-11 mx-auto sm:mx-0" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#" className="cursor-pointer">
                <img src="/images/download-android.svg" alt="Get it on Google Play" className="h-11 mx-auto sm:mx-0" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-[32px] blur-2xl scale-90" />
              <img
                src="/images/frame7.webp"
                alt="WAAFI App on mobile"
                className="relative w-[200px] sm:w-[220px] rounded-[28px] shadow-2xl"
              />
              <div className="absolute -top-5 -right-6 z-10">
                <img src="/images/frame9.svg" alt="" className="w-[110px]" />
              </div>
              <div className="absolute -bottom-4 -left-6 z-10">
                <img src="/images/frame10.svg" alt="" className="w-[100px]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
