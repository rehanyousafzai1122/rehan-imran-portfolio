import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Standard section shell: consistent width, spacing and heading treatment.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
