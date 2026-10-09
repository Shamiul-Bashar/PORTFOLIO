import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";

// Every label comes from the owner's actual skills or recorded project stack.
const stack = Array.from(new Set([
  ...SKILLS.filter((skill) => skill.category !== "Microsoft Office").map((skill) => skill.name),
  ...PROJECTS.flatMap((project) => project.technologies),
])).slice(0, 14);

function LoopItems() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4">
      {stack.map((name, index) => (
        <span
          key={`${name}-${index}`}
          className="inline-flex h-9 shrink-0 items-center gap-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/[.035] px-4 text-[10px] font-semibold uppercase tracking-[.13em] text-accent-cyan sm:h-10 sm:text-[11px]"
        >
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-cyan" />
          {name}
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="siam-marquee-viewport relative overflow-hidden border-y border-white/10 bg-[#101010] py-4" aria-label="Technical skills and technologies">
      <div className="siam-marquee-track motion-reduce:!animate-none">
        <LoopItems />
        <div aria-hidden="true"><LoopItems /></div>
      </div>
    </div>
  );
}
