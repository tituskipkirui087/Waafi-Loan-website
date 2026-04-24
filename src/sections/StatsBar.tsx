import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Users, Globe, DollarSign, TrendingUp } from "lucide-react";

function CountUp({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = Date.now();
          const tick = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [end]);

  const formatted =
    value >= 1_000_000
      ? (value / 1_000_000).toFixed(1) + "M"
      : value >= 1_000
      ? (value / 1_000).toFixed(0) + "K"
      : value;

  return (
    <span ref={elRef}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

const stats = [
  {
    Icon: Users,
    iconColor: "text-waafi-purple",
    iconBg: "bg-waafi-soft-purple",
    numColor: "text-waafi-purple",
    label: "Active Customers",
    end: 2500000,
    suffix: "+",
    prefix: "",
    accentBar: "bg-waafi-purple",
  },
  {
    Icon: Globe,
    iconColor: "text-waafi-teal",
    iconBg: "bg-waafi-soft-teal",
    numColor: "text-waafi-teal",
    label: "Countries Served",
    end: 54,
    suffix: "+",
    prefix: "",
    accentBar: "bg-waafi-teal",
  },
  {
    Icon: DollarSign,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    numColor: "text-amber-600",
    label: "Total Disbursed",
    end: 500000000,
    suffix: "+",
    prefix: "$",
    accentBar: "bg-amber-500",
  },
  {
    Icon: TrendingUp,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    numColor: "text-blue-600",
    label: "Approval Rate",
    end: 95,
    suffix: "%",
    prefix: "",
    accentBar: "bg-blue-500",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-slate-100 py-7">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative bg-slate-50 rounded-2xl border border-slate-100 p-4 overflow-hidden group hover:border-slate-200 transition-colors"
            >
              <div className={`absolute top-0 left-0 w-full h-[3px] ${stat.accentBar} rounded-t-2xl`} />
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 ${stat.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <stat.Icon size={16} className={stat.iconColor} />
                </div>
                <div>
                  <p className={`text-xl font-extrabold ${stat.numColor} leading-none mb-0.5`}>
                    <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-slate-500 text-[11px] leading-tight">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
