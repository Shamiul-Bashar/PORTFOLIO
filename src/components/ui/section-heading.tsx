import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow, title, subtitle, align = "left", className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className={cn(
          "flex items-center gap-3 text-[11px] font-bold tracking-[.21em] uppercase text-accent-cyan",
          align === "center" && "justify-center",
        )}>
          <span aria-hidden="true" className="h-px w-9 bg-accent-cyan" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "mt-5 font-heading text-[clamp(3.9rem,9vw,8.7rem)] leading-[.9] tracking-[-.015em] uppercase text-text-primary",
        !eyebrow && "mt-0",
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-6 text-sm leading-[1.85] text-text-secondary md:text-base", align === "center" ? "mx-auto max-w-2xl" : "max-w-xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
