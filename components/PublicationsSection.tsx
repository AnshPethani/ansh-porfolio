import { ArrowUpRight } from "lucide-react";

import Section from "@/components/layout/Section";
import { publications } from "@/lib/data";

export function PublicationsSection() {
  return (
    <Section id="publications" eyebrow="Publications" heading="Publications" width="prose">
      {/* Citation list rather than cards — the academic convention reads better here. */}
      <ol className="divide-y divide-line border-y border-line">
        {publications.map((publication) => (
          <li key={publication.url} className="py-7">
            <p className="font-mono text-sm uppercase tracking-label text-ink-muted">
              {publication.year}
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug">
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-sm transition-colors hover:text-accent"
              >
                {publication.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-1.5 inline h-4 w-4 -translate-y-[1px] text-ink-muted transition-colors group-hover:text-accent"
                  strokeWidth={1.75}
                />
              </a>
            </h3>
            <p className="mt-2 text-base text-ink-muted">{publication.authors}</p>
            <p className="mt-1 text-base italic text-ink-muted">{publication.venue}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default PublicationsSection;
