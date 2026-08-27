import About from "@/components/sections/About";
import ContactSection from "@/components/sections/ContactSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import SkillsSection from "@/components/sections/SkillsSection";

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
