import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Plus, ChevronRight, Clock } from "lucide-react";

type TxType = "all" | "loans" | "repayments" | "deposits";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  positive: boolean;
  type: TxType;
  status?: string;
  icon: typeof ArrowDownLeft;
  bgColor: string;
  iconColor: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Personal Loan Disbursed",
    date: "Mar 15, 2025",
    amount: "+$5,000.00",
    positive: true,
    type: "loans",
    icon: ArrowDownLeft,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 2,
    name: "Monthly Repayment",
    date: "Apr 15, 2025",
    amount: "-$434.72",
    positive: false,
    type: "repayments",
    icon: ArrowUpRight,
    bgColor: "bg-purple-50",
    iconColor: "text-waafi-purple",
  },
  {
    id: 3,
    name: "Business Loan Disbursed",
    date: "Feb 20, 2025",
    amount: "+$12,000.00",
    positive: true,
    type: "loans",
    icon: ArrowDownLeft,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    name: "Crypto Collateral Deposit",
    date: "Jan 10, 2025",
    amount: "+$25,000.00",
    positive: true,
    type: "deposits",
    status: "Pending",
    icon: Plus,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 5,
    name: "Community Circle Payout",
    date: "Mar 1, 2025",
    amount: "+$2,000.00",
    positive: true,
    type: "loans",
    icon: ArrowDownLeft,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

const filters: { label: string; value: TxType }[] = [
  { label: "All", value: "all" },
  { label: "Loans", value: "loans" },
  { label: "Repayments", value: "repayments" },
  { label: "Deposits", value: "deposits" },
];

export default function TransactionHistory() {
  const [activeFilter, setActiveFilter] = useState<TxType>("all");

  const filtered =
    activeFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === activeFilter);

  return (
    <section className="bg-ghost-white py-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[20px] card-shadow p-6 sm:p-8">
          {/* Header + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                    activeFilter === f.value
                      ? "bg-waafi-soft-purple text-waafi-purple"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-slate-50"
            >
              {filtered.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full ${tx.bgColor} flex items-center justify-center shrink-0`}
                  >
                    <tx.icon size={18} className={tx.iconColor} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">{tx.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{tx.date}</span>
                      {tx.status && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                          <Clock size={10} />
                          {tx.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount */}
                  <span
                    className={`text-sm font-semibold shrink-0 ${
                      tx.positive ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-waafi-purple hover:text-[#15803d] transition-colors">
              View All Transactions
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
