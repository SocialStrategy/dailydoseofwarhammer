import { NextResponse } from 'next/server'
import { getLatestFanSubmission } from '@/utils/fanSubmissions'

export async function GET() {
  try {
    const featuredPost = getLatestFanSubmission()
    
    if (!featuredPost) {
      return NextResponse.json({ 
        error: 'No fan submissions found' 
      }, { status: 404 })
    }

    return NextResponse.json(featuredPost)
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch featured post' 
    }, { status: 500 })
  }
}
