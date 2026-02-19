"use client";

import { useInView } from "@/lib/hooks/useInView";
import { useIsMobile } from "@/lib/hooks/useMediaQuery";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

export default function MyComponent() {
  const { scrollYProgress, scrollPercentage } = useScrollProgress();
  const { x, y } = useMousePosition();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const isMobile = useIsMobile();

  return (
    <div ref={ref}>
      <p>Scroll: {scrollPercentage}%</p>
      <p>Mouse: {x}, {y}</p>
      <p>Visible: {inView ? "Oui" : "Non"}</p>
      <p>Mobile: {isMobile ? "Oui" : "Non"}</p>
    </div>
  );
}
