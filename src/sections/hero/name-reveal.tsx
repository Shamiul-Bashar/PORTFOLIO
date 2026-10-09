"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";

interface NameRevealProps {
  text: string;
}

/**
 * Accessible, one-pass typewriter reveal. The complete heading is
 * exposed to screen readers while the visual animation remains decorative.
 */
export function NameReveal({ text }: NameRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);

  const name = text.trim().replace(/\s+/g, " ").toUpperCase();
  const words = name.split(" ");
  const firstLine = words.slice(0, 2).join(" ");
  const secondLine = words.slice(2).join(" ");

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Begin once the introductory loading overlay is gone, so visitors
    // actually see the typing sequence rather than missing it behind it.
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setVisibleCount((count) => {
          if (count >= name.length) {
            window.clearInterval(timer);
            return count;
          }
          return count + 1;
        });
      }, 74);
    }, MAX_LOADING_SCREEN_MS - 150);
    return () => {
      window.clearTimeout(start);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [name, prefersReducedMotion]);

  const count = prefersReducedMotion ? name.length : visibleCount;
  const firstVisible = firstLine.slice(0, count);
  const secondVisible = secondLine.slice(
    0,
    Math.max(0, count - firstLine.length - 1),
  );
  const onFirstLine = count <= firstLine.length;
  const cursor = (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.77em] w-[0.055em] translate-y-[0.07em] bg-accent-cyan align-baseline motion-safe:animate-[caret-blink_1s_steps(1,end)_infinite]"
    />
  );

  return (
    <h1
      aria-label={name}
      className="font-heading text-[clamp(1.95rem,5.9vw,5.65rem)] font-bold leading-[1.09] tracking-[-0.055em] uppercase text-text-primary"
    >
      <span aria-hidden="true" className="block min-h-[1.12em] whitespace-nowrap">
        {firstVisible}
        {!prefersReducedMotion && onFirstLine ? cursor : null}
      </span>
      {secondLine && (
        <span
          aria-hidden="true"
          className="block min-h-[1.12em] whitespace-nowrap text-accent-cyan"
        >
          {secondVisible}
          {!prefersReducedMotion && !onFirstLine ? cursor : null}
        </span>
      )}
    </h1>
  );
}
