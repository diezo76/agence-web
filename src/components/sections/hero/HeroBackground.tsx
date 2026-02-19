"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient: purple-900 → blue-900 → black */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-black" />

      {/* Radial gradient animé qui se déplace */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(88, 28, 135, 0.8) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 50% at 100% 50%, rgba(30, 58, 138, 0.8) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 50% at 100% 100%, rgba(88, 28, 135, 0.6) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 50% at 0% 100%, rgba(30, 58, 138, 0.8) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(88, 28, 135, 0.8) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
