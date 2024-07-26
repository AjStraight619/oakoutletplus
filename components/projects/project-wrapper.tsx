import React, { ReactNode } from 'react';
import { Separator } from '../ui/separator';

type ProjectWrapperProps = {
  title: string;
  projectType: string | undefined;
  children: ReactNode;
};

const ProjectWrapper = ({
  title,
  projectType,
  children,
}: ProjectWrapperProps) => {
  return (
    <>
      <h2 className="text-lg sm:text-3xl font-semibold text-muted-foreground mb-4 self-start">
        {title} - {projectType}
      </h2>
      <Separator className="mb-4" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 x gap-x-16 gap-y-4 mb-8">
        {children}
      </ul>
    </>
  );
};

export default ProjectWrapper;
