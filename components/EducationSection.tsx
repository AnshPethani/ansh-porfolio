import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import ExternalLink from "@/components/ui/ExternalLink";
import { education } from "@/lib/data";

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" heading="Education">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((school) => (
          <Card as="article" key={school.institution} className="p-6 sm:p-8">
            <p className="font-mono text-sm uppercase tracking-label text-ink-muted">
              {school.period}
            </p>
            <h3 className="mt-3 text-xl">
              {school.url ? (
                <ExternalLink href={school.url} className="no-underline hover:underline">
                  {school.institution}
                </ExternalLink>
              ) : (
                school.institution
              )}
            </h3>
            <p className="mt-2 text-base text-ink-muted">{school.degree}</p>
            <p className="mt-4 font-mono text-sm uppercase tracking-label text-ink">
              {school.grade}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default EducationSection;
