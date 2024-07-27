import { PRODUCTION_URL } from '@/lib/constants';
import { sharedMetadata } from '@/lib/shared-metadata';
import React from 'react';

export const metadata = {
  ...sharedMetadata,
  title: 'Our Services - Oak Outlet Plus',
  description:
    'Explore the range of services offered by Oak Outlet Plus, including kitchen remodeling, refinishing, and custom cabinetry.',
  openGraph: {
    ...sharedMetadata.openGraph,
    url: PRODUCTION_URL + '/services',
  },
};

const ServicesPage = () => {
  return <div>ServicesPage</div>;
};

export default ServicesPage;
