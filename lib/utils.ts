import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  FlattenedImage,
  GroupedArray,
  GroupedObject,
  PairedProjectImages,
  PrismaProject,
} from './types';
import { Project, ProjectImage } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
  for (let i = 1; i <= ms / 1000; i++) {
    console.log(`Waiting ${i} second(s)...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export const sortPairedImages = (
  pairImageMap: Record<string, PairedProjectImages[]>,
): PairedProjectImages[][] => {
  const pairs = Object.values(pairImageMap).map(images => {
    return images.sort((a, b) => {
      if (a.imageType === 'Before' && b.imageType === 'After') return -1;
      if (a.imageType === 'After' && b.imageType === 'Before') return 1;
      return 0;
    });
  });

  return pairs;
};

export const groupProjectImagesByPairId = (
  project: Project & { images: ProjectImage[] },
): Record<string, ProjectImage[]> => {
  const filteredImages = project.images.filter(
    ({ pairId }) => pairId !== null && pairId !== undefined,
  );

  const groupedByPairId = filteredImages.reduce<Record<string, ProjectImage[]>>(
    (acc, image) => {
      if (image.pairId) {
        if (!acc[image.pairId]) {
          acc[image.pairId] = [];
        }
        acc[image.pairId].push(image);
      }
      return acc;
    },
    {},
  );

  const sortedPairs: Record<string, ProjectImage[]> = {};

  for (const [pairId, pairs] of Object.entries(groupedByPairId)) {
    if (pairs) {
      sortedPairs[pairId] = pairs.sort((a, b) => {
        if (a.imageType === 'Before' && b.imageType === 'After') return -1;
        if (a.imageType === 'After' && b.imageType === 'Before') return 1;
        return 0;
      });
    }
  }

  return sortedPairs;
};

export const convertGroupedObjectToArray = <T>(
  groupedObject: GroupedObject<T>,
): GroupedArray<T> => {
  return Object.entries(groupedObject).map(([pairId, items]) => ({
    pairId,
    items,
  }));
};

export const flattenGroupedArray = (
  groupedArray: GroupedArray<ProjectImage>,
): FlattenedImage[] => {
  return groupedArray.flatMap(({ pairId, items }) =>
    items.map(image => ({
      pairId,
      image,
    })),
  );
};

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
