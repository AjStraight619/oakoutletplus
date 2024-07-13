'use server';

export const authTest = async (formData: FormData) => {
  const email = formData.get('email') as unknown as string;
  const password = formData.get('password') as unknown as string;
  const envEmail = process.env.EMAIL!;
  const envPassword = process.env.PASSWORD!;

  if (
    email.toLowerCase() === envEmail.toLowerCase() &&
    password === envPassword
  ) {
    return true;
  } else {
    return false;
  }
};
