"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  slideInDown,
  slideInLeft,
  slideInRight,
  slideInUp,
} from "@/lib/animations/variants";
import { defaultTransition } from "@/lib/animations/transitions";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  delay?: number;
  /** Animation ne joue qu'une fois (défaut: true) */
  triggerOnce?: boolean;
  /** Pourcentage de visibilité pour déclencher (0.3 = 30% visible) */
  threshold?: number;
}

export function SlideIn({
  children,
  direction = "left",
  className,
  delay = 0,
  triggerOnce = true,
  threshold = 0.1,
}: SlideInProps) {
  const variants =
    direction === "left"
      ? slideInLeft
      : direction === "right"
        ? slideInRight
        : direction === "up"
          ? slideInUp
          : slideInDown;
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
