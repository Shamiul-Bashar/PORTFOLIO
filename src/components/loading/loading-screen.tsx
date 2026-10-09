"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap";
import { MAX_LOADING_SCREEN_MS } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LoadingScreen() {
  const container = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: () => setShow(false) })
        .from(container.current?.querySelector(".loader-mark") ?? [], { y: 22, opacity: 0, duration: .3 })
        .to(bar.current, { scaleX: 1, duration: 1.1, ease: "power1.inOut" }, "-=.05")
        .to(container.current, { opacity: 0, duration: .35 });
    }, container);
    const failSafe = window.setTimeout(() => setShow(false), MAX_LOADING_SCREEN_MS);
    return () => { ctx.revert(); window.clearTimeout(failSafe); };
  }, [reduced]);

  if (!show || reduced) return null;
  return (
    <div ref={container} role="status" aria-label="Loading portfolio" className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-[#080808]">
      <span className="loader-mark font-heading text-[clamp(5rem,15vw,11rem)] leading-none text-white">SIAM<span className="text-accent-cyan">.</span></span>
      <div className="h-px w-48 overflow-hidden bg-white/15">
        <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent-cyan" />
      </div>
      <p className="text-[10px] font-bold tracking-[.25em] uppercase text-white/40">CREATIVE DEVELOPER / PORTFOLIO</p>
    </div>
  );
}
