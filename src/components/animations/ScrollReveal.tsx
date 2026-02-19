"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp } from "@/lib/animations/variants";
import { defaultTransition } from "@/lib/animations/transitions";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  /** Pourcentage de visibilité pour déclencher (0.3 = 30% visible) */
  threshold?: number;
  /** Animation ne joue qu'une fois (défaut: true) */
  triggerOnce?: boolean;
}

export function ScrollReveal({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px", amount: threshold }}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
