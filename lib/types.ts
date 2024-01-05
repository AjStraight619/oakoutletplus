import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type ProjectData = {
  title: string;
  description: string;
  imageUrls: string[];
};

export type FileWithPreview = {
  file: File;
  previewUrl: string;
};
