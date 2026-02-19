"use client";

import { motion } from "framer-motion";

const LINE_1 = ["Votre"] as const;
const LINE_2 = ["Agence", "Web", "Créative"] as const;

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroTitle() {
  return (
    <h1 className="mb-6 text-7xl font-black leading-tight md:text-8xl lg:text-9xl">
      {/* Ligne 1 : Votre */}
      <span className="block">
        {LINE_1.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            className="inline-block text-white"
          >
            {word}{" "}
          </motion.span>
        ))}
      </span>
      {/* Ligne 2 : Agence Web Créative (gradient) */}
      <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        {LINE_2.map((word, i) => (
          <motion.span
            key={word}
            custom={i + LINE_1.length}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            className="inline-block"
          >
            {word}{" "}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
