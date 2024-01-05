"use client";
import { useSectionInView } from "@/hooks/useSectionInView";
import { motion } from "framer-motion";

export default function Intro() {
  const { ref } = useSectionInView("Home");
  return (
    <motion.section
      id="home"
      ref={ref}
      className="mb-20 sm:mb-28 flex flex-col items-center w-[min(100%,38rem)] pt-20"
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
      <motion.h1
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
        }}
        className="text-5xl sm:text-2xl rounded-lg font-bold text-center  text-gray-800 hover:text-gray-600 transition-colors duration-300"
      >
        Oak Outlet Plus
      </motion.h1>
    </motion.section>
  );
}
