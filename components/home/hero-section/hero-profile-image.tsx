"use client";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { FaNodeJs } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiTailwindcss } from "react-icons/si";
import { motion } from "motion/react";

type HeroProfileImageProps = {
  profileImage?: string;
};

const HeroProfileImage = ({ profileImage }: HeroProfileImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className="border-darkBlue dark:shadow-neon relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-8 bg-gray-200 shadow-xl md:h-72 md:w-72 dark:border-white">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="My Profile"
            priority
            fill
            className="object-cover object-center"
          />
        ) : (
          <User className="size-40" />
        )}
      </div>
      <div className="bg-darkBlue animate-floating absolute -top-10 -left-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md lg:-left-10 dark:bg-white dark:text-[#7226ff]">
        <RiNextjsFill size={28} />
      </div>
      <div className="bg-darkBlue animate-floating absolute -top-5 -right-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md delay-300 lg:-right-10 dark:bg-white dark:text-[#7226ff]">
        <BiLogoTypescript size={28} />
      </div>
      <div className="bg-darkBlue animate-floating absolute -bottom-5 -left-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md delay-600 lg:-left-10 dark:bg-white dark:text-[#7226ff]">
        <SiTailwindcss size={28} />
      </div>
      <div className="bg-darkBlue animate-floating absolute -right-10 -bottom-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md delay-900 lg:-right-10 dark:bg-white dark:text-[#7226ff]">
        <FaNodeJs size={28} />
      </div>
    </motion.div>
  );
};

export default HeroProfileImage;
