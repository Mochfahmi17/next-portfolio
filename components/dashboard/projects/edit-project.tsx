import EditProjectForm from "./edit-project-form";
import { apiBaseUrl } from "@/lib/api";
import { ProjectDetail } from "@/types";
import { notFound } from "next/navigation";

type EditProjectProps = {
  slug: string;
};

const EditProject = async ({ slug }: EditProjectProps) => {
  const res = await fetch(`${apiBaseUrl}/projects/${slug}`);

  if (!res.ok) return notFound();

  const data = await res.json();

  const project: ProjectDetail = data.data;

  return (
    <div>
      <h2 className="mb-8 text-center text-2xl font-semibold dark:text-white">
        Edit Project
      </h2>
      <EditProjectForm initialData={project} />
    </div>
  );
};

export default EditProject;
