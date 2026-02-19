"use client";

import { motion } from "framer-motion";

export function HeroScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex h-10 w-6 flex-col items-center justify-start rounded-full border-2 border-white/60 pt-2"
      >
        <motion.div className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
