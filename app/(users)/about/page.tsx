import { PRODUCTION_URL } from '@/lib/constants';
import { sharedMetadata } from '@/lib/shared-metadata';
import React from 'react';

export const metadata = {
  ...sharedMetadata,
  title: 'About Us - Oak Outlet Plus',
  description: 'Learn more about Oak Outlet Plus, our mission, and our team.',
  openGraph: {
    ...sharedMetadata.openGraph,
    url: PRODUCTION_URL + '/about',
  },
};
const AboutPage = () => {
  return <div>AboutPage</div>;
};

export default AboutPage;
