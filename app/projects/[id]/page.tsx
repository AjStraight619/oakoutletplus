import type { Metadata, ResolvingMetadata } from 'next';

import { utapi } from '@/server/uploadthing';
import { db } from '@/lib/db';
import { ProjectImage } from '@prisma/client';
import { Result } from '@/lib/types';
import { sharedMetadata } from '@/lib/shared-metadata';
import { PRODUCTION_URL } from '@/lib/constants';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const { success, message, data } = await getProductFirstImageKey(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    ...sharedMetadata,
    title: data?.projectTitle,
    openGraph: {
      ...sharedMetadata.openGraph,
      images: [`${data?.firstImage.imageUrl}`, ...previousImages],
      url: `${PRODUCTION_URL}/projects/${id}`,
    },
  };
}

type ProductData = {
  firstImage: ProjectImage;
  projectTitle: string;
};

async function getProductFirstImageKey(
  id: string,
): Promise<Result<ProductData>> {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          orderBy: {
            createdAt: 'asc',
          },
          take: 1,
        },
      },
    });

    if (!project || project.images.length === 0) {
      return {
        success: false,
        message: 'No images found for this project',
      };
    }

    const firstImageData = project.images.find(
      img => img.imageType === 'After',
    );

    if (!firstImageData) {
      return {
        success: false,
        message: 'No "After" image found for this project',
      };
    }

    return {
      success: true,
      message: 'First image URL retrieved successfully',
      data: { firstImage: firstImageData, projectTitle: project.title },
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: 'Something went wrong when retrieving the first product image',
    };
  }
}

export default function Page({ params, searchParams }: Props) {}
