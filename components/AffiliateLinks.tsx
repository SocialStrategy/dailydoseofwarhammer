'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Star, ExternalLink, Tag } from 'lucide-react'

export default function AffiliateLinks() {
  const affiliatePartners = [
    {
      name: 'Gamemat EU',
      description: 'Premium gaming mats and terrain for your Warhammer 40k battles. High-quality materials and stunning designs.',
      category: 'Gaming Accessories',
      discount: '15% OFF',
      code: 'DDOW11',
      url: 'https://gamemat.eu',
      rating: 4.8,
      reviews: 1247,
      image: '/api/placeholder/300/200'
    },
    {
      name: 'EA & J Labs LLC',
      description: 'Professional gaming equipment and accessories. From dice to storage solutions, everything you need for the hobby.',
      category: 'Gaming Equipment',
      discount: '20% OFF',
      code: 'DAILYDOSE',
      url: 'https://eaandjlabsllc.etsy.com',
      rating: 4.6,
      reviews: 892,
      image: '/api/placeholder/300/200'
    },
    {
      name: 'Spikey Bits',
      description: 'Warhammer 40k news, tactics, and hobby content. Stay updated with the latest releases and community insights.',
      category: 'Warhammer Content',
      discount: '10% OFF',
      code: 'DAILYDOSE',
      url: 'https://spikeybits.com',
      rating: 4.7,
      reviews: 1850,
      image: '/api/placeholder/300/200'
    }
  ]

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">RECOMMENDED PARTNERS</h2>
          <p className="content-text text-lavender-gray max-w-3xl mx-auto">
            Support the channel and get amazing deals on Warhammer 40k supplies, gaming accessories, and hobby tools. 
            These are products we personally use and recommend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliatePartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="warhammer-card group hover:scale-105 transition-all duration-300"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-warhammer-gold text-warhammer-dark font-anton text-sm px-3 py-1 rounded-full">
                  {partner.discount}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center">
                  <span className="text-lavender-gray text-sm">Partner Image</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Category */}
              <span className="text-warhammer-gold text-xs font-medium uppercase tracking-wide mb-2 block">
                {partner.category}
              </span>

              {/* Partner Name */}
              <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                {partner.name}
              </h3>
              
              {/* Description */}
              <p className="text-lavender-gray mb-4 line-clamp-3">
                {partner.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(partner.rating) ? 'text-warhammer-gold fill-current' : 'text-gray-400'}
                    />
                  ))}
                </div>
                <span className="text-sm text-lavender-gray">
                  {partner.rating} ({partner.reviews} reviews)
                </span>
              </div>

              {/* Discount Code */}
              <div className="bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lavender-gray">Use Code:</span>
                  <span className="font-anton text-warhammer-gold text-lg">{partner.code}</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="warhammer-button w-full text-center group-hover:bg-yellow-400 transition-all duration-300"
              >
                <ShoppingCart size={20} className="inline mr-2" />
                Shop Now
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-warhammer-gray/80 backdrop-blur-sm border border-warhammer-gold/30 rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Tag className="text-warhammer-gold mr-2" size={24} />
              <h3 className="font-anton text-2xl text-warhammer-gold">
                AFFILIATE DISCLOSURE
              </h3>
            </div>
            <p className="text-lavender-gray mb-6">
              We may earn a commission from purchases made through these affiliate links. 
              This helps support the channel and allows us to continue creating content for the Warhammer community. 
              All products are personally tested and recommended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/affiliates" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
                VIEW ALL PARTNERS
              </a>
              <a href="/reviews" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
                READ OUR REVIEWS
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
