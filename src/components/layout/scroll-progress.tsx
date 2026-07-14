"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin neon-cyan progress line pinned to the very top of the screen.
 * Uses Framer Motion's scroll-linked value (kept smooth with a spring)
 * per spec: "never too thick", "smooth progression".
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="bg-accent-cyan fixed inset-x-0 top-0 z-[60] h-[2px] origin-left shadow-[var(--glow-cyan-soft)]"
      aria-hidden="true"
    />
  );
}
