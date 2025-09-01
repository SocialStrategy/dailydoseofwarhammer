'use client'

import { motion } from 'framer-motion'
import { Instagram, Youtube, MessageCircle, ExternalLink } from 'lucide-react'

export default function SocialLinks() {
  const socialPlatforms = [
    {
      name: 'Instagram',
      description: 'Follow us for daily Warhammer inspiration, painting tips, and community highlights.',
      icon: Instagram,
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/dailydoseofwarhammer/?hl=en',
      color: 'from-pink-500 to-purple-600',
      followers: '15.2k'
    },
    {
      name: 'YouTube',
      description: 'Watch painting tutorials, battle reports, and Warhammer 40k content from top creators.',
      icon: Youtube,
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@YourDailyDoseOfWarhammer',
      color: 'from-red-500 to-red-700',
      followers: '8.7k'
    },
    {
      name: 'TikTok',
      description: 'Quick Warhammer tips, painting hacks, and entertaining hobby content in short form.',
      icon: MessageCircle,
      url: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@dailydoseofwarhammer',
      color: 'from-blue-500 to-purple-600',
      followers: '12.4k'
    },
    {
      name: 'Discord',
      description: 'Join our community server to discuss tactics, share your work, and connect with fellow hobbyists.',
      icon: MessageCircle,
      url: process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/RP95BNkRH6',
      color: 'from-indigo-500 to-purple-600',
      followers: '3.1k'
    }
  ]

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-dark-byzantium to-old-lavender">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">JOIN OUR COMMUNITY</h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            Connect with the Daily Dose of Warhammer community across all major social media platforms. 
            Stay updated with the latest content, engage with fellow hobbyists, and never miss a post.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="warhammer-card group hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}>
                  <platform.icon size={32} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-anton text-xl text-white group-hover:text-warhammer-gold transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <ExternalLink size={16} className="text-lavender-gray group-hover:text-warhammer-gold transition-colors duration-300" />
                  </div>
                  
                  <p className="text-text-light mb-3 line-clamp-2">
                    {platform.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light">
                      <span className="font-medium">{platform.followers}</span> followers
                    </span>
                    <span className="text-warhammer-gold text-sm font-medium group-hover:text-yellow-400 transition-colors duration-300">
                      Follow Now →
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-warhammer-gray/80 backdrop-blur-sm border border-warhammer-gold/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="font-anton text-2xl text-warhammer-gold mb-4">
              STAY CONNECTED
            </h3>
            <p className="text-text-light mb-6">
              Join our growing community and be part of the conversation. 
              Share your thoughts, ask questions, and connect with fellow Warhammer enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/news" className="warhammer-button">
                READ LATEST NEWS
              </a>
              <a href="https://discord.gg/dailydoseofwarhammer" target="_blank" rel="noopener noreferrer" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
                JOIN DISCORD SERVER
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
