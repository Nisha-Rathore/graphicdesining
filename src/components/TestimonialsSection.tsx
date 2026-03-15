import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Outstanding quality and very professional team. Our brand looks completely transformed. The attention to detail is unmatched.",
    name: "Sarah Chen",
    title: "CEO, Luxe Fashion",
    rating: 5,
  },
  {
    quote: "Highly recommended for anyone who wants premium designs at reasonable prices. They exceeded every expectation we had.",
    name: "Marcus Rivera",
    title: "Marketing Director, FinVault",
    rating: 5,
  },
  {
    quote: "The creative team delivered a brand identity that perfectly captures our vision. They truly understand luxury design.",
    name: "Elena Vostrova",
    title: "Founder, Aether Skincare",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Client Voices
          </h2>
        </motion.div>

        <div className="relative glass rounded-2xl rim-light p-10 md:p-16 glow-accent">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-8">
                "{testimonials[current].quote}"
              </blockquote>
              <div>
                <p className="font-display text-lg font-bold text-foreground">{testimonials[current].name}</p>
                <p className="font-body text-sm text-muted-foreground">{testimonials[current].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prev} className="glass rounded-xl p-3 hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="glass rounded-xl p-3 hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
