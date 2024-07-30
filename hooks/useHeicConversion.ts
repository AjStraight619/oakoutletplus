import { useState, useCallback } from 'react';
import pica from 'pica';

export const useHeicConversion = () => {
  const [isConverting, setIsConverting] = useState(false);

  const handleConversion = useCallback(async (files: File[]) => {
    const heic2any = (await import('heic2any')).default;

    const convertHeicToJpeg = async (file: File): Promise<File> => {
      console.log('Converting file from HEIC to JPEG...');
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });

      const conversionResult = await heic2any({
        blob,
        toType: 'image/jpeg',
        quality: 1, // 100 %
      });

      const convertedBlob = Array.isArray(conversionResult)
        ? conversionResult[0]
        : conversionResult;

      const { name, lastModified } = file;
      const newFileName = name.replace(/\.heic$/i, '.jpg');

      const newFile = new File([convertedBlob], newFileName, {
        type: 'image/jpeg',
        lastModified,
      });

      console.log(
        `Original HEIC size: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
      );
      console.log(
        `Converted JPEG size: ${(newFile.size / 1024 / 1024).toFixed(2)} MB`,
      );

      return newFile;
    };

    const loadImage = (img: HTMLImageElement): Promise<void> => {
      return new Promise((resolve, reject) => {
        img.onload = () => {
          resolve();
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      });
    };

    const resizeImage = async (
      file: File,
      maxWidth: number,
      maxHeight: number,
    ): Promise<File> => {
      console.log('Resizing image...');
      const img = document.createElement('img');
      const canvas = document.createElement('canvas');

      const url = URL.createObjectURL(file);
      img.src = url;

      await loadImage(img); // Wait for the image to load

      URL.revokeObjectURL(url); // Release the memory

      const aspectRatio = img.width / img.height;
      if (img.width > maxWidth || img.height > maxHeight) {
        if (aspectRatio > 1) {
          canvas.width = maxWidth;
          canvas.height = maxWidth / aspectRatio;
        } else {
          canvas.height = maxHeight;
          canvas.width = maxHeight * aspectRatio;
        }
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      const picaInstance = pica();
      const resizedCanvas = await picaInstance.resize(img, canvas);

      const resizedBlob = await picaInstance.toBlob(
        resizedCanvas,
        'image/jpeg',
        0.8,
      );
      const { name, lastModified } = file;
      const newFileName = name.replace(/\.jpg$/i, '_resized.jpg');

      const resizedFile = new File([resizedBlob], newFileName, {
        type: 'image/jpeg',
        lastModified,
      });

      console.log(
        `Resized JPEG size: ${(resizedFile.size / 1024 / 1024).toFixed(2)} MB`,
      );

      return resizedFile;
    };

    const convertedFiles: File[] = [];
    for await (const file of files) {
      const jpegFile = await convertHeicToJpeg(file);
      const resizedFile = await resizeImage(jpegFile, 1920, 1080);
      convertedFiles.push(resizedFile);
    }

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
