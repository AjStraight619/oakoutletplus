import { type Project as PrismaProject } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ProjectImages from './project-images';
import AddImages from '../dashboard/add-images';
type ProjectProps = {
  project: PrismaProject;
};

export default function Project({ project }: ProjectProps) {
  return (
    // <ProjectImages title={project.title} description={project.description} />
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          {project.title} <span>- </span>
          <span>{project.type}</span>
        </CardTitle>
        {project.description && (
          <CardDescription>{project.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ProjectImages />
      </CardContent>
      <CardFooter>
        <AddImages projectId={project.id} title={project.title} />
      </CardFooter>
    </Card>
  );
}
