import { motion } from "framer-motion";
import { Palette, PenTool, Monitor, Share2, Package, Film } from "lucide-react";

const services = [
  { icon: Palette, title: "Logo & Brand Identity", desc: "Strategic visual systems that define market dominance and build lasting recognition.", number: "01" },
  { icon: PenTool, title: "Social Media Graphics", desc: "Scroll-stopping visuals engineered for engagement and brand consistency across platforms.", number: "02" },
  { icon: Monitor, title: "Website UI/UX Design", desc: "Intuitive digital experiences that convert visitors into loyal customers.", number: "03" },
  { icon: Package, title: "Packaging & Print", desc: "Tactile brand experiences that command shelf presence and premium perception.", number: "04" },
  { icon: Share2, title: "Marketing Creatives", desc: "Performance-driven ad creatives that capture attention and drive measurable results.", number: "05" },
  { icon: Film, title: "Motion Graphics", desc: "Cinematic motion design that brings your brand story to life with impact.", number: "06" },
];

const ServicesSection = () => {
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
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group relative overflow-hidden rounded-2xl glass rim-light p-8 glass-hover cursor-pointer"
            >
              {/* Glow on hover */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              {/* Big number */}
              <span className="absolute top-4 right-6 font-display text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-400">
                {service.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-400">
                  <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
