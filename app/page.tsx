import Hero from '@/components/landing-page/hero';
import InfiniteImages from '@/components/landing-page/infinite-images';
import Navbar from '@/components/landing-page/navbar';
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
  const apiKey = process.env.YELP_API_KEY!;
  console.log('API KEY: ', apiKey);
  const url =
    'https://api.yelp.com/v3/businesses/oak-outlet-plus-chula-vista-2';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY!}`,
    },
  };

  await fetch(url, {
    ...options,
    next: { revalidate: 604800 },
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

  const projects = await db.project.findMany({
    include: {
      images: true,
    },
  });

  const images = projects.map(proj => proj.images.map(img => img));

  console.log('Projects: ', projects);

  console.log('Images: ', images);

  return (
    <div className="relative flex items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Navbar />
        <Hero />
        <InfiniteImages />
      </div>
    </div>
  );
}
