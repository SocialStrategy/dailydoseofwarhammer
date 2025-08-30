'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, MessageCircle, Share2, Star } from 'lucide-react'

export default function FeaturedCommunityPost() {
  // This would be the featured post data - you can update with actual images
  const featuredPost = {
    artist: 'Yarrick',
    title: 'My Latest Miniature Painting Project',
    description: 'A detailed showcase of my latest Warhammer 40k miniature painting work. This project took several weeks to complete and features advanced techniques including edge highlighting, weathering, and custom basing.',
    category: 'Miniature Painting',
    images: [
      '/images/yarrick-miniature-1.jpg',
      '/images/yarrick-miniature-2.jpg', 
      '/images/yarrick-miniature-3.jpg',
      '/images/yarrick-miniature-4.jpg',
      '/images/yarrick-miniature-5.jpg'
    ],
    likes: 247,
    views: 1893,
    comments: 56,
    date: '2024-01-15',
    tags: ['Painting', 'Warhammer 40k', 'Advanced Techniques', 'Custom Basing']
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
          <p className="content-text text-lavender-gray max-w-3xl mx-auto">
            Showcasing exceptional work from our talented community members. 
            This week's featured post highlights incredible miniature painting skills.
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

          {/* Image Gallery */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {featuredPost.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg overflow-hidden border border-warhammer-gold/30 group-hover:border-warhammer-gold transition-all duration-300">
                    {/* Placeholder for actual images */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Star className="w-8 h-8 text-warhammer-gold mx-auto mb-2" />
                        <p className="text-lavender-gray text-sm">
                          {index === 0 ? 'Main View' : 
                           index === 1 ? 'Detail Shot' :
                           index === 2 ? 'Side View' :
                           index === 3 ? 'Close-up' : 'Basing Detail'}
                        </p>
                      </div>
                    </div>
                    
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
                  <span>{featuredPost.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-warhammer-gold" />
                  <span>{featuredPost.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-warhammer-gold" />
                  <span>{featuredPost.comments}</span>
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
