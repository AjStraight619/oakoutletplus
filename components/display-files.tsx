import { FileWithPreview } from "@/lib/types";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Input } from "./ui/input";

type DisplayFilesProps = {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
};

export default function DisplayFiles({ files, setFiles }: DisplayFilesProps) {
  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const newFiles = prevFiles.filter((f) => f.file.name !== fileName);
      const removedFile = prevFiles.find((f) => f.file.name === fileName);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.previewUrl);
      }
      return newFiles;
    });
  };
  return (
    <div className="flex flex-col space-y-2">
      {files.map((file, index) => {
        const { name } = file.file;
        const { previewUrl } = file;
        return (
          <div className="flex flex-row items-center gap-2" key={name}>
            <Image
              src={previewUrl}
              alt={`${index + 1}`}
              height={40}
              width={40}
              quality={100}
              priority={true}
              className="rounded-sm"
            />
            <div className="flex flex-col space-y-1">
              <Input
                defaultValue={name}
                className="text-muted-foreground"
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={() => removeFile(name)}
              className="text-muted-foreground"
            >
              <FaTrash className="w-4 h-4 text-red-500" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
