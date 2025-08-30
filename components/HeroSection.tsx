'use client'

import { motion } from 'framer-motion'
import Navigation from './Navigation'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          {/* Instagram Video Background */}
          <div className="w-full h-full bg-gradient-to-br from-warhammer-dark via-warhammer-gray to-dark-byzantium">
            {/* Video Placeholder with Instagram Link */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-warhammer-gold rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-12 h-12 text-warhammer-dark" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <a 
                  href="https://www.instagram.com/reel/DKvAVkGsMfJ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warhammer-gold hover:text-yellow-400 transition-colors duration-300 font-anton text-lg"
                >
                  WATCH FEATURED VIDEO
                </a>
                <p className="text-lavender-gray text-sm mt-2">Click to view on Instagram</p>
              </div>
            </div>
          </div>
          
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
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
