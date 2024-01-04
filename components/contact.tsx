import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/hooks/useSectionInView";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
export default function Contact() {
  const { ref } = useSectionInView("Contact");

  const emailAction = async (formData: FormData) => {
    const { data, error, success } = await sendEmail(formData);
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

      <form
        action={emailAction}
        className="mt-10 flex flex-col text-primary"
      ></form>
    </motion.section>
  );
}
