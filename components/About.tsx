import Section from "@/components/ui/Section";
import ExternalLink from "@/components/ui/ExternalLink";

export function About() {
  return (
    <Section id="about" heading="About" width="prose">
      <div className="space-y-5 text-lg text-ink-muted">
        <p>
          I&rsquo;m a Master of Computer Science student at
          North Carolina State University, holding a 4.0
          GPA, after a B.Tech in Information Technology from Vellore Institute of Technology
          (8.91/10 CGPA).
        </p>
        <p>
          At the iEXCEL Lab I work on graph neural networks that validate trophic interactions in
          crowdsourced food web data, and on folding pre-trained multi-species computer vision
          models into the lab&rsquo;s existing web stack. It is a mixture of research and product development, 
          which is the part I like.
        </p>
        <p>
          Before that, I spent two years in research labs and startups, working on Python ETL pipelines that
          reconcile conflicting CSV, XML, and JSON records, LLM tooling for automated quiz
          generation, object detection models, and full-stack products in React, FastAPI, and
          PostgreSQL. I&rsquo;ve also published two peer-reviewed papers, on NFT copyright law
          and on data security in marketing.
        </p>
      </div>
    </Section>
  );
}

export default About;
