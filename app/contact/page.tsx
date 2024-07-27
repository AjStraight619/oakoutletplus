import { PRODUCTION_URL } from '@/lib/constants';
import { sharedMetadata } from '@/lib/shared-metadata';
import React from 'react';

export const metadata = {
  ...sharedMetadata,
  title: 'Contact Us - Oak Outlet Plus',
  description:
    'Get in touch with Oak Outlet Plus for inquiries, quotes, and support. We are here to help with your kitchen remodeling and refinishing needs.',
  openGraph: {
    ...sharedMetadata.openGraph,
    url: PRODUCTION_URL + '/contact',
  },
};

const ContactPage = () => {
  return <div>ContactPage</div>;
};

export default ContactPage;
