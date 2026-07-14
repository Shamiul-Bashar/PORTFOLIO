import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared section heading component
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          "font-heading text-4xl font-semibold text-text-primary sm:text-5xl",
          eyebrow ? "mt-3" : ""
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-text-secondary mt-3",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}