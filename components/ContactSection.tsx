import { Github, Linkedin, Mail } from "lucide-react";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import GraphMotif from "@/components/ui/GraphMotif";
import IconLink from "@/components/ui/IconLink";
import { social } from "@/lib/data";

/**
 * Email, LinkedIn, and GitHub only. No phone number by design — a number
 * published on a public page collects spam and robocalls, and recruiters who
 * need one can ask over email.
 */
export function ContactSection() {
  return (
    <Section id="contact" eyebrow="Get In Touch" heading="Let’s talk" width="prose">
      <div className="relative">

        <p className="max-w-[34rem] text-lg text-ink-muted">
          Open to new-grad SWE/ML/DS roles and research collaborations, please feel free to reach out.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href={`mailto:${social.email}`}>
            <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            Email Me
          </Button>

          <ul className="flex items-center gap-5">
            <li>
              <IconLink href={social.linkedin} label="LinkedIn" icon={Linkedin} showLabel />
            </li>
            <li>
              <IconLink href={social.github} label="GitHub" icon={Github} showLabel />
            </li>
          </ul>
        </div>

        <p className="mt-8 font-mono text-sm tracking-label text-ink-muted">{social.email}</p>
      </div>
    </Section>
  );
}

export default ContactSection;
