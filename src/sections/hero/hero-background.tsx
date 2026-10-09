import { ParticleField } from "@/components/ui/particle-field";

/** Unobtrusive black architectural backdrop. No neon glow or cover blur. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 opacity-[.13] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:calc(100%/5)_100%]" />
      <div className="absolute inset-x-0 top-[31%] border-t border-white/[.055]" />
      <div className="absolute inset-x-0 top-[69%] border-t border-white/[.045]" />
      <div className="absolute top-0 right-[7.5%] h-full w-px bg-white/[.06]" />
      <ParticleField className="z-0 opacity-30" />
    </div>
  );
}
