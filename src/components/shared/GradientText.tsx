"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  animate = false,
}: GradientTextProps) {
  const baseClass =
    "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent";

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(baseClass, className)}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={cn(baseClass, className)}>{children}</span>;
}
