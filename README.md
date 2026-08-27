# Ansh Pethani — Portfolio

Personal portfolio site. Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Dev server                               |
| `npm run build`     | Production build (also typechecks/lints) |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint (`next/core-web-vitals`)          |
| `npm run typecheck` | `tsc --noEmit`                           |

The first build fetches the Google fonts and self-hosts them, so it needs network access.

## Structure

```
app/
  fonts.ts            next/font declarations → --font-display / --font-body / --font-mono
  globals.css         design tokens, base styles, focus + reduced-motion rules
  layout.tsx          skip link, sticky header, <main>, footer
  page.tsx            single-page composition of the sections below
  styleguide/         temporary token + primitive reference; delete before launch
components/
  GraphMotif.tsx      signature node-and-edge SVG
  layout/             Container, Section, Header, Footer
  sections/           Hero, About, Experience, Education, Projects, Publications, Skills, Contact
  ui/                 Button, Card, Tag, SectionEyebrow, ExternalLink, IconLink
lib/
  cn.ts               className joiner
  data.ts             all page content — roles, education, projects, publications, skills, social
  site.ts             site metadata + nav items
public/
  resume.pdf          placeholder — replace with the real export
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
IBM Plex Mono (metadata: dates, tags, eyebrows). The scale is fixed at
`text-sm` 14 · `text-base` 16 · `text-lg` 18 · `text-xl` 24 · `text-2xl` 32 · `text-3xl` 48 ·
`text-4xl` 64, with negative tracking baked into the large sizes. Reach for weight contrast
before reaching for another color. The `.label` utility is the shorthand for mono metadata.

**Layout** — `<Container width="prose">` (768px) for text-heavy sections,
`<Container width="content">` (1152px) for card grids. Cards are `surface` on a 1px `line`
border at an 8px radius.

## Accessibility

- One global `:focus-visible` treatment (2px accent ring, offset from the page) covers every
  interactive element.
- `prefers-reduced-motion: reduce` cancels all animation, transition, and smooth scrolling; any
  new motion should be authored behind Tailwind's `motion-safe:` prefix.
- Semantic landmarks (`header` / `nav` / `main` / `footer`), a skip link, and anchor
  `scroll-margin-top` sized to the sticky header.
- External links use `rel="noopener noreferrer"`; `Button` applies this automatically when given
  an absolute `href`.

## Note on Next.js 14

`next@14.2.35` is the final 14.x release, and `npm audit` reports advisories on it that are only
fixed in 15.x/16.x. They are largely DoS and cache-poisoning issues in self-hosted server
features this static site does not use, but upgrading is the real fix if that changes.
