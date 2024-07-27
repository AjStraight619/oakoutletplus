'use server';

import convert from 'heic-convert';

export async function convertHeicToJpeg(formData: FormData) {
  const file = formData.get('file') as unknown as File;

  console.log('File from FD: ', file);
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  console.log('Input buffer: ', inputBuffer);

  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 1,
  });
  const newFile = new File(
    [outputBuffer],
    file.name.replace(/\.heic$/i, '.jpg'),
    {
      type: 'image/jpeg',
    },
  );
  console.log('New File: ', newFile);
  return newFile;
}
