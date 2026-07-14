"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href="#about"
      aria-label="Scroll to About section"
      className="group text-text-secondary hover:text-accent-cyan absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-colors"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <motion.span
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </motion.span>
    </a>
  );
}
