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
        
        // Use Instagram oEmbed API without token
        const oembedUrl = `https://graph.instagram.com/instagram_oembed?url=${encodeURIComponent(url)}`
        
        const response = await fetch(`/api/instagram-oembed?url=${encodeURIComponent(url)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram embed')
        }
        
        const data: InstagramOEmbedResponse = await response.json()
        
        if (data.html) {
          setEmbedData(data)
          setEmbedHtml(data.html)
        } else {
          throw new Error('No embed HTML received')
        }
      } catch (err) {
        console.error('Error fetching Instagram embed:', err)
        setError('Failed to load Instagram content')
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchInstagramEmbed()
    }
  }, [url])

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

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-warhammer-red mb-2">⚠️ {error}</p>
          <p className="text-text-light text-sm">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

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
