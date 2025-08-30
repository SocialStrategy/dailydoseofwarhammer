'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-warhammer-dark via-warhammer-gray to-dark-byzantium">
      {/* Hero Content Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-8 pt-20">
        
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-text mb-6 lg:mb-8"
          >
            DAILY DOSE OF WARHAMMER
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-bitter text-xl lg:text-2xl text-text-light max-w-2xl mx-auto lg:mx-0 mb-8 lg:mb-12"
          >
            Your daily source for Warhammer 40,000 content, news, and community submissions. 
            In the grim darkness of the far future, there is only war... and our passion for the hobby.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          >
            <a href="/submissions" className="warhammer-button">
              SUBMIT YOUR WORK
            </a>
            <a href="/creators" className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark">
              EXPLORE CREATORS
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Instagram Video */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
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
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-text-light">
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 border-2 border-text-light rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-2 bg-text-light rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
