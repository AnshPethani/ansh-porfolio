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
  globals.css         design tokens, base styles, reveal, focus + reduced-motion rules
  icon.svg            favicon (graph-motif monogram)
  layout.tsx          metadata, skip link, sticky header, <main>, footer
  page.tsx            single-page composition of the sections below
components/
  Header.tsx Footer.tsx
  Hero.tsx About.tsx ExperienceSection.tsx EducationSection.tsx
  ProjectsSection.tsx PublicationsSection.tsx SkillsSection.tsx ContactSection.tsx
  ui/                 Button, Card, Tag, SectionEyebrow, GraphMotif,
                      Container, Section, Reveal, ExternalLink, IconLink
lib/
  basePath.ts         prefixes hand-written URLs for the GitHub Pages subpath
  cn.ts               className joiner
  data.ts             all page content — roles, education, projects, publications, skills, social
  site.ts             site metadata + nav items
public/
  resume.pdf          linked from the header Resume button
  .nojekyll           stops GitHub Pages from running Jekyll (which ignores _next/)
.github/workflows/
  deploy.yml          build + publish on every push to main
next.config.js        static export, basePath/assetPrefix for the Pages subpath
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

## Motion

Four interactions, all small: section reveals, card hover lift, the header's background/hairline
stages, and the graph motif drawing its edges in.

`Reveal` (`components/ui/Reveal.tsx`) hides its children until an IntersectionObserver sees them.
Because that starting state is real CSS, it has two escape hatches so content can never be
stranded invisible: a `<noscript>` rule in `app/layout.tsx` unhides everything when JS is off, and
the `prefers-reduced-motion` block in `globals.css` resolves reveals straight to their final state.

Anything new that moves belongs behind Tailwind's `motion-safe:` prefix, or inside that
reduced-motion block if it needs an explicit resting state.

## Accessibility

- One global `:focus-visible` treatment (2px accent ring, offset from the page) covers every
  interactive element.
- `prefers-reduced-motion: reduce` cancels all animation, transition, and smooth scrolling, and
  drops the card hover lift while keeping the border colour change.
- Semantic landmarks (`header` / `nav` / `main` / `footer`), one `h1`, an `h2` per section, and
  anchor `scroll-margin-top` sized to the sticky header.
- The mobile menu sets `aria-expanded`/`aria-controls`, closes on Escape, and pulls its links out
  of the tab order while collapsed.
- External links use `rel="noopener noreferrer"`; `Button`, `ExternalLink`, and `IconLink` apply it
  automatically.

## Deployment

Hosted on GitHub Pages, built by GitHub Actions — no external platform involved. Every push to
`main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes
`out/`. No manual deploy step.

**One-time repo setup** (needed once before the first deploy): in the GitHub repo go to
**Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. After the
first green run the site is live at `https://anshpethani.github.io/ansh-porfolio/`.

Because Pages serves from a subpath, `next.config.js` sets `basePath`/`assetPrefix` to a
`REPO_NAME` constant that **must match the repository name exactly** — it is currently
`ansh-porfolio`, matching the (misspelled) repo. Rename the repo and you must change it here too,
or every asset 404s.

To test the static export locally the way Pages serves it:

```bash
npm run build
npx serve out          # http://localhost:3000
```

Note that `npm run build` applies `basePath`, so the export expects to live under
`/ansh-porfolio/`. Serving `out/` at the root will 404 on assets; either nest it
(`mkdir -p tmp/ansh-porfolio && cp -R out/. tmp/ansh-porfolio/ && npx serve tmp`) or just use
`npm run dev`, where `basePath` is disabled.

### Custom domain

To use a custom domain instead of the `github.io` subpath: delete `REPO_NAME`, `basePath`, and
`assetPrefix` from `next.config.js`, add a `public/CNAME` file containing only the domain
(e.g. `anshpethani.com`), set `NEXT_PUBLIC_SITE_URL` to the same domain, and point the DNS record
at GitHub Pages.

## Note on Next.js 14

`next@14.2.35` is the final 14.x release, and `npm audit` reports advisories on it that are only
fixed in 15.x/16.x. They are largely DoS and cache-poisoning issues in self-hosted server
features this static site does not use, but upgrading is the real fix if that changes.
