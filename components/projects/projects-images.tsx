'use client';
import { FlattenedImage, GroupedArray, PairedProjectImages } from '@/lib/types';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { flattenGroupedArray, sortPairedImages } from '@/lib/utils';
import { ProjectImage } from '@prisma/client';

const ProjectImages = ({
  flattenedPairs,
}: {
  flattenedPairs: FlattenedImage[];
}) => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileSize ? true : false);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: isMobile ? 1 : 2,
      }}
      className="w-full max-w-3xl"
    >
      <CarouselContent className="">
        {flattenedPairs.map(
          ({ pairId, image: { imageType, imageUrl } }, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2">
              <Card>
                <CardHeader>
                  <CardDescription>{imageType}</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={imageUrl}
                      alt={imageType}
                      priority
                      quality={90}
                      fill
                      blurDataURL="...blur"
                      placeholder="blur"
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </CarouselItem>
          ),
        )}
      </CarouselContent>
      {!isMobile && flattenedPairs.length !== 0 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ProjectImages;
