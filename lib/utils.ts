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

export const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

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

  const groupedByPairId = Object.groupBy(
    filteredImages,
    ({ pairId }) => pairId!,
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
