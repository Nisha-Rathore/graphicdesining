import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Outstanding quality and very professional team. Our brand looks completely transformed. The attention to detail is unmatched.",
    name: "Sarah Chen",
    title: "CEO, Luxe Fashion",
    rating: 5,
    avatar: "SC",
  },
  {
    quote: "Highly recommended for anyone who wants premium designs at reasonable prices. They exceeded every expectation we had.",
    name: "Marcus Rivera",
    title: "Marketing Director, FinVault",
    rating: 5,
    avatar: "MR",
  },
  {
    quote: "The creative team delivered a brand identity that perfectly captures our vision. They truly understand luxury design.",
    name: "Elena Vostrova",
    title: "Founder, Aether Skincare",
    rating: 5,
    avatar: "EV",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--neon-pink)/0.05)] blur-[180px] animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(var(--neon-purple)/0.04)] blur-[120px] animate-blob" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-neon-cyan mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Client <span className="text-gradient-accent">Voices</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it — hear what our clients have to say.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl rim-light p-10 md:p-16 glow-accent"
        >
          {/* Quote icon with glow */}
          <div className="absolute top-6 left-8 md:top-8 md:left-12">
            <Quote className="w-10 h-10 text-neon-purple/20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className="flex justify-center gap-1.5 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neon-cyan text-neon-cyan" />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-10">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center neon-glow-purple">
                  <span className="font-display text-sm font-bold text-primary-foreground">
                    {testimonials[current].avatar}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">{testimonials[current].name}</p>
                  <p className="font-body text-sm text-muted-foreground">{testimonials[current].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button onClick={prev} className="glass rounded-full p-3 hover:border-neon-purple/30 hover:shadow-[0_0_15px_hsl(var(--neon-purple)/0.2)] transition-all duration-300 group">
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-neon-purple transition-colors" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "bg-gradient-to-r from-neon-purple to-neon-cyan w-8 shadow-[0_0_10px_hsl(var(--neon-purple)/0.4)]" : "bg-foreground/10 w-2 hover:bg-foreground/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="glass rounded-full p-3 hover:border-neon-purple/30 hover:shadow-[0_0_15px_hsl(var(--neon-purple)/0.2)] transition-all duration-300 group">
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-neon-purple transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
