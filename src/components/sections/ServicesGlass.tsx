"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface Service {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

const SERVICES: readonly Service[] = [
  {
    icon: "🎨",
    title: "Design UI/UX",
    description:
      "Interfaces modernes et intuitives qui captivent vos utilisateurs",
    features: ["Figma", "Prototypage", "Design System"],
  },
  {
    icon: "⚡",
    title: "Développement Web",
    description: "Applications performantes avec les dernières technologies",
    features: ["Next.js 15", "React 19", "TypeScript"],
  },
  {
    icon: "🚀",
    title: "Optimisation SEO",
    description: "Visibilité maximale sur les moteurs de recherche",
    features: ["Core Web Vitals", "Structured Data", "Performance"],
  },
  {
    icon: "🌐",
    title: "Web3 Integration",
    description: "Intégration blockchain et fonctionnalités décentralisées",
    features: ["Smart Contracts", "Wallet Connect", "NFT"],
  },
];

export default function ServicesGlass() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* Background : gradient purple-900 → black */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black" />

      {/* Animated grid pattern (radial-gradient circles) */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-6xl font-bold text-white"
        >
          Nos Services
        </motion.h2>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <GlassCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassCard({ service, index }: { service: Service; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative cursor-pointer overflow-visible"
    >
      {/* Gradient glow behind card (opacity 0→1 au hover, 500ms) */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card glassmorphism */}
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
        {/* Icon : scale 0 → 1 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="mb-6 text-6xl"
        >
          {service.icon}
        </motion.div>

        <h3 className="mb-4 text-3xl font-bold text-white">{service.title}</h3>

        <p className="mb-6 text-gray-400">{service.description}</p>

        {/* Features tags (pills) avec animation séquentielle */}
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + 0.4 + i * 0.1,
              }}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
            >
              {feature}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
