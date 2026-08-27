import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import GraphMotif from "@/components/GraphMotif";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { TagList } from "@/components/ui/Tag";

/**
 * Temporary reference page for the design system. Safe to delete once the real
 * pages exist.
 */
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const TYPE_SCALE = [
  { cls: "text-4xl", label: "64 / display" },
  { cls: "text-3xl", label: "48 / display" },
  { cls: "text-2xl", label: "32 / display" },
  { cls: "text-xl", label: "24 / display" },
] as const;

const SWATCHES = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "ink", cls: "bg-ink" },
  { name: "ink-muted", cls: "bg-ink-muted" },
  { name: "accent", cls: "bg-accent" },
  { name: "accent-soft", cls: "bg-accent-soft" },
  { name: "line", cls: "bg-line" },
] as const;

export default function StyleguidePage() {
  return (
    <Container className="space-y-section py-section">
      <header>
        <SectionEyebrow>Styleguide</SectionEyebrow>
        <h1 className="mt-4 text-3xl">Tokens &amp; primitives</h1>
      </header>

      <section aria-labelledby="sg-type" className="space-y-6">
        <h2 id="sg-type" className="text-xl">
          Type scale
        </h2>
        <div className="space-y-4">
          {TYPE_SCALE.map((item) => (
            <div key={item.cls} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <span className={`${item.cls} font-display font-medium`}>Graph structure</span>
              <span className="label">{item.label}</span>
            </div>
          ))}
          <p className="max-w-prose text-lg">
            18px Inter lead paragraph — clean, modern, legible at small sizes.
          </p>
          <p className="max-w-prose text-base text-ink-muted">
            16px Inter body copy in ink-muted for secondary reading.
          </p>
          <p className="label">14 / mono / metadata</p>
        </div>
      </section>

      <section aria-labelledby="sg-color" className="space-y-6">
        <h2 id="sg-color" className="text-xl">
          Palette
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {SWATCHES.map((swatch) => (
            <li key={swatch.name}>
              <div className={`${swatch.cls} h-16 rounded border border-line`} />
              <p className="mt-2 font-mono text-sm text-ink-muted">{swatch.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sg-controls" className="space-y-6">
        <h2 id="sg-controls" className="text-xl">
          Controls
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/">Primary action</Button>
          <Button variant="secondary" href="https://github.com">
            Secondary <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="sm" disabled>
            Disabled
          </Button>
        </div>
        <TagList items={["PyTorch", "Graph Neural Networks", "TypeScript", "Next.js"]} />
      </section>

      <section aria-labelledby="sg-cards" className="space-y-6">
        <h2 id="sg-cards" className="text-xl">
          Cards
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <p className="label">2026</p>
            <h3 className="mt-2 text-xl">Static card</h3>
            <p className="mt-3 text-base text-ink-muted">
              Surface background, 1px hairline border, 8px radius, no shadow.
            </p>
          </Card>
          <Card interactive>
            <p className="label">2026</p>
            <h3 className="mt-2 text-xl">Interactive card</h3>
            <p className="mt-3 text-base text-ink-muted">
              Border warms toward the accent on hover, with a very soft blur.
            </p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="sg-motif" className="space-y-6">
        <h2 id="sg-motif" className="text-xl">
          Graph motif
        </h2>
        <div className="grid items-center gap-8 sm:grid-cols-3">
          <GraphMotif variant="constellation" animated />
          <GraphMotif variant="cluster" tone="accent" />
          <GraphMotif variant="spine" />
        </div>
      </section>
    </Container>
  );
}
