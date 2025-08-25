import { Suspense } from "react";
import ProjectsGrid from "../home/projects-section/projects-grid";
import ProjetcsFilter from "./projects-filter";
import LoaderCircle from "../loader-circle";

const AllProjectView = () => {
  return (
    <main className="text-darkBlue dark:via-midnightIndigo dark:to-electricViolet dark:bg-midnightBlue bg-white dark:bg-gradient-to-tr">
      <section className="min-h-screen py-24">
        <div className="container mx-auto px-[3%]">
          <h2 className="text-darkBlue text-center text-2xl font-semibold dark:text-white">
            All Projects
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">
            Explore a collection of my projects, showcasing different skills,
            technologies, and experiences I have worked on.
          </p>
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                  <div className="h-8 w-8">
                    <LoaderCircle />
                  </div>
                </div>
              }
            >
              <ProjetcsFilter />
            </Suspense>
          </div>
          <ProjectsGrid className="mt-8" />
        </div>
      </section>
    </main>
  );
};

export default AllProjectView;
