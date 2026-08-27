import { Github, Linkedin, Mail } from "lucide-react";

import GraphMotif from "@/components/GraphMotif";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import IconLink from "@/components/ui/IconLink";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { social } from "@/lib/data";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative pb-section pt-16 sm:pt-24">
      <Container className="relative">
        {/* Sits behind the text on wide screens; withheld on mobile where space is tight. */}
        <GraphMotif
          variant="constellation"
          animated
          className="pointer-events-none absolute right-0 top-1/2 hidden w-[18rem] -translate-y-1/2 lg:block xl:w-[25rem]"
        />

        <div className="relative max-w-prose">
          <SectionEyebrow>MSCS @ NC State · AI/ML Research &amp; Engineering</SectionEyebrow>

          <h1 id="hero-heading" className="mt-6 text-3xl font-semibold sm:text-4xl">
            {site.name}
          </h1>

          <p className="mt-6 max-w-[38rem] text-lg text-ink-muted">
            I build and research AI systems, including graph neural networks validating ecological
            data, production ML pipelines, and the full-stack applications that put them in front of
            people.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects">View My Work</Button>
            <Button href="#contact" variant="secondary">
              Get In Touch
            </Button>
          </div>

          <ul className="mt-10 flex items-center gap-5">
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
        </div>
      </Container>
    </section>
  );
}

export default Hero;
