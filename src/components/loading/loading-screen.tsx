"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/animations/gsap";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Minimal cyberpunk intro: a glowing monogram with an animated
 * underline "progress" bar. Hard-capped at MAX_LOADING_SCREEN_MS
 * (2.5s) per spec, then fades out and unmounts — never blocks the
 * page longer than that even if animations are still settling.
 */
export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setVisible(false),
      });

      tl.from(containerRef.current?.querySelector(".loader-mark") ?? [], {
        opacity: 0,
        y: 12,
        duration: 0.5,
      })
        .to(
          barRef.current,
          {
            scaleX: 1,
            duration: 1.3,
            ease: "power1.inOut",
          },
          "-=0.1",
        )
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
        });
    }, containerRef);

    // Hard safety cap regardless of timeline state.
    const failSafe = window.setTimeout(() => setVisible(false), MAX_LOADING_SCREEN_MS);

    return () => {
      ctx.revert();
      window.clearTimeout(failSafe);
    };
  }, [prefersReducedMotion]);

  if (!visible || prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading portfolio"
      className="bg-bg-primary fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
    >
      <span className="loader-mark font-heading text-text-primary text-3xl tracking-[0.2em]">
        PORT<span className="text-accent-cyan">FOLIO</span>
      </span>
      <div className="h-px w-40 overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="from-accent-cyan to-accent-purple h-full w-full origin-left scale-x-0 bg-gradient-to-r"
        />
      </div>
    </div>
  );
}
