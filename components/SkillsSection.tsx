import Section from "@/components/layout/Section";
import { TagList } from "@/components/ui/Tag";
import { coursework, skillGroups } from "@/lib/data";

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" heading="Tools I work with">
      <dl className="divide-y divide-line border-t border-line">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[9rem_1fr] sm:py-7"
          >
            <dt className="font-mono text-sm uppercase tracking-label text-ink-muted sm:pt-1">
              {group.category}
            </dt>
            <dd>
              <TagList items={group.items} />
            </dd>
          </div>
        ))}
      </dl>

      {/* Coursework stays a caption, not another pill cluster, so it reads as context. */}
      <p className="mt-8 font-mono text-sm leading-relaxed text-ink-muted/80">
        <span className="uppercase tracking-label">Relevant coursework</span>
        {" — "}
        {coursework.join(", ")}
      </p>
    </Section>
  );
}

export default SkillsSection;
