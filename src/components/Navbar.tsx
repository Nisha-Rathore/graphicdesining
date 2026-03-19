import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "glass luxury-shadow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="font-display text-xl font-black tracking-tighter text-foreground">
          Innovate<span className="text-gradient-accent">Grow</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="glass glow-border rounded-xl px-5 py-2.5 text-sm font-display font-semibold text-foreground hover:bg-white/10 transition-all duration-300"
          >
            Start Your Project
          </a>
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Admin
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
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
            className="md:hidden glass border-t border-white/5"
          >
            <div className="container mx-auto flex flex-col gap-4 py-6 px-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="glass glow-border rounded-xl px-5 py-2.5 text-sm font-display font-semibold text-foreground text-center"
              >
                Start Your Project
              </a>
              <a
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-display font-semibold bg-primary text-primary-foreground"
              >
                <Shield className="w-4 h-4" />
                Admin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
