import { Metadata } from 'next'
import CreatorsHero from '@/components/CreatorsHero'
import CreatorsList from '@/components/CreatorsList'

export const metadata: Metadata = {
  title: 'Creators We Love - Daily Dose of Warhammer',
  description: 'Discover amazing Warhammer 40k content creators, from Spikey Bits articles to Auspex Tactics videos. Find your next favorite Warhammer creator.',
  keywords: [
    'Warhammer creators',
    'Warhammer 40k content creators',
    'Spikey Bits',
    'Auspex Tactics',
    'Warhammer YouTube',
    'Warhammer blogs',
    'Warhammer content',
    'Warhammer community creators'
  ],
  openGraph: {
    title: 'Creators We Love - Daily Dose of Warhammer',
    description: 'Discover amazing Warhammer 40k content creators, from Spikey Bits articles to Auspex Tactics videos.',
    url: 'https://dailydoseofwarhammer.com/creators',
    images: [
      {
        url: 'https://dailydoseofwarhammer.com/images/ddow logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Warhammer 40k Content Creators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creators We Love - Daily Dose of Warhammer',
    description: 'Discover amazing Warhammer 40k content creators, from Spikey Bits articles to Auspex Tactics videos.',
  },
}

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warhammer-dark via-warhammer-gray to-dark-byzantium">
      <CreatorsHero />
      <CreatorsList />
    </main>
  )
}
