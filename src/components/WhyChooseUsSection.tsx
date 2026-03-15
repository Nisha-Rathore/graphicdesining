import { motion } from "framer-motion";
import { Sparkles, Zap, DollarSign, RefreshCw, Headphones } from "lucide-react";

const reasons = [
  { icon: Sparkles, title: "Unique & Custom Designs", desc: "Every project is a one-of-a-kind creation tailored to your brand's DNA." },
  { icon: Zap, title: "Fast Delivery", desc: "We respect deadlines. Most projects delivered within 48-72 hours." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality at competitive rates. No hidden costs, no surprises." },
  { icon: RefreshCw, title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied. Your vision, perfected." },
  { icon: Headphones, title: "Dedicated Support", desc: "A personal creative director assigned to every project, available 24/7." },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Why Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Why Premium Clients Choose Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className={`flex gap-4 ${i === reasons.length - 1 ? "md:col-span-2 lg:col-span-1 md:justify-center lg:justify-start" : ""}`}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <reason.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{reason.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
