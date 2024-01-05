import { ProjectData } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type ProjectCarouselProps = {
  project: ProjectData;
};

const ProjectCarousel = ({ project }: ProjectCarouselProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">{project.title}</h2>
      <p className="text-center mb-4">{project.description}</p>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm mx-auto"
      >
        <CarouselContent>
          {project.imageUrls.map((url, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="relative">
                <CardContent className="flex aspect-square items-center justify-center p-2">
                  <p className="absolute top-1 right-1">{index + 1}</p>
                  <Image
                    key={index}
                    src={url}
                    alt={`Image ${index}`}
                    width={200}
                    height={300}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;
