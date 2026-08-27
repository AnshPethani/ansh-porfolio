import type { ReactNode } from "react";

import Container from "@/components/layout/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/cn";

export type SectionProps = {
  /** Anchor target, also used to tie the heading to the section landmark. */
  id: string;
  eyebrow: string;
  heading: string;
  /** `prose` for text-heavy sections, `content` for card grids. */
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
      <Container width={width}>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 id={headingId} className="mt-4 text-2xl">
          {heading}
        </h2>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

export default Section;
