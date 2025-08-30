'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram, Youtube, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Creators We Love', href: '/creators' },
    { name: 'Fan Submissions', href: '/submissions' },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/dailydoseofwarhammer/', icon: Instagram },
    { name: 'YouTube', href: 'https://www.youtube.com/@dailydoseofwarhammer', icon: Youtube },
    { name: 'Discord', href: 'https://discord.gg/dailydoseofwarhammer', icon: MessageCircle },
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
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-warhammer-gold/30">
              <Image
                src="/images/ddow logo.jpg"
                alt="Daily Dose of Warhammer Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-anton text-lg leading-tight">
                Daily Dose of
              </div>
              <div className="text-warhammer-gold font-anton text-xl leading-tight">
                Warhammer
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-text-light hover:text-warhammer-gold transition-colors duration-300 font-bitter"
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
                  className="block text-text-light hover:text-warhammer-gold transition-colors duration-300 font-bitter text-lg"
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
