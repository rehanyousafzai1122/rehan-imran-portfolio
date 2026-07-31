import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { profile } from "./data";

const facts = [
  { label: "Focus", value: "AI & full stack product development" },
  { label: "Experience", value: "Client & production projects" },
  { label: "Based in", value: profile.location },
];

/** Personal story — text only, portrait shown once in Hero. */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          I like problems that <span className="text-gradient">look boring</span> and solutions
          that don't.
        </>
      }
    >
      <div className="space-y-5 max-w-3xl">
        <Reveal>
          <p className="text-base leading-relaxed text-muted-foreground">
            My first website was a copy of a page I admired, rebuilt line by line until the
            layout finally made sense. That curiosity turned into client work: repair shops,
            small businesses and local services that needed a site people could actually find
            and trust.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-muted-foreground">
            These days I split my time between the front end and automation. I care about fast
            load times, honest copy and interfaces that stay usable on a cheap phone with a bad
            connection — and I use AI where it genuinely removes repetitive work, not as a
            gimmick.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <dl className="grid gap-3 pt-2 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="glass-card p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-secondary">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
