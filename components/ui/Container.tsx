import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Width = "prose" | "content";

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** `prose` for text-heavy single columns, `content` for card grids. */
  width?: Width;
  children: ReactNode;
};

const widths: Record<Width, string> = {
  prose: "max-w-prose",
  content: "max-w-content",
};

export function Container({
  as: Tag = "div",
  width = "content",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)} {...rest}>
      {children}
    </Tag>
  );
}

export default Container;
