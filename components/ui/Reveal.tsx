"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

export type RevealProps = {
  children: React.ReactNode;
  /** Staggers siblings. Kept small — this should read as a settle, not a sequence. */
  delayMs?: number;
  className?: string;
};

/**
 * Fades and lifts its children into place once they enter the viewport.
 *
 * The hidden starting state lives in the `.reveal` class in globals.css, which
 * is overridden both by `prefers-reduced-motion: reduce` and by a <noscript>
 * rule in the root layout — so the content is never dependent on this
 * component actually running.
 */
export function Reveal({ children, delayMs = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", revealed && "is-revealed", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default Reveal;
