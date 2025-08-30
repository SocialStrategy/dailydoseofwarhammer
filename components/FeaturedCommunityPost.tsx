'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, MessageCircle, Share2, Star } from 'lucide-react'

interface FanSubmission {
  artist: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  tags: string[]
  likes?: number
  views?: number
  comments?: number
}

export default function FeaturedCommunityPost() {
  const [featuredPost, setFeaturedPost] = useState<FanSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const response = await fetch('/api/featured-post')
        if (!response.ok) {
          throw new Error('Failed to fetch featured post')
        }
        const data = await response.json()
        setFeaturedPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load featured post')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPost()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-warhammer-gold/30 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-warhammer-gold/20 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !featuredPost) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title text-warhammer-gold mb-4">
            FEATURED COMMUNITY POST
          </h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            No featured community post available at the moment. 
            Submit your work to be featured on the homepage!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-warhammer-gold mb-4">
            FEATURED COMMUNITY POST
          </h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            Showcasing exceptional work from our talented community members. 
            This week's featured post highlights incredible grimdark miniature painting skills.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="warhammer-card max-w-6xl mx-auto"
        >
          {/* Post Header */}
          <div className="p-6 border-b border-warhammer-gold/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warhammer-gold rounded-full flex items-center justify-center">
                  <span className="font-anton text-warhammer-dark text-lg">
                    {featuredPost.artist.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-anton text-xl text-white">
                    {featuredPost.artist}
                  </h3>
                  <p className="text-lavender-gray text-sm">
                    Featured Artist
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <p className="text-lavender-gray text-sm mt-1">
                  {new Date(featuredPost.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <h4 className="font-anton text-2xl text-white mb-3">
              {featuredPost.title}
            </h4>
            
            <p className="text-lavender-gray mb-4">
              {featuredPost.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {featuredPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-warhammer-dark/50 text-warhammer-gold text-xs px-2 py-1 rounded border border-warhammer-gold/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image Gallery - 4 images in 2x2 grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {featuredPost.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg overflow-hidden border border-warhammer-gold/30 group-hover:border-warhammer-gold transition-all duration-300 relative">
                    {/* Actual image from fan submission */}
                    <img 
                      src={image} 
                      alt={`${featuredPost.artist}'s miniature painting - view ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-anton text-lg">
                        View Full Size
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-lavender-gray">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-warhammer-red" />
                  <span>{featuredPost.likes?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-warhammer-gold" />
                  <span>{featuredPost.views?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-warhammer-gold" />
                  <span>{featuredPost.comments || '0'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-warhammer-dark/50 rounded-lg transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-warhammer-dark/50 rounded-lg transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-6 bg-warhammer-dark/30 border-t border-warhammer-gold/30">
            <div className="text-center">
              <p className="text-lavender-gray mb-4">
                Inspired by this work? Share your own miniatures with the community!
              </p>
              <a href="/submissions" className="warhammer-button">
                SUBMIT YOUR WORK
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
