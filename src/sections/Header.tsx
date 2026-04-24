import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Apply Loan", href: "#calculator" },
  { label: "Community", href: "#community" },
  { label: "Crypto Loans", href: "#crypto" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#help" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img alt="WAAFI LOGO" loading="lazy" width="137" height="76" src="/images/logo.svg" className="h-12" />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-slate-700 hover:text-green-600 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="#calculator" className="inline-flex items-center justify-center rounded-full border border-black bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-green-50 transition-colors">
            Apply Loan
          </a>
        </div>

        <button className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-green-600 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
