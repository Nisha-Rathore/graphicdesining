import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Project = Tables<"portfolio_projects">;

const PortfolioSection = () => {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-pink)/0.05)] blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-cyan)/0.04)] blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-pink mb-4">Selected Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Our <span className="text-gradient-accent">Portfolio</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our latest projects — logos, branding, social media, packaging, and more.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-6 py-2.5 text-sm font-body transition-all duration-300 ${
                active === cat
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-primary-foreground neon-glow-purple"
                  : "glass text-muted-foreground hover:text-foreground hover:border-neon-purple/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center mb-6">
              <ExternalLink className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-body">No projects yet. Add some from the admin panel!</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative break-inside-avoid"
                >
                  <div
                    className={`${idx % 3 === 0 ? "aspect-square" : idx % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} rounded-2xl overflow-hidden card-gradient-border relative cursor-pointer transition-all duration-500 group-hover:shadow-[0_0_40px_hsl(var(--neon-purple)/0.15)]`}
                  >
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}

                    {/* Gradient placeholder when no image */}
                    {!project.image_url && (
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-background to-neon-cyan/10 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-foreground/5 group-hover:scale-150 group-hover:border-neon-purple/20 transition-all duration-700" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block glass rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider text-neon-cyan mb-3">{project.category}</span>
                        <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
                        {project.description && (
                          <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                        )}
                      </div>
                    </div>

                    {project.is_featured && (
                      <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider text-neon-pink">
                        Featured
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 glass glow-border rounded-2xl px-8 py-4 font-display font-bold text-foreground glass-hover"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
