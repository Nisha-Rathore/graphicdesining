import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Branding", "UI/UX", "Print", "Social Media"];

const projects = [
  { title: "Luxe Fashion Rebrand", category: "Branding", color: "from-primary/30 to-secondary/30", aspect: "aspect-square" },
  { title: "FinTech Dashboard", category: "UI/UX", color: "from-secondary/30 to-glow-blue/30", aspect: "aspect-[4/5]" },
  { title: "Organic Skincare Packaging", category: "Print", color: "from-gold/20 to-primary/20", aspect: "aspect-square" },
  { title: "Startup Social Campaign", category: "Social Media", color: "from-glow-purple/20 to-secondary/20", aspect: "aspect-[4/5]" },
  { title: "Architecture Firm Identity", category: "Branding", color: "from-secondary/20 to-gold/20", aspect: "aspect-[4/5]" },
  { title: "E-Commerce Redesign", category: "UI/UX", color: "from-primary/20 to-glow-blue/20", aspect: "aspect-square" },
];

const PortfolioSection = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Selected Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Portfolio
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-xl px-5 py-2 text-sm font-body transition-all duration-300 ${
                active === cat
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="group relative break-inside-avoid"
              >
                <div
                  className={`${project.aspect} rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${project.color} relative cursor-pointer`}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-6">
                    <div>
                      <span className="font-body text-xs uppercase tracking-wider text-primary">{project.category}</span>
                      <h3 className="font-display text-xl font-bold text-foreground mt-1">{project.title}</h3>
                      <p className="font-body text-sm text-muted-foreground mt-2">Explore the Strategy →</p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
