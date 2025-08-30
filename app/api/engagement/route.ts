import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'engagement.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load engagement data
const loadEngagementData = () => {
  ensureDataDir()
  
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
      submissions: {},
      news: {},
      content: {},
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
  
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading engagement data:', error)
    return {
      submissions: {},
      news: {},
      content: {},
      lastUpdated: new Date().toISOString()
    }
  }
}

// Save engagement data
const saveEngagementData = (data: any) => {
  ensureDataDir()
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving engagement data:', error)
  }
}

// Generate unique ID for tracking
const generateTrackingId = (type: string, id: string) => `${type}_${id}`

export async function POST(request: NextRequest) {
  try {
    const { type, id, action, userId } = await request.json()
    
    if (!type || !id || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: type, id, action' },
        { status: 400 }
      )
    }
    
    const engagementData = loadEngagementData()
    const trackingId = generateTrackingId(type, id)
    
    // Initialize if not exists
    if (!engagementData[type]) {
      engagementData[type] = {}
    }
    
    if (!engagementData[type][trackingId]) {
      engagementData[type][trackingId] = {
        id,
        likes: 0,
        shares: 0,
        views: 0,
        likedBy: [],
        sharedBy: [],
        lastUpdated: new Date().toISOString()
      }
    }
    
    const item = engagementData[type][trackingId]
    
    switch (action) {
      case 'like':
        if (userId) {
          if (item.likedBy.includes(userId)) {
            // Unlike
            item.likedBy = item.likedBy.filter((uid: string) => uid !== userId)
            item.likes = Math.max(0, item.likes - 1)
          } else {
            // Like
            item.likedBy.push(userId)
            item.likes += 1
          }
        } else {
          // Anonymous like (increment by 1)
          item.likes += 1
        }
        break
        
      case 'share':
        if (userId) {
          if (!item.sharedBy.includes(userId)) {
            item.sharedBy.push(userId)
            item.shares += 1
          }
        } else {
          // Anonymous share (increment by 1)
          item.shares += 1
        }
        break
        
      case 'view':
        item.views += 1
        break
        
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: like, share, or view' },
          { status: 400 }
        )
    }
    
    item.lastUpdated = new Date().toISOString()
    engagementData.lastUpdated = new Date().toISOString()
    
    saveEngagementData(engagementData)
    
    return NextResponse.json({
      success: true,
      data: item,
      message: `${action} action completed successfully`
    })
    
  } catch (error) {
    console.error('Engagement API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    
    if (!type || !id) {
      return NextResponse.json(
        { error: 'Missing required parameters: type, id' },
        { status: 400 }
      )
    }
    
    const engagementData = loadEngagementData()
    const trackingId = generateTrackingId(type, id)
    
    const item = engagementData[type]?.[trackingId] || {
      id,
      likes: 0,
      shares: 0,
      views: 0,
      likedBy: [],
      sharedBy: [],
      lastUpdated: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: item
    })
    
  } catch (error) {
    console.error('Engagement API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
