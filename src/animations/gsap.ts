"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins exactly once, client-side only. Every future
 * section animation (ScrollTrigger reveals, pinning, horizontal
 * scroll) should import { gsap } from this file rather than "gsap"
 * directly, so plugin registration is guaranteed to have already run.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger };
