import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useUI } from "../context/UIContext";

const navLinks = [
  { label: "Home", href: "/#dashboard" },
  { label: "Loan Products", href: "/#products" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Community", href: "/#community" },
  { label: "About Us", href: "/#about" },
  { label: "FAQ", href: "/#help" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openEligibility } = useUI();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="WAAFI Logo"
            loading="lazy"
            width="137"
            height="76"
            src="/images/logo.svg"
            className="h-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-waafi-purple transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-waafi-purple transition-colors px-3 py-2"
          >
            Login
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openEligibility}
            className="h-10 px-5 bg-waafi-purple hover:bg-[#15803d] text-white text-sm font-semibold rounded-xl btn-shadow transition-colors cursor-pointer"
          >
            Apply for a Loan
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-waafi-purple py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-center py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => { setMobileOpen(false); openEligibility(); }}
                className="text-sm font-semibold py-2.5 px-3 rounded-xl bg-waafi-purple text-white hover:bg-[#15803d] transition-colors cursor-pointer"
              >
                Apply for a Loan
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
