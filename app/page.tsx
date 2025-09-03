import HeroSection from '@/components/HeroSection'
import FeaturedCommunityPost from '@/components/FeaturedCommunityPost'
import SocialLinks from '@/components/SocialLinks'
import AffiliateLinks from '@/components/AffiliateLinks'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCommunityPost />
      <SocialLinks />
      <AffiliateLinks />
    </main>
  )
}
