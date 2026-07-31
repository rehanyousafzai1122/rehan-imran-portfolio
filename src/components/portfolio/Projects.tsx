import { ExternalLink, Github, Clock, CalendarDays } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { projects } from "./data";

/** Featured work as glowing glass cards. */
export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've shipped and things I'm shipping"
      description="Real briefs, real constraints. Each one taught me something I now reuse everywhere."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.08}>
            <div className="group relative h-full rounded-[1.5rem] p-px transition-transform duration-500 hover:-translate-y-1">
              {/* Animated border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[var(--gradient-brand)] opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-70" />
              <article className="glass-card relative flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent" />
                  {project.status === "in-development" ? (
                    <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-secondary">
                      <Clock size={13} /> In development
                    </span>
                  ) : (
                    <span className="glass absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-secondary">
                    <CalendarDays size={13} /> {project.date}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:border-primary/40"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.demo || project.repo ? (
                    <div className="mt-6 flex flex-wrap gap-3 pt-1">
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:glow-ring"
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      ) : null}
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-foreground transition-transform hover:-translate-y-0.5"
                        >
                          <Github size={14} /> GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
