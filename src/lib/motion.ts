/**
 * Numeric mirror of the timing/easing tokens defined in
 * src/app/globals.css. CSS custom properties can't be read as numbers
 * by GSAP or Framer Motion, so this file is the JS-side source of
 * truth — keep both in sync when the design system changes.
 */

export const EASE = {
  premium: [0.16, 1, 0.3, 1] as const, // cubic-bezier(0.16, 1, 0.3, 1)
  outSoft: [0.22, 1, 0.36, 1] as const, // cubic-bezier(0.22, 1, 0.36, 1)
} as const;

// GSAP accepts named/custom eases as strings; these map 1:1 to EASE above.
export const GSAP_EASE = {
  premium: "cubic-bezier(0.16, 1, 0.3, 1)",
  outSoft: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

export const DURATION = {
  instant: 0.12,
  fast: 0.24,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.0,
} as const;

/** Shared Framer Motion variants for section-level reveal-on-scroll. */
export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.premium },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.outSoft },
  },
};

/** Stagger helper for parent containers animating a list of children. */
export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Maximum time (ms) the intro loading screen is allowed to hold the page. */
export const MAX_LOADING_SCREEN_MS = 2500;
