'use client'

import { motion } from 'framer-motion'
import { Star, Eye, Heart } from 'lucide-react'

export default function FeaturedContent() {
  const featuredItems = [
    {
      id: 1,
      title: "Space Marine Painting Masterclass",
      description: "Learn advanced techniques for painting Space Marines with expert tips from the community.",
      image: "/api/placeholder/400/300",
      category: "Painting",
      views: "2.4k",
      likes: "156"
    },
    {
      id: 2,
      title: "Tactics: Imperial Guard vs Orks",
      description: "Strategic insights for commanding the Imperial Guard against the green tide.",
      image: "/api/placeholder/400/300",
      category: "Tactics",
      views: "1.8k",
      likes: "89"
    },
    {
      id: 3,
      title: "Terrain Building: Industrial Complex",
      description: "Step-by-step guide to creating industrial terrain for your battlefields.",
      image: "/api/placeholder/400/300",
      category: "Terrain",
      views: "3.1k",
      likes: "203"
    }
  ]

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-warhammer-dark to-warhammer-gray">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">FEATURED CONTENT</h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            Discover curated content handpicked by our team of Warhammer enthusiasts. 
            From painting tutorials to battle reports, we showcase the best of the hobby.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="warhammer-card group cursor-pointer"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center">
                  <span className="text-text-light text-sm">Featured Image</span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-text-light mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between text-sm text-text-light">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={16} />
                    <span>{item.likes}</span>
                  </div>
                </div>
                <Star className="text-warhammer-gold" size={16} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="/featured" className="warhammer-button">
            VIEW ALL FEATURED CONTENT
          </a>
        </motion.div>
      </div>
    </section>
  )
}
