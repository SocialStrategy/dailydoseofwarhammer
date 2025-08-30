import type { Metadata } from 'next'
import { Anton, Bitter, Cinzel } from 'next/font/google'
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
  title: 'Daily Dose of Warhammer',
  description: 'Your daily source for Warhammer 40,000 content, news, and community submissions',
  keywords: 'Warhammer 40k, Warhammer, 40k, tabletop gaming, miniatures, hobby',
  authors: [{ name: 'Daily Dose of Warhammer' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Daily Dose of Warhammer',
    description: 'Your daily source for Warhammer 40,000 content, news, and community submissions',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/logo.svg',
        width: 300,
        height: 60,
        alt: 'Daily Dose of Warhammer Logo',
      },
    ],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-warhammer-dark text-white font-bitter">
        {children}
      </body>
    </html>
  )
}
