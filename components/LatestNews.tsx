'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Tag, RefreshCw } from 'lucide-react'
import EngagementBar from './EngagementBar'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  link: string
}

interface NewsData {
  articles: NewsArticle[]
  lastUpdated: string
}

export default function LatestNews() {
  const [newsData, setNewsData] = useState<NewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/news')
      
      if (response.ok) {
        const responseData = await response.json()
        
        // Handle the wrapped API response structure
        if (responseData.success && responseData.data) {
          setNewsData(responseData.data)
        } else if (responseData.articles) {
          // Fallback for direct data structure
          setNewsData(responseData)
        } else {
          setError('Invalid news data format')
        }
      } else {
        setError('Failed to load news')
      }
    } catch (err) {
      setError('Error loading news')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshNews = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/news', { method: 'POST' })
      
      if (response.ok) {
        await fetchNews()
      } else {
        setError('Failed to refresh news')
      }
    } catch (err) {
      setError('Error refreshing news')
      console.error('Error refreshing news:', err)
    } finally {
      setRefreshing(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'News': 'bg-warhammer-gold text-warhammer-dark',
      'Updates': 'bg-warhammer-red text-white',
      'Kill Team': 'bg-blue-600 text-white',
      'Video Games': 'bg-green-600 text-white',
      'Events': 'bg-purple-600 text-white',
      'Painting': 'bg-orange-600 text-white',
      'Warhammer 40,000': 'bg-gray-800 text-white',
      'Warhammer Age of Sigmar': 'bg-blue-800 text-white'
    }
    
    return colors[category] || 'bg-warhammer-gray text-white'
  }

  if (loading) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-light">Loading latest news...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title text-warhammer-gold mb-4">
            Latest News
          </h2>
          <p className="text-warhammer-red mb-4">{error}</p>
          <button
            onClick={refreshNews}
            disabled={refreshing}
            className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-red transition-colors duration-300 disabled:opacity-50"
          >
            {refreshing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                Refreshing...
              </>
            ) : (
              'Try Again'
            )}
          </button>
        </div>
      </section>
    )
  }

  if (!newsData || !newsData.articles || newsData.articles.length === 0) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title text-warhammer-gold">
            Latest News
          </h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            No news articles available at the moment.
          </p>
          <p className="text-sm text-text-light mt-2">
            Last updated: {newsData?.lastUpdated ? formatDate(newsData.lastUpdated) : 'Never'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-warhammer-gold mb-4">
            Latest News
          </h2>
          <p className="content-text text-text-light max-w-3xl mx-auto">
            Stay updated with the latest news, updates, and announcements from the Warhammer universe. 
            From new releases to community events, we've got you covered.
          </p>
          {newsData && (
            <p className="text-sm text-text-light mt-2">
              Last updated: {formatDate(newsData.lastUpdated)}
            </p>
          )}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.articles.slice(0, 9).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="warhammer-card group cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover aspect-video"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center">
                    <span className="text-text-light text-sm">News Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
                
                {/* External Link Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={16} className="text-warhammer-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-text-light mb-3">
                  <span className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{formatDate(article.date)}</span>
                  </span>
                </div>

                <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-text-light mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Engagement Bar */}
              <div className="px-4 pb-4">
                <EngagementBar
                  type="news"
                  id={article.id}
                  initialData={{
                    shares: 0
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={refreshNews}
            disabled={refreshing}
            className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-red transition-colors duration-300 disabled:opacity-50"
          >
            {refreshing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                Refreshing...
              </>
            ) : (
              'Refresh News'
            )}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
