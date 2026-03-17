import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, PenTool, Monitor, Share2, Package, Film, Layers, Camera, Code, Megaphone, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Service = Tables<"services">;

const iconMap: Record<string, LucideIcon> = {
  Palette, PenTool, Monitor, Share2, Package, Film, Layers, Camera, Code, Megaphone,
};

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
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Services Built for Growth
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl glass p-8 space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            : services.map((service, i) => {
                const Icon = iconMap[service.icon ?? ""] ?? Palette;
                const number = String(i + 1).padStart(2, "0");
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    className="group relative overflow-hidden rounded-2xl glass rim-light p-8 glass-hover cursor-pointer"
                  >
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                    <span className="absolute top-4 right-6 font-display text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-400">
                      {number}
                    </span>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-400">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      {service.price && (
                        <p className="mt-4 text-sm font-semibold text-primary">{service.price}</p>
                      )}
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
