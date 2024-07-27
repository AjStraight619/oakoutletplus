import React from 'react';
import {
  type ProjectImage as PrismaProjectImage,
  type Project as PrismaProject,
  ImageType,
  ProjectImage,
} from '@prisma/client';
import { PairedProjectImages } from '@/lib/types';
import ProjectImages2 from './projects-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import AddImages from '../dashboard/add-images';
import RemoveProject from '../dashboard/remove-project';
import { Dialog, DialogContent } from '../ui/dialog';
import {
  convertGroupedObjectToArray,
  flattenGroupedArray,
  groupProjectImagesByPairId,
} from '@/lib/utils';
import EditProject from '../dashboard/edit-project';

type ProjectProps = {
  project: PrismaProject & { images: PrismaProjectImage[] };
};

const Project = ({ project }: ProjectProps) => {
  const groupedAndSortedImages = groupProjectImagesByPairId(project);
  const groupedImagesArray = convertGroupedObjectToArray(
    groupedAndSortedImages,
  );
  const flattenedPairs = flattenGroupedArray(groupedImagesArray);

  console.log('Grouped images arr: ', groupedImagesArray);

  return (
    <Card className="relative max-w-3xl">
      <EditProject project={project} groupedImagesArray={groupedImagesArray} />
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          {project.description
            ? project.description
            : 'Edit to add a description'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center w-full">
        <ProjectImages2 flattenedPairs={flattenedPairs} />
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-x-2">
        <RemoveProject projectId={project.id} projectTitle={project.title} />
        <AddImages projectId={project.id} projectTitle={project.title} />
      </CardFooter>
    </Card>
  );
};

export default Project;
