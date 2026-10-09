"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Scroll-scrubbed two-line manifesto.
 * No pinning / layout hijack: it stays responsive, fluid and touch friendly. */
export function ScrollStatement() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const xOne = useTransform(scrollYProgress, [0, .5, 1], [-135, 0, 125]);
  const xTwo = useTransform(scrollYProgress, [0, .5, 1], [110, 0, -135]);
  const opacity = useTransform(scrollYProgress, [0, .24, .75, 1], [.35, 1, 1, .35]);

  return (
    <section ref={root} aria-label="Design philosophy" className="relative isolate overflow-hidden border-y border-white/10 bg-[#f4cc27] py-20 text-[#080808] sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(90deg,rgba(0,0,0,.35)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-[clamp(3rem,5.5vw,7rem)]">
        <p className="mb-9 flex items-center gap-3 text-[10px] font-bold tracking-[.2em] uppercase">
          <span className="h-px w-10 bg-[#080808]" /> THE PROCESS / 001
        </p>
        <motion.div style={reduced ? undefined : { x: xOne, opacity }} className="font-heading text-[clamp(5rem,15.5vw,17rem)] leading-[.79] tracking-[-.02em]">
          THINK.
        </motion.div>
        <motion.div style={reduced ? undefined : { x: xTwo, opacity }} className="text-right font-heading text-[clamp(5rem,15.5vw,17rem)] leading-[.79] tracking-[-.02em]">
          BUILD.
        </motion.div>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-5 border-t border-black/20 pt-5">
          <p className="max-w-sm text-[12px] font-medium leading-[1.75] sm:text-sm">
            Transforming curiosity into working software, practical systems and useful experiences.
          </p>
          <span className="text-[10px] font-bold tracking-[.14em] uppercase">ALGORITHMS → ENGINEERING → IMPACT</span>
        </div>
      </div>
    </section>
  );
}
