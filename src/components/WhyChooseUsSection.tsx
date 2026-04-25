import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, DollarSign, RefreshCw, Headphones, Award } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import workspace from "@/assets/studio-workspace.jpg";

const reasons = [
  { icon: Sparkles, title: "Unique & Custom Designs", desc: "Every project is a one-of-a-kind creation tailored to your brand's DNA.", neon: "neon-purple" },
  { icon: Zap, title: "Fast Delivery", desc: "We respect deadlines. Most projects delivered within 48-72 hours.", neon: "neon-cyan" },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality at competitive rates. No hidden costs, no surprises.", neon: "neon-pink" },
  { icon: RefreshCw, title: "Unlimited Revisions", desc: "We iterate until you're 100% satisfied. Your vision, perfected.", neon: "neon-purple" },
  { icon: Headphones, title: "Dedicated Support", desc: "A personal creative director assigned to every project, available 24/7.", neon: "neon-cyan" },
  { icon: Award, title: "Award-Winning Team", desc: "Our designers have won multiple industry awards for creative excellence.", neon: "neon-pink" },
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
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-cyan)/0.05)] blur-[180px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--neon-purple)/0.06)] blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-purple mb-4">Why Us</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Why Premium Clients{" "}
            <span className="text-gradient-accent">Choose Us</span>
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
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="glass rounded-2xl rim-light p-6 text-center group hover:border-neon-purple/20 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.1)]"
            >
              <p className="font-display text-3xl md:text-4xl font-black text-gradient-neon tabular-nums">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body text-xs text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
              {/* Progress bar */}
              <div className="mt-3 h-1 w-full rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value > 100 ? 100 : stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
              className={`group card-gradient-border backdrop-blur-xl rounded-2xl p-6 hover:border-${reason.neon}/30 hover:shadow-[0_0_25px_hsl(var(--${reason.neon})/0.1)] transition-all duration-500`}
            >
              <div className="flex gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-[hsl(var(--${reason.neon})/0.15)] transition-all duration-400`}>
                  <reason.icon className={`w-5 h-5 text-muted-foreground group-hover:text-${reason.neon} transition-colors duration-400`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-gradient-accent transition-all duration-300">
                    {reason.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Studio image strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden card-gradient-border group">
            <img
              src={workspace}
              alt="Our creative studio workspace"
              loading="lazy"
              className="w-full h-[280px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-xl">
                <p className="font-body text-xs uppercase tracking-[0.3em] text-neon-cyan mb-3">Inside the Studio</p>
                <h3 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
                  Where <span className="text-gradient-accent">ideas</span> come to life
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground">
                  Our team blends strategy, craft, and technology to deliver work that moves brands forward.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
