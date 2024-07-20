import { getSession } from '@/auth';
import NewProject from '@/components/dashboard/new-project';
import Projects from '@/components/projects/projects';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { Suspense } from 'react';

type AdminPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const projectType = searchParams?.projectType;
  const session = await getSession();
  console.log('Session in dashboard page:');
  console.log(JSON.stringify(session, null, 2));

  return (
    <div className="flex flex-col min-h-screen p-12 w-full gap-y-2">
      <div className="space-y-2">
        <h1 className="text-3xl text-muted-foreground">Dashboard</h1>
        <Separator orientation="horizontal" />
      </div>
      <div className="self-end">
        <NewProject />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Projects projectType={projectType} />
      </Suspense>
    </div>
  );
}
