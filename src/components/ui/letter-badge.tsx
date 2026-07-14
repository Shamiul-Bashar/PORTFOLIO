import { cn } from "@/lib/utils";

interface LetterBadgeProps {
  label: string;
  className?: string;
}

/**
 * Same visual footprint as a react-icons glyph so it drops into any icon
 * slot seamlessly (see SkillCard). Used for languages/tools that don't
 * have an official brand icon available, e.g. plain C and Verilog.
 */
export function LetterBadge({ label, className }: LetterBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("font-mono text-[0.85em] leading-none font-semibold", className)}
    >
      {label}
    </span>
  );
}
