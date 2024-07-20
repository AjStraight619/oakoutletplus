'use server';

import { encrypt } from '@/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const user = {
    email: formData.get('email') as unknown as string,
    password: formData.get('password') as unknown as string,
  };

  try {
    const dbUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!dbUser) {
      return {
        error: 'User does not exist in our system',
      };
    }

    const isMatch = await bcrypt.compare(user.password, dbUser.password);

    if (!isMatch) {
      return {
        error: 'Incorrect email or password.',
      };
    }

    // Create the session

    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    console.log('Session in login function in auth: ', session);

    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });

    return {
      error: null,
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Something went wrong',
    };
  }
}
