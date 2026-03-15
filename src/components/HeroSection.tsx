import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const luxurySpring = { type: "spring" as const, stiffness: 260, damping: 20, mass: 1 };

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-gold/5 blur-[80px] animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...luxurySpring, delay: 0.2 }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
            World-Class Creative Studio
          </p>
          <h1 className="text-gradient-hero font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Designs That Turn Your Business Into a Brand
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We create powerful visuals, branding, and digital experiences that help businesses stand out, attract customers, and grow faster.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...luxurySpring, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-2xl bg-primary px-8 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            <span className="relative z-10">Get Free Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-gradient-rotate" />
          </a>
          <a
            href="#portfolio"
            className="glass glow-border rounded-2xl px-8 py-4 font-display font-bold text-foreground glass-hover"
          >
            Explore Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...luxurySpring, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "150+", label: "Happy Clients" },
            { value: "12+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-black text-foreground tabular-nums">{stat.value}</p>
              <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
