"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LoadingScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setVisible(false),
      })
        .from(ref.current?.querySelector(".loader-mark") ?? [], { opacity: 0, y: 9, duration: 0.35 })
        .to(lineRef.current, { scaleX: 1, duration: 0.95, ease: "power1.inOut" }, "-=0.1")
        .to(ref.current, { opacity: 0, duration: 0.35 });
    }, ref);
    const failsafe = window.setTimeout(() => setVisible(false), MAX_LOADING_SCREEN_MS);
    return () => { ctx.revert(); window.clearTimeout(failsafe); };
  }, [reduced]);

  if (!visible || reduced) return null;
  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-[#0a0a0a]"
    >
      <span className="loader-mark font-heading text-3xl font-extrabold tracking-[-0.06em] text-text-primary">
        SIAM<span className="text-accent-cyan">.</span>
      </span>
      <div className="h-[2px] w-28 overflow-hidden bg-white/10">
        <div ref={lineRef} className="h-full w-full origin-left scale-x-0 bg-accent-cyan" />
      </div>
    </div>
  );
}
