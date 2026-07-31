import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { journey } from "./data";

/** Vertical learning timeline. */
export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Journey"
      title="How I got here"
      description="No bootcamp shortcut — just consistent building, one project harder than the last."
    >
      <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
        {journey.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.07}>
            <li className="relative">
              <span className="absolute -left-[2.55rem] top-2 grid h-4 w-4 place-items-center rounded-full bg-primary glow-ring sm:-left-[3.05rem]">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </span>
              <div className="glass-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  {step.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
