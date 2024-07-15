import { type Project as PrismaProject } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
type ProjectProps = {
  project: PrismaProject;
};

export default function Project({ project }: ProjectProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.type}</CardTitle>
        {project.description && (
          <CardDescription>{project.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
