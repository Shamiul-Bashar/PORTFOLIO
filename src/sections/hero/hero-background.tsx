"use client";

import { ParticleField } from "@/components/ui/particle-field";

/**
 * Minimal matte-black atmosphere. Animation is limited to CSS transforms
 * and opacity; no canvas, third-party particle engine or pointer listeners.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg-primary"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_45%,rgba(250,204,21,0.065),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_82%,rgba(250,204,21,0.035),transparent_52%)]" />

      {/* Architectural micro-grid, intentionally barely visible. */}
      <div className="absolute inset-0 opacity-40 [background-size:84px_84px] [background-image:linear-gradient(to_right,rgba(250,204,21,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,204,21,0.045)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="absolute top-[15%] right-[8%] h-[min(58vw,660px)] w-[min(58vw,660px)] rounded-full border border-accent-cyan/10" />
      <div className="absolute top-[20%] right-[12%] h-[min(48vw,550px)] w-[min(48vw,550px)] rounded-full border border-accent-cyan/5" />

      <ParticleField className="z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#090909_100%)]" />
    </div>
  );
}
