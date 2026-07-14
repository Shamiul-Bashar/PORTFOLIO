"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { profile } from "@/data/profile";

/**
 * Every layer here animates only `transform`/`opacity` (never layout
 * properties) to stay cheap on the GPU. Mouse parallax is skipped
 * entirely under prefers-reduced-motion, and the ambient blob/grid
 * animations fall back to the CSS-level reduced-motion rule in
 * globals.css (near-instant, effectively static).
 */
export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 40, damping: 20 });

  const layerFarX = useTransform(springX, (v) => v * 10);
  const layerFarY = useTransform(springY, (v) => v * 10);
  const layerNearX = useTransform(springX, (v) => v * 22);
  const layerNearY = useTransform(springY, (v) => v * 22);

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      pointerX.set(normalizedX);
      pointerY.set(normalizedY);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion, pointerX, pointerY]);

  return (
    <div
      className="bg-bg-primary absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/*
        Cover image blend layer. Renders nothing until profile.coverImageSrc
        is set — per spec this must never be a hard stretch-fill, so it's
        heavily blurred, dimmed via a low opacity, and gradient-masked into
        the base background instead of presented as a plain photo.
      */}
      {profile.coverImageSrc && (
        <div className="absolute inset-0 scale-110">
          <Image
            src={profile.coverImageSrc}
            alt=""
            fill
            priority
            className="object-cover opacity-25 blur-2xl"
          />
          <div className="bg-bg-primary/70 absolute inset-0" />
        </div>
      )}

      {/* Base cyberpunk grid, very slow drift */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(0,245,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.4)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)] [background-size:64px_64px] opacity-[0.18] motion-safe:animate-[grid-drift_30s_linear_infinite]" />

      {/* Far parallax layer: large soft cyan bloom, top-left */}
      <motion.div
        style={{ x: layerFarX, y: layerFarY }}
        className="bg-accent-cyan/20 absolute -top-40 -left-40 h-[540px] w-[540px] rounded-full blur-[120px] motion-safe:animate-[drift-a_18s_ease-in-out_infinite]"
      />

      {/* Near parallax layer: purple bloom, bottom-right */}
      <motion.div
        style={{ x: layerNearX, y: layerNearY }}
        className="bg-accent-purple/25 absolute -right-32 -bottom-32 h-[480px] w-[480px] rounded-full blur-[120px] motion-safe:animate-[drift-b_22s_ease-in-out_infinite]"
      />

      {/* Small roaming highlight for depth */}
      <motion.div
        style={{ x: layerNearX, y: layerFarY }}
        className="bg-highlight/10 absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-[90px] motion-safe:animate-[drift-a_26s_ease-in-out_infinite]"
      />

      {/* Vignette so text stays legible over the mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-bg-primary)_92%)]" />

      <style jsx global>{`
        @keyframes grid-drift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 64px 64px;
          }
        }
        @keyframes drift-a {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(24px, 18px) scale(1.06);
          }
        }
        @keyframes drift-b {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -16px) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
