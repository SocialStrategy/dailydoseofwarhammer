'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image, CheckCircle } from 'lucide-react'

interface UploadedFile {
  id: string
  file: File
  preview: string
  name: string
}

export default function SubmissionForm() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'painting',
    socialHandle: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 5 - uploadedFiles.length).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
  }, [uploadedFiles.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 5 - uploadedFiles.length,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadedFiles.length === 0) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setUploadedFiles([])
      setFormData({
        title: '',
        description: '',
        category: 'painting',
        socialHandle: '',
        email: ''
      })
    }, 3000)
  }

  const categories = [
    { value: 'painting', label: 'Painting & Miniatures' },
    { value: 'terrain', label: 'Terrain & Scenery' },
    { value: 'conversion', label: 'Conversions & Kitbashing' },
    { value: 'battlefield', label: 'Battlefield & Gaming' },
    { value: 'other', label: 'Other' }
  ]

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="warhammer-card text-center py-16"
      >
        <CheckCircle className="w-20 h-20 text-warhammer-gold mx-auto mb-6" />
        <h3 className="font-anton text-3xl text-white mb-4">Submission Successful!</h3>
        <p className="text-lavender-gray text-lg">
          Thank you for sharing your work with the community. Your submission is being reviewed and will appear in the gallery soon.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="warhammer-card mb-16"
    >
      <h2 className="font-anton text-3xl text-warhammer-gold mb-8 text-center">
        SUBMIT YOUR WORK
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:border-warhammer-gold focus:outline-none transition-colors"
              placeholder="Give your work a title"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg text-white focus:border-warhammer-gold focus:outline-none transition-colors"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:border-warhammer-gold focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your work, techniques used, inspiration, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Social Handle (Optional)</label>
            <input
              type="text"
              value={formData.socialHandle}
              onChange={(e) => setFormData(prev => ({ ...prev, socialHandle: e.target.value }))}
              className="w-full px-4 py-3 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:border-warhammer-gold focus:outline-none transition-colors"
              placeholder="@yourhandle"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 bg-warhammer-dark border border-warhammer-gold/30 rounded-lg text-white placeholder-lavender-gray focus:border-warhammer-gold focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-white font-medium mb-2">
            Images * (Up to 5, Max 10MB each)
          </label>
          
          {uploadedFiles.length < 5 && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-warhammer-gold bg-warhammer-gold/10' 
                  : 'border-warhammer-gold/30 hover:border-warhammer-gold/60'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-lavender-gray mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-warhammer-gold font-medium">Drop your images here...</p>
              ) : (
                <div>
                  <p className="text-lavender-gray mb-2">
                    Drag & drop images here, or <span className="text-warhammer-gold">click to select</span>
                  </p>
                  <p className="text-sm text-lavender-gray">
                    Supports: JPG, PNG, GIF, WebP (Max 10MB each)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative group">
                  <div className="aspect-square bg-warhammer-dark rounded-lg overflow-hidden border border-warhammer-gold/30">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                  <p className="text-xs text-lavender-gray mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={uploadedFiles.length === 0 || isSubmitting}
            className={`warhammer-button ${
              uploadedFiles.length === 0 || isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-yellow-400'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Work'}
          </button>
          
          {uploadedFiles.length === 0 && (
            <p className="text-lavender-gray text-sm mt-2">
              Please upload at least one image to submit your work
            </p>
          )}
        </div>
      </form>
    </motion.div>
  )
}
