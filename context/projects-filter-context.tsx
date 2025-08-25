"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type ProjectsFilterContextProps = {
  category: string;
  setCategory: (value: string) => void;
};

const ProjectsFilterContext = createContext<ProjectsFilterContextProps | null>(
  null,
);

export const ProjectFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [category, setCategoryState] = useState(
    searchParams.get("category") ||
      (pathname.includes("/projects") ? "all" : "Web Developer"),
  );

  useEffect(() => {
    const newCategory =
      searchParams.get("category") ||
      (pathname.includes("/projects") ? "all" : "Web Developer");
    setCategoryState(newCategory);
  }, [searchParams, pathname]);

  const setCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryName === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }

    router.push(`?${params.toString()}`, { scroll: false });
    setCategoryState(categoryName);
  };

  return (
    <ProjectsFilterContext.Provider value={{ category, setCategory }}>
      {children}
    </ProjectsFilterContext.Provider>
  );
};

export const useProjectsFilter = () => {
  const context = useContext(ProjectsFilterContext);
  if (!context)
    throw new Error(
      "useProjectsFilter must be used within ProjectFilterProvider",
    );
  return context;
};
