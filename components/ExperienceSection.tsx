"use client";

import { useCallback, useId, useState } from "react";

import Card from "@/components/ui/Card";
import ExternalLink from "@/components/ui/ExternalLink";
import OverlayDialog from "@/components/ui/OverlayDialog";
import Section from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { earlierRoles, mainRoles, type Role } from "@/lib/data";
import { useCloseOnDesktop } from "@/lib/useCloseOnDesktop";

function roleKey(role: Role) {
  return `${role.company}-${role.period}`;
}

function BulletList({ bullets, compact }: { bullets: string[]; compact?: boolean }) {
  return (
    <ul className={cn("space-y-2.5", compact ? "text-sm" : "text-base")}>
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 text-ink-muted">
          <span
            aria-hidden="true"
            className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent/60"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function RoleDetail({
  role,
  headingId,
  headingLevel = "h3",
}: {
  role: Role;
  headingId?: string;
  headingLevel?: "h3" | "h4";
}) {
  const compact = role.tier === "earlier";
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "grid gap-x-8 gap-y-4",
        !compact && "lg:grid-cols-[11rem_1fr]",
      )}
    >
      <div className={compact ? "" : "lg:pt-1"}>
        <p className="font-mono text-sm uppercase tracking-label text-ink-muted">{role.period}</p>
        {role.location ? (
          <p className="mt-1 font-mono text-sm text-ink-muted/80">{role.location}</p>
        ) : null}
      </div>

      <div>
        <Heading id={headingId} className={compact ? "text-lg font-semibold" : "text-xl"}>
          {role.title}
        </Heading>
        <p className="mt-1 text-base">
          {role.url ? (
            <ExternalLink href={role.url}>{role.company}</ExternalLink>
          ) : (
            <span className="text-ink-muted">{role.company}</span>
          )}
        </p>

        <div className="mt-4">
          <BulletList bullets={role.bullets} compact={compact} />
        </div>

        {role.tech && role.tech.length > 0 ? <TagList items={role.tech} className="mt-5" /> : null}
      </div>
    </div>
  );
}

function RoleCard({ role, headingLevel = "h3" }: { role: Role; headingLevel?: "h3" | "h4" }) {
  const compact = role.tier === "earlier";

  return (
    <Card as="article" className={compact ? "p-5" : "p-6 sm:p-8"}>
      <RoleDetail role={role} headingLevel={headingLevel} />
    </Card>
  );
}

function RoleSummaryButton({
  role,
  expanded,
  onOpen,
}: {
  role: Role;
  expanded: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={expanded}
      aria-haspopup="dialog"
      className="flex w-full items-start justify-between gap-4 rounded-card border border-line bg-surface px-5 py-4 text-left transition-colors hover:border-accent"
    >
      <span className="min-w-0">
        <span className="block font-display text-lg font-medium text-ink">{role.title}</span>
        <span className="mt-1 block text-base text-ink-muted">{role.company}</span>
        <span className="mt-2 block font-mono text-sm uppercase tracking-label text-ink-muted">
          {role.period}
        </span>
      </span>
      <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-sm text-accent">
        View
      </span>
    </button>
  );
}

function RoleDialog({ role, onClose }: { role: Role; onClose: () => void }) {
  const headingId = useId();

  return (
    <OverlayDialog titleId={headingId} closeLabel="Close experience details" onClose={onClose}>
      <RoleDetail role={role} headingId={headingId} />
    </OverlayDialog>
  );
}

function MobileRoleList({
  roles,
  openKey,
  onOpen,
}: {
  roles: Role[];
  openKey: string | null;
  onOpen: (key: string) => void;
}) {
  return (
    <ul className="space-y-3">
      {roles.map((role) => {
        const key = roleKey(role);
        return (
          <li key={key}>
            <RoleSummaryButton
              role={role}
              expanded={openKey === key}
              onOpen={() => onOpen(key)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function ExperienceSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const close = useCallback(() => setOpenKey(null), []);
  useCloseOnDesktop(close);
  const openRole =
    [...mainRoles, ...earlierRoles].find((role) => roleKey(role) === openKey) ?? null;

  return (
    <Section id="experience" heading="Experience">
      {/* Desktop: full cards. Below lg: title/company/date only, details in a dialog. */}
      <div className="hidden space-y-5 lg:block">
        {mainRoles.map((role) => (
          <RoleCard key={roleKey(role)} role={role} />
        ))}
      </div>
      <div className="lg:hidden">
        <MobileRoleList roles={mainRoles} openKey={openKey} onOpen={setOpenKey} />
      </div>

      <h3 className="mt-14 font-mono text-sm font-normal uppercase tracking-label-wide text-ink-muted">
        Earlier Experience
      </h3>
      <div className="mt-5 hidden gap-5 lg:grid lg:grid-cols-2">
        {earlierRoles.map((role) => (
          <RoleCard key={roleKey(role)} role={role} headingLevel="h4" />
        ))}
      </div>
      <div className="mt-5 lg:hidden">
        <MobileRoleList roles={earlierRoles} openKey={openKey} onOpen={setOpenKey} />
      </div>

      {openRole ? <RoleDialog role={openRole} onClose={close} /> : null}
    </Section>
  );
}

export default ExperienceSection;
