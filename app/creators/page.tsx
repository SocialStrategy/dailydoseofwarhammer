import { Metadata } from 'next'
import CreatorsHero from '@/components/CreatorsHero'
import CreatorsList from '@/components/CreatorsList'

export const metadata: Metadata = {
  title: 'Creators We Love - Daily Dose of Warhammer',
  description: 'Discover amazing Warhammer 40k content creators including Spikey Bits, Auspex Tactics, and many more.',
}

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warhammer-dark via-warhammer-gray to-dark-byzantium">
      <CreatorsHero />
      <CreatorsList />
    </main>
  )
}
