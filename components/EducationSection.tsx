"use client";

import { useCallback, useId, useState } from "react";

import ExternalLink from "@/components/ui/ExternalLink";
import OverlayDialog from "@/components/ui/OverlayDialog";
import Section from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { education, type Education } from "@/lib/data";
import { useCloseOnDesktop } from "@/lib/useCloseOnDesktop";

function SchoolHeader({ school }: { school: Education }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-sm uppercase tracking-label text-ink-muted">{school.period}</p>
        <p className="font-mono text-sm uppercase tracking-label text-ink">{school.grade}</p>
      </div>

      <h3 className="mt-3 text-xl">
        {school.url ? (
          <ExternalLink href={school.url} className="no-underline hover:underline">
            {school.institution}
          </ExternalLink>
        ) : (
          school.institution
        )}
      </h3>
      <p className="mt-1 text-base text-ink-muted">{school.degree}</p>
    </>
  );
}

export function EducationSection() {
  const [openSchool, setOpenSchool] = useState<string | null>(null);
  const close = useCallback(() => setOpenSchool(null), []);
  useCloseOnDesktop(close);
  const headingId = useId();
  const selected = education.find((school) => school.institution === openSchool) ?? null;

  return (
    <Section id="education" heading="Education">
      <ol className="divide-y divide-line border-y border-line">
        {education.map((school) => (
          <li key={school.institution} className="py-7">
            <SchoolHeader school={school} />

            <TagList
              items={school.coursework}
              tone="plain"
              size="sm"
              className="mt-4 hidden lg:flex"
            />

            <button
              type="button"
              onClick={() => setOpenSchool(school.institution)}
              aria-expanded={openSchool === school.institution}
              aria-haspopup="dialog"
              className="mt-4 rounded border border-accent px-3 py-1.5 font-mono text-sm uppercase tracking-label text-accent transition-colors hover:bg-accent hover:text-surface lg:hidden"
            >
              Show courses
            </button>
          </li>
        ))}
      </ol>

      {selected ? (
        <OverlayDialog titleId={headingId} closeLabel="Close coursework" onClose={close}>
          <h3 id={headingId} className="text-xl pr-4">
            {selected.institution}
          </h3>
          <p className="mt-1 text-base text-ink-muted">{selected.degree}</p>
          <p className="mt-6 font-mono text-sm uppercase tracking-label text-ink-muted">
            Coursework
          </p>
          <TagList items={selected.coursework} tone="plain" size="sm" className="mt-3" />
        </OverlayDialog>
      ) : null}
    </Section>
  );
}

export default EducationSection;
