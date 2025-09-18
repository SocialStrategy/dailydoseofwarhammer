'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface InstagramEmbedProps {
  url: string
  className?: string
}

interface InstagramOEmbedResponse {
  version: string
  title: string
  author_name: string
  author_url: string
  author_id: number
  media_id: string
  provider_name: string
  provider_url: string
  type: string
  width: number
  height: number | null
  html: string
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
}

export default function InstagramEmbed({ url, className = '' }: InstagramEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [embedData, setEmbedData] = useState<InstagramOEmbedResponse | null>(null)

  useEffect(() => {
    const fetchInstagramEmbed = async () => {
      try {
        setLoading(true)
        setError('')
        
        const response = await fetch(`/api/instagram-oembed?url=${encodeURIComponent(url)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram embed')
        }
        
        const data = await response.json()
        
        if (data.error || data.fallback) {
          throw new Error(data.message || 'Instagram oEmbed failed')
        }
        
        if (data.html) {
          setEmbedData(data)
          setEmbedHtml(data.html)
        } else {
          throw new Error('No embed HTML received')
        }
      } catch (err) {
        console.error('Error fetching Instagram embed:', err)
        // Instead of showing error, fall back to iframe
        setError('')
        setEmbedHtml(generateIframeFallback(url))
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchInstagramEmbed()
    }
  }, [url])

  // Fallback iframe generator with better URL handling
  const generateIframeFallback = (instagramUrl: string): string => {
    try {
      // Extract the post ID from various Instagram URL formats
      let embedUrl = ''
      
      // Handle different Instagram URL formats:
      // https://www.instagram.com/p/ABC123/
      // https://www.instagram.com/reel/ABC123/
      // https://instagram.com/p/ABC123/
      
      const url = new URL(instagramUrl)
      const pathParts = url.pathname.split('/').filter(part => part)
      
      if (pathParts.length >= 2) {
        const postType = pathParts[0] // 'p' or 'reel'
        const postId = pathParts[1]   // the actual post ID
        
        // Instagram embed URLs work with /p/ format for both posts and reels
        embedUrl = `https://www.instagram.com/p/${postId}/embed/?cr=1&v=1&wp=1&rd=https%3A%2F%2Fdailydoseofwarhammer.com&rp=%2F`
      } else {
        // Fallback: try to convert the URL directly
        embedUrl = instagramUrl.replace('/reel/', '/p/').replace(/\/$/, '') + '/embed/?cr=1&v=1&wp=1'
      }

      console.log('Generated Instagram embed URL:', embedUrl)

      return `
        <div style="position: relative; width: 100%; max-width: 540px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15);">
          <div style="position: relative; width: 100%; padding-bottom: 140%;">
            <iframe 
              src="${embedUrl}"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              frameborder="0"
              scrolling="no"
              allowtransparency="true"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      `
    } catch (error) {
      console.error('Error generating Instagram iframe fallback:', error)
      
      // Ultimate fallback - basic iframe
      const basicEmbedUrl = instagramUrl.replace('/reel/', '/p/').replace(/\/$/, '') + '/embed/'
      return `
        <div style="position: relative; width: 100%; max-width: 540px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden;">
          <div style="position: relative; width: 100%; padding-bottom: 140%;">
            <iframe 
              src="${basicEmbedUrl}"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              frameborder="0"
              scrolling="no"
              allowtransparency="true"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      `
    }
  }

  // Load Instagram embed script if not already loaded
  useEffect(() => {
    if (embedHtml && !window.instgrm) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.instagram.com/embed.js'
      document.body.appendChild(script)
      
      return () => {
        // Clean up script if component unmounts
        document.body.removeChild(script)
      }
    } else if (embedHtml && window.instgrm) {
      // Process embeds if script is already loaded
      window.instgrm.Embeds.process()
    }
  }, [embedHtml])

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="animate-spin w-8 h-8 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-light">Loading Instagram content...</p>
        </div>
      </div>
    )
  }

  // Removed error display since we now fall back to iframe

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`instagram-embed-container ${className}`}
    >
      <div 
        dangerouslySetInnerHTML={{ __html: embedHtml }}
        className="w-full"
      />
    </motion.div>
  )
}

// Extend window type for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}
