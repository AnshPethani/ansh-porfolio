import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Adds the soft blur on hover for cards that wrap a link. */
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "card-hover rounded-card border border-line bg-surface p-6",
        // 2px lift + hairline shifting to the accent. The lift is dropped under
        // prefers-reduced-motion (see globals.css) while the border stays.
        "transition-[transform,border-color,box-shadow] hover:border-accent",
        "motion-safe:hover:-translate-y-[2px]",
        interactive && "motion-safe:hover:shadow-soft",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;
