import SkillsGrid from "./skills-grid";
import SkillsHeading from "./skills-heading";

const SkillsSection = () => {
  return (
    <section id="skills" className="pt-24 pb-28">
      <div className="container mx-auto px-[3%]">
        {/* Header */}
        <SkillsHeading />

        {/* Skills */}
        <SkillsGrid />
      </div>
    </section>
  );
};

export default SkillsSection;
