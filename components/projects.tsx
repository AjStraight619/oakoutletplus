"use client";

import { useSectionInView } from "@/hooks/useSectionInView";
import { ProjectData } from "@/lib/types";
import { useState } from "react";
import ProjectCarousel from "./project-carousel";
import SectionHeading from "./section-heading";

const refinishesData: ProjectData[] = [
  {
    title: "Refinish Project 1",
    description: "A stunning refinish of a classic kitchen.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "Refinish Project 2",
    description: "Modern and sleek kitchen refinish.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "Refinish Project 3",
    description: "Elegant and rustic style refinish.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
];

const remodelsData: ProjectData[] = [
  {
    title: "Remodel Project 1",
    description: "Complete kitchen overhaul with a contemporary touch.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "Remodel Project 2",
    description: "Spacious and bright kitchen remodel.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
  {
    title: "Remodel Project 3",
    description: "Traditional kitchen remodel with modern amenities.",
    imageUrls: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ],
  },
];

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [typeOfProject, setTypeOfProject] = useState<"refinish" | "remodel">(
    "refinish"
  );
  const projectData =
    typeOfProject === "refinish" ? refinishesData : remodelsData;

  // Assuming the first project is selected by default
  const selectedProject = projectData[0]; // Adjust this logic as needed

  return (
    <section
      ref={ref}
      id="projects"
      className="mb-20 sm:mb-28 flex flex-col items-center w-[min(100%,38rem)] pt-20"
    >
      <SectionHeading>Projects</SectionHeading>
      <div className="flex flex-row gap-2 items-center justify-center mb-2">
        <button
          onClick={() => setTypeOfProject("refinish")}
          className={`${
            typeOfProject === "refinish" ? "underline text-primary" : ""
          }`}
        >
          Refinish
        </button>
        <button
          onClick={() => setTypeOfProject("remodel")}
          className={`${
            typeOfProject === "remodel" ? "underline text-primary" : ""
          } px-4 py-2 rounded-md`}
        >
          Remodel
        </button>
      </div>
      <ProjectCarousel project={selectedProject} />
    </section>
  );
}
