"use client";
import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

const AboutDescription = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="lg:col-span-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <div className="bg-darkBlue dark:bg-electricViolet flex h-8 w-8 items-center justify-center rounded-md text-white">
          <Lightbulb />
        </div>
        <h3 className="text-xl font-semibold dark:text-white">Who Am I</h3>
      </div>
      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300">
        <p className="text-pretty">
          I am a Fullstack Developer with solid experience in building modern
          web applications using technologies such as Next.js, React,
          JavaScript, TypeScript, and Laravel. I specialize in crafting
          responsive user interfaces with TailwindCSS and managing data with
          tools like Prisma and databases including MongoDB, PostgreSQL, and
          MySQL. My approach focuses on scalability, performance, and delivering
          clean, maintainable code across both front-end and back-end systems.
        </p>
        <p className="text-pretty">
          In addition to my development background, I am also a Graphic Designer
          with a strong visual sense and hands-on expertise in CorelDRAW,
          Photoshop, and Figma. This dual-skill set allows me to bridge the gap
          between form and function designing engaging visuals while ensuring a
          seamless user experience. Whether I&apos;m building an interface or
          designing a brand identity, I always prioritize user needs, clarity,
          and consistency.
        </p>
        <p className="text-pretty">
          Combining my technical and creative abilities, I aim to deliver
          holistic digital solutions that are not only effective but also
          visually compelling. I thrive in collaborative environments, embrace
          continuous learning, and approach every project as an opportunity to
          push boundaries and create meaningful impact.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutDescription;
