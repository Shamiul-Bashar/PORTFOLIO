import { cn } from "@/lib/utils";

interface Particle {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Static coordinates preserve SSR hydration while varying drift and density.
const PARTICLES: Particle[] = [
  { left: "3%", top: "22%", size: 2, duration: 12, delay: -2, opacity: 0.75 },
  { left: "9%", top: "58%", size: 3, duration: 14, delay: -5, opacity: 0.55 },
  { left: "15%", top: "13%", size: 2, duration: 10, delay: -4, opacity: 0.65 },
  { left: "20%", top: "82%", size: 2, duration: 16, delay: -9, opacity: 0.45 },
  { left: "25%", top: "36%", size: 3, duration: 13, delay: -1, opacity: 0.7 },
  { left: "31%", top: "68%", size: 2, duration: 17, delay: -6, opacity: 0.5 },
  { left: "36%", top: "20%", size: 2, duration: 11, delay: -7, opacity: 0.8 },
  { left: "41%", top: "91%", size: 3, duration: 15, delay: -3, opacity: 0.45 },
  { left: "45%", top: "46%", size: 2, duration: 14, delay: -10, opacity: 0.7 },
  { left: "52%", top: "14%", size: 3, duration: 18, delay: -12, opacity: 0.5 },
  { left: "56%", top: "78%", size: 2, duration: 13, delay: -5, opacity: 0.55 },
  { left: "62%", top: "32%", size: 2, duration: 16, delay: -4, opacity: 0.75 },
  { left: "68%", top: "60%", size: 3, duration: 12, delay: -8, opacity: 0.6 },
  { left: "71%", top: "9%", size: 2, duration: 19, delay: -2, opacity: 0.5 },
  { left: "77%", top: "84%", size: 2, duration: 14, delay: -9, opacity: 0.8 },
  { left: "82%", top: "27%", size: 3, duration: 17, delay: -11, opacity: 0.65 },
  { left: "86%", top: "66%", size: 2, duration: 11, delay: -3, opacity: 0.7 },
  { left: "92%", top: "13%", size: 2, duration: 15, delay: -6, opacity: 0.8 },
  { left: "95%", top: "47%", size: 3, duration: 18, delay: -5, opacity: 0.5 },
  { left: "97%", top: "88%", size: 2, duration: 12, delay: -7, opacity: 0.75 },
];

interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className }: ParticleFieldProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(250,204,21,0.5)] motion-safe:animate-[particle-float_ease-in-out_infinite]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes particle-float {
          0%, 100% { transform: translate3d(0, 6px, 0) scale(0.8); }
          50% { transform: translate3d(10px, -30px, 0) scale(1.18); }
        }
      `}</style>
    </div>
  );
}
