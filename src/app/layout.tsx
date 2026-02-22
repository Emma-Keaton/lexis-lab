// Root Layout - App wrapper with theme and fonts

import type { Metadata, Viewport } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { seoConfig } from '@/lib/constants';
import './globals.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: seoConfig.title,
    template: "%s | Lexi's Lab",
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: "Lexi's Lab" }],
  creator: "Lexi's Lab",
  icons: {
    icon: '/images/logo 1.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seoConfig.url,
    title: seoConfig.title,
    description: seoConfig.description,
    siteName: "Lexi's Lab",
    images: [
      {
        url: 'https://lexis-lab-pi.vercel.app/images/logo1.png',
        width: 1200,
        height: 630,
        alt: "Lexi's Lab Logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
    images: ['https://lexis-lab-pi.vercel.app/images/logo1.png'],
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F9FA' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F12' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
