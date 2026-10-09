import { cn } from "@/lib/utils";

interface Particle { x: string; y: string; duration: number; delay: number; size: number; }
// Deterministic so SSR and hydration agree. No animation engine or heavy canvas.
const DUST: Particle[] = [
  { x: "6%", y: "25%", duration: 18, delay: -4, size: 2 },
  { x: "19%", y: "78%", duration: 15, delay: -6, size: 2 },
  { x: "33%", y: "16%", duration: 21, delay: -3, size: 1 },
  { x: "48%", y: "57%", duration: 19, delay: -7, size: 2 },
  { x: "61%", y: "27%", duration: 22, delay: -5, size: 1 },
  { x: "70%", y: "71%", duration: 17, delay: -9, size: 2 },
  { x: "83%", y: "12%", duration: 20, delay: -11, size: 2 },
  { x: "93%", y: "54%", duration: 16, delay: -8, size: 1 },
];
export function ParticleField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {DUST.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent-cyan motion-safe:animate-[subtle-rise_ease-in-out_infinite]"
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size,
            animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
