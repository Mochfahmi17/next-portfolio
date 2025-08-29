"use client";

import useSWR from "swr";
import ProjectCard from "./project-card";
import { fetcher } from "@/lib/swr/fetcher";
import { apiBaseUrl } from "@/lib/api";
import { ProjectsResponse } from "@/types";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import { easeOut, motion, stagger, Variants } from "motion/react";
import clsx from "clsx";
import { useProjectsFilter } from "@/context/projects-filter-context";

type ProjectsGridProps = {
  className?: string;
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.6),
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const ProjectsGrid = ({ className }: ProjectsGridProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { category } = useProjectsFilter();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = pathname.includes("/projects") ? 10 : 6;

  const routeIsDashboard = pathname.startsWith("/dashboard");

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category !== "all") {
    query.set("category", category);
  }

  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<ProjectsResponse>(`${apiBaseUrl}/projects?${query}`, fetcher);

  const projects = response?.data ?? [];

  return (
    <>
      <motion.div
        key={category}
        variants={container}
        initial="hidden"
        {...(pathname === "/" && !searchParams.get("category")
          ? { whileInView: "show", viewport: { once: true, amount: 0.1 } }
          : { animate: "show" })}
        viewport={{ once: true, amount: 0.1 }}
        className={clsx(
          "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {isLoading ? (
          <ProjectCardSkeleton column={6} />
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <motion.div key={project.id} variants={item} className="h-full">
              <ProjectCard
                image={project.imageUrl}
                title={project.title}
                slug={project.slug}
                description={project.description}
                category={project.categoryProject.name}
                skills={project.skills}
                createdAt={project.createdAt}
                mutate={mutate}
                isRouteDashboard={routeIsDashboard}
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-600">
            Project not found!
          </p>
        )}
      </motion.div>
      {response &&
        response.totalPages > 1 &&
        pathname.includes("/projects") && (
          <Pagination
            totalPages={response.totalPages}
            currentPage={response.page}
          />
        )}
    </>
  );
};

export default ProjectsGrid;
