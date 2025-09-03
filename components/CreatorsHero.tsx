'use client'

import { motion } from 'framer-motion'
import { Star, Users, Heart, Award } from 'lucide-react'

export default function CreatorsHero() {
  const stats = [
    { icon: Star, value: '50+', label: 'Featured Creators' },
    { icon: Users, value: '2M+', label: 'Combined Followers' },
    { icon: Heart, value: '1000+', label: 'Content Pieces' },
    { icon: Award, value: '15+', label: 'Years Experience' }
  ]

  return (
    <section className="pt-32 pb-20 px-4 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-warhammer-gold/20 via-transparent to-dark-byzantium/20" />
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbca1b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-anton text-5xl lg:text-7xl text-white mb-6 warhammer-text-shadow">
            CREATORS WE LOVE
          </h1>
          <p className="font-bitter text-xl lg:text-2xl text-text-light max-w-4xl mx-auto mb-8">
            Discover amazing Warhammer 40,000 content creators, from Spikey Bits articles to Auspex Tactics videos. 
            Find your next favorite Warhammer creator and dive deep into the hobby.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-warhammer-gold/20 border border-warhammer-gold/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-warhammer-gold" />
                </div>
                <div className="font-anton text-2xl text-white mb-1">{stat.value}</div>
                <div className="text-lavender-gray text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  )
}
