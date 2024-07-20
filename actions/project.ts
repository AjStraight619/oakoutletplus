'use server';

import { db } from '@/lib/db';
import { ProjectType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function addProject(formData: FormData) {
  try {
    const projectType = formData.get('projectType') as unknown as ProjectType;
    const title = formData.get('title') as unknown as string;
    const description = formData.get('description') as unknown as string;
    console.log('Title: ', title);
    console.log('Project type: ', projectType);
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
