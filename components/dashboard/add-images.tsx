'use client';

import { usePathname } from 'next/navigation';

export default function AddImages() {
  const pathname = usePathname();

  if (!pathname.includes('/admin')) return;

  return <div></div>;
}

function AddBeforeImages() {}

function AddAfterImages() {}
