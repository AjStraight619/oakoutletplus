"use client";
import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/hooks/useSectionInView";
import { FileWithPreview } from "@/lib/types";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPaperclip } from "react-icons/fa";
import DisplayFiles from "./display-files";
import SectionHeading from "./section-heading";
import SendEmailButton from "./send-email";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

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
    const newFiles = e.target.files;
    if (newFiles) {
      const fileObjects = Array.from(newFiles).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setFiles((prevFiles) => [...prevFiles, ...fileObjects]);
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
        <form action={emailAction} className="mt-10 flex flex-col sm:w-full">
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
            maxLength={50}
          />
          <div className="relative">
            <Textarea
              className="min-h-[12rem] pb-6"
              name="message"
              placeholder="Enter your message"
              required
              maxLength={200}
            />
            <div className="absolute bottom-1 left-4 flex flex-row gap-2">
              <p className="text-muted-foreground text-sm">
                Add Attachment (Max 5)
              </p>

              <button
                disabled={files.length === 5}
                onClick={handleAttachmentClick}
                type="button"
                className={`${files.length === 5 && "cursor-not-allowed"}`}
              >
                <FaPaperclip
                  className={`w-5 h-5 text-gray-500/40 hover:text-gray-500 `}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-row items-end mt-2">
            <div className="flex-grow">
              <DisplayFiles files={files} setFiles={setFiles} />
            </div>
            <SendEmailButton />
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}
