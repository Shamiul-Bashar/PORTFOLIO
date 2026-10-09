import { cn } from "@/lib/utils";

const POINTS = [
  ["8%", "28%", "2s"], ["15%", "68%", "4s"], ["28%", "15%", "6s"],
  ["42%", "46%", "8s"], ["57%", "22%", "3s"], ["63%", "84%", "7s"],
  ["75%", "38%", "5s"], ["82%", "67%", "9s"], ["93%", "18%", "4s"],
] as const;

export function ParticleField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {POINTS.map(([left, top, delay], i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-accent-cyan motion-safe:animate-[siam-float_17s_ease-in-out_infinite]"
          style={{ left, top, animationDelay: delay }}
        />
      ))}
    </div>
  );
}
