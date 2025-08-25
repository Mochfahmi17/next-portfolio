import DetailProjectView from "@/components/projects/project-detail/detail-project-view";
import { apiBaseUrl } from "@/lib/api";
import { ProjectDetailResponse } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

type DetailProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DetailProjectPageProps): Promise<Metadata> {
  const slug = (await params).slug;

  const project: ProjectDetailResponse = await fetch(
    `${apiBaseUrl}/projects/${slug}`,
  ).then((res) => res.json());

  if (!project) {
    return {
      title: "Project Not Found - Mochammad Fahmi",
      description: "This project does not exist.",
    };
  }

  return {
    title: `${project.data.title} - Project by Mochammad Fahmi`,
    description: project.data.description,
    openGraph: {
      title: `${project.data.title} - Project by Mochammad Fahmi`,
      url: `http://localhost:3000/projects/${slug}`,
      images: [
        {
          url: "",
          width: 1200,
          height: 630,
          alt: `${project.data.title} Preview`,
        },
      ],
    },
  };
}

export default function DetailProjectPage({ params }: DetailProjectPageProps) {
  const slug = use(params).slug;

  if (!slug) notFound();

  return <DetailProjectView slug={slug} />;
}
