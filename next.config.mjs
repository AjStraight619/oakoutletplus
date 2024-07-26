/** @type {import('next').NextConfig} */
const UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
