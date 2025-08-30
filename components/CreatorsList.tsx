'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Youtube, Globe, Instagram, Heart, Eye, Star, Users } from 'lucide-react'

interface Creator {
  id: string
  name: string
  description: string
  category: string
  platforms: string[]
  followers: string
  featured: boolean
  website: string
  socialLinks: {
    youtube?: string
    instagram?: string
    website?: string
  }
  latestContent: {
    title: string
    type: 'video' | 'article' | 'tutorial'
    url: string
    thumbnail: string
  }[]
}

export default function CreatorsList() {
  const creators: Creator[] = [
    {
      id: '1',
      name: 'Spikey Bits',
      description: 'Premier source for Warhammer 40k news, rumors, and community content. Known for breaking news and comprehensive coverage of the hobby.',
      category: 'News & Community',
      platforms: ['Website', 'YouTube', 'Social Media'],
      followers: '500K+',
      featured: true,
      website: 'https://spikeybits.com',
      socialLinks: {
        youtube: 'https://youtube.com/@spikeybits',
        instagram: 'https://instagram.com/spikeybits',
        website: 'https://spikeybits.com'
      },
      latestContent: [
        {
          title: 'New Space Marine Codex Review',
          type: 'article',
          url: 'https://spikeybits.com',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          title: 'Top 10 Painting Tips for Beginners',
          type: 'tutorial',
          url: 'https://spikeybits.com',
          thumbnail: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '2',
      name: 'Auspex Tactics',
      description: 'In-depth tactical analysis and competitive gaming insights for Warhammer 40k. Expert breakdowns of rules, strategies, and tournament play.',
      category: 'Tactics & Gaming',
      platforms: ['YouTube', 'Twitch', 'Discord'],
      followers: '300K+',
      featured: true,
      website: 'https://youtube.com/@auspextactics',
      socialLinks: {
        youtube: 'https://youtube.com/@auspextactics',
        website: 'https://youtube.com/@auspextactics'
      },
      latestContent: [
        {
          title: 'Space Marine 10th Edition Tactics',
          type: 'video',
          url: 'https://youtube.com/@auspextactics',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          title: 'Competitive List Building Guide',
          type: 'video',
          url: 'https://youtube.com/@auspextactics',
          thumbnail: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '3',
      name: 'Midwinter Minis',
      description: 'Amazing painting tutorials and hobby content. Known for creative techniques and inspiring miniature painting guides.',
      category: 'Painting & Hobby',
      platforms: ['YouTube', 'Instagram', 'Website'],
      followers: '200K+',
      featured: false,
      website: 'https://midwinterminis.com',
      socialLinks: {
        youtube: 'https://youtube.com/@midwinterminis',
        instagram: 'https://instagram.com/midwinterminis',
        website: 'https://midwinterminis.com'
      },
      latestContent: [
        {
          title: 'Speed Painting Space Marines',
          type: 'tutorial',
          url: 'https://youtube.com/@midwinterminis',
          thumbnail: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '4',
      name: 'Tabletop Tactics',
      description: 'High-quality battle reports and gaming content. Professional production values and entertaining gameplay.',
      category: 'Battle Reports',
      platforms: ['YouTube', 'Patreon', 'Website'],
      followers: '400K+',
      featured: false,
      website: 'https://tabletoptactics.com',
      socialLinks: {
        youtube: 'https://youtube.com/@tabletoptactics',
        website: 'https://tabletoptactics.com'
      },
      latestContent: [
        {
          title: 'Space Marines vs Orks Battle Report',
          type: 'video',
          url: 'https://youtube.com/@tabletoptactics',
          thumbnail: '/api/placeholder/300/200'
        }
      ]
    },
    {
      id: '5',
      name: 'Duncan Rhodes',
      description: 'Former Games Workshop painter sharing professional painting techniques and tutorials.',
      category: 'Painting & Tutorials',
      platforms: ['YouTube', 'Website', 'Social Media'],
      followers: '600K+',
      featured: false,
      website: 'https://duncanrhodes.com',
      socialLinks: {
        youtube: 'https://youtube.com/@duncanrhodes',
        website: 'https://duncanrhodes.com'
      },
      latestContent: [
        {
          title: 'Professional Edge Highlighting',
          type: 'tutorial',
          url: 'https://youtube.com/@duncanrhodes',
          thumbnail: '/api/placeholder/300/200'
        }
      ]
    }
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return Youtube
      case 'instagram':
        return Instagram
      case 'website':
        return Globe
      default:
        return Globe
    }
  }

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Youtube
      case 'article':
        return Globe
      case 'tutorial':
        return Star
      default:
        return Globe
    }
  }

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
            Support them by visiting their channels and sharing their content.
          </p>
        </motion.div>

        <div className="space-y-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`warhammer-card ${creator.featured ? 'border-2 border-warhammer-gold' : ''}`}
            >
              {creator.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-warhammer-gold text-warhammer-dark font-anton text-xs px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Creator Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-anton text-3xl text-white mb-2">
                      {creator.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {creator.platforms.map((platform) => {
                        const Icon = getPlatformIcon(platform)
                        return (
                          <Icon
                            key={platform}
                            size={20}
                            className="text-lavender-gray hover:text-warhammer-gold transition-colors cursor-pointer"
                          />
                        )
                      })}
                    </div>
                  </div>

                  <p className="text-lavender-gray mb-4 leading-relaxed">
                    {creator.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-3 py-1 rounded-full">
                      {creator.category}
                    </span>
                    <span className="text-lavender-gray text-sm">
                      <Users size={16} className="inline mr-1" />
                      {creator.followers} followers
                    </span>
                  </div>

                  {/* Latest Content */}
                  <div className="space-y-3">
                    <h4 className="font-anton text-lg text-warhammer-gold">Latest Content</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {creator.latestContent.map((content, contentIndex) => {
                        const ContentIcon = getContentTypeIcon(content.type)
                        return (
                          <a
                            key={contentIndex}
                            href={content.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 bg-warhammer-dark/50 rounded-lg hover:bg-warhammer-dark transition-colors group"
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded flex items-center justify-center">
                              <span className="text-lavender-gray text-xs">Thumb</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate group-hover:text-warhammer-gold transition-colors">
                                {content.title}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-lavender-gray">
                                <ContentIcon size={12} />
                                <span className="capitalize">{content.type}</span>
                              </div>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Creator Actions */}
                <div className="space-y-4">
                  <div className="text-center">
                    <a
                      href={creator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="warhammer-button w-full mb-3"
                    >
                      <Globe size={20} className="inline mr-2" />
                      Visit Website
                    </a>
                    
                    {creator.socialLinks.youtube && (
                      <a
                        href={creator.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="warhammer-button bg-red-600 hover:bg-red-700 w-full mb-3"
                      >
                        <Youtube size={20} className="inline mr-2" />
                        YouTube Channel
                      </a>
                    )}

                    {creator.socialLinks.instagram && (
                      <a
                        href={creator.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="warhammer-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full"
                      >
                        <Instagram size={20} className="inline mr-2" />
                        Follow on Instagram
                      </a>
                    )}
                  </div>

                  <div className="text-center p-4 bg-warhammer-dark/50 rounded-lg">
                    <p className="text-lavender-gray text-sm mb-2">Support this creator</p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} className="text-red-500" />
                        <span className="text-lavender-gray">Like</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} className="text-blue-500" />
                        <span className="text-lavender-gray">Share</span>
                      </div>
                    </div>
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
              <a href="/contact" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
                NOMINATE CREATOR
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
