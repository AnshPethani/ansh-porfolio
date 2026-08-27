import Section from "@/components/layout/Section";
import ExternalLink from "@/components/ui/ExternalLink";

export function About() {
  return (
    <Section id="about" eyebrow="About" heading="About" width="prose">
      <div className="space-y-5 text-lg text-ink-muted">
        <p>
          I&rsquo;m a Master of Computer Science candidate at{" "}
          <ExternalLink href="https://www.ncsu.edu">NC State University</ExternalLink>, holding a 4.0
          GPA, after a B.Tech in Information Technology from Vellore Institute of Technology
          (8.91/10 CGPA).
        </p>
        <p>
          At the iEXCEL Lab I work on graph neural networks that validate trophic interactions in
          crowdsourced food web data, and on folding pre-trained multi-species computer vision
          models into the lab&rsquo;s existing web stack. It is research that has to survive contact
          with a production deployment, which is the part I like.
        </p>
        <p>
          Before that I spent two years across research labs and startups: Python ETL pipelines that
          reconcile conflicting CSV, XML, and JSON records; LLM tooling for automated quiz
          generation; object detection models; and full-stack products in React, FastAPI, and
          PostgreSQL. I&rsquo;ve also published two peer-reviewed book chapters, on NFT copyright law
          and on data security in marketing.
        </p>
      </div>
    </Section>
  );
}

export default About;
