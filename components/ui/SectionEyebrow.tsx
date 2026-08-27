import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type SectionEyebrowProps = {
  children: ReactNode;
  /** Set when the eyebrow labels a section landmark, so it can be referenced by aria-labelledby. */
  id?: string;
  className?: string;
};

/**
 * Mono, uppercase label preceded by a small graph "node" — the divider role a
 * generic <hr> would play, tied to the site's node-and-edge motif instead.
 */
export function SectionEyebrow({ children, id, className }: SectionEyebrowProps) {
  return (
    <p
      id={id}
      className={cn(
        "flex items-center gap-2.5 font-mono text-sm uppercase tracking-label-wide text-ink-muted",
        className,
      )}
    >
      <svg viewBox="0 0 8 8" className="h-2 w-2 shrink-0" fill="none" aria-hidden="true">
        <circle cx="4" cy="4" r="3" fill="rgb(var(--accent))" opacity="0.85" />
      </svg>
      {children}
    </p>
  );
}

export default SectionEyebrow;
