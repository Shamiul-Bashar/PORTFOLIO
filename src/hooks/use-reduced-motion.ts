"use client";

import { useEffect, useState } from "react";

/**
 * Tracks prefers-reduced-motion so JS-driven animation (Lenis, GSAP
 * ScrollTrigger pinning/parallax, custom cursor) can be skipped
 * entirely for users who've asked for less motion — the CSS rule in
 * globals.css only shortens transition/animation durations, it can't
 * stop a JS library from initializing.
 */
function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitialReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
