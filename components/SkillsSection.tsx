import Section from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { skillGroups } from "@/lib/data";

export function SkillsSection() {
  return (
    <Section id="skills" heading="Tools I work with">
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
    </Section>
  );
}

export default SkillsSection;
