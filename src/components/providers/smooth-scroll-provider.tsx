"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wires Lenis (buttery-smooth scrolling, per spec section 4 "Scroll
 * Experience") into the GSAP ticker so ScrollTrigger-based reveals in
 * later phases stay perfectly in sync with the custom scroll physics.
 *
 * When the visitor prefers reduced motion, Lenis is skipped entirely
 * and the browser's native (instant) scrolling takes over.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // gentle ease-out, avoids heavy inertia
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
