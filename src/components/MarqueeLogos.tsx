import { motion } from "framer-motion";

const brands = [
  "LUXE", "FINVAULT", "AETHER", "NORDIC", "PRISMA",
  "ORBITAL", "VANTA", "HELIOS", "ARCANE", "MERIDIAN",
];

const MarqueeLogos = () => {
  return (
    <section aria-label="Trusted by" className="relative py-16 overflow-hidden border-y border-foreground/5 bg-[hsl(var(--surface-glass)/0.2)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-muted-foreground/60 mb-8">
        Trusted by forward-thinking brands
      </p>

      <div className="flex overflow-hidden">
        <motion.div
          className="flex shrink-0 gap-16 pr-16"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-3xl md:text-4xl font-black tracking-tighter text-muted-foreground/30 hover:text-gradient-accent transition-all duration-500 whitespace-nowrap cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0 gap-16 pr-16"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          aria-hidden
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`b-${brand}-${i}`}
              className="font-display text-3xl md:text-4xl font-black tracking-tighter text-muted-foreground/30 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeLogos;
