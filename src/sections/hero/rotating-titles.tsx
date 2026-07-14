"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RotatingTitlesProps {
  titles: string[];
  intervalMs?: number;
}

export function RotatingTitles({ titles, intervalMs = 2800 }: RotatingTitlesProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || titles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % titles.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, titles.length, intervalMs]);

  const current = titles[prefersReducedMotion ? 0 : index];

  return (
    <div className="h-7 overflow-hidden sm:h-8" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-highlight font-mono text-sm sm:text-base"
        >
          {current}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
