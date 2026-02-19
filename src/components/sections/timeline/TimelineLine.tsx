"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TimelineLineProps {
  children: React.ReactNode;
}

export function TimelineLine({ children }: TimelineLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Ligne verticale gradient - fond */}
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-white/10" />

      {/* Ligne qui se dessine au scroll (scaleY) */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-1/2 top-0 h-full w-1 origin-top -translate-x-1/2 rounded-full"
      >
        <div className="h-full w-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />
      </motion.div>

      {children}
    </div>
  );
}
