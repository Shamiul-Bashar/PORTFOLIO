import { ParticleField } from "@/components/ui/particle-field";

/**
 * Flat matte black canvas with a quiet yellow architectural accent.
 * ParticleField is intentionally sparse and confined to the hero.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-bg-primary" aria-hidden="true">
      <div className="absolute top-[10%] right-[12%] hidden h-[72%] w-px bg-white/[0.045] lg:block" />
      <div className="absolute top-[20%] right-[31%] hidden h-[57%] w-px bg-white/[0.035] lg:block" />
      <div className="absolute right-0 bottom-[9%] left-0 h-px bg-white/[0.035]" />
      <ParticleField className="z-0 opacity-45" />
    </div>
  );
}
