'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import ProjectImageBefore from './project-image-before';
import ProjectImageAfter from './project-image-after';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ReactNode, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

// type ProjectImageProps = {
//   title: string;
//   description: string | null;
// };

export default function ProjectImages() {
  const plugin = useRef(AutoScroll({ stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItemWrapper>
          <ProjectImageBefore />
          <ProjectImageAfter />
        </CarouselItemWrapper>
        {/* <CarouselItemWrapper>
          <div>Yo yo yo yo</div>
          <div>Yo yo yo yo</div>
        </CarouselItemWrapper> */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

type CarouselItemWrapper = {
  children: ReactNode;
};

function CarouselItemWrapper({ children }: CarouselItemWrapper) {
  return (
    <CarouselItem>
      <div className="p-1">
        <div className="flex aspect-square items-center justify-center gap-2">
          {children}
        </div>
      </div>
    </CarouselItem>
  );
}
