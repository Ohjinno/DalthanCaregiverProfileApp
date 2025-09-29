
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/providers';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CaregiverProfile - Craft Your Pro Profile Today',
  description: 'Professional profile builder for caregivers, nurses, nannies, freelancers, and contractors. Create stunning PDFs in minutes.',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#26A69A',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="application-name" content="CaregiverProfile" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CaregiverProfile" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#26A69A" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Providers session={session}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
