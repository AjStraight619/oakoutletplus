import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import '@uploadthing/react/styles.css';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { Toaster } from 'sonner';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { ThemeProvider } from './provider';
import { sharedMetadata } from '@/lib/shared-metadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...sharedMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />

          <Navbar />
          <Toaster />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
