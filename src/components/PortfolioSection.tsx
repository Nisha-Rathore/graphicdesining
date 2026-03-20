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

  const gradients = [
    "from-primary/30 to-secondary/30",
    "from-secondary/30 to-glow-blue/20",
    "from-gold/20 to-primary/20",
    "from-glow-purple/20 to-secondary/20",
    "from-secondary/20 to-gold/20",
    "from-primary/20 to-glow-blue/20",
  ];

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Selected Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Our Portfolio
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
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center mb-6">
              <ExternalLink className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-body">No projects yet. Add some from the admin panel!</p>
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && filtered.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative break-inside-avoid"
                >
                  <div
                    className={`${idx % 3 === 0 ? "aspect-square" : idx % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${gradients[idx % gradients.length]} relative cursor-pointer group-hover:border-primary/20 transition-all duration-500`}
                  >
                    {/* Project image */}
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}

                    {/* Hover overlay with glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block glass rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider text-primary mb-3">{project.category}</span>
                        <h3 className="font-display text-xl font-bold text-foreground">{project.title}</h3>
                        {project.description && (
                          <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                        )}
                        {project.client_name && (
                          <p className="font-body text-xs text-primary/80 mt-2">Client: {project.client_name}</p>
                        )}
                      </div>
                    </div>

                    {/* Decorative elements (shown when no image) */}
                    {!project.image_url && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-white/10 group-hover:scale-150 group-hover:border-primary/20 transition-all duration-700" />
                        <div className="absolute w-12 h-12 rounded-full border border-white/5 group-hover:scale-[3] transition-all duration-1000" />
                      </div>
                    )}

                    {/* Featured badge */}
                    {project.is_featured && (
                      <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider text-gold">
                        Featured
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View all button */}
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
