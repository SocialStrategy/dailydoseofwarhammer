'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Youtube, Globe, Instagram, Users, Star } from 'lucide-react'

interface Creator {
  id: string
  name: string
  description: string
  category: string
  followers: string
  featured: boolean
  website: string
  socialLinks: {
    youtube?: string
    instagram?: string
    website?: string
  }
  logo?: string
}

export default function CreatorsList() {
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Spikey Bits',
      description: 'Premier source for Warhammer 40k news, rumors, and community content. Known for breaking news and comprehensive coverage of the hobby.',
      category: 'News & Community',
      followers: '500K+',
      featured: true,
      website: 'https://spikeybits.com',
      socialLinks: {
        youtube: 'https://youtube.com/@spikeybits',
        instagram: 'https://instagram.com/spikeybits',
        website: 'https://spikeybits.com'
      },
      logo: '/images/Creator-logos/Spikey Bits.jpg'
    },
    {
      id: '2',
      name: 'Auspex Tactics',
      description: 'In-depth tactical analysis and competitive gaming insights for Warhammer 40k. Expert breakdowns of rules, strategies, and tournament play.',
      category: 'Tactics & Gaming',
      followers: '300K+',
      featured: true,
      website: 'https://youtube.com/@auspextactics',
      socialLinks: {
        youtube: 'https://youtube.com/@auspextactics',
        website: 'https://youtube.com/@auspextactics'
      },
      logo: '/images/Creator-logos/Auspex Tactics.jpg'
    },
    {
      id: '3',
      name: 'Midwinter Minis',
      description: 'Amazing painting tutorials and hobby content. Known for creative techniques and inspiring miniature painting guides.',
      category: 'Painting & Hobby',
      followers: '200K+',
      featured: false,
      website: 'https://midwinterminis.com',
      socialLinks: {
        youtube: 'https://youtube.com/@midwinterminis',
        instagram: 'https://instagram.com/midwinterminis',
        website: 'https://midwinterminis.com'
      },
      logo: '/images/Creator-logos/Miwinter Minis.jpg'
    },
    {
      id: '4',
      name: 'Tabletop Tactics',
      description: 'High-quality battle reports and gaming content. Professional production values and entertaining gameplay.',
      category: 'Battle Reports',
      followers: '400K+',
      featured: false,
      website: 'https://tabletoptactics.com',
      socialLinks: {
        youtube: 'https://youtube.com/@tabletoptactics',
        website: 'https://tabletoptactics.com'
      },
      logo: '/images/Creator-logos/Tabletop Tactics.jpg'
    },
    {
      id: '5',
      name: 'Duncan Rhodes',
      description: 'Former Games Workshop painter sharing professional painting techniques and tutorials.',
      category: 'Painting & Tutorials',
      followers: '600K+',
      featured: false,
      website: 'https://duncanrhodes.com',
      socialLinks: {
        youtube: 'https://youtube.com/@duncanrhodes',
        website: 'https://duncanrhodes.com'
      },
      logo: '/images/Creator-logos/Duncan Rhodes.jpg'
    }
  ]

  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">FEATURED CREATORS</h2>
          <p className="content-text text-lavender-gray max-w-3xl mx-auto">
            These creators represent the best of the Warhammer 40k community. 
            Support them by visiting their channels and following their work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`warhammer-card ${creator.featured ? 'border-2 border-warhammer-gold' : ''} relative`}
            >
              {creator.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-warhammer-gold text-warhammer-dark font-anton text-xs px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>
              )}

              {/* Creator Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-warhammer-gold/30">
                  <img
                    src={creator.logo}
                    alt={`${creator.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-anton text-2xl text-white mb-2">
                  {creator.name}
                </h3>
                <p className="text-lavender-gray text-sm leading-relaxed mb-4">
                  {creator.description}
                </p>
                
                {/* Category and Followers */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                  <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-3 py-1 rounded-full">
                    {creator.category}
                  </span>
                  <span className="text-lavender-gray text-sm flex items-center">
                    <Users size={14} className="inline mr-1" />
                    {creator.followers} followers
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3 mb-6">
                {/* Website Button */}
                <a
                  href={creator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-3 bg-warhammer-gold hover:bg-yellow-400 text-warhammer-dark font-medium rounded-lg transition-colors duration-200"
                >
                  <Globe size={18} className="mr-2" />
                  Visit Website
                </a>
                
                {/* YouTube Button */}
                {creator.socialLinks.youtube && (
                  <a
                    href={creator.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube Channel
                  </a>
                )}

                {/* Instagram Button */}
                {creator.socialLinks.instagram && (
                  <a
                    href={creator.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Follow on Instagram
                  </a>
                )}
              </div>

              {/* Support Section */}
              <div className="text-center p-4 bg-warhammer-dark/50 rounded-lg">
                <p className="text-lavender-gray text-sm mb-2">Support this creator</p>
                <div className="flex items-center justify-center text-sm">
                  <div className="flex items-center space-x-1">
                    <ExternalLink size={14} className="text-warhammer-gold" />
                    <span className="text-lavender-gray">Share</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="warhammer-card max-w-3xl mx-auto">
            <h3 className="font-anton text-2xl text-warhammer-gold mb-4">
              KNOW A GREAT CREATOR?
            </h3>
            <p className="text-lavender-gray mb-6">
              Help us discover amazing Warhammer 40k content creators. 
              Nominate someone whose work inspires you or submit your own content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/submissions" className="warhammer-button">
                SUBMIT YOUR WORK
              </a>
              <a href="/submissions" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
                NOMINATE CREATOR
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
