# Ansh Pethani — Portfolio

Personal portfolio site. Next.js 14 (App Router) + TypeScript + Tailwind CSS, statically exported
and hosted on GitHub Pages.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Dev server (no `basePath`, so paths are root-relative) |
| `npm run build`     | Static export to `out/` (also typechecks and lints)  |
| `npm run lint`      | ESLint (`next/core-web-vitals`)                      |
| `npm run typecheck` | `tsc --noEmit`                                       |

The first build fetches the Google fonts and self-hosts them, so it needs network access. There is
no `start` script: `output: "export"` produces static files, and there's no server to run.

## Structure

```
app/
  fonts.ts            next/font declarations → --font-display / --font-body / --font-mono
  globals.css         design tokens, base styles, focus + reduced-motion rules
  icon.svg            favicon (graph-motif monogram)
  layout.tsx          metadata, skip link, sticky header, <main>
  page.tsx            single-page composition of the sections below
components/
  Header.tsx
  Hero.tsx About.tsx ExperienceSection.tsx EducationSection.tsx
  ProjectsSection.tsx PublicationsSection.tsx SkillsSection.tsx ContactSection.tsx
  ui/                 Button, Card, Tag, GraphMotif,
                      Container, Section, ExternalLink, IconLink
lib/
  basePath.ts         optional prefix helper for hand-written public/ URLs (empty for user Pages)
  cn.ts               className joiner
  data.ts             all page content — roles, education, projects, publications, skills, social
  site.ts             site metadata + nav items
public/
  portrait.jpg        hero photo next to the name (3:4 crop, face toward the top)
  resume.pdf          linked from the header Resume button
  .nojekyll           stops GitHub Pages from running Jekyll (which ignores _next/)
.github/workflows/
  deploy.yml          build + publish on every push to main
next.config.js        static export for GitHub Pages (no basePath — user site at domain root)
```

All copy lives in `lib/data.ts`; the section components only lay it out. Adding a role or project
means editing that one file. Section anchors are derived from `navItems` in `lib/site.ts`, and the
header's scroll-spy observes those same ids — keep the two in sync when adding a section.

## Design system

Tokens live as CSS variables in `app/globals.css` (space-separated RGB channels so Tailwind
opacity modifiers work) and are referenced — never duplicated — in `tailwind.config.ts`. The
default Tailwind color palette and font-size scale are **replaced**, not extended, so stock
Tailwind values cannot leak into the design.

**Color** — `bg` `#F1F2ED` · `surface` `#FAFAF7` · `ink` `#1C2620` · `ink-muted` `#5B665F` ·
`accent` `#3E5C76` · `accent-soft` `#DCE3E8` · `line` `#D9DBD2`

Accent is for links, the active nav state, primary buttons, and at most one highlight per card.
Everything else stays in ink / ink-muted / paper tones. No gradients; the only permitted
elevation is a hairline border or `shadow-soft` (4px blur at 8% ink).

**Type** — Fraunces (display, weights 500/600, automatic optical sizing), Inter (body, 400/500),
IBM Plex Mono (metadata: dates, tags, labels). The scale is fixed at
`text-sm` 14 · `text-base` 16 · `text-lg` 18 · `text-xl` 24 · `text-2xl` 32 · `text-3xl` 48 ·
`text-4xl` 64, with negative tracking baked into the large sizes. Reach for weight contrast
before reaching for another color. The `.label` utility is the shorthand for mono metadata.

**Layout** — `<Container width="prose">` (768px) for text-heavy sections,
`<Container width="content">` (1152px) for card grids. Cards are `surface` on a 1px `line`
border at an 8px radius.

## Motion

Two interactions, both small: card hover lift (2px, dropped under reduced motion) and the
header's background/hairline stages as you scroll past the hero. Section content is visible
immediately — no scroll-triggered fade — so the page reads as fast as the browser can paint.

Anything new that moves belongs behind Tailwind's `motion-safe:` prefix, or inside the
`prefers-reduced-motion` block in `globals.css` if it needs an explicit resting state.

## Accessibility

- One global `:focus-visible` treatment (2px accent ring, offset from the page) covers every
  interactive element.
- `prefers-reduced-motion: reduce` cancels all animation, transition, and smooth scrolling, and
  drops the card hover lift while keeping the border colour change.
- Semantic landmarks (`header` / `nav` / `main`), one `h1`, an `h2` per section, and
  anchor `scroll-margin-top` sized to the sticky header.
- The mobile menu sets `aria-expanded`/`aria-controls`, closes on Escape, and pulls its links out
  of the tab order while collapsed.
- External links use `rel="noopener noreferrer"`; `Button`, `ExternalLink`, and `IconLink` apply it
  automatically.

## Deployment

Hosted on GitHub Pages as a **user site** at `https://anshpethani.github.io`. Every push to
`main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes
`out/`.

**Required GitHub setup**

1. The repository **must** be named `anshpethani.github.io` (GitHub only serves the bare
   `https://<user>.github.io` URL from a repo with that exact name). Rename at
   **Settings → General → Repository name** if it is still `ansh-porfolio`.
2. **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.

After a green Actions run the site is live at `https://anshpethani.github.io/`.

There is no `basePath` — assets load from the domain root. Local preview of the export:

```bash
npm run build
npx serve out          # http://localhost:3000
```

### Custom domain

Add a `public/CNAME` file containing only the domain (e.g. `anshpethani.com`), set
`NEXT_PUBLIC_SITE_URL` to the same domain, and point DNS at GitHub Pages.

## Note on Next.js 14

`next@14.2.35` is the final 14.x release, and `npm audit` reports advisories on it that are only
fixed in 15.x/16.x. They are largely DoS and cache-poisoning issues in self-hosted server
features this static site does not use, but upgrading is the real fix if that changes.
