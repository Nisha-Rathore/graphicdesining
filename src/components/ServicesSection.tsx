import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, PenTool, Monitor, Share2, Package, Film, Layers, Camera, Code, Megaphone, type LucideIcon, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Service = Tables<"services">;

const iconMap: Record<string, LucideIcon> = {
  Palette, PenTool, Monitor, Share2, Package, Film, Layers, Camera, Code, Megaphone,
};

const neonColors = [
  { border: "hover:border-neon-purple/30", glow: "group-hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.15)]", icon: "group-hover:text-neon-purple", bg: "group-hover:bg-[hsl(var(--neon-purple)/0.1)]" },
  { border: "hover:border-neon-cyan/30", glow: "group-hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.15)]", icon: "group-hover:text-neon-cyan", bg: "group-hover:bg-[hsl(var(--neon-cyan)/0.1)]" },
  { border: "hover:border-neon-pink/30", glow: "group-hover:shadow-[0_0_30px_hsl(var(--neon-pink)/0.15)]", icon: "group-hover:text-neon-pink", bg: "group-hover:bg-[hsl(var(--neon-pink)/0.1)]" },
];

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      setServices(data ?? []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[700px] h-[700px] -translate-x-1/2 rounded-full bg-[hsl(var(--neon-purple)/0.06)] blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-cyan)/0.04)] blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-cyan mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Services Built for{" "}
            <span className="text-gradient-accent">Growth</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to execution, we deliver design solutions that transform brands and drive measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl glass p-8 space-y-4">
                  <Skeleton className="w-14 h-14 rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            : services.map((service, i) => {
                const Icon = iconMap[service.icon ?? ""] ?? Palette;
                const number = String(i + 1).padStart(2, "0");
                const colorSet = neonColors[i % neonColors.length];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
                    className={`group tilt-hover relative overflow-hidden rounded-2xl card-gradient-border backdrop-blur-xl cursor-pointer ${colorSet.border} ${colorSet.glow} transition-all duration-500`}
                  >
                    {/* Inner glow on hover */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon-purple/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                    
                    <div className="relative z-10 p-8">
                      <span className="absolute top-4 right-6 font-display text-7xl font-black text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors duration-500">
                        {number}
                      </span>
                      
                      <div className={`w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 ${colorSet.bg} transition-all duration-400`}>
                        <Icon className={`w-6 h-6 text-muted-foreground ${colorSet.icon} transition-colors duration-400`} strokeWidth={1.5} />
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-gradient-accent transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                      
                      {service.price && (
                        <p className="text-sm font-semibold text-neon-cyan mb-4">{service.price}</p>
                      )}
                      
                      <div className="flex items-center gap-2 font-body text-xs text-muted-foreground group-hover:text-neon-purple transition-colors duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {!loading && services.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No services available yet.</p>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
