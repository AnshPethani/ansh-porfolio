import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Every outbound link on the site funnels through here so rel/target stay consistent. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-sm text-accent underline decoration-accent/30 decoration-1 underline-offset-4",
        "transition-colors hover:decoration-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
