import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(var(--neon-purple)/0.1)] blur-[200px] animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-cyan)/0.06)] blur-[180px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-pink)/0.05)] blur-[150px] animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
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
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-8 h-8 text-neon-purple" />
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
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-purple via-primary to-neon-cyan px-10 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:scale-105 neon-glow-purple flex items-center gap-3"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-rotate" />
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
              <span key={badge} className="font-body text-xs text-muted-foreground/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60" />
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
