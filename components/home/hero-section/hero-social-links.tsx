"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    href: "https://github.com/Mochfahmi17",
    icon: <FaGithub />,
  },
  {
    href: "https://www.linkedin.com/in/mochammad-fahmi-kurnia-sandi-ba39b2227/",
    icon: <FaLinkedin />,
  },
  {
    href: "https://instagram.com/fahmi_art17",
    icon: <FaInstagram />,
  },
  {
    href: "https://web.facebook.com/ppi.fahmi/",
    icon: <FaFacebook />,
  },
];

const HeroSocialLinks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="flex items-center gap-2"
    >
      <p className="text-sm font-semibold dark:text-white">Follow me on: </p>
      {socials.map((social, i) => (
        <Button
          key={i}
          size="icon"
          variant="link"
          asChild
          className="bg-darkBlue hover:text-darkBlue border-darkBlue dark:bg-electricViolet ml-1 h-8 w-8 rounded-full border text-white hover:bg-white dark:hover:bg-white"
        >
          <Link target="_blank" href={social.href}>
            {social.icon}
          </Link>
        </Button>
      ))}
    </motion.div>
  );
};

export default HeroSocialLinks;
