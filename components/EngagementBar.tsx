'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { useEngagement } from '@/utils/useEngagement'

interface EngagementBarProps {
  type: 'submissions' | 'news' | 'content'
  id: string
  initialData?: {
    shares?: number
  }
  className?: string
}

export default function EngagementBar({
  type,
  id,
  initialData,
  className = ''
}: EngagementBarProps) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  
  const {
    engagement,
    isLoading,
    error,
    share,
    isShared
  } = useEngagement({ type, id, initialData })

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this amazing Warhammer content!',
          text: 'I found this incredible content on Daily Dose of Warhammer',
          url: window.location.href
        })
        share()
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      setShowShareOptions(true)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      share()
      setShowShareOptions(false)
      setShareMessage('Link copied!')
      setTimeout(() => setShareMessage(''), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent('Check out this amazing Warhammer content!')
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'reddit':
        shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      share()
      setShowShareOptions(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Engagement Bar */}
      <div className="bg-warhammer-gray/80 backdrop-blur-sm border border-warhammer-gold/30 rounded-lg p-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Share Stats */}
          <div className="flex items-center space-x-4">
            {/* Shares */}
            <button
              onClick={handleShare}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isShared 
                  ? 'bg-warhammer-gold/20 text-warhammer-gold border border-warhammer-gold/30' 
                  : 'text-text-light hover:bg-warhammer-gray hover:text-white border border-transparent'
              }`}
            >
              <Share2 size={16} />
              <span className="font-medium">
                {isLoading ? '...' : engagement.shares.toLocaleString()}
              </span>
            </button>
          </div>

          {/* Right Side - Share Button */}
          <button
            onClick={handleShare}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 text-text-light hover:text-warhammer-gold transition-colors duration-200"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-red-400 text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Share Options Modal */}
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg p-4 shadow-2xl z-50"
          >
            <div className="space-y-3">
              <h4 className="font-anton text-white text-center mb-3">Share This Content</h4>
              
              {/* Social Media Options */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors"
                >
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  <span>LinkedIn</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('reddit')}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <span>Reddit</span>
                </button>
              </div>
              
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-warhammer-gold hover:bg-yellow-400 text-warhammer-dark rounded-lg transition-colors font-medium"
              >
                <span>Copy Link</span>
              </button>
              
              {/* Close Button */}
              <button
                onClick={() => setShowShareOptions(false)}
                className="w-full px-3 py-2 text-text-light hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {shareMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-warhammer-gold text-sm text-center"
          >
            {shareMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
