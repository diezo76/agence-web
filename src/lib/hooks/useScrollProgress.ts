"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercentage(Math.round(latest * 100));
  });

  return { scrollYProgress, scrollPercentage };
}
