import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Adds a restrained hover treatment for cards that wrap a link. */
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
        "rounded-card border border-line bg-surface p-6",
        interactive &&
          "transition-colors hover:border-accent/40 motion-safe:transition-shadow motion-safe:hover:shadow-soft",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;
