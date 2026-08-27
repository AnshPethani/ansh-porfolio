import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import ExternalLink from "@/components/ui/ExternalLink";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { earlierRoles, mainRoles, type Role } from "@/lib/data";

function BulletList({ bullets, compact }: { bullets: string[]; compact?: boolean }) {
  return (
    <ul className={cn("space-y-2.5", compact ? "text-sm" : "text-base")}>
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 text-ink-muted">
          {/* Node-shaped marker rather than a disc, echoing the graph motif. */}
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

function RoleCard({ role, headingLevel = "h3" }: { role: Role; headingLevel?: "h3" | "h4" }) {
  const compact = role.tier === "earlier";
  const Heading = headingLevel;

  return (
    <Card
      as="article"
      className={cn(
        "grid gap-x-8 gap-y-4",
        compact ? "p-5" : "p-6 sm:p-8 lg:grid-cols-[11rem_1fr]",
      )}
    >
      <div className={compact ? "" : "lg:pt-1"}>
        <p className="font-mono text-sm uppercase tracking-label text-ink-muted">{role.period}</p>
        {role.location ? (
          <p className="mt-1 font-mono text-sm text-ink-muted/80">{role.location}</p>
        ) : null}
      </div>

      <div>
        <Heading className={compact ? "text-lg font-semibold" : "text-xl"}>{role.title}</Heading>
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
    </Card>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" heading="Where I’ve worked">
      <div className="space-y-5">
        {mainRoles.map((role) => (
          <RoleCard key={`${role.company}-${role.period}`} role={role} />
        ))}
      </div>

      <h3 className="mt-14 font-mono text-sm font-normal uppercase tracking-label-wide text-ink-muted">
        Earlier Experience
      </h3>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {earlierRoles.map((role) => (
          <RoleCard key={`${role.company}-${role.period}`} role={role} headingLevel="h4" />
        ))}
      </div>
    </Section>
  );
}

export default ExperienceSection;
