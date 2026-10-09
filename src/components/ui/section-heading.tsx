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
          "inline-flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-cyan sm:text-xs",
          align === "center" && "justify-center",
        )}>
          <span aria-hidden="true" className="inline-block h-px w-7 bg-accent-cyan" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "font-heading text-[clamp(2.1rem,4.6vw,3.6rem)] font-extrabold leading-[1.15] tracking-[-0.055em] text-text-primary",
        eyebrow && "mt-5",
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-sm leading-[1.9] text-text-secondary sm:text-[15px]",
          align === "center" ? "mx-auto max-w-2xl" : "max-w-[560px]",
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
