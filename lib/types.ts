import { ImageType, ProjectImage } from '@prisma/client';
import { type ProjectImage as PrismaProjectImage } from '@prisma/client';

export type PairedProjectImages = {
  imageUrl: string;
  imageType: ImageType;
};

export type PrismaProject = {
  project: PrismaProject & { images: PrismaProjectImage[] };
};

export type GroupedObject<T> = Record<string, T[]>;
export type GroupedArray<T> = { pairId: string; items: T[] }[];

export type FlattenedImage = {
  pairId: string;
  image: ProjectImage;
};

export type Result<T> = {
  success: boolean;
  message: string;
  data?: T;
};
