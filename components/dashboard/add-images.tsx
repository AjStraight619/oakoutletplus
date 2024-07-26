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
import { useTempObjUrl } from '@/hooks/useTempObjUrl';
import Image from 'next/image';
import { Card } from '../ui/card';
import { ImageIcon } from 'lucide-react';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';
import { nanoid } from 'nanoid';
import { ImageType } from '@prisma/client';

type ImageFile = {
  imageType: ImageType | 'Standalone';
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
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [isPaired, setIsPaired] = useState(true);

  const handleIsPairedChange = (paired: boolean) => {
    setIsPaired(paired);
    setFiles([]);
  };

  const handleFileChange = useCallback(
    (file: File, imageType: ImageType | 'Standalone') => {
      setFiles(prevFiles => [
        ...prevFiles.filter(f => f.imageType !== imageType),
        { imageType, file },
      ]);
    },
    [],
  );

  const { startUpload: standAloneUpload, isUploading: isUploadingStandAlone } =
    useUploadThing('standAloneImageUploader', {
      onUploadProgress: p => {
        toast(<Progress value={p} />, { id: 'progress' });
      },
      onClientUploadComplete: res => {
        toast.dismiss('progress');
        setFiles([]);
        console.log(isUploading);
        setIsOpen(false);
        toast.success('Successfully uploaded files!', { duration: 1 });
        router.refresh();
      },
      onBeforeUploadBegin: uploadFiles => {
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
        setError(err.message);
      },
    });

  const { startUpload, isUploading } = useUploadThing('pairImageUploader', {
    onUploadProgress: p => {
      toast(<Progress value={p} />, { id: 'progress' });
    },
    onClientUploadComplete: res => {
      toast.dismiss('progress');
      setFiles([]);
      console.log(isUploading);
      setIsOpen(false);
      toast.success('Successfully uploaded files!', { duration: 1 });
      router.refresh();
    },
    onBeforeUploadBegin: uploadFiles => {
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
      setError(err.message);
    },
  });

  useEffect(() => {
    console.log('Files changed: ', files);
  }, [files]);

  if (!pathname.includes('/admin')) return null;

  const beforeFile = files.find(file => file.imageType === 'Before');
  const afterFile = files.find(file => file.imageType === 'After');

  const handleStartUpload = () => {
    const fileObjects = files.map(f => f.file);
    startUpload(fileObjects, {
      pairId: nanoid(),
      projectId,
    });
  };

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

        <div className="flex flex-col gap-2">
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
            </div>
          ) : (
            <AddImage
              imageType="Standalone"
              file={files[0]?.file}
              onFileChange={file => handleFileChange(file, 'Standalone')}
              isUploading={isUploadingStandAlone}
              canUpload={!!files[0]?.file}
            />
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleStartUpload}
            disabled={!beforeFile || !afterFile || isUploading}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type AddImageProps = {
  imageType: ImageType | 'Standalone';
  file?: File;
  onFileChange: (file: File) => void;
  isUploading: boolean;
  canUpload?: boolean;
};

function AddImage({
  imageType,
  file,
  onFileChange,
  isUploading,
  canUpload = true,
}: AddImageProps) {
  const { tempUrl } = useTempObjUrl(file);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event.target.files[0]);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (canUpload && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      {tempUrl ? (
        <Image
          src={tempUrl}
          alt={imageType}
          width={300}
          height={500}
          className="self-center"
        />
      ) : (
        <AddImageWrapper onClick={handleClick}>
          <div className="flex flex-col items-center justify-center gap-y-2 w-full">
            <p className="text-muted-foreground font-semibold">
              {imageType.charAt(0).toUpperCase() + imageType.slice(1)}
            </p>
            <ImageIcon className="text-muted-foreground w-8 h-8" />
            <input
              disabled={!canUpload || isUploading}
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              hidden
              className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
              multiple={false}
            />
          </div>
        </AddImageWrapper>
      )}
    </>
  );
}

function AddStandAloneImage({
  file,
  onFileChange,
  isUploading,
  canUpload,
}: {
  file?: File;
  onFileChange: (file: File) => void;
  isUploading: boolean;
  canUpload?: boolean;
}) {}

function AddImageWrapper({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="relative border border-dashed text-muted hover:cursor-pointer w-full"
    >
      {children}
    </Card>
  );
}
