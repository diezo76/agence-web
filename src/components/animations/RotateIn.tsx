"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { rotateIn } from "@/lib/animations/variants";
import { springTransition } from "@/lib/animations/transitions";

interface RotateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animation ne joue qu'une fois (défaut: true) */
  triggerOnce?: boolean;
  /** Pourcentage de visibilité pour déclencher (0.3 = 30% visible) */
  threshold?: number;
}

export function RotateIn({
  children,
  className,
  delay = 0,
  triggerOnce = true,
  threshold = 0.1,
}: RotateInProps) {
  return (
    <motion.div
      variants={rotateIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: "-50px", amount: threshold }}
      transition={{ ...springTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
