import { cn } from "@/lib/utils";

interface Particle {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  color: "cyan" | "purple";
}

// Fixed, hand-placed positions rather than Math.random(): keeps the server
// and client render identical (no hydration mismatch) while still reading
// as organic, non-grid placement.
const PARTICLES: Particle[] = [
  { left: "6%", top: "18%", size: 3, duration: 9, delay: 0, color: "cyan" },
  { left: "14%", top: "72%", size: 2, duration: 11, delay: 1.2, color: "purple" },
  { left: "22%", top: "40%", size: 4, duration: 8, delay: 0.6, color: "cyan" },
  { left: "31%", top: "85%", size: 2, duration: 12, delay: 2, color: "cyan" },
  { left: "40%", top: "12%", size: 3, duration: 10, delay: 0.3, color: "purple" },
  { left: "52%", top: "60%", size: 2, duration: 9.5, delay: 1.6, color: "cyan" },
  { left: "61%", top: "28%", size: 4, duration: 13, delay: 0.9, color: "purple" },
  { left: "70%", top: "78%", size: 3, duration: 8.5, delay: 2.4, color: "cyan" },
  { left: "78%", top: "20%", size: 2, duration: 11.5, delay: 0.4, color: "purple" },
  { left: "86%", top: "55%", size: 3, duration: 10.5, delay: 1.8, color: "cyan" },
  { left: "92%", top: "88%", size: 2, duration: 9, delay: 1, color: "purple" },
  { left: "48%", top: "94%", size: 3, duration: 12.5, delay: 0.7, color: "cyan" },
];

interface ParticleFieldProps {
  className?: string;
}

/**
 * Purely decorative — aria-hidden, CSS-only motion (respects the global
 * prefers-reduced-motion rule in globals.css automatically via
 * motion-safe:). Never mounted with JS-computed randomness so it's safe
 * in a server component.
 */
export function ParticleField({ className }: ParticleFieldProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      aria-hidden="true"
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full motion-safe:animate-[particle-float_ease-in-out_infinite]",
            particle.color === "cyan" ? "bg-accent-cyan/50" : "bg-accent-purple/50",
          )}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes particle-float {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-22px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
