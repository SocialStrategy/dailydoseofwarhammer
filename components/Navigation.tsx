'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Youtube, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Featured Content', href: '/featured' },
    { name: 'Latest News', href: '/news' },
    { name: 'Creators We Love', href: '/creators' },
    { name: 'Fan Submissions', href: '/submissions' },
    { name: 'Affiliate Links', href: '/affiliates' },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
    { name: 'Discord', href: 'https://discord.gg', icon: MessageCircle },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center px-4 lg:px-8 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-warhammer-gold rounded-lg flex items-center justify-center">
              <span className="font-anton text-warhammer-dark text-lg">DD</span>
            </div>
            <span className="font-anton text-white text-xl hidden sm:block">
              Daily Dose
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lavender-gray hover:text-warhammer-gold transition-colors duration-300 font-bitter"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="hidden lg:flex items-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lavender-gray hover:text-warhammer-gold transition-colors duration-300"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden backdrop-blur-custom border-t border-warhammer-gold/30"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lavender-gray hover:text-warhammer-gold transition-colors duration-300 font-bitter text-lg"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-warhammer-gold/30">
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lavender-gray hover:text-warhammer-gold transition-colors duration-300"
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
