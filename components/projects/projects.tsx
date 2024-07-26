import { db } from '@/lib/db';
import { ProjectImage, ProjectType } from '@prisma/client';
import React from 'react';
import { type Project as DbProject } from '@prisma/client';
import ProjectWrapper from './project-wrapper';
import Project from './project';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

type PrismaProject = DbProject & { imageUrls: ProjectImage[] };

function categorizeProjects(projects: PrismaProject[]) {
  const now = new Date();
  const today: PrismaProject[] = [];
  const last7Days: PrismaProject[] = [];
  const earlier: PrismaProject[] = [];

  projects.forEach(proj => {
    const updatedAt = new Date(proj.updatedAt);
    const differenceInDays = Math.floor(
      (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays === 0) {
      today.push(proj);
    } else if (differenceInDays <= 7) {
      last7Days.push(proj);
    } else {
      earlier.push(proj);
    }
  });

  return { today, last7Days, earlier };
}

const Projects = async ({
  projectType,
}: {
  projectType: string | string[] | undefined;
}) => {
  let projType: string | undefined;

  if (typeof projectType === 'string') {
    projType = capitalizeFirstLetter(projectType);
  }

  const projects = await db.project.findMany({
    where: {
      type: (projType as unknown as ProjectType) ?? 'Refinish',
    },
    include: {
      imageUrls: true,
    },
  });

  console.log('Projects: ', projects);

  const categorizedProjects = categorizeProjects(projects);

  if (projects.length === 0) return null;
  return (
    <div className="flex flex-col pt-10">
      <ProjectWrapper title="Today" projectType={projType}>
        {categorizedProjects.today.map(proj => (
          <li key={proj.id}>
            <Project project={proj} />
          </li>
        ))}
      </ProjectWrapper>
      {categorizedProjects.last7Days.length > 0 && (
        <ProjectWrapper title="Last 7 Days" projectType={projType}>
          {categorizedProjects.last7Days.map(proj => (
            <li key={proj.id}>
              <Project project={proj} />
            </li>
          ))}
        </ProjectWrapper>
      )}
      {categorizedProjects.earlier.length > 0 && (
        <ProjectWrapper title="Earlier" projectType={projType}>
          {categorizedProjects.earlier.map(proj => (
            <li key={proj.id}>
              <Project project={proj} />
            </li>
          ))}
        </ProjectWrapper>
      )}
    </div>
  );
};

export default Projects;
