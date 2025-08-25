"use client";
import { motion } from "motion/react";

const AboutHeading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold dark:text-white">About Me</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Every pixel, every line of code shaped by stories, struggles, and sparks
        of inspiration.
      </p>
    </motion.div>
  );
};

export default AboutHeading;
