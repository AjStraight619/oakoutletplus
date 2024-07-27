import { useState, useCallback } from 'react';

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);

  const handleConversion = useCallback(async (files: File[]) => {
    const heic2any = (await import('heic2any')).default;

    const convert = async (file: File) => {
      console.log('Converting file...');
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });

      const conversionResult = await heic2any({ blob });
      const convertedBlob = Array.isArray(conversionResult)
        ? conversionResult[0]
        : conversionResult;

      // Extract metadata from the original file
      const { name, lastModified } = file;
      const newFileName = name.replace(/\.heic$/i, '.jpg');

      // Create a new file with the converted blob and metadata
      return new File([convertedBlob], newFileName, {
        type: 'image/jpeg',
        lastModified,
      });
    };

    const convertedFiles = [];
    for await (const file of files) {
      const convertedFile = await convert(file);
      convertedFiles.push(convertedFile);
      console.log('Converted File:', convertedFile);
    }

    console.log('convertedFiles: ', convertedFiles);
    return convertedFiles;
  }, []);

  const convertFile = useCallback(
    async (file: File) => {
      setIsConverting(true);
      try {
        const convertedFile = await handleConversion([file]);
        return convertedFile[0];
      } catch (error) {
        console.error('File conversion error:', error);
        return null;
      } finally {
        setIsConverting(false);
      }
    },
    [handleConversion],
  );

  return { convertFile, isConverting };
};
