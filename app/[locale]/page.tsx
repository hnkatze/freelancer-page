import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { TeamSection } from "@/components/sections/team";
import { TechMarquee } from "@/components/sections/tech-marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TechMarquee />
      <Services />
      <TeamSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
