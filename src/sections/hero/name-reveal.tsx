"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";

/** Two-line, single-pass typewriter on a massive condensed display heading.
 * The full heading is exposed via aria-label even while characters animate. */
export function NameReveal({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const full = text.trim().replace(/\s+/g, " ").toUpperCase();
  const first = "MD SHAMIUL";
  const second = "BASHAR SIAM";

  useEffect(() => {
    if (reduced) return;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setTyped((n) => {
          if (n >= full.length) {
            if (timer !== undefined) window.clearInterval(timer);
            return n;
          }
          return n + 1;
        });
      }, 56);
    }, MAX_LOADING_SCREEN_MS - 100);
    return () => {
      window.clearTimeout(start);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [full, reduced]);

  const count = reduced ? full.length : typed;
  const firstVisible = first.slice(0, count);
  const secondVisible = second.slice(0, Math.max(0, count - first.length - 1));

  return (
    <h1
      aria-label={full}
      className="siam-display w-full max-w-full text-[clamp(3.4rem,12.3vw,12rem)] uppercase text-text-primary"
    >
      <span className="block min-h-[.89em] whitespace-nowrap" aria-hidden="true">
        <span className="text-accent-cyan">{firstVisible.slice(0,3)}</span>
        {firstVisible.slice(3)}
        {!reduced && count <= first.length && (
          <span className="ml-[.025em] inline-block h-[.69em] w-[.025em] translate-y-[.035em] bg-accent-cyan align-baseline motion-safe:animate-[siam-caret_1s_steps(1,end)_infinite]" />
        )}
      </span>
      <span className="block min-h-[.89em] whitespace-nowrap" aria-hidden="true">
        {secondVisible.slice(0, 6)}
        <span className="text-accent-cyan">{secondVisible.slice(6)}</span>
        {!reduced && count > first.length && (
          <span className="ml-[.025em] inline-block h-[.69em] w-[.025em] translate-y-[.035em] bg-accent-cyan align-baseline motion-safe:animate-[siam-caret_1s_steps(1,end)_infinite]" />
        )}
      </span>
    </h1>
  );
}
