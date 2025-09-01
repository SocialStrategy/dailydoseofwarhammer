import HeroSection from '@/components/HeroSection'
import FeaturedContent from '@/components/FeaturedContent'
import FeaturedCommunityPost from '@/components/FeaturedCommunityPost'
import SocialLinks from '@/components/SocialLinks'
import AffiliateLinks from '@/components/AffiliateLinks'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCommunityPost />
      <FeaturedContent />
      <SocialLinks />
      <AffiliateLinks />
    </main>
  )
}
