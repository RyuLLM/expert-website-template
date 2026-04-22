import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';

/* ===== FONTS ===== */
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

/* ===== METADATA ===== */
export const metadata: Metadata = {
  title: {
    default: 'ExpertWeb — Premium Web Design Studio',
    template: '%s | ExpertWeb',
  },
  description:
    'We craft premium web experiences that captivate audiences and drive results. From concept to launch, every pixel tells your story.',
  keywords: [
    'web design',
    'web development',
    'premium design',
    'UI/UX',
    'Next.js',
    'React',
    'branding',
    'digital agency',
  ],
  authors: [{ name: 'ExpertWeb' }],
  creator: 'ExpertWeb',
  publisher: 'ExpertWeb',
  metadataBase: new URL('https://expertweb.studio'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://expertweb.studio',
    siteName: 'ExpertWeb',
    title: 'ExpertWeb — Premium Web Design Studio',
    description:
      'We craft premium web experiences that captivate audiences and drive results.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExpertWeb — Premium Web Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExpertWeb — Premium Web Design Studio',
    description:
      'We craft premium web experiences that captivate audiences and drive results.',
    images: ['/images/og-image.png'],
    creator: '@expertweb',
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
  alternates: {
    canonical: 'https://expertweb.studio',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a14' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* ===== JSON-LD SCHEMA ===== */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ExpertWeb',
  url: 'https://expertweb.studio',
  logo: 'https://expertweb.studio/images/logo.png',
  description:
    'We craft premium web experiences that captivate audiences and drive results.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@expertweb.studio',
  },
  sameAs: [
    'https://twitter.com/expertweb',
    'https://linkedin.com/company/expertweb',
    'https://github.com/expertweb',
  ],
};

/* ===== ROOT LAYOUT ===== */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Prevent flash of unstyled dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`font-body antialiased ${body.variable} ${display.variable}`}
      >
        {/* Skip-to-content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
