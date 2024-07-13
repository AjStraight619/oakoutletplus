import { authTest } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between gap-x-2">
              <span>Sign In</span>
              <LockIcon />
            </div>
          </CardTitle>
          {/* <CardDescription>Hello Nik</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form
            action={async formData => {
              'use server';
              const isValidUser = await authTest(formData);
              if (isValidUser) redirect('/admin/dashboard');
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Nik@oakoutletplus.com"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="password">Password</Label>

                <Input name="password" type="password" placeholder="********" />
              </div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
