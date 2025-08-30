'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Tag, X } from 'lucide-react'
import EngagementBar from './EngagementBar'

interface FanSubmission {
  id: string
  artist: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  socialHandle?: string
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'miniatures', label: 'Miniatures' },
  { value: 'painting', label: 'Painting' },
  { value: 'terrain', label: 'Terrain' },
  { value: 'conversions', label: 'Conversions' },
  { value: 'battle-reports', label: 'Battle Reports' },
  { value: 'other', label: 'Other' }
]

// Mock data - replace with actual API call
const mockSubmissions: FanSubmission[] = [
  {
    id: '1',
    artist: 'Yarrick',
    title: 'Grimdark Space Marine Captain',
    description: 'A heavily weathered Space Marine Captain with battle damage and grimdark weathering effects. Used oil washes and chipping techniques for realistic battle wear.',
    category: 'miniatures',
    images: ['/images/Fan-Submissions/Yarrick-30.8.25/Yarrick1.jpeg', '/images/Fan-Submissions/Yarrick-30.8.25/Yarrick2.jpeg', '/images/Fan-Submissions/Yarrick-30.8.25/Yarrick3.jpeg', '/images/Fan-Submissions/Yarrick-30.8.25/Yarrick4.jpeg'],
    date: '2024-08-30',
    socialHandle: 'yarrick_paints'
  },
  {
    id: '2',
    artist: 'GrimdarkGuru',
    title: 'Chaos Terminator Squad',
    description: 'A squad of heavily converted Chaos Terminators with custom greenstuff work and unique paint schemes. Each model tells its own story of corruption.',
    category: 'miniatures',
    images: ['/images/Fan-Submissions/Yarrick-30.8.25/Yarrick1.jpeg'],
    date: '2024-08-29',
    socialHandle: 'grimdark_guru'
  },
  {
    id: '3',
    artist: 'PaintMaster',
    title: 'Imperial Knight House Colors',
    description: 'Custom Imperial Knight with unique house colors and weathering effects. Used airbrushing and oil washes for smooth gradients and realistic wear.',
    category: 'miniatures',
    images: ['/images/Fan-Submissions/Yarrick-30.8.25/Yarrick2.jpeg'],
    date: '2024-08-28',
    socialHandle: 'paint_master'
  },
  {
    id: '4',
    artist: 'TerrainTitan',
    title: 'Industrial Ruins Complex',
    description: 'Large industrial terrain piece with multiple levels, walkways, and detailed machinery. Perfect for urban warfare scenarios.',
    category: 'terrain',
    images: ['/images/Fan-Submissions/Yarrick-30.8.25/Yarrick3.jpeg'],
    date: '2024-08-27',
    socialHandle: 'terrain_titan'
  },
  {
    id: '5',
    artist: 'ConversionKing',
    title: 'Ork Warboss Conversion',
    description: 'Heavily converted Ork Warboss using parts from multiple kits. Custom greenstuff work for unique armor and weapons.',
    category: 'conversions',
    images: ['/images/Fan-Submissions/Yarrick-30.8.25/Yarrick4.jpeg'],
    date: '2024-08-26',
    socialHandle: 'conversion_king'
  }
]

export default function SubmissionsGallery() {
  const [submissions, setSubmissions] = useState<FanSubmission[]>(mockSubmissions)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState<FanSubmission | null>(null)
  const [filteredSubmissions, setFilteredSubmissions] = useState<FanSubmission[]>(mockSubmissions)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredSubmissions(submissions)
    } else {
      setFilteredSubmissions(submissions.filter(sub => sub.category === selectedCategory))
    }
  }, [selectedCategory, submissions])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-warhammer-gold text-warhammer-dark'
                : 'bg-warhammer-gray/50 text-text-light hover:bg-warhammer-gray hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Submissions Grid */}
      {filteredSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="warhammer-card group cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedSubmission(submission)}
            >
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <div className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium flex items-center justify-center">
                  <span className="text-text-light text-sm">Submission Image</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-warhammer-gold text-warhammer-dark text-xs font-anton px-2 py-1 rounded">
                    {submission.category}
                  </span>
                  <div className="flex items-center space-x-1 text-text-light text-sm">
                    <Calendar size={14} />
                    <span>{formatDate(submission.date)}</span>
                  </div>
                </div>

                <h3 className="font-anton text-xl text-white mb-3 group-hover:text-warhammer-gold transition-colors duration-300">
                  {submission.title}
                </h3>
                
                <p className="text-text-light line-clamp-3">
                  {submission.description}
                </p>

                <div className="flex items-center justify-between text-sm text-text-light">
                  <div className="flex items-center space-x-2">
                    <User size={14} />
                    <span>{submission.artist}</span>
                  </div>
                  {submission.socialHandle && (
                    <span className="text-warhammer-gold">@{submission.socialHandle}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-text-light">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{submission.images.length} images</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Tag className="w-16 h-16 text-text-light mx-auto mb-4" />
          <h3 className="font-anton text-2xl text-white mb-2">No Submissions Found</h3>
          <p className="text-text-light">
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSubmission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-warhammer-dark border border-warhammer-gold/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-anton text-3xl text-white">{selectedSubmission.title}</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-text-light hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedSubmission.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-warhammer-gray to-dark-byzantium rounded-lg flex items-center justify-center">
                      <span className="text-text-light text-sm">Image {index + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-text-light">
                    <span className="bg-warhammer-gold text-warhammer-dark font-anton px-2 py-1 rounded">
                      {selectedSubmission.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatDate(selectedSubmission.date)}</span>
                    </span>
                  </div>

                  <p className="text-text-light leading-relaxed">
                    {selectedSubmission.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-text-light">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{selectedSubmission.artist}</span>
                      </span>
                      {selectedSubmission.socialHandle && (
                        <span className="text-warhammer-gold">@{selectedSubmission.socialHandle}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="mt-6">
                  <EngagementBar
                    type="submissions"
                    id={selectedSubmission.id}
                    initialData={{
                      shares: 0
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
