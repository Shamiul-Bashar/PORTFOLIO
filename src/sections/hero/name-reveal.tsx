"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";

export function NameReveal({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const full = text.replace(/\s+/g, " ").trim().toUpperCase();
  const words = full.split(" ");
  const first = words.slice(0, 2).join(" ");
  const second = words.slice(2).join(" ");

  useEffect(() => {
    if (reducedMotion) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setTyped((n) => {
          if (n >= full.length) {
            window.clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, 64);
    }, MAX_LOADING_SCREEN_MS - 150);
    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [full, reducedMotion]);

  const count = reducedMotion ? full.length : typed;
  const cursor = <span aria-hidden="true" className="ml-[0.07em] inline-block h-[0.76em] w-[0.05em] translate-y-[0.06em] bg-accent-cyan motion-safe:animate-[caret-blink_1s_steps(1,end)_infinite]" />;

  return (
    <h1
      aria-label={full}
      className="max-w-full font-heading text-[clamp(2.15rem,5.2vw,5.3rem)] font-extrabold leading-[1.11] tracking-[-0.071em] uppercase"
    >
      <span aria-hidden="true" className="block min-h-[1.13em] whitespace-nowrap text-text-primary">
        {first.slice(0, count)}
        {!reducedMotion && count <= first.length && cursor}
      </span>
      <span aria-hidden="true" className="block min-h-[1.13em] whitespace-nowrap text-accent-cyan">
        {second.slice(0, Math.max(0, count - first.length - 1))}
        {!reducedMotion && count > first.length && cursor}
      </span>
    </h1>
  );
}
