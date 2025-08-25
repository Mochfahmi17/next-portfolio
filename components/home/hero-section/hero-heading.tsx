"use client";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";

type HeroHeadingProps = {
  name: string;
};

const HeroHeading = ({ name }: HeroHeadingProps) => {
  return (
    <div className="w-full space-y-1 md:w-[450px] dark:text-white">
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl/normal font-bold"
      >
        Hi, I&apos;m {name ? name : "Mochammad Fahmi Kurnia Sandi"} 👋
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <TypeAnimation
          sequence={["Fullstack Developer", 5000, "Graphic Design", 5000]}
          wrapper="span"
          speed={1}
          repeat={Infinity}
          style={{ display: "inline-block" }}
          className="text-base font-semibold md:text-lg"
        />
      </motion.div>
    </div>
  );
};

export default HeroHeading;
