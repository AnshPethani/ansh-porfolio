import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import IconLink from "@/components/ui/IconLink";
import { social } from "@/lib/data";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="hairline-t py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm uppercase tracking-label text-ink-muted transition-colors hover:border-accent hover:text-accent"
          >
            <span className="-mr-[0.12em]">{site.monogram}</span>
          </Link>
          <p className="font-mono text-sm uppercase tracking-label text-ink-muted">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>

        <ul className="flex items-center gap-5">
          <li>
            <IconLink href={social.github} label="GitHub" icon={Github} />
          </li>
          <li>
            <IconLink href={social.linkedin} label="LinkedIn" icon={Linkedin} />
          </li>
          <li>
            <IconLink href={`mailto:${social.email}`} label="Email" icon={Mail} />
          </li>
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
