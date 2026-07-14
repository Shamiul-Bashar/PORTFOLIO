import { Hero } from "@/sections/hero/hero";
import { About } from "@/sections/about/about";
import { Education } from "@/sections/education/education";
import { ProjectsSection } from "@/sections/projects/projects";
import { Certificates } from "@/sections/certificates/certificates";
import { Skills } from "@/sections/skills/skills";
import { Achievements } from "@/sections/achievements/achievements";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <ProjectsSection />
      <Certificates />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  );
}