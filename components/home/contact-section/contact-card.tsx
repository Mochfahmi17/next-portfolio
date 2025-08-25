"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoMdMail } from "react-icons/io";
import ContactForm from "./contact-form";
import { easeOut, motion } from "motion/react";

const ContactCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2, ease: easeOut }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <Card className="dark:bg-midnightBlue">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <IoMdMail size={24} />
              <p>Send Me a Message</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactCard;
