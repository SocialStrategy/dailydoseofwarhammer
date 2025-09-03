'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Globe, MessageSquare, Mail } from 'lucide-react'

export default function CreatorNominationForm() {
  const [formData, setFormData] = useState({
    creatorName: '',
    youtubeLink: '',
    instagramLink: '',
    websiteLink: '',
    whyGreat: '',
    submitterEmail: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Here you would typically send the data to your API
      // For now, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        creatorName: '',
        youtubeLink: '',
        instagramLink: '',
        websiteLink: '',
        whyGreat: '',
        submitterEmail: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="warhammer-card max-w-4xl mx-auto"
      id="nominate-form"
    >
      <div className="text-center mb-8">
        <h3 className="font-anton text-3xl text-warhammer-gold mb-4">
          NOMINATE A CREATOR
        </h3>
        <p className="text-lavender-gray text-lg">
          Know an amazing Warhammer 40k content creator who deserves recognition? 
          Help us discover talented creators in the community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Creator Name */}
          <div>
            <label htmlFor="creatorName" className="block text-white font-medium mb-2">
              <User size={18} className="inline mr-2 text-warhammer-gold" />
              Creator Name *
            </label>
            <input
              type="text"
              id="creatorName"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors"
              placeholder="Enter the creator's name"
            />
          </div>

          {/* Submitter Email */}
          <div>
            <label htmlFor="submitterEmail" className="block text-white font-medium mb-2">
              <Mail size={18} className="inline mr-2 text-warhammer-gold" />
              Your Email *
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* YouTube Link */}
          <div>
            <label htmlFor="youtubeLink" className="block text-white font-medium mb-2">
              <svg className="w-4 h-4 inline mr-2 text-warhammer-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Channel
            </label>
            <input
              type="url"
              id="youtubeLink"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors"
              placeholder="https://youtube.com/@creator"
            />
          </div>

          {/* Instagram Link */}
          <div>
            <label htmlFor="instagramLink" className="block text-white font-medium mb-2">
              <svg className="w-4 h-4 inline mr-2 text-warhammer-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram Profile
            </label>
            <input
              type="url"
              id="instagramLink"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors"
              placeholder="https://instagram.com/creator"
            />
          </div>

          {/* Website Link */}
          <div>
            <label htmlFor="websiteLink" className="block text-white font-medium mb-2">
              <Globe size={18} className="inline mr-2 text-warhammer-gold" />
              Website
            </label>
            <input
              type="url"
              id="websiteLink"
              name="websiteLink"
              value={formData.websiteLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors"
              placeholder="https://creator-website.com"
            />
          </div>
        </div>

        {/* Why They're Great */}
        <div>
          <label htmlFor="whyGreat" className="block text-white font-medium mb-2">
            <MessageSquare size={18} className="inline mr-2 text-warhammer-gold" />
            Tell us why they're great *
          </label>
          <textarea
            id="whyGreat"
            name="whyGreat"
            value={formData.whyGreat}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-warhammer-dark/50 border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:outline-none focus:border-warhammer-gold transition-colors resize-none"
            placeholder="What makes this creator special? Tell us about their content, style, community impact, or anything that makes them stand out in the Warhammer 40k community..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`warhammer-button inline-flex items-center px-8 py-4 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-warhammer-dark mr-3"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} className="mr-3" />
                NOMINATE CREATOR
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-green-600/20 border border-green-500/30 rounded-lg"
          >
            <p className="text-green-400 font-medium">
              🎉 Thank you for your nomination! We'll review the creator and get back to you soon.
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-red-600/20 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-400 font-medium">
              ❌ Something went wrong. Please try again or contact us directly.
            </p>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
