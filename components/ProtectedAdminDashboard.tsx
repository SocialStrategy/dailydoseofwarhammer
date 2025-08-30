'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Star, 
  StarOff, 
  Trash2, 
  Download,
  AlertTriangle,
  Users,
  Image as ImageIcon,
  LogOut,
  Shield
} from 'lucide-react'

interface PendingSubmission {
  id: string
  artist: string
  title: string
  description: string
  category: string
  images: string[]
  date: string
  socialHandle?: string
  email?: string
  status: 'pending' | 'approved' | 'rejected'
}

interface ApprovedSubmission extends PendingSubmission {
  status: 'approved'
  approvedDate: string
  isFeatured: boolean
}

export default function ProtectedAdminDashboard() {
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])
  const [approvedSubmissions, setApprovedSubmissions] = useState<ApprovedSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<PendingSubmission | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'featured'>('pending')
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState('')
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem('adminAuthenticated')
      const user = sessionStorage.getItem('adminUser')
      
      if (authenticated === 'true' && user) {
        setIsAuthenticated(true)
        setAdminUser(user)
      } else {
        // Redirect to login if not authenticated
        router.push('/admin/login')
        return
      }
    }

    checkAuth()
  }, [router])

  // Fetch real data from API
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        
        // Fetch pending submissions
        const pendingResponse = await fetch('/api/submissions?status=pending')
        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json()
          setPendingSubmissions(pendingData)
        }
        
        // Fetch approved submissions
        const approvedResponse = await fetch('/api/submissions?status=approved')
        if (approvedResponse.ok) {
          const approvedData = await approvedResponse.json()
          setApprovedSubmissions(approvedData)
        }
        
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [isAuthenticated])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    sessionStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  const handleApprove = async (submissionId: string) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submissionId,
          action: 'approve'
        }),
      })
      
      if (response.ok) {
        const { submission } = await response.json()
        setApprovedSubmissions(prev => [submission, ...prev])
        setPendingSubmissions(prev => prev.filter(s => s.id !== submissionId))
      }
    } catch (error) {
      console.error('Error approving submission:', error)
    }
  }

  const handleReject = async (submissionId: string) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submissionId,
          action: 'reject'
        }),
      })
      
      if (response.ok) {
        setPendingSubmissions(prev => prev.filter(s => s.id !== submissionId))
      }
    } catch (error) {
      console.error('Error rejecting submission:', error)
    }
  }

  const handleToggleFeatured = async (submissionId: string) => {
    try {
      const response = await fetch('/api/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submissionId,
          action: 'toggleFeatured'
        }),
      })
      
      if (response.ok) {
        const { submission } = await response.json()
        setApprovedSubmissions(prev => 
          prev.map(s => ({
            ...s,
            isFeatured: s.id === submissionId ? submission.isFeatured : false
          }))
        )
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const handleDelete = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/submissions?id=${submissionId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setApprovedSubmissions(prev => prev.filter(s => s.id !== submissionId))
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="warhammer-card text-center py-16">
        <div className="animate-spin w-12 h-12 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-text-light">Verifying authentication...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="warhammer-card text-center py-16">
        <div className="animate-spin w-12 h-12 border-4 border-warhammer-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-text-light">Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Admin Header with Logout */}
      <div className="warhammer-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-warhammer-gold/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-warhammer-gold" />
            </div>
            <div>
              <h3 className="font-anton text-xl text-white">Welcome, {adminUser}</h3>
              <p className="text-text-light">Administrator Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-warhammer-dark text-white rounded-lg hover:bg-warhammer-gray transition-colors border border-warhammer-gold/30"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="warhammer-card text-center p-6"
        >
          <div className="w-16 h-16 bg-warhammer-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-warhammer-gold" />
          </div>
          <h3 className="font-anton text-2xl text-white mb-2">{pendingSubmissions.length}</h3>
          <p className="text-text-light">Pending Review</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="warhammer-card text-center p-6"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-anton text-2xl text-white mb-2">{approvedSubmissions.length}</h3>
          <p className="text-text-light">Approved</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="warhammer-card text-center p-6"
        >
          <div className="w-16 h-16 bg-warhammer-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-warhammer-gold" />
          </div>
          <h3 className="font-anton text-2xl text-white mb-2">
            {approvedSubmissions.filter(s => s.isFeatured).length}
          </h3>
          <p className="text-text-light">Featured</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="warhammer-card text-center p-6"
        >
          <div className="w-16 h-16 bg-lavender-gray/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-text-light" />
          </div>
          <h3 className="font-anton text-2xl text-white mb-2">
            {new Set([...pendingSubmissions, ...approvedSubmissions].map(s => s.artist)).size}
          </h3>
          <p className="text-text-light">Unique Artists</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="warhammer-card">
        <div className="flex border-b border-warhammer-gold/30">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-4 font-anton text-lg transition-colors ${
              activeTab === 'pending'
                ? 'text-warhammer-gold border-b-2 border-warhammer-gold'
                : 'text-text-light hover:text-white'
            }`}
          >
            Pending Review ({pendingSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-6 py-4 font-anton text-lg transition-colors ${
              activeTab === 'approved'
                ? 'text-warhammer-gold border-b-2 border-warhammer-gold'
                : 'text-text-light hover:text-white'
            }`}
          >
            Approved ({approvedSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-4 font-anton text-lg transition-colors ${
              activeTab === 'featured'
                ? 'text-warhammer-gold border-b-2 border-warhammer-gold'
                : 'text-text-light hover:text-white'
            }`}
          >
            Featured Content
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-6">
              <h3 className="font-anton text-2xl text-white mb-6">Submissions Awaiting Review</h3>
              {pendingSubmissions.length === 0 ? (
                <p className="text-text-light text-center py-8">No pending submissions to review.</p>
              ) : (
                pendingSubmissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={() => handleApprove(submission.id)}
                    onReject={() => handleReject(submission.id)}
                    onView={() => setSelectedSubmission(submission)}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'approved' && (
            <div className="space-y-6">
              <h3 className="font-anton text-2xl text-white mb-6">Approved Submissions</h3>
              {approvedSubmissions.length === 0 ? (
                <p className="text-text-light text-center py-8">No approved submissions yet.</p>
              ) : (
                approvedSubmissions.map((submission) => (
                  <ApprovedSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onToggleFeatured={() => handleToggleFeatured(submission.id)}
                    onDelete={() => handleDelete(submission.id)}
                    onView={() => setSelectedSubmission(submission)}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="space-y-6">
              <h3 className="font-anton text-2xl text-white mb-6">Featured Content</h3>
              {approvedSubmissions.filter(s => s.isFeatured).length === 0 ? (
                <p className="text-text-light text-center py-8">No featured content selected.</p>
              ) : (
                approvedSubmissions
                  .filter(s => s.isFeatured)
                  .map((submission) => (
                    <FeaturedSubmissionCard
                      key={submission.id}
                      submission={submission}
                      onToggleFeatured={() => handleToggleFeatured(submission.id)}
                      onView={() => setSelectedSubmission(submission)}
                    />
                  ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  )
}

// Submission Card Component
function SubmissionCard({ 
  submission, 
  onApprove, 
  onReject, 
  onView 
}: {
  submission: PendingSubmission
  onApprove: () => void
  onReject: () => void
  onView: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="warhammer-card p-6"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Preview */}
        <div className="lg:w-32 lg:h-32 w-full h-48">
          <div className="w-full h-full bg-warhammer-dark rounded-lg overflow-hidden border border-warhammer-gold/30">
            <img
              src={submission.images[0]}
              alt={submission.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h4 className="font-anton text-xl text-white mb-2">{submission.title}</h4>
              <p className="text-text-light mb-2">by {submission.artist}</p>
              <p className="text-white mb-3">{submission.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-warhammer-gold text-warhammer-dark text-xs px-2 py-1 rounded">
                  {submission.category}
                </span>
                <span className="bg-warhammer-dark text-warhammer-gold text-xs px-2 py-1 rounded border border-warhammer-gold/30">
                  {submission.images.length} images
                </span>
              </div>
              {submission.socialHandle && (
                <p className="text-text-light text-sm">@{submission.socialHandle}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onView}
                className="flex items-center gap-2 px-4 py-2 bg-warhammer-dark text-white rounded-lg hover:bg-warhammer-gray transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={onApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={onReject}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Approved Submission Card Component
function ApprovedSubmissionCard({ 
  submission, 
  onToggleFeatured, 
  onDelete, 
  onView 
}: {
  submission: ApprovedSubmission
  onToggleFeatured: () => void
  onDelete: () => void
  onView: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="warhammer-card p-6"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Preview */}
        <div className="lg:w-32 lg:h-32 w-full h-48">
          <div className="w-full h-full bg-warhammer-dark rounded-lg overflow-hidden border border-warhammer-gold/30">
            <img
              src={submission.images[0]}
              alt={submission.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-anton text-xl text-white">{submission.title}</h4>
                {submission.isFeatured && (
                  <Star className="w-5 h-5 text-warhammer-gold fill-current" />
                )}
              </div>
              <p className="text-text-light mb-2">by {submission.artist}</p>
              <p className="text-white mb-3">{submission.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Approved
                </span>
                <span className="bg-warhammer-gold text-warhammer-dark text-xs px-2 py-1 rounded">
                  {submission.category}
                </span>
                <span className="bg-warhammer-dark text-warhammer-gold text-xs px-2 py-1 rounded border border-warhammer-gold/30">
                  {submission.images.length} images
                </span>
              </div>
              <p className="text-text-light text-sm">Approved: {submission.approvedDate}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onView}
                className="flex items-center gap-2 px-4 py-2 bg-warhammer-dark text-white rounded-lg hover:bg-warhammer-gray transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={onToggleFeatured}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  submission.isFeatured
                    ? 'bg-warhammer-dark text-warhammer-gold hover:bg-warhammer-gray'
                    : 'bg-warhammer-gold text-warhammer-dark hover:bg-yellow-400'
                }`}
              >
                {submission.isFeatured ? (
                  <>
                    <StarOff className="w-4 h-4" />
                    Remove Featured
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    Make Featured
                  </>
                )}
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Featured Submission Card Component
function FeaturedSubmissionCard({ 
  submission, 
  onToggleFeatured, 
  onView 
}: {
  submission: ApprovedSubmission
  onToggleFeatured: () => void
  onView: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="warhammer-card p-6 border-2 border-warhammer-gold"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Preview */}
        <div className="lg:w-40 lg:h-40 w-full h-48">
          <div className="w-full h-full bg-warhammer-dark rounded-lg overflow-hidden border border-warhammer-gold/30">
            <img
              src={submission.images[0]}
              alt={submission.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-anton text-2xl text-white">{submission.title}</h4>
                <Star className="w-6 h-6 text-warhammer-gold fill-current" />
              </div>
              <p className="text-text-light text-lg mb-2">by {submission.artist}</p>
              <p className="text-white mb-3">{submission.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-warhammer-gold text-warhammer-dark text-sm px-3 py-1 rounded font-medium">
                  FEATURED CONTENT
                </span>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {submission.category}
                </span>
                <span className="bg-warhammer-dark text-warhammer-gold text-xs px-2 py-1 rounded border border-warhammer-gold/30">
                  {submission.images.length} images
                </span>
              </div>
              <p className="text-text-light text-sm">Featured since: {submission.approvedDate}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={onView}
                className="flex items-center gap-2 px-4 py-2 bg-warhammer-dark text-white rounded-lg hover:bg-warhammer-gray transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={onToggleFeatured}
                className="flex items-center gap-2 px-4 py-2 bg-warhammer-dark text-warhammer-gold rounded-lg hover:bg-warhammer-gray transition-colors"
              >
                <StarOff className="w-4 h-4" />
                Remove Featured
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Submission Modal Component
function SubmissionModal({ 
  submission, 
  onClose 
}: {
  submission: PendingSubmission | ApprovedSubmission
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="warhammer-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-anton text-2xl text-white">{submission.title}</h3>
          <button
            onClick={onClose}
            className="text-text-light hover:text-white transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Images */}
          <div>
            <h4 className="font-anton text-lg text-white mb-4">Images ({submission.images.length})</h4>
            <div className="grid grid-cols-2 gap-4">
              {submission.images.map((image, index) => (
                <div key={index} className="aspect-square bg-warhammer-dark rounded-lg overflow-hidden border border-warhammer-gold/30">
                  <img
                    src={image}
                    alt={`${submission.title} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-anton text-lg text-white mb-2">Artist Information</h4>
              <p className="text-text-light">Name: {submission.artist}</p>
              {submission.socialHandle && (
                <p className="text-text-light">Social: @{submission.socialHandle}</p>
              )}
              {submission.email && (
                <p className="text-text-light">Email: {submission.email}</p>
              )}
            </div>

            <div>
              <h4 className="font-anton text-lg text-white mb-2">Submission Details</h4>
              <p className="text-text-light">Category: {submission.category}</p>
              <p className="text-text-light">Submitted: {submission.date}</p>
              {submission.status === 'approved' && 'approvedDate' in submission && (
                <p className="text-text-light">Approved: {submission.approvedDate}</p>
              )}
            </div>

            <div>
              <h4 className="font-anton text-lg text-white mb-2">Description</h4>
              <p className="text-white">{submission.description}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="warhammer-button w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
