import { sharedMetadata } from '@/lib/shared-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Projects - Oak Outlet Plus',
};
export default async function AllProjectsPage() {
  return <div>All Projects Page</div>;
}
