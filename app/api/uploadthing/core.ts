import { authTest } from '@/actions/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = async (req: Request) => {
  const formData = await req.formData();
  return authTest(formData);
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const isValidAdmin = await auth(req);

    //   // If you throw, the user will not be able to upload
    //   if (!isValidAdmin) throw new UploadThingError('Unauthorized');

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { user: isValidAdmin };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log('Upload complete for userId:', metadata.userId);

      //   console.log('file url', file.url);
      console.log('File in onUploadComplete: ', file);
      const prefix = file.name.split('-')[0];
      console.log('prefix: ', prefix);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: 'Nick', file: file };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
