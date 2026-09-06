"use client";

import { ArrowUpRight } from "lucide-react";
import { useCallback, useId, useState } from "react";

import Card from "@/components/ui/Card";
import OverlayDialog from "@/components/ui/OverlayDialog";
import Section from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { projects, type Project } from "@/lib/data";
import { useCloseOnDesktop } from "@/lib/useCloseOnDesktop";

function ProjectDetail({ project, headingId }: { project: Project; headingId?: string }) {
  return (
    <>
      <p className="font-mono text-sm uppercase tracking-label text-ink-muted">{project.year}</p>

      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 id={headingId} className="text-xl">
          {project.name}
        </h3>
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
      <TagList items={project.tech} className="mt-6" />
    </>
  );
}

export function ProjectsSection() {
  const [openName, setOpenName] = useState<string | null>(null);
  const close = useCallback(() => setOpenName(null), []);
  useCloseOnDesktop(close);
  const headingId = useId();
  const openProject = projects.find((project) => project.name === openName) ?? null;

  return (
    <Section id="projects" heading="Projects">
      <div className="hidden grid-cols-2 gap-5 lg:grid">
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
            <TagList items={project.tech} className="mt-auto pt-6" />
          </Card>
        ))}
      </div>

      <ul className="space-y-3 lg:hidden">
        {projects.map((project) => (
          <li key={project.name}>
            <button
              type="button"
              onClick={() => setOpenName(project.name)}
              aria-expanded={openName === project.name}
              aria-haspopup="dialog"
              className="flex w-full items-start justify-between gap-4 rounded-card border border-line bg-surface px-5 py-4 text-left transition-colors hover:border-accent"
            >
              <span className="min-w-0">
                <span className="block font-display text-lg font-medium text-ink">
                  {project.name}
                </span>
                <span className="mt-2 block font-mono text-sm uppercase tracking-label text-ink-muted">
                  {project.year}
                </span>
              </span>
              <span aria-hidden="true" className="mt-1 shrink-0 font-mono text-sm text-accent">
                View
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openProject ? (
        <OverlayDialog titleId={headingId} closeLabel="Close project details" onClose={close}>
          <ProjectDetail project={openProject} headingId={headingId} />
        </OverlayDialog>
      ) : null}
    </Section>
  );
}

export default ProjectsSection;
