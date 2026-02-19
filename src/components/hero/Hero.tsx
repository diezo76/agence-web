"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroCTA {
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
}

export interface HeroProps {
  readonly title: string;
  readonly highlight?: string;
  readonly subtitle: string;
  readonly ctas?: readonly HeroCTA[];
  readonly className?: string;
}

const defaultCTAs: readonly HeroCTA[] = [
  {
    label: "Démarrer un projet",
    href: "/contact",
    variant: "primary",
  },
  {
    label: "Voir nos réalisations",
    href: "/projets",
    variant: "secondary",
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const gradientVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

export function Hero({
  title,
  highlight,
  subtitle,
  ctas = defaultCTAs,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Gradient backgrounds */}
      <motion.div
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-violet-500/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-tl from-cyan-500/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 inline-flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden />
            Agence web créative
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg md:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          {ctas.map((cta, index) => (
            <HeroCTAButton key={cta.href} cta={cta} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

interface HeroCTAButtonProps {
  readonly cta: HeroCTA;
  readonly index: number;
}

function HeroCTAButton({ cta, index }: HeroCTAButtonProps) {
  const isPrimary = cta.variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={cta.href}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isPrimary
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98]"
            : "border-2 border-primary/30 bg-background/80 text-foreground backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        {isPrimary && (
          <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
        <span className="relative flex items-center gap-2">
          {cta.label}
          <ArrowRight
            className={cn(
              "size-4 transition-transform duration-300",
              isPrimary ? "group-hover:translate-x-1" : "group-hover:translate-x-0.5"
            )}
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>
  );
}
