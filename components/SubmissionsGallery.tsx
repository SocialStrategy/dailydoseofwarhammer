'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, Share2, Calendar, User, Tag, X } from 'lucide-react'

interface Submission {
  id: string
  title: string
  description: string
  category: string
  artist: string
  socialHandle?: string
  images: string[]
  likes: number
  views: number
  date: string
  featured: boolean
}

export default function SubmissionsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  // Sample submissions including the first one from "Yarrick"
  const submissions: Submission[] = [
    {
      id: '1',
      title: 'Imperial Fists Terminator Squad',
      description: 'My latest Imperial Fists Terminator squad, painted with a weathered battle-worn look. Used oil washes and weathering powders for realistic effects.',
      category: 'painting',
      artist: 'Yarrick',
      socialHandle: '@commissaryarrick',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400', '/api/placeholder/400/400'],
      likes: 156,
      views: 1247,
      date: '2024-01-15',
      featured: true
    },
    {
      id: '2',
      title: 'Custom Ork Warboss',
      description: 'Kitbashed Ork Warboss using parts from multiple kits. Added custom armor plates and a unique banner design.',
      category: 'conversion',
      artist: 'WarbossGrimskull',
      socialHandle: '@warbossgrimskull',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
      likes: 89,
      views: 567,
      date: '2024-01-14',
      featured: false
    },
    {
      id: '3',
      title: 'Industrial Terrain Set',
      description: 'Complete industrial terrain set for urban battles. Built from scratch using plasticard and various household materials.',
      category: 'terrain',
      artist: 'TerrainMaster',
      socialHandle: '@terrainmaster',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400', '/api/placeholder/400/400', '/api/placeholder/400/400'],
      likes: 234,
      views: 1892,
      date: '2024-01-13',
      featured: true
    },
    {
      id: '4',
      title: 'Eldar Wraithknight',
      description: 'Eldar Wraithknight with custom color scheme inspired by ancient Aeldari art. Freehand patterns and gem effects.',
      category: 'painting',
      artist: 'AeldariCraft',
      socialHandle: '@aeldaricraft',
      images: ['/api/placeholder/400/400', '/api/placeholder/400/400'],
      likes: 178,
      views: 945,
      date: '2024-01-12',
      featured: false
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'painting', label: 'Painting & Miniatures' },
    { value: 'terrain', label: 'Terrain & Scenery' },
    { value: 'conversion', label: 'Conversions & Kitbashing' },
    { value: 'battlefield', label: 'Battlefield & Gaming' },
    { value: 'other', label: 'Other' }
  ]

  const filteredSubmissions = selectedCategory === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-warhammer-gold text-warhammer-dark'
                  : 'bg-warhammer-gray/50 text-lavender-gray hover:bg-warhammer-gray hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSubmissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="warhammer-card group cursor-pointer"
            onClick={() => setSelectedSubmission(submission)}
          >
            {/* Featured Badge */}
            {submission.featured && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-warhammer-gold text-warhammer-dark font-anton text-xs px-2 py-1 rounded">
                  FEATURED
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <div className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center">
                <span className="text-lavender-gray text-sm">Submission Image</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Image Count Badge */}
              {submission.images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  +{submission.images.length - 1} more
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-2 py-1 rounded">
                  {submission.category}
                </span>
                <div className="flex items-center space-x-1 text-lavender-gray text-sm">
                  <Calendar size={14} />
                  <span>{formatDate(submission.date)}</span>
                </div>
              </div>

              <h3 className="font-anton text-xl text-white group-hover:text-warhammer-gold transition-colors duration-300">
                {submission.title}
              </h3>
              
              <p className="text-lavender-gray line-clamp-3">
                {submission.description}
              </p>

              <div className="flex items-center justify-between text-sm text-lavender-gray">
                <div className="flex items-center space-x-2">
                  <User size={14} />
                  <span className="font-medium">{submission.artist}</span>
                  {submission.socialHandle && (
                    <span className="text-warhammer-gold">@{submission.socialHandle.split('@')[1]}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-lavender-gray">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{submission.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={14} />
                    <span>{submission.likes}</span>
                  </div>
                </div>
                <Share2 size={14} className="text-warhammer-gold" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredSubmissions.length === 0 && (
        <div className="text-center py-16">
          <Tag className="w-16 h-16 text-lavender-gray mx-auto mb-4" />
          <h3 className="font-anton text-2xl text-white mb-2">No Submissions Found</h3>
          <p className="text-lavender-gray">
            No submissions match the selected category. Try selecting a different category or be the first to submit!
          </p>
        </div>
      )}

      {/* Submission Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSubmission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-warhammer-gray border border-warhammer-gold/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="font-anton text-3xl text-white">{selectedSubmission.title}</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-lavender-gray hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedSubmission.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg flex items-center justify-center">
                      <span className="text-lavender-gray text-sm">Image {index + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-lavender-gray">
                    <span className="bg-warhammer-gold text-warhammer-dark font-anton px-2 py-1 rounded">
                      {selectedSubmission.category}
                    </span>
                    <span>By {selectedSubmission.artist}</span>
                    <span>{formatDate(selectedSubmission.date)}</span>
                  </div>

                  <p className="text-lavender-gray leading-relaxed">
                    {selectedSubmission.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-lavender-gray">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{selectedSubmission.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{selectedSubmission.likes} likes</span>
                      </div>
                    </div>
                    {selectedSubmission.socialHandle && (
                      <a
                        href={`https://instagram.com/${selectedSubmission.socialHandle.split('@')[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warhammer-gold hover:text-yellow-400 transition-colors"
                      >
                        Follow {selectedSubmission.artist}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
