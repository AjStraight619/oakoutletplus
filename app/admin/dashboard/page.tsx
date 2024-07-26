import { getSession } from '@/auth';
import NewProject from '@/components/dashboard/new-project';
import ProjectTypeSelection from '@/components/dashboard/project-type-selection';
import Projects from '@/components/projects/projects';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type AdminPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const projectType = searchParams?.projectType;
  const session = await getSession();
  if (!session) {
    redirect('/admin/sign-in');
  }
  console.log('Session in dashboard page:');
  console.log(JSON.stringify(session, null, 2));

  // TODO: Implement fallback UI for projects

  return (
    <div className="flex flex-col min-h-screen container pt-20 w-full gap-y-6">
      <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row ">
        <ProjectTypeSelection projectType={projectType as string | undefined} />
        <NewProject />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Projects projectType={projectType} />
      </Suspense>
    </div>
  );
}
