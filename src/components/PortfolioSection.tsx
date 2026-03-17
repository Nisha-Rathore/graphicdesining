import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    "from-secondary/30 to-blue-500/20",
    "from-amber-500/20 to-primary/20",
    "from-purple-500/20 to-secondary/20",
    "from-secondary/20 to-amber-500/20",
    "from-primary/20 to-blue-500/20",
  ];

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

        {/* Loading */}
        {loading && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl break-inside-avoid" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects yet. Add some from the admin panel!</p>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative break-inside-avoid"
                >
                  <div
                    className={`${idx % 2 === 0 ? "aspect-square" : "aspect-[4/5]"} rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${gradients[idx % gradients.length]} relative cursor-pointer`}
                  >
                    {/* Project image */}
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-6">
                      <div>
                        <span className="font-body text-xs uppercase tracking-wider text-primary">{project.category}</span>
                        <h3 className="font-display text-xl font-bold text-foreground mt-1">{project.title}</h3>
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
                        <div className="w-20 h-20 rounded-full border border-white/10 group-hover:scale-150 transition-transform duration-700" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
