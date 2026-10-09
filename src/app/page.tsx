import { Hero } from "@/sections/hero/hero";
import { Skills } from "@/sections/skills/skills";
import { ProjectsSection } from "@/sections/projects/projects";
import { FocusAreas } from "@/sections/focus/focus-areas";
import { About } from "@/sections/about/about";
import { Education } from "@/sections/education/education";
import { Certificates } from "@/sections/certificates/certificates";
import { Achievements } from "@/sections/achievements/achievements";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <ProjectsSection />
      <FocusAreas />
      <About />
      <Education />
      <Certificates />
      <Achievements />
      <Contact />
    </>
  );
}
