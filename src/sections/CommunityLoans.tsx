import { motion } from "framer-motion";
import { Users, CircleDollarSign, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Join a Savings Circle",
    description: "Pool resources with trusted community members. Everyone contributes, everyone benefits.",
    cta: "Find Circles",
    ctaColor: "text-waafi-purple",
    bgColor: "bg-waafi-soft-purple",
    iconColor: "text-waafi-purple",
  },
  {
    icon: CircleDollarSign,
    title: "Start a New Circle",
    description: "Set your contribution amount, invite members, and manage payouts digitally.",
    cta: "Create Circle",
    ctaColor: "text-waafi-teal",
    bgColor: "bg-waafi-soft-teal",
    iconColor: "text-waafi-teal",
  },
  {
    icon: BarChart3,
    title: "Transparent Tracking",
    description: "Real-time visibility into contributions, payouts, and member status. No surprises.",
    cta: "Learn More",
    ctaColor: "text-blue-600",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function CommunityLoans() {
  return (
    <section
      id="community"
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-teal-50"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Community Loans</h2>
          <p className="text-lg text-slate-500 max-w-[600px] mx-auto">
            Hagbad — Rotating savings, reimagined for the digital age
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[20px] card-shadow hover:card-shadow-hover p-6 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-5`}
              >
                <feature.icon size={28} className={feature.iconColor} />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-500 mb-5 leading-relaxed">{feature.description}</p>
              <button
                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${feature.ctaColor} hover:gap-2.5 transition-all`}
              >
                {feature.cta}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
