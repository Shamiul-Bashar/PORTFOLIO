import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Every section title in the spec follows the same rhythm: a small
 * mono eyebrow, a large heading, an optional subtitle. Centralized
 * here so that rhythm stays identical across About/Education/Skills/
 * Projects/Certificates/Contact instead of being redeclared per section.
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
      <p className="text-accent-cyan font-mono text-xs tracking-[0.3em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-text-primary mt-3 text-4xl font-semibold sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-text-secondary mt-3 max-w-xl">{subtitle}</p>}
    </div>
  );
}
