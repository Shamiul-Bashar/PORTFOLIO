"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MotionLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Whether to wait for the line to enter the viewport. */
  onScroll?: boolean;
}

/** Kinetic editorial headline: each line rises from behind its own mask.
 * Server content stays in DOM and is accessible with or without JS. */
export function MotionLine({
  children, className, delay = 0, onScroll = true,
}: MotionLineProps) {
  const reduced = useReducedMotion();
  const show = { y: "0%", opacity: 1, rotate: 0 };
  const hidden = { y: "112%", opacity: 0.6, rotate: 2 };

  return (
    <span className="block overflow-hidden pb-[.12em] -mb-[.12em]">
      <motion.span
        className={cn("block origin-bottom-left transform-gpu", className)}
        initial={reduced ? false : hidden}
        {...(onScroll ? { whileInView: show, viewport: { once: true, amount: .52, margin: "0px 0px -5% 0px" } } : { animate: show })}
        transition={{ duration: reduced ? 0 : .95, delay: reduced ? 0 : delay, ease: [.16,1,.3,1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
