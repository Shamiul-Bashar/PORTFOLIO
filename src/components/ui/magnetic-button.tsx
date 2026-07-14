"use client";

import { useRef, useState, type MouseEvent, type ReactNode, type Ref } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface MagneticButtonProps extends VariantOnlyProps {
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

type VariantOnlyProps = Pick<ButtonProps, "variant" | "size">;

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_RADIUS_PX = 90;

export function MagneticButton({
  href,
  external,
  onClick,
  variant,
  size,
  children,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMouseMove(event: MouseEvent) {
    if (prefersReducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(offsetX, offsetY);

    if (distance < MAGNETIC_RADIUS_PX + bounds.width / 2) {
      x.set(offsetX * MAGNETIC_STRENGTH);
      y.set(offsetY * MAGNETIC_STRENGTH);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(event: MouseEvent) {
    if (!ref.current) return;
    if (!prefersReducedMotion) {
      const bounds = ref.current.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: event.clientX - bounds.left, y: event.clientY - bounds.top },
      ]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 650);
    }
    onClick?.();
  }

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    style: { x: springX, y: springY },
    className: cn(
      buttonVariants({ variant, size }),
      "relative overflow-hidden",
      className,
    ),
  };

  const rippleNodes = ripples.map((ripple) => (
    <motion.span
      key={ripple.id}
      initial={{ opacity: 0.35, scale: 0 }}
      animate={{ opacity: 0, scale: 4 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      style={{ left: ripple.x, top: ripple.y }}
      className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60"
    />
  ));

  if (href) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...sharedProps}
      >
        {children}
        {rippleNodes}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} type="button" {...sharedProps}>
      {children}
      {rippleNodes}
    </motion.button>
  );
}
