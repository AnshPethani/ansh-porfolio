import type { ReactNode } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/cn";

export type SectionProps = {
  /** Anchor target, also used to tie the heading to the section landmark. */
  id: string;
  eyebrow: string;
  heading: string;
  /**
   * Narrows the text column for text-heavy sections. The container itself stays
   * at content width either way, so every section — and the hero — shares one
   * left edge instead of re-centering per section.
   */
  width?: "prose" | "content";
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  heading,
  width = "content",
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-section", className)}>
      <Container width="content">
        <div className={cn(width === "prose" && "max-w-prose")}>
          {/* Heading block leads, body follows a beat later. */}
          <Reveal>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 id={headingId} className="mt-4 text-2xl">
              {heading}
            </h2>
          </Reveal>
          <Reveal delayMs={90} className="mt-10">
            {children}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Section;
