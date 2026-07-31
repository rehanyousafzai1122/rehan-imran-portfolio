import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { profile } from "./data";

const socials = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: profile.instagram, label: "Instagram" },
  { icon: MessageCircle, href: profile.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];


export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-10 sm:flex sm:justify-between sm:px-8">
        <div className="min-w-0">
          <p className="font-display text-base font-semibold">{profile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Code. Create. Improve. Repeat. © {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex shrink-0 items-center gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-secondary"
              >
                <s.icon size={17} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
