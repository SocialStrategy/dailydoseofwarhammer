'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'

export default function LatestNews() {
  const newsItems = [
    {
      id: 1,
      title: "New Space Marine Codex Announced",
      excerpt: "Games Workshop reveals the latest Space Marine codex with updated rules and new units for the 10th edition.",
      source: "Warhammer Community",
      date: "2024-01-15",
      url: "https://www.warhammer-community.com",
      category: "News"
    },
    {
      id: 2,
      title: "Adeptus Titanicus: New Titan Classes",
      excerpt: "Discover the latest Titan classes joining the Adeptus Titanicus game with detailed rules and miniature previews.",
      source: "Warhammer Community",
      date: "2024-01-14",
      url: "https://www.warhammer-community.com",
      category: "Gaming"
    },
    {
      id: 3,
      title: "Black Library: New Novel Releases",
      excerpt: "The latest Black Library novels featuring Space Marines, Imperial Guard, and Chaos forces are now available.",
      source: "Warhammer Community",
      date: "2024-01-13",
      url: "https://www.warhammer-community.com",
      category: "Literature"
    },
    {
      id: 4,
      title: "Painting Masterclass: Nurgle Daemons",
      excerpt: "Learn advanced painting techniques for Nurgle Daemons with step-by-step tutorials from expert painters.",
      source: "Warhammer Community",
      date: "2024-01-12",
      url: "https://www.warhammer-community.com",
      category: "Painting"
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-warhammer-gray to-dark-byzantium">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">LATEST NEWS</h2>
          <p className="content-text text-lavender-gray max-w-3xl mx-auto">
            Stay updated with the latest Warhammer 40,000 news, announcements, and community updates. 
            We automatically aggregate content from Warhammer Community and other official sources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="warhammer-card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-2 py-1 rounded">
                  {item.category}
                </span>
                <div className="flex items-center space-x-2 text-lavender-gray text-sm">
                  <Calendar size={14} />
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>

              <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-lavender-gray mb-4 line-clamp-3">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-lavender-gray font-medium">
                  Source: {item.source}
                </span>
                <div className="flex items-center space-x-2 text-warhammer-gold group-hover:text-yellow-400 transition-colors duration-300">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`Read full article: ${item.title}`}
              />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="/news" className="warhammer-button">
            VIEW ALL NEWS
          </a>
          <p className="text-lavender-gray text-sm mt-4">
            News updates automatically every hour from official Warhammer sources
          </p>
        </motion.div>
      </div>
    </section>
  )
}
