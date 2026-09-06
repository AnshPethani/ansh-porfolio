import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type TagTone = "meta" | "plain";
export type TagSize = "md" | "sm";

export type TagProps = {
  children: ReactNode;
  /**
   * `meta` is the original: mono, uppercase, wide tracking — for short tech
   * names. `plain` keeps the pill shape but leaves the words in sentence case,
   * so longer labels (course names) stay readable.
   */
  tone?: TagTone;
  size?: TagSize;
  className?: string;
};

const tones: Record<TagTone, string> = {
  meta: "font-mono uppercase leading-none tracking-label",
  plain: "font-sans font-medium leading-snug",
};

const sizes: Record<TagSize, string> = {
  md: "px-2.5 py-1 text-sm",
  sm: "px-2 py-0.5 text-sm",
};

export function Tag({ children, tone = "meta", size = "md", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent-soft text-ink",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Convenience wrapper for the common "row of tech tags" case. */
export function TagList({
  items,
  tone = "meta",
  size = "md",
  className,
}: {
  items: string[];
  tone?: TagTone;
  size?: TagSize;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone} size={size}>
            {item}
          </Tag>
        </li>
      ))}
    </ul>
  );
}

export default Tag;
