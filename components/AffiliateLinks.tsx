'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Star, ExternalLink, Tag } from 'lucide-react'

export default function AffiliateLinks() {
  const affiliatePartners = [
    {
      name: 'Gamemat EU',
      description: 'Premium gaming mats and terrain for your Warhammer 40k battles. High-quality materials and stunning designs.',
      category: 'Gaming Accessories',
      discount: '11% OFF',
      code: 'DDOW11',
      url: 'https://gamemat.eu',
      rating: 4.8,
      reviews: 1247,
      image: '/images/Affiliate-logos/gamemateu updated picture.jpeg'
    },
    {
      name: 'EA & J Labs LLC',
      description: 'Professional gaming equipment and accessories. From dice to storage solutions, everything you need for the hobby.',
      category: 'Gaming Equipment',
      discount: '10% OFF',
      code: 'DAILYDOSE',
      url: 'https://eaandjlabsllc.etsy.com',
      rating: 4.6,
      reviews: 892,
      image: '/images/Affiliate-logos/ea and j labs new.jpg'
    },
    {
      name: 'Spikey Bits',
      description: 'Warhammer 40k news, tactics, and hobby content. Stay updated with the latest releases and community insights.',
      category: 'Warhammer Content',
      discount: null,
      code: null,
      url: 'https://spikeybits.com',
      rating: 4.7,
      reviews: 1850,
      image: '/images/Affiliate-logos/Spikey Bits.jpg'
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
          <p className="content-text text-text-light max-w-3xl mx-auto">
            Support the Daily Dose of Warhammer community by using our affiliate links. 
            These partnerships help us keep the content flowing and the community growing.
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
              {partner.discount && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-warhammer-gold text-warhammer-dark font-anton text-sm px-3 py-1 rounded-full">
                    {partner.discount}
                  </div>
                </div>
              )}

              {/* Partner Logo */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="aspect-video bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center p-4">
                  <img
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain"
                  />
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
              <p className="text-text-light mb-4 line-clamp-3">
                {partner.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const rating = partner.rating;
                    
                    if (starValue <= Math.floor(rating)) {
                      // Full star
                      return (
                        <Star
                          key={i}
                          size={16}
                          className="text-warhammer-gold fill-current"
                        />
                      );
                    } else if (starValue === Math.ceil(rating) && rating % 1 !== 0) {
                      // Partial star - calculate fill percentage
                      const fillPercentage = (rating % 1) * 100;
                      return (
                        <div key={i} className="relative">
                          <Star
                            size={16}
                            className="text-gray-400"
                          />
                          <div 
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                          >
                            <Star
                              size={16}
                              className="text-warhammer-gold fill-current"
                            />
                          </div>
                        </div>
                      );
                    } else {
                      // Empty star
                      return (
                        <Star
                          key={i}
                          size={16}
                          className="text-gray-400"
                        />
                      );
                    }
                  })}
                </div>
                <span className="text-sm text-text-light">
                  Rating: {partner.rating}/5
                </span>
              </div>

              {/* Discount Code */}
              {partner.code && (
                <div className="bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light">Use Code:</span>
                    <span className="font-anton text-warhammer-gold text-lg">{partner.code}</span>
                  </div>
                </div>
              )}

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
            <p className="text-text-light mb-6">
              By using these affiliate links, you're supporting the Daily Dose of Warhammer community 
              and helping us continue to provide amazing content and features.
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="/submissions" className="warhammer-button">
                 VIEW FAN SUBMISSIONS
               </a>
               <a href="/creators" className="warhammer-button">
                 EXPLORE CREATORS
               </a>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
