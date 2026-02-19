"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { MagneticButton } from "@/components/shared";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroScrollIndicator } from "@/components/sections/hero/HeroScrollIndicator";
import { HeroTitle } from "@/components/sections/hero/HeroTitle";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      {/* Contenu avec parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl px-6 text-center"
      >
        <HeroTitle />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-lg text-gray-300 md:text-xl lg:text-2xl"
        >
          Nous créons des expériences digitales immersives qui transforment
          votre vision en réalité.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-6"
        >
          <MagneticButton>
            <Link
              href="/projets"
              className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
            >
              Voir nos projets
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-block rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white hover:text-black"
            >
              Nous contacter
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <HeroScrollIndicator />
    </section>
  );
}
