import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { profile } from "./data";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    hint: "Best for project briefs",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/rehan-imran",
    href: profile.linkedin,
    hint: "Roles and referrals",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@rehaninsights",
    href: profile.instagram,
    hint: "Behind the scenes",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@rehanyousafzai1122",
    href: profile.github,
    hint: "Code and experiments",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message me",
    href: profile.whatsapp,
    hint: "Quick questions",
  },
];


/** Contact channels — no form, just direct links. */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Have something worth <span className="text-gradient">building</span>?
        </>
      }
      description="Tell me the problem, not the spec. I'll reply with how I'd approach it — usually within a day."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {channels.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.07}>
            <a
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="glass-card group flex items-center gap-4 p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-secondary transition-colors group-hover:bg-primary/25">
                <channel.icon size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {channel.label}
                </span>
                <span className="mt-1 block truncate text-base font-semibold text-foreground">
                  {channel.value}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{channel.hint}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
