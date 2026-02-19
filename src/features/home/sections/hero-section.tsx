"use client";

import Link from "next/link";
import {
  FadeIn,
  ParallaxSection,
  SlideIn,
  StaggerContainer,
} from "@/components/animations";
import { GradientText } from "@/components/shared";
import { MagneticButton } from "@/components/shared";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations/variants";

export function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[100dvh] min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
        {/* Parallax Background - transparent pour laisser voir le gradient global */}
        <ParallaxSection speed={0.5} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent" />
        </ParallaxSection>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-2 text-center sm:px-4">
          <FadeIn direction="up" delay={0.2}>
            <GradientText animate>
              <h1 className="mb-4 text-4xl font-black leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                Votre Agence Web 3.0
              </h1>
            </GradientText>
          </FadeIn>

          <SlideIn direction="up" delay={0.4}>
            <p className="mb-8 text-base text-gray-300 sm:mb-10 sm:text-lg md:mb-12 md:text-xl lg:text-2xl">
              Créez des expériences digitales exceptionnelles
            </p>
          </SlideIn>

          <StaggerContainer staggerChildren={0.1} delayChildren={0.6}>
            <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <motion.div variants={fadeInUp}>
                <MagneticButton>
                  <Link
                    href="/projets"
                    className="inline-block w-full max-w-xs rounded-full bg-white px-6 py-3.5 text-center font-bold text-black transition-transform hover:scale-105 sm:w-auto sm:px-8 sm:py-4"
                  >
                    Voir nos projets
                  </Link>
                </MagneticButton>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-block w-full max-w-xs rounded-full border-2 border-white px-6 py-3.5 text-center font-bold text-white transition-colors hover:bg-white hover:text-black sm:w-auto sm:px-8 sm:py-4"
                  >
                    Nous contacter
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
