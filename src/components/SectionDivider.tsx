import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative h-px w-full overflow-hidden" aria-hidden>
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
    />
  </div>
);

export default SectionDivider;
