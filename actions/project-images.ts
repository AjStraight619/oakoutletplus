'use server';
import { db } from '@/lib/db';
import { ImageType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createImagePair = async ({
  pairId,
  projectId,
  image,
}: {
  pairId: string;
  projectId: string;
  image: {
    imageKey: string;
    imageType: ImageType;
    imageUrl: string;
  };
}) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      console.log('No project with: ', projectId, ' exists');
      return {
        error: 'This project does not exist',
      };
    }
    if (!pairId) {
      console.log('No pair id');
      return {
        error: 'There is no pair id',
      };
    }
    const imagePair = await db.projectImage.create({
      data: {
        imageKey: image.imageKey,
        projectId: projectId,
        pairId: pairId,
        imageType: image.imageType,
        imageUrl: image.imageUrl,
      },
    });
  } catch (err) {
    console.error(err);
  } finally {
    revalidatePath('admin/dashboard', 'page');
  }
};

export async function createStandAloneImage({
  projectId,
  image,
}: {
  projectId: string;
  image: {
    imageKey: string;
    imageUrl: string;
  };
}) {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return {
        success: false,
        message: 'This project does not exist',
      };
    }

    await db.projectImage.create({
      data: {
        imageKey: image.imageKey,
        imageUrl: image.imageUrl,
        imageType: 'StandAlone',
        standalone: true,
        projectId: project.id,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Something went wrong',
    };
  } finally {
    revalidatePath('admin/dashboard', 'page');
  }
}
