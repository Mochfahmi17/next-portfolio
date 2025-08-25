"use client";
import Popup from "@/components/popup/popup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

type HeroCTAButtonProps = {
  myCV: string;
};

const HeroCTAButton = ({ myCV }: HeroCTAButtonProps) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-6 flex items-center gap-3 md:gap-4"
      >
        <Button
          size="lg"
          asChild
          className="bg-darkBlue hover:bg-darkBlue/90 dark:shadow-neon flex-1 border md:flex-none dark:border-2 dark:border-white dark:text-white"
        >
          <Link href="#projects">
            <FaBriefcase /> Explore My Project
          </Link>
        </Button>
        <Button
          size="lg"
          onClick={() => setShowConfirm(true)}
          className="text-darkBlue flex-1 cursor-pointer border bg-white hover:bg-slate-100 md:flex-none"
        >
          <LuDownload /> Download My CV
        </Button>
      </motion.div>

      {showConfirm && (
        <Popup
          title="Are you sure want to download this resume?"
          closePopup={setShowConfirm}
        >
          <Button
            variant="destructive"
            onClick={() => setShowConfirm(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href={myCV.replace(
                "/upload/",
                "/upload/fl_attachment:CV_Mochammad_Fahmi_Kurnia_Sandi",
              )}
              download="CV_Mochammad_Fahmi_Kurnia_Sandi.pdf"
            >
              Download
            </Link>
          </Button>
        </Popup>
      )}
    </>
  );
};

export default HeroCTAButton;
