/**
 * Fixed, decorative background: aurora gradient, drifting blobs and
 * floating particles. Purely visual — hidden from assistive tech.
 */

const particles = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + (i % 4),
  duration: 16 + ((i * 5) % 20),
  delay: (i * 1.7) % 18,
}));

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base aurora wash */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_-10%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_70%)]" />

      {/* Drifting gradient blobs */}
      <div
        className="aurora-blob animate-drift left-[-10%] top-[-8%] h-[38rem] w-[38rem] bg-primary"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="aurora-blob animate-drift right-[-12%] top-[10%] h-[32rem] w-[32rem] bg-secondary opacity-35"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="aurora-blob animate-drift bottom-[-15%] left-[25%] h-[36rem] w-[36rem] bg-accent opacity-40"
        style={{ animationDelay: "-13s" }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-particle absolute bottom-[-10vh] rounded-full bg-secondary/70"
          style={{
            left: `${p.left}%`,
            height: p.size,
            width: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}

      {/* Subtle vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_35%,var(--background)_100%)] opacity-80" />
    </div>
  );
}
