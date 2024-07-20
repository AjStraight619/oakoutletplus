import { testSeedUser } from '@/actions/seed';

export default async function Home() {
  // await testSeedUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
