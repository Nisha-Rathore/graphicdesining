import { motion } from "framer-motion";
import { Palette, PenTool, Figma, Monitor, Layers, Aperture } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const luxurySpring = { type: "spring" as const, stiffness: 260, damping: 20, mass: 1 };

const floatingTools = [
  { icon: Palette, x: "10%", y: "20%", delay: 0, size: 28, duration: 7 },
  { icon: PenTool, x: "85%", y: "15%", delay: 1, size: 24, duration: 8 },
  { icon: Monitor, x: "75%", y: "70%", delay: 0.5, size: 26, duration: 6 },
  { icon: Layers, x: "15%", y: "75%", delay: 1.5, size: 22, duration: 9 },
  { icon: Aperture, x: "90%", y: "45%", delay: 2, size: 20, duration: 7.5 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Floating orbs - enhanced */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-gold/5 blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-glow-purple/10 blur-[80px] animate-float" />

      {/* Floating tool icons */}
      {floatingTools.map((tool, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex w-14 h-14 rounded-2xl glass items-center justify-center"
          style={{ left: tool.x, top: tool.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [0, -15, 0, 15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: tool.duration,
            repeat: Infinity,
            delay: tool.delay,
            ease: "easeInOut",
          }}
        >
          <tool.icon className="text-primary/60" style={{ width: tool.size, height: tool.size }} strokeWidth={1.2} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...luxurySpring, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Award-Winning Creative Studio
            </span>
          </motion.div>

          <h1 className="text-gradient-hero font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
            We Design Brands
            <br />
            <span className="text-gradient-accent">That Stand Out</span>
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
            className="group relative overflow-hidden rounded-2xl bg-primary px-8 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-105"
          >
            <span className="relative z-10">Get a Free Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-400 animate-gradient-rotate" />
          </a>
          <a
            href="#portfolio"
            className="glass glow-border rounded-2xl px-8 py-4 font-display font-bold text-foreground glass-hover hover:scale-105 transition-all duration-300"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Tool strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...luxurySpring, delay: 0.7 }}
          className="mt-14 flex items-center justify-center gap-3 flex-wrap"
        >
          <span className="font-body text-xs text-muted-foreground/50 uppercase tracking-wider mr-2">Tools we use</span>
          {["Photoshop", "Illustrator", "Figma", "After Effects", "Premiere Pro"].map((tool) => (
            <span key={tool} className="glass rounded-lg px-3 py-1.5 font-body text-[11px] text-muted-foreground/60 border border-white/5">
              {tool}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...luxurySpring, delay: 0.9 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "150+", label: "Happy Clients" },
            { value: "12+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-display text-3xl md:text-4xl font-black text-foreground tabular-nums group-hover:text-gradient-accent transition-all duration-300">{stat.value}</p>
              <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
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
