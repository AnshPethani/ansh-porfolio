import { ArrowUpRight } from "lucide-react";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Selected Work" heading="Projects">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card
            as="article"
            key={project.name}
            interactive={Boolean(project.url)}
            className="flex flex-col p-6 sm:p-8"
          >
            <p className="font-mono text-sm uppercase tracking-label text-ink-muted">
              {project.year}
            </p>

            <div className="mt-3 flex items-start justify-between gap-4">
              <h3 className="text-xl">{project.name}</h3>
              {/* Link icon appears only once a repo or demo URL exists in the data. */}
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} — open project`}
                  className="mt-1 shrink-0 rounded-sm text-ink-muted transition-colors hover:text-accent"
                >
                  <ArrowUpRight aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ) : null}
            </div>

            <p className="mt-4 text-base text-ink-muted">{project.pitch}</p>

            {/* mt-auto keeps the tag row aligned across cards of unequal height. */}
            <TagList items={project.tech} className="mt-auto pt-6" />
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default ProjectsSection;
