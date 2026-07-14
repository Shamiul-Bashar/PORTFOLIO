import { SOCIAL_LINKS } from "@/data/social";

export function ContactSocial() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.tooltip}
            className="
              glass-surface
              text-text-secondary
              hover:text-accent-cyan
              hover:border-accent-cyan/40
              hover:shadow-[var(--glow-cyan-soft)]
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-border
              transition-all
              duration-300
            "
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}