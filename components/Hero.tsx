import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconLink from "@/components/ui/IconLink";
import { emailComposeUrl, portraitUrl, social } from "@/lib/data";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="pb-section pt-16 sm:pt-24">
      <Container>
        {/*
         * Explicit grid placement rather than order utilities, so the DOM order
         * (portrait, then text) is also the mobile reading order.
         */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <Image
            src={portraitUrl}
            alt={`Portrait of ${site.name}`}
            width={700}
            height={900}
            priority
            sizes="(min-width: 1024px) 18rem, 11rem"
            className="aspect-[3/4] w-36 rounded-card border border-line object-cover object-top sm:w-44 lg:col-start-2 lg:row-start-1 lg:w-64 xl:w-72"
          />

          <div className="max-w-prose lg:col-start-1 lg:row-start-1">
            <h1 id="hero-heading" className="text-3xl font-semibold sm:text-4xl">
              {site.name}
            </h1>

            <p className="mt-6 max-w-[38rem] text-lg text-ink-muted">
              I build and research technical systems, including graph neural networks validating ecological
              data, production ML pipelines, and the full-stack applications that put them in front
              of people.
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
                <IconLink href={emailComposeUrl} label="Email" icon={Mail} />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
