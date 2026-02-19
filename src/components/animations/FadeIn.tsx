"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn, fadeInDown, fadeInUp } from "@/lib/animations/variants";
import { defaultTransition } from "@/lib/animations/transitions";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "none";
  className?: string;
  delay?: number;
  duration?: number;
  /** Animation ne joue qu'une fois (défaut: true) */
  triggerOnce?: boolean;
  /** Pourcentage de visibilité pour déclencher (0.3 = 30% visible) */
  threshold?: number;
}

export function FadeIn({
  children,
  direction = "none",
  className,
  delay = 0,
  duration = 0.5,
  triggerOnce = true,
  threshold = 0.1,
}: FadeInProps) {
  const variants =
    direction === "up" ? fadeInUp : direction === "down" ? fadeInDown : fadeIn;
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px", amount: threshold }}
      transition={{ ...defaultTransition, delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
