import { ServicesGrid } from '@/components/landing-page/grid';
import Hero from '@/components/landing-page/hero';
import InfiniteImages from '@/components/landing-page/infinite-images';
import Navbar from '@/components/landing-page/navbar';
import { BentoGridThirdDemo } from '@/components/landing-page/test-grid';
import { AppleCardsCarouselDemo } from '@/components/test/carousel-demo';
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
  //   const apiKey = process.env.GOOGLE_API_KEY!;
  //   const placeId =
  //     'EjA3OTAgUGFsb21hciBTdCBzdGUgYiwgQ2h1bGEgVmlzdGEsIENBIDkxOTExLCBVU0EiIRofChYKFAoSCcGOy-QsTNmAEWtFFyEX6c8REgVzdGUgYg';

  //   console.log('API KEY: ', apiKey);

  //   const searchUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&key=${apiKey}
  // `;

  //   try {
  //     const response = await fetch(searchUrl, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-Goog-Api-Key': apiKey,
  //         'X-Goog-FieldMask': 'name,rating,review',
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log('Data', JSON.stringify(data, null, 4));
  //   } catch (err) {
  //     console.error('Error fetching info:', err);
  //   }

  // const url =
  //   'https://api.yelp.com/v3/businesses/GRNTOamiFI-6TDOm2_Wpd/reviews?limit=20&sort_by=yelp_sort';
  // const apiKey = process.env.YELP_API_KEY;

  // if (!apiKey) {
  //   throw new Error('YELP_API_KEY is not set');
  // }

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);

  //   if (!response.ok) {
  //     const errorDetails = await response.json();
  //     throw new Error(
  //       `HTTP error! status: ${response.status}, message: ${
  //         response.statusText
  //       }, details: ${JSON.stringify(errorDetails)}`,
  //     );
  //   }

  //   const data = await response.json();
  //   console.log(data);
  // } catch (err) {
  //   console.error('Error fetching reviews:', err);
  // }

  const projects = await db.project.findMany({
    include: {
      images: true,
    },
  });

  const images = projects.map(proj => proj.images.map(img => img));

  console.log('Projects: ', projects);

  console.log('Images: ', images);

  return (
    <div className="relative flex items-center overflow-hidden flex-col  mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <AppleCardsCarouselDemo />
        <BentoGridThirdDemo />
      </div>
    </div>
  );
}
