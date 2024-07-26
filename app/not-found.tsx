import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className="text-blue-500 hover:underline" href="/">
        Go back to Home
      </Link>
    </div>
  );
}
