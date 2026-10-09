import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "font-heading text-[13px] font-bold tracking-[0.005em] transition-colors",
    "duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]",
    "disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "border border-accent-cyan bg-accent-cyan text-[#0a0a0a] hover:border-[#ffe775] hover:bg-[#ffe775] active:bg-[#d6ad17]",
        secondary: "border border-white/20 bg-transparent text-text-primary hover:border-accent-cyan/65 hover:text-accent-cyan",
        ghost: "border border-transparent bg-transparent text-text-secondary hover:text-accent-cyan",
        outline: "border border-white/15 bg-transparent text-text-primary hover:border-accent-cyan/55 hover:text-accent-cyan",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-[13px]",
        lg: "h-12 px-7 text-[13px] sm:h-13 sm:px-8 sm:text-sm",
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
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
export { Button, buttonVariants };
