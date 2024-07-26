'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import { Button } from '../ui/button';

const ProjectTypeSelection = ({
  projectType,
}: {
  projectType: string | undefined;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!projectType) {
      const params = new URLSearchParams(searchParams);
      params.set('projectType', 'refinish');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [projectType, searchParams, router, pathname]);

  const handleSearchParamsChange = (param: string) => {
    const params = new URLSearchParams(searchParams);
    if (param) {
      params.set('projectType', param);
    } else {
      params.delete('projectType');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-row items-center gap-x-2">
      {['refinish', 'remodel', 'other'].map((projType, idx) => (
        <Button
          size="lg"
          variant="link"
          className={`capitalize text-lg sm:text-2xl ${
            projType === projectType
              ? 'underline text-black'
              : 'text-muted-foreground'
          }`}
          key={idx}
          onClick={() => handleSearchParamsChange(projType)}
        >
          {projType}
        </Button>
      ))}
    </div>
  );
};

export default ProjectTypeSelection;
