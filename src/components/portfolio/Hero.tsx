import { motion } from "motion/react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { profile } from "./data";
import portraitImg from "@/assets/rehan-portrait.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Above-the-fold introduction. */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="flex flex-col justify-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground">
          <Sparkles size={14} className="text-secondary" />
          Open to internships, freelance builds & collaborations
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="mt-7 text-5xl font-extrabold leading-[1.05] sm:text-7xl lg:text-8xl"
      >
        {profile.name.split(" ")[0]}{" "}
        <span className="text-gradient animate-shimmer">{profile.name.split(" ")[1]}</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mt-5 max-w-2xl font-display text-xl font-semibold text-foreground sm:text-2xl"
      >
        {profile.tagline}
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-3 text-sm uppercase tracking-[0.2em] text-secondary"
      >
        {profile.role}
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
      >
        {profile.intro}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={5}
        className="mt-10 flex flex-wrap gap-3"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:glow-ring"
        >
          View Projects
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#contact"
          className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:glow-ring-cyan"
        >
          <Mail size={16} className="text-secondary" />
          Contact Me
        </a>
      </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-sm lg:max-w-none"
      >
        <div className="absolute -inset-8 rounded-full bg-[var(--gradient-brand)] opacity-25 blur-3xl" />
        <div className="animate-float-y relative">
          <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] border border-primary/40" />
          <div className="glass relative overflow-hidden rounded-[2.25rem] p-2">
            <img
              src={portraitImg}
              alt="Portrait of Rehan Imran"
              width={928}
              height={1160}
              className="aspect-[4/5] w-full rounded-[1.85rem] object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[1.85rem] bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.18em]">
              <span className="text-secondary">AI · Full Stack</span>
              <span className="text-muted-foreground">Pakistan</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
