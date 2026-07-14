"use client";

import { motion } from "framer-motion";

import type { QuickFact } from "@/types/profile";

interface QuickFactsProps {
  facts: QuickFact[];
}

export function QuickFacts({ facts }: QuickFactsProps) {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {facts.map((fact) => (
        <motion.div
          key={fact.label}
          whileHover={{ y: -4, rotate: -1, scale: 1.015 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="glass-surface rounded-md p-4 shadow-[var(--shadow-elevation-1)] transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--glow-cyan-soft)]"
        >
          <dt className="text-text-secondary font-mono text-[10px] tracking-[0.2em] uppercase">
            {fact.label}
          </dt>
          <dd className="font-heading text-text-primary mt-1 text-sm font-medium">
            {fact.value}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
