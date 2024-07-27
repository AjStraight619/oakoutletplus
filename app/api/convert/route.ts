import convert from 'heic-convert';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll('files') as unknown as File[];
  console.log('files: ', files);

  const newFiles = files.map(file => {});

  //   console.log('File from FD: ', parsedFile);
  //   const arrayBuffer = await parsedFile.arrayBuffer();
  //   const inputBuffer = Buffer.from(arrayBuffer);

  //   console.log('Input buffer: ', inputBuffer);

  //   const outputBuffer = await convert({
  //     buffer: inputBuffer,
  //     format: 'JPEG',
  //     quality: 1,
  //   });
  //   const newFile = new File(
  //     [outputBuffer],
  //     parsedFile.name.replace(/\.heic$/i, '.jpg'),
  //     {
  //       type: 'image/jpeg',
  //     },
  //   );

  return NextResponse.json({ files });
}
