"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { easeOut, motion, stagger, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.6),
    },
  },
};

const heading: Variants = {
  hidden: { opacity: 0, y: -60 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const ContactInfoList = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={heading}>
        <h2 className="mb-4 text-2xl font-semibold dark:text-white">
          Get In Touch
        </h2>
        <p className="text-sm dark:text-slate-300">
          I&apos;m always happy to collaborate, share insights, or simply talk
          about exciting ideas. Whether it&apos;s a new app, a visual revamp, or
          a casual chat feel free to reach out anytime.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-col gap-4 text-slate-600">
        <motion.div variants={item} className="h-full">
          <Card className="dark:bg-midnightBlue">
            <CardContent>
              <div className="flex items-center gap-2">
                <IoMdMail size={24} />
                <Link
                  href="mailto:mochammadfahmiks@gmail.com"
                  className="text-sm text-slate-600 dark:text-slate-300"
                >
                  mochammadfahmiks@gmail.com
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="h-full">
          <Card className="dark:bg-midnightBlue">
            <CardContent>
              <div className="flex items-center gap-2">
                <FaPhoneAlt size={24} />
                <Link
                  href="tel:+6285157017553"
                  className="text-sm text-slate-600 dark:text-slate-300"
                >
                  +62 851-5701-7553
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} className="h-full">
          <Card className="dark:bg-midnightBlue">
            <CardContent>
              <div className="flex items-center gap-2">
                <IoLocationSharp size={24} />
                <Link
                  href="https://maps.app.goo.gl/8PRpfvbEpKi9wuU27"
                  className="text-sm text-slate-600 dark:text-slate-300"
                >
                  Jl. Gresik PPI 6 no. 22, Surabaya, East Java, Indonesia.
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactInfoList;
