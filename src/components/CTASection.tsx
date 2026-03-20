import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[200px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="glass rounded-3xl rim-light p-12 md:p-20 text-center max-w-4xl mx-auto glow-accent"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-6">
            Let's Build Your
            <br />
            <span className="text-gradient-accent">Brand Today</span>
          </h2>

          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Ready to transform your vision into reality? Let's create something extraordinary together. Your brand deserves the best.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-2xl bg-primary px-10 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-105 flex items-center gap-3"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-gradient-rotate" />
            </a>
            <a
              href="#portfolio"
              className="glass glow-border rounded-2xl px-10 py-4 font-display font-bold text-foreground glass-hover hover:scale-105 transition-all duration-300"
            >
              Explore Our Work
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            {["500+ Projects", "98% Satisfaction", "24/7 Support"].map((badge) => (
              <span key={badge} className="font-body text-xs text-muted-foreground/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
