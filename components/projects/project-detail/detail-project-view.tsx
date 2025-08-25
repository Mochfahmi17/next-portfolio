import ProjectImage from "./project-image";
import ProjectInfo from "./project-info";
import ProjectDescription from "./project-description";
import { apiBaseUrl } from "@/lib/api";
import { ProjectDetail, ProjectDetailResponse } from "@/types";
import { notFound } from "next/navigation";
import { use } from "react";

type DetailProjectViewProps = {
  slug: string;
};

const fetchingDetailProject = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/projects/${slug}`, {
    method: "GET",
  });

  const data: ProjectDetailResponse = await res.json();

  if (!res.ok) notFound();

  const project: ProjectDetail = data.data;
  return project;
};

const DetailProjectView = ({ slug }: DetailProjectViewProps) => {
  const project = use(fetchingDetailProject(slug));
  return (
    <main className="text-darkBlue dark:via-midnightIndigo dark:to-electricViolet dark:bg-midnightBlue bg-white dark:bg-gradient-to-tr">
      <section className="min-h-screen pt-24 pb-8">
        <div className="container mx-auto space-y-10 px-[3%]">
          {/* Grid utama: gambar + detail */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Gambar project */}
            <ProjectImage imageUrl={project.imageUrl} alt={project.title} />

            {/* Detail project */}
            <div className="h-full">
              <ProjectInfo
                category={project.categoryProject.name}
                title={project.title}
                dateCreate={project.createdAt}
                skills={project.skills}
                imageUrl={project.imageUrl}
                linkDemo={project.linkDemo}
                linkRepository={project.linkRepository}
              />
            </div>
          </div>

          {/* Description */}
          <ProjectDescription description={project.description} />
        </div>
      </section>
    </main>
  );
};

export default DetailProjectView;
