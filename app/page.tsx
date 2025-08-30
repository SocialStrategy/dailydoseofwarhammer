import HeroSection from '@/components/HeroSection'
import FeaturedContent from '@/components/FeaturedContent'
import LatestNews from '@/components/LatestNews'
import SocialLinks from '@/components/SocialLinks'
import AffiliateLinks from '@/components/AffiliateLinks'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedContent />
      <LatestNews />
      <SocialLinks />
      <AffiliateLinks />
    </main>
  )
}
