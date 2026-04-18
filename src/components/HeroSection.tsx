import { motion, useScroll, useTransform } from "framer-motion";
import { Palette, PenTool, Figma, Monitor, Layers, Aperture } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const floatingShapes = [
  { x: "8%", y: "15%", size: 80, color: "neon-purple", delay: 0 },
  { x: "88%", y: "12%", size: 60, color: "neon-cyan", delay: 1.5 },
  { x: "78%", y: "72%", size: 50, color: "neon-pink", delay: 0.8 },
  { x: "12%", y: "78%", size: 70, color: "neon-cyan", delay: 2 },
  { x: "92%", y: "45%", size: 40, color: "neon-purple", delay: 1 },
  { x: "50%", y: "8%", size: 35, color: "neon-pink", delay: 2.5 },
];

const floatingTools = [
  { icon: Palette, x: "15%", y: "25%", delay: 0, size: 24 },
  { icon: PenTool, x: "82%", y: "18%", delay: 1, size: 22 },
  { icon: Monitor, x: "72%", y: "68%", delay: 0.5, size: 20 },
  { icon: Layers, x: "18%", y: "70%", delay: 1.5, size: 20 },
  { icon: Aperture, x: "88%", y: "50%", delay: 2, size: 18 },
];

const headlineWords = ["We", "Design", "Brands"];

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </motion.div>

      {/* Mesh gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(var(--neon-purple)/0.12)] blur-[180px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-cyan)/0.08)] blur-[150px] animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-pink)/0.06)] blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Floating geometric shapes with parallax */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block rounded-full opacity-20"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            border: `1px solid hsl(var(--${shape.color}) / 0.4)`,
            background: `radial-gradient(circle, hsl(var(--${shape.color}) / 0.1), transparent)`,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating tool icons */}
      {floatingTools.map((tool, i) => (
        <motion.div
          key={`tool-${i}`}
          className="absolute hidden lg:flex w-12 h-12 rounded-2xl glass items-center justify-center"
          style={{ left: tool.x, top: tool.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0.5, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [0, -15, 0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: tool.delay,
            ease: "easeInOut",
          }}
        >
          <tool.icon className="text-neon-purple/60" style={{ width: tool.size, height: tool.size }} strokeWidth={1.2} />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-glow-pulse" />
          <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Award-Winning Creative Studio
          </span>
        </motion.div>

        {/* Headline with word-by-word animation */}
        <div className="mb-2">
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.12,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-gradient-hero font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.56, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-shimmer font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              That Stand Out
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed mt-8"
        >
          We create powerful visuals, branding, and digital experiences that help businesses stand out, attract customers, and grow faster.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="conic-glow group relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-purple via-primary to-neon-cyan px-10 py-4 font-display font-bold text-primary-foreground transition-all duration-400 hover:scale-105 neon-glow-purple flex items-center gap-3"
          >
            <span className="relative z-10">Get a Free Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-rotate" />
          </a>
          <a
            href="#portfolio"
            className="glass glow-border rounded-2xl px-10 py-4 font-display font-bold text-foreground glass-hover hover:scale-105 transition-all duration-300"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Tool strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-14 flex items-center justify-center gap-3 flex-wrap"
        >
          <span className="font-body text-xs text-muted-foreground/40 uppercase tracking-wider mr-2">Tools we use</span>
          {["Photoshop", "Illustrator", "Figma", "After Effects", "Premiere Pro"].map((tool) => (
            <span key={tool} className="glass rounded-lg px-3 py-1.5 font-body text-[11px] text-muted-foreground/50 hover:text-muted-foreground hover:border-neon-purple/20 transition-all duration-300 cursor-default">
              {tool}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "150+", label: "Happy Clients" },
            { value: "12+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="font-display text-3xl md:text-4xl font-black text-gradient-neon tabular-nums">{stat.value}</p>
              <p className="font-body text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-neon-purple/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
