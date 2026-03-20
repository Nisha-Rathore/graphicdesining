import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, DollarSign, RefreshCw, Headphones, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const reasons = [
  { icon: Sparkles, title: "Unique & Custom Designs", desc: "Every project is a one-of-a-kind creation tailored to your brand's DNA.", color: "primary" },
  { icon: Zap, title: "Fast Delivery", desc: "We respect deadlines. Most projects delivered within 48-72 hours.", color: "gold" },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality at competitive rates. No hidden costs, no surprises.", color: "secondary" },
  { icon: RefreshCw, title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied. Your vision, perfected.", color: "glow-purple" },
  { icon: Headphones, title: "Dedicated Support", desc: "A personal creative director assigned to every project, available 24/7.", color: "glow-blue" },
  { icon: Award, title: "Award-Winning Team", desc: "Our designers have won multiple industry awards for creative excellence.", color: "primary" },
];

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Why Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Why Premium Clients Choose Us
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just design — we craft experiences that elevate your brand above the competition.
          </p>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: 500, suffix: "+", label: "Projects Completed" },
            { value: 150, suffix: "+", label: "Happy Clients" },
            { value: 98, suffix: "%", label: "Client Satisfaction" },
            { value: 12, suffix: "+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl rim-light p-6 text-center group hover:bg-white/10 transition-all duration-300">
              <p className="font-display text-3xl md:text-4xl font-black text-foreground tabular-nums">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body text-xs text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4 }}
              className="group glass rounded-2xl rim-light p-6 hover:bg-white/10 transition-all duration-400"
            >
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-400">
                  <reason.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
