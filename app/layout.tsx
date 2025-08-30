import type { Metadata } from 'next'
import { Anton, Bitter, Cinzel } from 'next/font/google'
import Navigation from '@/components/Navigation'
import StructuredData, { OrganizationStructuredData } from '@/components/StructuredData'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
})

const bitter = Bitter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bitter',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dailydoseofwarhammer.com'),
  title: {
    default: 'Daily Dose of Warhammer - Your Daily Warhammer 40k Source',
    template: '%s | Daily Dose of Warhammer'
  },
  description: 'Your daily source for Warhammer 40,000 content, news, community submissions, painting tutorials, and creator spotlights. Stay updated with the latest from the Warhammer universe.',
  keywords: [
    'Warhammer 40k',
    'Warhammer',
    '40k',
    'tabletop gaming',
    'miniatures',
    'hobby',
    'painting',
    'gaming',
    'Warhammer news',
    'Warhammer community',
    'Warhammer tutorials',
    'Warhammer lore',
    'Warhammer 40k news',
    'Warhammer painting techniques',
    'Warhammer miniatures',
    'Warhammer gaming strategy',
    'Warhammer 40k armies',
    'Warhammer community submissions'
  ],
  authors: [{ name: 'Daily Dose of Warhammer' }],
  creator: 'Daily Dose of Warhammer',
  publisher: 'Daily Dose of Warhammer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
    yandex: 'your-yandex-verification-code', // Replace with actual code
    yahoo: 'your-yahoo-verification-code', // Replace with actual code
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dailydoseofwarhammer.com',
    siteName: 'Daily Dose of Warhammer',
    title: 'Daily Dose of Warhammer - Your Daily Warhammer 40k Source',
    description: 'Your daily source for Warhammer 40,000 content, news, community submissions, painting tutorials, and creator spotlights.',
    images: [
      {
        url: 'https://dailydoseofwarhammer.com/images/ddow logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Daily Dose of Warhammer - Warhammer 40k Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dailydoseofwarhammer',
    creator: '@dailydoseofwarhammer',
    title: 'Daily Dose of Warhammer - Your Daily Warhammer 40k Source',
    description: 'Your daily source for Warhammer 40,000 content, news, community submissions, painting tutorials, and creator spotlights.',
    images: ['https://dailydoseofwarhammer.com/images/ddow logo.jpg'],
  },
  alternates: {
    canonical: 'https://dailydoseofwarhammer.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${bitter.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://dailydoseofwarhammer.com" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="msapplication-TileColor" content="#FFD700" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Daily Dose of Warhammer" />
        <meta name="application-name" content="Daily Dose of Warhammer" />
        <meta name="mobile-web-app-capable" content="yes" />
        <StructuredData />
        <OrganizationStructuredData />
      </head>
      <body className="bg-warhammer-dark text-white font-bitter">
        <PerformanceMonitor />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
