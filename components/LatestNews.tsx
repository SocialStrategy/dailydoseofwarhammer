'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Tag, Eye, Heart, RefreshCw } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  image?: string | null
  link?: string | null
  source: string
  views: number
  likes: number
}

interface NewsData {
  lastUpdated: string
  articles: NewsArticle[]
  totalArticles: number
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
      const result = await response.json()
      
      if (result.success) {
        setNewsData(result.data)
      } else {
        setError(result.message || 'Failed to fetch news')
      }
    } catch (err) {
      setError('Failed to connect to news service')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshNews = async () => {
    setRefreshing(true)
    await fetchNews()
    setRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-warhammer-gold mb-4">
              LATEST NEWS
            </h2>
            <p className="content-text text-lavender-gray max-w-3xl mx-auto">
              Stay updated with the latest Warhammer Community news and announcements
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="warhammer-card animate-pulse"
              >
                <div className="h-48 bg-warhammer-gray/30 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-warhammer-gray/30 rounded mb-3"></div>
                  <div className="h-3 bg-warhammer-gray/30 rounded mb-2"></div>
                  <div className="h-3 bg-warhammer-gray/30 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-warhammer-gray/30 rounded"></div>
                    <div className="h-3 w-16 bg-warhammer-gray/30 rounded"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-warhammer-gold mb-4">
              LATEST NEWS
            </h2>
            <div className="warhammer-card max-w-2xl mx-auto">
              <p className="text-warhammer-red mb-4">{error}</p>
              <button
                onClick={fetchNews}
                className="warhammer-button"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-old-lavender to-lavender-gray">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="section-title text-warhammer-gold">
              LATEST NEWS
            </h2>
            <button
              onClick={refreshNews}
              disabled={refreshing}
              className="text-warhammer-gold hover:text-warhammer-red transition-colors duration-300 disabled:opacity-50"
              title="Refresh news"
            >
              <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
          <p className="content-text text-lavender-gray max-w-3xl mx-auto">
            Stay updated with the latest Warhammer Community news and announcements
          </p>
          {newsData && (
            <p className="text-sm text-lavender-gray mt-2">
              Last updated: {formatDate(newsData.lastUpdated)}
            </p>
          )}
        </motion.div>

        {newsData && newsData.articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.articles.slice(0, 9).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="warhammer-card group hover:scale-105 transition-transform duration-300"
              >
                {article.image && (
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-lavender-gray flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(article.date)}
                    </span>
                  </div>
                  
                  <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-lavender-gray mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-lavender-gray">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {article.likes.toLocaleString()}
                      </span>
                    </div>
                    
                    <span className="text-xs text-warhammer-gold font-bold">
                      {article.source}
                    </span>
                  </div>
                  
                  {article.link && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="warhammer-button w-full text-center group-hover:bg-warhammer-gold group-hover:text-warhammer-dark transition-all duration-300"
                    >
                      <ExternalLink size={16} className="inline mr-2" />
                      Read More
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="warhammer-card max-w-2xl mx-auto">
              <p className="text-lavender-gray mb-4">No news articles available at the moment.</p>
              <button
                onClick={refreshNews}
                className="warhammer-button"
              >
                Refresh News
              </button>
            </div>
          </motion.div>
        )}
        
        {newsData && newsData.totalArticles > 9 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://www.warhammer-community.com/en-gb/"
              target="_blank"
              rel="noopener noreferrer"
              className="warhammer-button bg-transparent border-2 border-warhammer-gold hover:bg-warhammer-gold hover:text-warhammer-dark"
            >
              <ExternalLink size={20} className="inline mr-2" />
              View All News on Warhammer Community
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
