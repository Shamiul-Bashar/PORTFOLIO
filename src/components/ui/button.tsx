import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-body text-[11px] font-bold tracking-[.11em] uppercase transition-all",
    "duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
    "disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "border border-accent-cyan bg-accent-cyan text-[#080808] hover:bg-[#ffdf60] hover:border-[#ffdf60]",
        secondary: "border border-white/30 bg-white/[.02] text-white hover:border-accent-cyan hover:text-accent-cyan",
        ghost: "bg-transparent text-text-secondary hover:bg-white/5 hover:text-accent-cyan",
        outline: "border border-white/20 bg-transparent text-white hover:border-accent-cyan/70 hover:text-accent-cyan",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-6",
        lg: "h-13 px-7 sm:h-14 sm:px-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild: _asChild, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
export { Button, buttonVariants };
