"use client";
import { useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { Input } from "./ui/input";

export default function UploadFiles() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  };

  const handleClick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <Input
        ref={fileRef}
        name="images"
        type="file"
        accept="image/*"
        multiple
        hidden
      />
      {files.length === 0 ? (
        <>
          <p className="text-muted-foreground">No files selected</p>
          <FaPaperclip onClick={handleClick} className="w-5 h-5" />
        </>
      ) : (
        <div className="flex flex-col space-y-2 items-center justify-start">
          {files.map((file) => (
            <div
              className="flex flex-row items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-md"
              key={file.name}
            >
              <p className="text-muted-foreground">{file.name}</p>
              <button
                type="button"
                onClick={() => handleRemoveFile(file)}
                className="text-muted-foreground"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <FaPaperclip onClick={handleClick} className="w-5 h-5" />
    </div>
  );
}
