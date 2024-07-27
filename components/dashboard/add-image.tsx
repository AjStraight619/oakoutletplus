import { useTempObjUrl } from '@/hooks/useTempObjUrl';
import { ImageType } from '@prisma/client';
import { ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ReactNode, useRef } from 'react';
import { Card } from '../ui/card';

type AddImageProps = {
  imageType: ImageType;
  file?: File;
  onFileChange: (file: File) => void;
  isUploading: boolean;
  canUpload?: boolean;
};

export default function AddImage({
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
    <AddImageWrapper onClick={handleClick}>
      {tempUrl ? (
        <Image
          src={tempUrl}
          alt="Picture of the author"
          className="w-full h-auto"
          width={500}
          height={300}
        />
      ) : (
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
      )}
    </AddImageWrapper>
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
      className="relative border border-dashed text-muted hover:cursor-pointer w-full"
    >
      {children}
    </Card>
  );
}
