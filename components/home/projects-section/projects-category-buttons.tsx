"use client";
import { Button } from "@/components/ui/button";
import { FaCode, FaPaintBrush } from "react-icons/fa";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import { useProjectsFilter } from "@/context/projects-filter-context";

const ProjectsCategoryButtons = () => {
  const { category, setCategory } = useProjectsFilter();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeClass =
    "bg-darkBlue hover:bg-darkBlue/80 dark:shadow-neon text-white dark:border-2 dark:border-white";
  const inactiveClass = "text-darkBlue border bg-white hover:bg-slate-50";
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 500, damping: 15, delay: 1 }}
      className="mt-24 flex items-center justify-center gap-4"
    >
      <Button
        onClick={() => setCategory("Web Developer")}
        className={clsx(
          "cursor-pointer",
          category === "Web Developer" ? activeClass : inactiveClass,
        )}
      >
        <FaCode /> Web Developer
      </Button>
      <Button
        onClick={() => setCategory("Graphic Design")}
        className={clsx(
          "cursor-pointer",
          category === "Graphic Design" ? activeClass : inactiveClass,
        )}
      >
        <FaPaintBrush /> Graphic Design
      </Button>
    </motion.div>
  );
};

export default ProjectsCategoryButtons;
