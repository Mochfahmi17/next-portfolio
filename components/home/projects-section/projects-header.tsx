"use client";
import { motion } from "motion/react";

const ProjectsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold dark:text-white">My Projects</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Explore my portfolio of web apps, designs, and development experiments.
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;
