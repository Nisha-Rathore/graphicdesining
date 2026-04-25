import { motion } from "framer-motion";
import branding from "@/assets/showcase-branding.jpg";
import packaging from "@/assets/showcase-packaging.jpg";
import social from "@/assets/showcase-social.jpg";
import web from "@/assets/showcase-web.jpg";
import poster from "@/assets/showcase-poster.jpg";
import motion3d from "@/assets/showcase-motion.jpg";

const items = [
  { src: branding, label: "Brand Identity", category: "Branding", span: "md:col-span-2 md:row-span-2", accent: "neon-purple" },
  { src: social, label: "Social Media Kit", category: "Social", span: "", accent: "neon-cyan" },
  { src: poster, label: "Poster Series", category: "Print", span: "", accent: "neon-pink" },
  { src: web, label: "Web Experience", category: "Digital", span: "md:col-span-2", accent: "neon-cyan" },
  { src: packaging, label: "Product Packaging", category: "Packaging", span: "", accent: "neon-pink" },
  { src: motion3d, label: "Motion Graphics", category: "Motion", span: "", accent: "neon-purple" },
];

const ShowcaseGallery = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-purple)/0.06)] blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-pink)/0.05)] blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-cyan mb-4">Visual Showcase</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Crafted with <span className="text-gradient-accent">Precision</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the worlds we've built — from brand systems to immersive digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl card-gradient-border cursor-pointer ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 100%, hsl(var(--${item.accent}) / 0.25), transparent 70%)` }}
              />

              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <span className={`inline-block self-start glass rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-wider text-${item.accent} mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500`}>
                  {item.category}
                </span>
                <h3 className="font-display text-base md:text-xl font-bold text-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {item.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseGallery;
