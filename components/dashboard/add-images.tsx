'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';
import { nanoid } from 'nanoid';
import { ImageType } from '@prisma/client';
import { useHeicConversion } from '@/hooks/useHeicConversion';
import { useUploadThing } from '@/utils/uploadthing';
import { Loader2 } from 'lucide-react';
import AddImage from './add-image';

type ImageFile = {
  imageType: ImageType;
  file: File;
};

type AddImagesProps = {
  projectId: string;
  projectTitle: string;
};

export default function AddImages({ projectId, projectTitle }: AddImagesProps) {
  const pathname = usePathname();
  const [files, setFiles] = useState<ImageFile[]>([]);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const bottomOfDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfDialogRef.current && files.length > 0) {
      bottomOfDialogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [files]);

  const { isConverting, convertFile } = useHeicConversion();

  const [isPaired, setIsPaired] = useState(true);

  const { startUpload: standAloneUpload, isUploading: isUploadingStandAlone } =
    useUploadThing('standAloneImageUploader', {
      onUploadProgress: p => {
        toast(<Progress value={p} />, { id: 'progress' });
      },
      onClientUploadComplete: res => {
        console.log('Response in onClientUploadComplete: ', res);
        toast.dismiss('progress');
        toast.success('Successfully uploaded files!');
        setFiles([]);
        setIsOpen(false);
        // router.refresh();
      },
      onBeforeUploadBegin: uploadFiles => {
        uploadFiles.forEach(file => {
          console.log('File size: ', file.size);
        });
        return uploadFiles.map(
          f =>
            new File(
              [f],
              `${files.find(file => file.file === f)?.imageType}-` + f.name,
              { type: f.type },
            ),
        );
      },
      onUploadError: err => {
        console.error(err);
        toast.error('Something went wrong while uploading');
      },
    });

  const { startUpload, isUploading } = useUploadThing('pairImageUploader', {
    onUploadProgress: p => {
      toast(<Progress value={p} />, { id: 'progress' });
    },
    onClientUploadComplete: res => {
      toast.dismiss('progress');
      toast('Successfully uploaded files!');
      setFiles([]);
      setIsOpen(false);

      router.refresh();
    },
    onBeforeUploadBegin: async uploadFiles => {
      return uploadFiles.map(
        f =>
          new File(
            [f],
            `${files.find(file => file.file === f)?.imageType}-` + f.name,
            { type: f.type },
          ),
      );
    },
    onUploadError: err => {
      console.error(err);
    },
  });

  const beforeFile = files.find(file => file.imageType === 'Before');
  const afterFile = files.find(file => file.imageType === 'After');

  const handleStartUpload = () => {
    const fileObjects = files.map(f => f.file);
    startUpload(fileObjects, {
      pairId: nanoid(),
      projectId,
    });
  };

  const handleFileChange = useCallback(
    async (file: File, imageType: ImageType) => {
      console.log('File changed ');
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        console.log('File changed and is heic ');
        const convertedFile = await convertFile(file);
        if (convertedFile) {
          setFiles(prevFiles => [
            ...prevFiles.filter(f => f.imageType !== imageType),
            { imageType, file: convertedFile },
          ]);
        }
      } else {
        setFiles(prevFiles => [
          ...prevFiles.filter(f => f.imageType !== imageType),
          { imageType, file },
        ]);
      }
    },
    [convertFile],
  );

  const handleIsPairedChange = (paired: boolean) => {
    setIsPaired(paired);
    setFiles([]);
  };

  if (!pathname.includes('/admin')) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Images</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add images to <span>{'"' + projectTitle + '"'}</span>
          </DialogTitle>
          <DialogDescription>
            Add before/after image, or a standalone image.
          </DialogDescription>
        </DialogHeader>

        <div className="self-start flex gap-x-2">
          <Button
            className={`${
              isPaired ? 'text-primary underline' : 'text-muted-foreground'
            }`}
            onClick={() => handleIsPairedChange(true)}
            variant="link"
          >
            Before/After
          </Button>
          <Button
            className={`${
              isPaired ? 'text-muted-foreground' : 'text-primary underline'
            }`}
            onClick={() => handleIsPairedChange(false)}
            variant="link"
          >
            Standalone
          </Button>
        </div>
        {isPaired ? (
          <div className="overflow-y-scroll h-full flex flex-col items-center max-h-64 w-full gap-y-2">
            {isConverting ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Converting File</span>
              </div>
            ) : (
              <>
                <AddImage
                  imageType="Before"
                  file={beforeFile?.file}
                  onFileChange={file => handleFileChange(file, 'Before')}
                  isUploading={isUploading}
                />
                <AddImage
                  imageType="After"
                  file={afterFile?.file}
                  onFileChange={file => handleFileChange(file, 'After')}
                  isUploading={isUploading}
                  canUpload={!!beforeFile}
                />
              </>
            )}
          </div>
        ) : (
          <>
            {isConverting ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Converting File</span>
              </div>
            ) : (
              <AddImage
                imageType="StandAlone"
                file={files[0]?.file}
                onFileChange={file => handleFileChange(file, 'StandAlone')}
                isUploading={isUploadingStandAlone}
                canUpload={!!files[0]?.file}
              />
            )}
          </>
        )}
        <DialogFooter>
          <Button
            onClick={handleStartUpload}
            disabled={!beforeFile || !afterFile || isUploading}
          >
            Upload
          </Button>
        </DialogFooter>
        <div ref={bottomOfDialogRef} />
      </DialogContent>
    </Dialog>
  );
}
