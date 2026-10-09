"use client";

import { useEffect } from "react";
import { gsap } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Scroll-scrubbed atmospheric details. Only transforms and opacity change.
 * Targets decorative DOM marked by data attributes; all real text stays visible. */
export function ScrollCinematics() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-cinematic-rule]").forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 95%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-cinematic-parallax]").forEach((element) => {
        const parent = element.closest("section");
        if (!parent) return;
        gsap.fromTo(
          element,
          { y: 32 },
          {
            y: -32,
            ease: "none",
            scrollTrigger: {
              trigger: parent, start: "top bottom", end: "bottom top",
              scrub: 1.2, invalidateOnRefresh: true,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return null;
}
