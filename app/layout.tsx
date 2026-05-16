import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://rrefmatrixcalc.com'),
  title: {
    default: 'RREF Calculator — Reduced Row Echelon Form with Steps',
    template: '%s | RREF Calculator',
  },
  description:
    'Free online RREF calculator. Solve any matrix size, see every Gauss-Jordan elimination step, get exact fraction answers. Step-by-step reduced row echelon form calculator.',
  keywords: [
    'rref calculator',
    'reduced row echelon form calculator',
    'rref matrix calculator',
    'matrix rref calculator',
    'row reduced echelon form calculator',
    'rref calculator with steps',
    'gauss jordan elimination calculator',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rrefmatrixcalc.com',
    siteName: 'RREF Calculator',
    title: 'RREF Calculator — Reduced Row Echelon Form with Step-by-Step Solutions',
    description:
      'The most accurate free RREF calculator online. Exact rational arithmetic, full step-by-step Gauss-Jordan elimination, KaTeX rendering.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RREF Calculator — Reduced Row Echelon Form with Steps',
    description: 'Free online RREF calculator with step-by-step solutions. Exact fractions, no rounding errors.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
      },
    }
  } : {}),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'RREF Calculator',
  description:
    'Free online RREF (Reduced Row Echelon Form) calculator with step-by-step Gauss-Jordan elimination. Supports exact rational arithmetic.',
  url: 'https://rrefmatrixcalc.com',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Exact rational arithmetic',
    'Step-by-step Gauss-Jordan elimination',
    'KaTeX math rendering',
    'Matrix sizes up to 6×6',
    'Augmented matrix support',
    'Solution interpretation',
    'Save and share problems',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <meta name="theme-color" content="#2563EB" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <ScrollToTop />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
