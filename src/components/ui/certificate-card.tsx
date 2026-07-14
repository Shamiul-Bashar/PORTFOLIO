"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaCertificate, FaUpRightFromSquare } from "react-icons/fa6";

import { resolveCertificateThumbnail } from "@/lib/certificates";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
}

const TILT_RANGE_DEG = 6;

export function CertificateCard({ certificate }: CertificateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isClickable = Boolean(certificate.fileUrl);
  const thumbnail = resolveCertificateThumbnail(certificate);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [TILT_RANGE_DEG, -TILT_RANGE_DEG]),
    {
      stiffness: 220,
      damping: 20,
    },
  );

  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-TILT_RANGE_DEG, TILT_RANGE_DEG]),
    {
      stiffness: 220,
      damping: 20,
    },
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current || !isClickable) return;

    const bounds = ref.current.getBoundingClientRect();

    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  }

  function handleMouseLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  const cardInner = (
    <div className="glass-surface relative flex h-full flex-col overflow-hidden rounded-lg shadow-[var(--shadow-glass)] transition-shadow duration-[var(--duration-fast)] group-hover:shadow-[var(--glow-cyan)]">
      <div className="bg-surface relative aspect-[4/3] w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={certificate.title}
            fill
            sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-110"
          />
        ) : (
          <div className="from-bg-secondary to-surface flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br">
            <FaCertificate
              className="text-accent-cyan/60 text-3xl"
              aria-hidden="true"
            />

            <span className="text-text-secondary font-mono text-[10px] tracking-[0.2em] uppercase">
              {isClickable ? certificate.category : "Coming Soon"}
            </span>
          </div>
        )}

        {isClickable && (
          <div className="bg-bg-primary/0 group-hover:bg-bg-primary/30 absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-[var(--duration-fast)] group-hover:opacity-100">
            <span className="text-text-primary flex items-center gap-2 text-sm font-medium">
              <FaUpRightFromSquare aria-hidden="true" />
              View certificate
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-accent-cyan font-mono text-[10px] tracking-[0.2em] uppercase">
          {certificate.category}
        </span>

        <h3 className="font-heading text-text-primary text-base leading-snug font-semibold">
          {certificate.title}
        </h3>

        <p className="text-text-secondary text-sm">
          {certificate.issuer}
        </p>

        <p className="text-text-secondary/70 mt-auto pt-2 font-mono text-xs">
          {certificate.date}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion || !isClickable
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 800,
            }
      }
      whileHover={
        prefersReducedMotion || !isClickable
          ? undefined
          : {
              scale: 1.02,
            }
      }
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative rounded-lg",
        !isClickable && "opacity-70",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "from-accent-cyan via-accent-purple to-accent-cyan absolute -inset-px rounded-lg bg-gradient-to-br opacity-0 blur-[2px] transition-opacity duration-[var(--duration-base)]",
          isClickable &&
            "group-focus-within:opacity-70 group-hover:opacity-70 motion-safe:group-hover:animate-[spin_6s_linear_infinite]",
        )}
      />

      {isClickable ? (
        <a
          href={certificate.fileUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open certificate: ${certificate.title}`}
          className="relative block rounded-lg"
        >
          {cardInner}
        </a>
      ) : (
        <div
          className="relative rounded-lg"
          aria-disabled="true"
        >
          {cardInner}
        </div>
      )}
    </motion.div>
  );
}