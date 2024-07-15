import { ProjectType } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useProjectType = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // const [projectType, setProjectType] = useState<ProjectType | null>(null);

  const handleProjectTypeChange = (projectType: ProjectType | null) => {
    const params = new URLSearchParams(searchParams);
    if (projectType) {
      params.set('projectType', projectType);
    } else {
      params.delete('projectType');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { handleProjectTypeChange };
};
