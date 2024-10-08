import Image from 'next/image';
import React from 'react';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { db } from '@/lib/db';
import { ProjectWithImages } from '@/lib/types';
import SectionHeading from '../ui/section-heading';

export async function BeforeAfter() {
  const projects = await db.project.findMany({
    include: {
      images: {
        where: {
          imageType: {
            in: ['Before', 'After'],
          },
        },
      },
    },
    take: 6,
  });

  const processedProjects = projects.map(project => {
    const beforeImage = project.images.find(
      image => image.imageType === 'Before',
    );
    const afterImage = project.images.find(
      image => image.imageType === 'After',
    );

    return {
      ...project,
      images: {
        before: beforeImage || null,
        after: afterImage || null,
      },
    };
  });

  const data = generateBeforeAfterData(processedProjects);

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="mb-12">
      <div className="space-y-2">
        <SectionHeading>Some of Our Recent Projects</SectionHeading>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

type ContentProps = {
  title: string;
  description: string | null;

  beforeImageUrl: string;
  afterImageUrl: string;
};

const Content = ({
  title,
  description,
  beforeImageUrl,
  afterImageUrl,
}: ContentProps) => {
  // TODO: Make sure to extend this for remodels where there will be no before/after
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto line-clamp-1">
        <span className="font-bold text-neutral-700 dark:text-neutral-200 ">
          {title}
        </span>{' '}
        {description}
      </p>
      <div className="pt-6 space-y-2">
        <h4 className="h4 text-center">Before</h4>
        <Image
          src={beforeImageUrl}
          alt="Before Image"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-md"
        />
        <h4 className="h4 text-center">After</h4>
        <Image
          src={afterImageUrl}
          alt="After Image"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain rounded-md"
        />
      </div>
    </div>
  );
};

const processProjectsForDisplay = (projects: ProjectWithImages[]) => {
  const processedProjects = projects.map(project => {
    const beforeImage = project.images.find(
      image => image.imageType === 'Before',
    );
    const afterImage = project.images.find(
      image => image.imageType === 'After',
    );

    return {
      ...project,
      images: {
        before: beforeImage || null,
        after: afterImage || null,
      },
    };
  });
  return processedProjects;
};

type ProjectForDisplay = {
  category: string;
  title: string;
  projectId: string;
  src: string;
  content: JSX.Element;
};
const generateBeforeAfterData = (
  projects: ReturnType<typeof processProjectsForDisplay>,
) => {
  let data: ProjectForDisplay[] = [];

  projects.forEach(proj => {
    if (proj.images.before && proj.images.after) {
      let project: ProjectForDisplay = {
        category: proj.type,
        title: proj.title,
        src: proj.images.after.imageUrl,
        projectId: proj.id,

        content: (
          <Content
            beforeImageUrl={proj.images.before.imageUrl}
            afterImageUrl={proj.images.after.imageUrl}
            title={proj.title}
            description={proj?.description}
          />
        ),
      };
      data.push(project);
    }
  });

  return data;
};
