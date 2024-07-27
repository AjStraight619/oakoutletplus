'use server';

import { db } from '@/lib/db';
import { ProjectType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { utapi } from '@/server/uploadthing';

export async function addProject(formData: FormData) {
  try {
    const projectType = formData.get('projectType') as unknown as ProjectType;
    const title = formData.get('title') as unknown as string;
    const description = formData.get('description') as unknown as string;

    const newProject = await db.project.create({
      data: {
        type: projectType,
        title: title,
        description: description,
      },
    });

    console.log('New project: ', newProject);
  } catch (err) {
    console.error('error creating proj: ', err);
  } finally {
    revalidatePath('/admin/dashboard', 'page');
  }
}

// Delete images from db and the images in upload thing
export async function deleteProject(projectId: string) {
  try {
    const proj = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        images: {
          select: {
            imageKey: true,
          },
        },
      },
    });

    if (!proj) return;

    const imageKeys = proj.images.map(image => image.imageKey);

    console.log('Image keys: ', imageKeys);

    await Promise.all([
      deleteProjectFromDb(projectId),
      deleteProjectImages(imageKeys),
    ]);
  } catch (err) {
  } finally {
    revalidatePath('/admin/dashboard', 'page');
  }
}

async function deleteProjectFromDb(projectId: string) {
  try {
    await db.project.delete({
      where: {
        id: projectId,
      },
    });
  } catch (err) {
    console.log('error deleting project: ', projectId);
  }
}

async function deleteProjectImages(imageKeys: string[]) {
  try {
    const res = await utapi.deleteFiles(imageKeys);
    console.log('Response: ', res);
  } catch (err) {
    console.error('Error deleting proj images on upload thing: ', err);
  }
}
type ImageData = {
  id: string;
  key: string;
  pairId: string | null;
};
export async function updateProject(formData: FormData) {
  const projectId = formData.get('projectId') as unknown as string;
  const newTitle = formData.get('title') as unknown as string;
  const newDescription = formData.get('description') as unknown as string;

  const imageData: ImageData[] = JSON.parse(
    formData.get('imageData') as string,
  );

  const imageKeys = imageData.map(img => img.key);

  try {
    const updateProjectPromise = db.project.update({
      where: { id: projectId },
      data: {
        title: newTitle,
        description: newDescription,
      },
    });

    const deleteImagesPromise = db.projectImage.deleteMany({
      where: {
        id: {
          in: imageData.map(img => img.id),
        },
      },
    });

    const result = await Promise.all([
      updateProjectPromise,
      deleteImagesPromise,
      deleteProjectImages(imageKeys),
    ]);

    if (result) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
    };
  } finally {
    revalidatePath('/admin/dashboard', 'page');
  }
}
