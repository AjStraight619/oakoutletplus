"use client";
import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/hooks/useSectionInView";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPaperclip } from "react-icons/fa";
import SectionHeading from "./section-heading";
import SendEmailButton from "./send-email";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
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
            onChange={handleFileChange}
            ref={fileInputRef}
            name="images"
            type="file"
            accept="image/*"
            multiple
            hidden
            style={{ display: "none" }}
          />
          <Input
            className="mb-[0.25rem]"
            name="senderEmail"
            type="email"
            placeholder="Enter your email"
            required
          />
          <div className="relative">
            <Textarea
              className="min-h-[12rem]"
              name="message"
              placeholder="Enter your message"
              required
            />
            <div className="absolute bottom-1 left-1 flex flex-row gap-2">
              <p className="text-muted-foreground">
                {files.length === 0 ? `Add files` : ""}
              </p>

              <button onClick={handleAttachmentClick} type="button">
                <FaPaperclip className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* <UploadFiles /> */}

          <SendEmailButton />
        </form>
      </motion.div>
    </motion.section>
  );
}
