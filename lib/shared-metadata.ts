import { Metadata } from 'next';
import { PRODUCTION_URL } from './constants';

export const sharedMetadata: Metadata = {
  title: 'Oak Outlet Plus',
  description: 'Kitchen Remodeling and Refinishing Company',
  keywords: [
    'Oak Outlet Plus',
    'Kitchen Remodeling',
    'Refinishing',
    'Home Improvement',
    'Bathrooms',
    'Countertops',
    'Chula Vista Kitchen Remodeling',
    'San Diego Home Improvement',
    'San Diego Kitchen Remodeling',
    'Chula Vista Bathroom Refinishing',
    'San Diego Countertop Installation',
  ],
  openGraph: {
    title: 'Oak Outlet Plus',
    siteName: 'Oak Outlet Plus',
    type: 'website',
    url: PRODUCTION_URL,
  },
};
