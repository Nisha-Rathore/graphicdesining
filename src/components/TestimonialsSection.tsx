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

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
            Client Voices
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Don't just take our word for it — hear what our clients have to say.
          </p>
        </motion.div>

        <div className="relative glass rounded-3xl rim-light p-10 md:p-16 glow-accent">
          {/* Quote icon */}
          <div className="absolute top-6 left-8 md:top-8 md:left-12">
            <Quote className="w-10 h-10 text-primary/20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-10">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
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
            <button onClick={prev} className="glass rounded-full p-3 hover:bg-white/10 transition-colors group">
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "bg-primary w-8" : "bg-white/20 w-2 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="glass rounded-full p-3 hover:bg-white/10 transition-colors group">
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
