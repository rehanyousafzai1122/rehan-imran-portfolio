# Rehan Imran — Personal Portfolio

A dark, futuristic, glassmorphic portfolio built with React 19, TanStack Start (Vite),
Tailwind CSS v4, Motion and Lucide icons.

## Installation

```bash
bun install     # or: npm install
bun run dev     # or: npm run dev
```

The site runs at http://localhost:8080.

## Customization

Almost everything is content-driven:

| What to change | Where |
| --- | --- |
| Name, tagline, intro, email, social links | `src/components/portfolio/data.ts` (`profile`) |
| Navigation items | `data.ts` (`navLinks`) |
| Skill groups | `data.ts` (`skillGroups`) |
| Projects (title, description, stack, links, images) | `data.ts` (`projects`) |
| Timeline | `data.ts` (`journey`) |
| Colors, glow, radius, fonts, animations | `src/styles.css` (design tokens + `@utility` blocks) |
| Page metadata / SEO | `src/routes/index.tsx` (`head()`) |

Images live in `src/assets/` and are imported as ES modules. Drop in your own files
with the same names to swap them instantly.

Colors are defined once as `oklch` tokens (`--primary`, `--secondary`, `--accent`,
`--success`, ...). Never hardcode colors in components — use the token utilities
(`bg-primary`, `text-secondary`, `glass-card`, `text-gradient`, `glow-ring`).

## Folder structure

```
public/            static files (favicon, robots.txt)
src/
  assets/          images imported by components
  components/
    portfolio/     all portfolio sections + shared building blocks
      data.ts             content source of truth
      AuroraBackground.tsx animated gradient + particle backdrop
      Navbar.tsx / Hero.tsx / About.tsx / Skills.tsx
      Projects.tsx / Journey.tsx / Contact.tsx / Footer.tsx
      Section.tsx         shared section shell
      Reveal.tsx          scroll-reveal animation wrapper
    ui/            shadcn primitives
  routes/          file-based routes (index.tsx = home, sitemap[.]xml.ts)
  styles.css       design system: tokens, utilities, keyframes
```

## Build & deployment

```bash
bun run build     # production build
bun run preview   # preview the production build locally
```

The project builds to a standard server bundle and deploys as-is to Lovable
(Publish button), or to any host that supports a Node/edge server output.
Pushing to GitHub requires no changes — the repo is self-contained.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `section`, `footer`) and one `h1`.
- All decorative motion respects `prefers-reduced-motion`.
- Images are lazy-loaded with explicit dimensions to avoid layout shift.
- Mobile-first layout with truncation-safe header rows.

## Deploy to Netlify

The repo already contains `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
  NITRO_PRESET = "netlify"
```

Two ways to go live:

1. **Git (recommended)** — push this folder to GitHub, then on Netlify:
   *Add new site → Import an existing project* → pick the repo. The build
   command and publish directory are read from `netlify.toml` automatically.
2. **CLI** — `npm install`, then `npx netlify-cli deploy --build --prod`.

Note: `NITRO_PRESET=netlify` is what switches the server build to Netlify
Functions. Without it the build targets Cloudflare.
