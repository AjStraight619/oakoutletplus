'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useRef, useState } from 'react';
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

type SelectedImageType = 'before' | 'after';

type ImageFile = {
  imageType: SelectedImageType;
  file: File;
};

type AddImagesProps = {
  projectId: string;
  title: string;
};

export default function AddImages({ projectId, title }: AddImagesProps) {
  const pathname = usePathname();
  const [files, setFiles] = useState<ImageFile[]>([]);
  const router = useRouter();
  const [error, setError] = useState('');

  const handleFileChange = useCallback(
    (file: File, imageType: SelectedImageType) => {
      setFiles(prevFiles => [
        ...prevFiles.filter(f => f.imageType !== imageType),
        { imageType, file },
      ]);
    },
    [],
  );

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onUploadProgress: p => {
      toast(<Progress value={p} />, { id: 'progress' });
    },
    onClientUploadComplete: res => {
      toast.dismiss('progress');
      setFiles([]);
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

  if (!pathname.includes('/admin')) return null;

  const beforeFile = files.find(file => file.imageType === 'before');
  const afterFile = files.find(file => file.imageType === 'after');

  const handleStartUpload = () => {
    const fileObjects = files.map(f => f.file);
    startUpload(fileObjects);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/3 px-6">Add Images</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add images to <span className="underline">{title}</span>
          </DialogTitle>
          <DialogDescription>
            Add a before and after image or add a standalone image
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-2">
          <AddImage
            imageType="before"
            file={beforeFile?.file}
            onFileChange={file => handleFileChange(file, 'before')}
            isUploading={isUploading}
          />
          <AddImage
            imageType="after"
            file={afterFile?.file}
            onFileChange={file => handleFileChange(file, 'after')}
            isUploading={isUploading}
            canUpload={!!beforeFile}
          />
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
  imageType: SelectedImageType;
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
          <div className="flex flex-col items-center justify-center gap-y-2">
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
      className="relative border border-dashed text-muted hover:cursor-pointer"
    >
      {children}
    </Card>
  );
}
