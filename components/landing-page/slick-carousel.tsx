'use client';

import Image from 'next/image';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const SlickCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <div className="relative p-4 h-full w-full">
      {imageUrls.map((imageUrl, idx) => (
        <Image
          key={idx}
          src={imageUrls[0]}
          alt="..."
          fill
          quality={100}
          className="rounded-md object-cover"
        />
      ))}
    </div>
  );
};

export default SlickCarousel;
