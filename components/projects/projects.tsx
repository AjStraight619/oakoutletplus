import { db } from '@/lib/db';
import Project from './project';

type ProjectsProps = {
  projectType: string | string[] | undefined;
};

export default async function Projects({ projectType }: ProjectsProps) {
  const projects = await db.project.findMany({
    include: {
      imageUrls: true,
    },
  });

  console.log('Projects: ', projects);

  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {projects.map(proj => (
          <li key={proj.id}>
            <Project project={proj} />
          </li>
        ))}
      </ul>
    </div>
  );
}
