'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, User, Tag } from 'lucide-react'
import EngagementBar from './EngagementBar'

interface FanSubmission {
  id: string
  artist: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  socialHandle?: string
}

export default function FeaturedCommunityPost() {
  const [featuredPost, setFeaturedPost] = useState<FanSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/featured-post')
        
        if (response.ok) {
          const data = await response.json()
          setFeaturedPost(data)
        } else {
          setError('Failed to load featured post')
        }
      } catch (err) {
        setError('Error loading featured post')
        console.error('Error fetching featured post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPost()
  }, [])

  if (loading) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-light">Loading featured community post...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !featuredPost) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="section-title text-warhammer-gold mb-4">
              FEATURED COMMUNITY POST
            </h2>
            <p className="content-text text-text-light max-w-3xl mx-auto">
              No featured community post available at the moment. 
              Submit your work to be featured on the homepage!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-lavender-gray to-languid-lavender">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-warhammer-gold mb-4">
            FEATURED COMMUNITY POST
          </h2>
          <p className="content-text text-text-light">
            Showcasing exceptional work from our talented community members. 
            This week's featured post highlights incredible grimdark miniature painting skills.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="warhammer-card max-w-4xl mx-auto"
        >
          {/* Featured Post Header */}
          <div className="p-6 border-b border-warhammer-gold/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warhammer-gold/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-warhammer-gold" />
                </div>
                <div>
                  <h3 className="font-anton text-2xl text-white">{featuredPost.title}</h3>
                  <p className="text-text-light">by {featuredPost.artist}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-text-light text-sm mb-1">
                  <Calendar size={14} />
                  <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-text-light text-sm">
                  <Tag size={14} />
                  <span>{featuredPost.category}</span>
                </div>
              </div>
            </div>

            <p className="text-white text-lg leading-relaxed">
              {featuredPost.description}
            </p>
          </div>

          {/* Image Gallery */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {featuredPost.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${featuredPost.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Engagement Bar */}
            <EngagementBar
              type="submissions"
              id={featuredPost.id}
              initialData={{
                shares: 0
              }}
              className="mb-6"
            />

            {/* Call to Action */}
            <div className="text-center pt-6 border-t border-warhammer-gold/30">
              <p className="text-text-light text-lg mb-4">
                Inspired by this work? Share your own miniatures with the community!
              </p>
              <a
                href="/submissions"
                className="warhammer-button inline-flex items-center space-x-2"
              >
                <span>SUBMIT YOUR WORK</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

