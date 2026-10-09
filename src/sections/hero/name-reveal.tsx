"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FIRST = "MD. SHAMIUL";
const SECOND = "BASHER SIAM";

/** Cinematic typewriter with a quiet outline underlay.
 * Real text is never removed from the accessibility tree. */
export function NameReveal({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const full = text.trim().replace(/\s+/g, " ").toUpperCase();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setTyped((n) => {
          if (n >= full.length) {
            if (timer !== undefined) window.clearInterval(timer);
            return full.length;
          }
          return n + 1;
        });
      }, 49);
    }, 1430);
    return () => {
      window.clearTimeout(start);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [full, reduced]);

  const count = reduced ? full.length : typed;
  const firstVisible = FIRST.slice(0, count);
  const secondVisible = SECOND.slice(0, Math.max(0, count - FIRST.length - 1));
  const caret = (
    <span aria-hidden="true" className="ml-[.025em] inline-block h-[.69em] w-[.025em] translate-y-[.035em] bg-accent-cyan align-baseline motion-safe:animate-[siam-caret_1s_steps(1,end)_infinite]" />
  );

  return (
    <h1
      aria-label={full}
      className="siam-display relative w-full max-w-full text-[clamp(3.05rem,12.3vw,12rem)] uppercase text-text-primary"
    >
      <span className="relative block min-h-[.89em] whitespace-nowrap" aria-hidden="true">
        <span className="pointer-events-none absolute inset-0 select-none text-white/[.065]" aria-hidden="true">{FIRST}</span>
        <span className="relative">
          <span className="text-accent-cyan">{firstVisible.slice(0,3)}</span>{firstVisible.slice(3)}
          {!reduced && count <= FIRST.length && caret}
        </span>
      </span>
      <span className="relative block min-h-[.89em] whitespace-nowrap" aria-hidden="true">
        <span className="pointer-events-none absolute inset-0 select-none text-white/[.065]" aria-hidden="true">{SECOND}</span>
        <span className="relative">
          {secondVisible.slice(0,6)}
          <span className="text-accent-cyan">{secondVisible.slice(6)}</span>
          {!reduced && count > FIRST.length && caret}
        </span>
      </span>
    </h1>
  );
}
