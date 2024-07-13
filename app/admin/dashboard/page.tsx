import { Separator } from '@/components/ui/separator';

export default async function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen p-12 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl text-muted-foreground">Dashboard</h1>
        <Separator orientation="horizontal" />
      </div>
    </div>
  );
}
