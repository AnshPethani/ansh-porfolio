import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import SkillsSection from "@/components/SkillsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <PublicationsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
