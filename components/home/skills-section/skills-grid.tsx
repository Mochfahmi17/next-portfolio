"use client";

import useSWR from "swr";
import SkillCard from "./skill-card";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";
import { SkillsResponse } from "@/types";
import SkillCardSkeleton from "@/components/skill-card-skeleton";
import { usePathname } from "next/navigation";
import { motion, easeOut, stagger, Variants } from "motion/react";

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

const SkillsGrid = () => {
  const pathname = usePathname();

  const routeIsDashboard = pathname.startsWith("/dashboard");

  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<SkillsResponse>(`${apiBaseUrl}/skills`, fetcher);

  const skills = response?.data ?? [];
  return (
    <motion.div
      variants={container}
      initial="hidden"
      {...(pathname === "/"
        ? { whileInView: "show", viewport: { once: true, amount: 0.2 } }
        : { animate: "show" })}
      viewport={{ once: true, amount: 0.2 }}
      className={`${routeIsDashboard ? "mt-8" : "mt-18"} grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3`}
    >
      {isLoading ? (
        <SkillCardSkeleton column={6} />
      ) : skills.length > 0 ? (
        skills.map((skill) => (
          <motion.div key={skill.id} variants={item} className="h-full">
            <SkillCard
              id={skill.id}
              icon={skill.iconUrl}
              name={skill.name}
              level={skill.experienceLevel.name}
              percent={skill.experienceLevel.competencyLevel}
              mutate={mutate}
            />
          </motion.div>
        ))
      ) : (
        <p className="col-span-full text-center text-slate-600">
          Skill not found!
        </p>
      )}
    </motion.div>
  );
};

export default SkillsGrid;
