"use client";
import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/hooks/useSectionInView";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SectionHeading from "./section-heading";
import SendEmailButton from "./send-email";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.8);
  const [files, setFiles] = useState<File[]>([]);

  const emailAction = async (formData: FormData) => {
    const { data, error, success } = await sendEmail(formData);
    if (success) {
      console.log(data);
      toast.success("Message sent successfully");
    } else if (error) {
      toast.error(error);
    } else {
      return;
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center pt-20"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact</SectionHeading>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
      >
        <form action={emailAction} className="mt-10 flex flex-col">
          <Input
            className="mb-[0.25rem]"
            name="senderEmail"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Textarea
            className="min-h-[12rem]"
            name="message"
            placeholder="Enter your message"
            required
          />

          <SendEmailButton />
        </form>
      </motion.div>
    </motion.section>
  );
}
