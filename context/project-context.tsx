'use client';

import { ProjectType } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, SetStateAction, useState } from 'react';

type ProjectContextType = {
  projectType: string | null;
  setProjectType: React.Dispatch<SetStateAction<ProjectType | null>>;
  handleProjectTypeChange: (projectType: ProjectType) => void;
};

const ProjectContext = createContext<ProjectContextType>({
  projectType: null,
  setProjectType: () => {},
  handleProjectTypeChange: () => {},
});

export default function ProjectContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [projectType, setProjectType] = useState<ProjectType | null>(null);

  const handleProjectTypeChange = (projectType: ProjectType) => {
    const params = new URLSearchParams(searchParams);
    if (projectType) {
      params.set('projectType', projectType);
    } else {
      params.delete('projectType');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const newProjectType = searchParams.get(
    'projectType',
  ) as unknown as ProjectType;

  return (
    <ProjectContext.Provider
      value={{
        projectType,
        setProjectType,
        handleProjectTypeChange,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
