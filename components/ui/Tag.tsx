import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1",
        "font-mono text-sm uppercase leading-none tracking-label text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Convenience wrapper for the common "row of tech tags" case. */
export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export default Tag;
