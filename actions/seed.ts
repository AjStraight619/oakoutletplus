'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export const testSeedUser = async () => {
  const email = 'test@1234.com';
  const password = 'Testpass123';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('hashed password: ', hashedPassword);
  const match = await bcrypt.compare(password, hashedPassword);
  console.log('Passwords Match: ', match);

  try {
    await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
