import AboutSection from "@/components/home/about-section/about-section";
import CertificateSection from "@/components/home/certificate-section/certificate-section";
import ContactSection from "@/components/home/contact-section/contact-section";
import HeroSection from "@/components/home/hero-section/hero-section";
import ProjectsSection from "@/components/home/projects-section/projects-section";
import SkillsSection from "@/components/home/skills-section/skills-section";

export default function Home() {
  return (
    <main className="text-darkBlue dark:via-midnightIndigo dark:to-electricViolet dark:bg-midnightBlue bg-white dark:bg-gradient-to-tr">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificateSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
