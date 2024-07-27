import { createImagePair } from '@/actions/project-images';
import { ImageType } from '@prisma/client';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pairImageUploader: f({ image: { maxFileSize: '16MB', maxFileCount: 2 } })
    .input(
      z.object({
        projectId: z.string(),
        pairId: z.string(),
      }),
    )

    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      // const isValidAdmin = await auth(req);

      // If you throw, the user will not be able to upload
      // if (!isValidAdmin) throw new UploadThingError('Unauthorized');

      console.log('req: ', req);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log('Upload complete for userId:', metadata.userId);

      //   console.log('file url', file.url);
      const prefix = file.name.split('-')[0] as ImageType;
      const { input } = metadata;
      await createImagePair({
        pairId: input.pairId,
        projectId: input.projectId,
        image: {
          imageKey: file.key,
          imageType: prefix,
          imageUrl: file.url,
        },
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: 'Nick', file: file };
    }),

  standAloneImageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 2 } })
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      // const isValidAdmin = await auth(req);

      // If you throw, the user will not be able to upload
      // if (!isValidAdmin) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
