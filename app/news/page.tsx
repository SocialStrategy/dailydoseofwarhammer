import { Metadata } from 'next'
import LatestNews from '@/components/LatestNews'

export const metadata: Metadata = {
  title: 'Latest News - Daily Dose of Warhammer',
  description: 'Stay updated with the latest Warhammer 40k news, updates, and announcements. From new releases to community events, we\'ve got you covered.',
  keywords: [
    'Warhammer news',
    'Warhammer 40k news',
    'Warhammer updates',
    'Warhammer announcements',
    'Warhammer releases',
    'Warhammer community news',
    'Games Workshop news',
    'Warhammer events'
  ],
  openGraph: {
    title: 'Latest News - Daily Dose of Warhammer',
    description: 'Stay updated with the latest Warhammer 40k news, updates, and announcements.',
    url: 'https://dailydoseofwarhammer.com/news',
    images: [
      {
        url: 'https://dailydoseofwarhammer.com/images/ddow logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Warhammer 40k Latest News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest News - Daily Dose of Warhammer',
    description: 'Stay updated with the latest Warhammer 40k news, updates, and announcements.',
  },
}

export default function NewsPage() {
  return (
    <main className="min-h-screen pt-20">
      <LatestNews />
    </main>
  )
}
