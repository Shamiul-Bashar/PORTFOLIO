"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Short cinematic curtain, not a multi-second loading block. */
export function LoadingScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setVisible(false),
      })
        .fromTo(wordRef.current, { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: .5 })
        .to(barRef.current, { scaleX: 1, duration: .62, ease: "power2.inOut" }, "-=.1")
        .to(screenRef.current, { yPercent: -101, duration: .78, ease: "power4.inOut" }, "-=.04");
    }, screenRef);
    const failsafe = window.setTimeout(() => setVisible(false), 2600);
    return () => {
      ctx.revert();
      window.clearTimeout(failsafe);
    };
  }, [reduced]);

  if (!visible || reduced) return null;
  return (
    <div ref={screenRef} role="status" aria-label="Loading portfolio" className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 overflow-hidden bg-[#0d0d0d]">
      <span ref={wordRef} className="font-heading text-[clamp(5.5rem,17vw,12rem)] leading-none text-white">SIAM<span className="text-accent-cyan">.</span></span>
      <div className="h-[2px] w-44 overflow-hidden bg-white/10">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent-cyan" />
      </div>
      <span className="text-[10px] font-semibold tracking-[.27em] uppercase text-white/40">VISUAL ENGINEERING / PORTFOLIO</span>
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full bg-accent-cyan" />
    </div>
  );
}
