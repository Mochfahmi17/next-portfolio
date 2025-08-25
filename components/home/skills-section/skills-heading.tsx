"use client";
import { motion } from "motion/react";

const SkillsHeading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold dark:text-white">Skills</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        I build apps that work and look great blending code and design to create
        products that users enjoy using.
      </p>
    </motion.div>
  );
};

export default SkillsHeading;
