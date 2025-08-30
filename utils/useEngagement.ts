import { useState, useEffect, useCallback } from 'react'

export interface EngagementData {
  id: string
  shares: number
  sharedBy: string[]
  lastUpdated: string
}

export interface UseEngagementProps {
  type: 'submissions' | 'news' | 'content'
  id: string
  initialData?: Partial<EngagementData>
}

export interface UseEngagementReturn {
  engagement: EngagementData
  isLoading: boolean
  error: string | null
  share: () => Promise<void>
  isShared: boolean
}

export function useEngagement({ type, id, initialData }: UseEngagementProps): UseEngagementReturn {
  const [engagement, setEngagement] = useState<EngagementData>({
    id,
    shares: initialData?.shares || 0,
    sharedBy: initialData?.sharedBy || [],
    lastUpdated: initialData?.lastUpdated || new Date().toISOString()
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Generate a simple user ID for this session (in production, use proper auth)
  const [userId] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ddow_user_id')
        if (stored) return stored
        
        const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('ddow_user_id', newId)
        return newId
      } catch (err) {
        // Fallback if localStorage fails
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    }
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  })
  
  // Set client flag after mount
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Load initial engagement data only on client
  useEffect(() => {
    if (!isClient) return
    
    const loadEngagement = async () => {
      try {
        const response = await fetch(`/api/engagement?type=${type}&id=${id}`)
        if (response.ok) {
          const data = await response.json()
          setEngagement(data)
        }
      } catch (err) {
        console.error('Error loading engagement data:', err)
        // Keep using initial data if API fails
      }
    }
    
    loadEngagement()
  }, [type, id, isClient])
  
  const updateEngagement = useCallback(async (action: 'share') => {
    if (!isClient) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/engagement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          id,
          action,
          userId
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setEngagement(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to update engagement')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Engagement API error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [type, id, userId, isClient])
  
  const share = useCallback(() => updateEngagement('share'), [updateEngagement])
  
  const isShared = isClient ? engagement.sharedBy.includes(userId) : false
  
  return {
    engagement,
    isLoading,
    error,
    share,
    isShared
  }
}
