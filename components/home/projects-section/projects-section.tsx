import ProjectsHeader from "./projects-header";
import ProjectsCategoryButtons from "./projects-category-buttons";
import ProjectsGrid from "./projects-grid";
import SeeMoreButton from "./see-more-button";

const ProjectsSection = () => {
  return (
    <section id="projects" className="pt-24 pb-28">
      <div className="container mx-auto px-[3%]">
        {/* Header */}
        <ProjectsHeader />

        {/* Category Project */}
        <ProjectsCategoryButtons />

        {/* Project */}
        <ProjectsGrid className="mt-18" />

        {/* See more btn */}
        <SeeMoreButton />
      </div>
    </section>
  );
};

export default ProjectsSection;
