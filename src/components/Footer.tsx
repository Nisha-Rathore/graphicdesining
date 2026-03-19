import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-card/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="font-display text-2xl font-black tracking-tighter text-foreground">
              Innovate<span className="text-gradient-accent">Grow</span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Crafting bold digital experiences that elevate brands and drive real results.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-5">Services</h4>
            <ul className="space-y-3">
              {["Brand Identity", "Web Design", "Social Media", "UI/UX Design", "Print & Packaging"].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-muted-foreground">hello@innovategrow.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-muted-foreground">+1 (234) 567-890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-muted-foreground">Remote — Worldwide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Innovate Grow Designs. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
