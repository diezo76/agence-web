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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <ParallaxSection speed={0.5} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black" />
        </ParallaxSection>

        {/* Content */}
        <div className="relative z-10 max-w-6xl px-6 text-center">
          <FadeIn direction="up" delay={0.2}>
            <GradientText animate>
              <h1 className="mb-6 text-7xl font-black text-white md:text-9xl">
                Votre Agence Web 3.0
              </h1>
            </GradientText>
          </FadeIn>

          <SlideIn direction="up" delay={0.4}>
            <p className="mb-12 text-xl text-gray-300 md:text-2xl">
              Créez des expériences digitales exceptionnelles
            </p>
          </SlideIn>

          <StaggerContainer staggerChildren={0.1} delayChildren={0.6}>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div variants={fadeInUp}>
                <MagneticButton>
                  <Link
                    href="/projets"
                    className="inline-block rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105"
                  >
                    Voir nos projets
                  </Link>
                </MagneticButton>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-block rounded-full border-2 border-white px-8 py-4 font-bold text-white transition-colors hover:bg-white hover:text-black"
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
