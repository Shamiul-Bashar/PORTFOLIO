import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Base button primitive. Section-specific behaviour (magnetic hover,
 * ripple, glow-on-hover) is layered on top of this in
 * components/ui/magnetic-button.tsx during the Hero/Buttons phase —
 * this component only owns static visual variants and accessible
 * states (hover/active/focus/disabled) per the design system.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-heading text-sm font-medium tracking-wide transition-all",
    "duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent-cyan text-bg-primary shadow-[var(--glow-cyan-soft)]",
          "hover:shadow-[var(--glow-cyan)] hover:brightness-110",
          "active:brightness-95",
        ].join(" "),
        secondary: [
          "border border-accent-purple/50 bg-transparent text-text-primary",
          "hover:border-accent-purple hover:shadow-[var(--glow-purple-soft)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-text-secondary",
          "hover:text-text-primary hover:bg-white/5",
        ].join(" "),
        outline: [
          "border border-border bg-transparent text-text-primary",
          "hover:border-accent-cyan/60 hover:text-accent-cyan",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant, size, asChild, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
