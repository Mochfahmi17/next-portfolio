"use client";
import { motion } from "motion/react";
import Image from "next/image";

const AboutImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2 }}
      viewport={{ once: true, amount: 0.2 }}
      className="place-self-center lg:col-span-6"
    >
      <div className="border-darkBlue dark:shadow-neon border-8 dark:border-white">
        <div className="relative -top-6 -right-6 h-[400px] w-[300px] border-8 border-white shadow-md md:-top-10 md:-right-10">
          <Image
            src="/my-profile.jpg"
            alt="Profile"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutImage;
