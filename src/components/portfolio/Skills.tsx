import { Braces, Bot, Rocket, Search, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { skillGroups } from "./data";

const icons: Record<string, LucideIcon> = {
  Frontend: Braces,
  Learning: Rocket,
  SEO: Search,
  AI: Bot,
  Tools: Wrench,
};

/** Grid of animated skill cards grouped by discipline. */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit behind the work"
      description="A working stack, not a wish list — grouped by what I use daily, what I'm sharpening, and what I automate with."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.title] ?? Braces;
          return (
            <Reveal key={group.title} delay={i * 0.08}>
              <article className="glass-card group h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-secondary transition-colors group-hover:bg-primary/25">
                    <Icon size={20} />
                  </span>
                  <h3 className="truncate text-lg font-semibold">{group.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
