import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen">{children}</div>
  );
}
