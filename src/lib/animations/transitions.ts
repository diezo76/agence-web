/**
 * Transitions Framer Motion réutilisables
 */

export const defaultTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

export const fastTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

export const slowTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};
