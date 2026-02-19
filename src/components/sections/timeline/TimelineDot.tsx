"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineDotProps {
  index: number;
}

export function TimelineDot({ index }: TimelineDotProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Particles autour du dot */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-4 rounded-full bg-purple-500/30 blur-md"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        className="absolute -inset-6 rounded-full bg-pink-500/20 blur-lg"
      />

      {/* Dot principal avec pulse */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          transition: { duration: 2, repeat: Infinity },
        }}
        className="relative h-4 w-4 rounded-full bg-white/90 ring-4 ring-black"
      />
    </motion.div>
  );
}
