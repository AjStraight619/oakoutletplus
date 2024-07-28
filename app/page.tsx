import { BeforeAfter } from '@/components/landing-page/before-after';
import Hero from '@/components/landing-page/hero';
import { BentoGridThirdDemo } from '@/components/landing-page/test-grid';
import { db } from '@/lib/db';
import { sharedMetadata } from '@/lib/shared-metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...sharedMetadata,
  openGraph: {
    ...sharedMetadata.openGraph,
    title: 'Home - Oak Outlet Plus',
    description:
      'Welcome to Oak Outlet Plus, your go-to company for kitchen remodeling and refinishing. Explore our projects and services.',
    images: [
      {
        url: '/after-test.png',
        width: 1200,
        height: 630,
        alt: 'Oak Outlet Plus',
      },
    ],
  },
};

export default async function Home() {
  const projects = await db.project.findMany({
    include: {
      images: true,
    },
  });

  const images = projects.map(proj => proj.images.map(img => img));

  console.log('Projects: ', projects);

  console.log('Images: ', images);

  return (
    <div className="relative flex items-center overflow-hidden flex-col mx-auto sm:px-10 px-5 pt-16">
      <div className="max-w-7xl w-full">
        <Hero />
        <BeforeAfter />
        <BentoGridThirdDemo />
      </div>
    </div>
  );
}
