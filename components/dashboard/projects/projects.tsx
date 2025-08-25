import ProjectsGrid from "@/components/home/projects-section/projects-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Projects = () => {
  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold dark:text-white">
        Projects
      </h2>
      <div className="flex justify-end">
        <Button
          variant="outline"
          asChild
          className="dark:shadow-neon cursor-pointer font-semibold dark:border-2 dark:border-white dark:text-white"
        >
          <Link href="/dashboard/projects/add">Add New Project</Link>
        </Button>
      </div>
      <ProjectsGrid className="mt-8" />
    </div>
  );
};

export default Projects;
