"use client";
import { motion } from "motion/react";

const HeroSubheading = () => {
  return (
    <motion.p
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="text-pretty text-slate-600 dark:text-slate-300"
    >
      I&apos;m a fullstack developer focused on building high-performance,
      maintainable web systems, while also ensuring exceptional user engagement
      through thoughtful and compelling graphic design.
    </motion.p>
  );
};

export default HeroSubheading;
