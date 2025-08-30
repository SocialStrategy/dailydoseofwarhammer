'use client'

import { motion } from 'framer-motion'
import Navigation from './Navigation'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* Instagram Video Embed */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
              <iframe
                src="https://www.instagram.com/reel/DKvAVkGsMfJ/embed"
                className="w-full aspect-square"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                title="Daily Dose of Warhammer Featured Video"
              />
            </div>
          </div>
          
          {/* Fallback background if embed fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-warhammer-dark via-warhammer-gray to-dark-byzantium opacity-20 pointer-events-none" />
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-text mb-6 lg:mb-8"
          >
            DAILY DOSE OF WARHAMMER
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bitter text-xl lg:text-2xl text-lavender-gray max-w-4xl mx-auto mb-8 lg:mb-12"
          >
            Your daily source for Warhammer 40,000 content, news, and community submissions. 
            In the grim darkness of the far future, there is only war... and our passion for the hobby.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="/submissions" className="warhammer-button">
              SUBMIT YOUR WORK
            </a>
            <a href="/creators" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
              EXPLORE CREATORS
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-lavender-gray">
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 border-2 border-lavender-gray rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-2 bg-lavender-gray rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
