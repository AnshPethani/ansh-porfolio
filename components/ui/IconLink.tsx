import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

export type IconLinkProps = {
  href: string;
  /** Accessible name — the icon itself is hidden from assistive tech. */
  label: string;
  icon: LucideIcon;
  /** Renders the label next to the icon instead of only in the accessible name. */
  showLabel?: boolean;
  className?: string;
};

function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

export function IconLink({ href, label, icon: Icon, showLabel = false, className }: IconLinkProps) {
  const external = isExternal(href) && !href.startsWith("mailto:");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={showLabel ? undefined : label}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm text-ink-muted transition-colors hover:text-accent",
        showLabel && "font-mono text-sm uppercase tracking-label",
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {showLabel ? label : null}
    </a>
  );
}

export default IconLink;
