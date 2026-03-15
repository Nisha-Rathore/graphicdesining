const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-black tracking-tighter text-foreground">
          Innovate<span className="text-gradient-accent">Grow</span>
        </p>
        <p className="font-body text-sm text-muted-foreground">
          © 2026 Innovate Grow Designs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
