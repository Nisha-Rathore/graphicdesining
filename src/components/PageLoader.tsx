import { motion, AnimatePresence } from "framer-motion";

const PageLoader = ({ visible }: { visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      >
        <div className="flex flex-col items-center gap-8">
          {/* Orbital loader */}
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              style={{ borderTopColor: "hsl(var(--primary))" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-secondary/20"
              style={{ borderBottomColor: "hsl(var(--secondary))" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
            {/* Center dot */}
            <motion.div
              className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Brand text */}
          <motion.p
            className="font-display text-sm uppercase tracking-[0.4em] text-muted-foreground"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading
          </motion.p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default PageLoader;
