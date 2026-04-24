import { motion } from "framer-motion";

const features = [
  { image: "/images/bank.svg", title: "Secure Banking", description: "Bank-level 256-bit encryption and multi-factor authentication on every transaction." },
  { image: "/images/card.svg", title: "Instant Virtual Card", description: "Get a virtual debit card the moment your loan is approved. Shop online immediately." },
  { image: "/images/payments.svg", title: "Seamless Payments", description: "Send and receive money instantly across borders with near-zero fees." },
  { image: "/images/nfc.svg", title: "NFC Tap-to-Pay", description: "Pay with a tap at millions of merchants worldwide using NFC-enabled devices." },
  { image: "/images/merchant.svg", title: "Merchant Network", description: "Exclusive discounts and cashback at thousands of partner merchants." },
  { image: "/images/goals.svg", title: "Financial Goals", description: "Set savings targets, track progress, and build wealth alongside your loan." },
  { image: "/images/billPayments.svg", title: "Bill Payments", description: "Pay utilities, subscriptions, and services directly through WAAFI in seconds." },
  { image: "/images/mobileCommunication.svg", title: "Mobile Top-Up", description: "Top up airtime and data for any mobile network, anytime, from one app." },
  { image: "/images/onlineShopping.svg", title: "Online Shopping", description: "Shop at top e-commerce platforms and pay with your WAAFI balance." },
];

export default function WhyWaafi() {
  return (
    <section id="about" className="py-14 bg-ghost-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-waafi-soft-purple text-waafi-purple px-3 py-1 rounded-full mb-3">
            Why WAAFI
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Everything You Need, One App
          </h2>
          <p className="text-sm text-slate-500 max-w-[460px] mx-auto">
            WAAFI combines loans, payments, and financial tools so you have total control of your money.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:card-shadow transition-all duration-300"
            >
              <div className="w-10 h-10 bg-ghost-white rounded-xl flex items-center justify-center shrink-0">
                <img src={f.image} alt={f.title} className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-0.5">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
