import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'engagement.json')

interface EngagementRecord {
  id: string
  shares: number
  sharedBy: string[]
  lastUpdated: string
}

interface EngagementStore {
  submissions: { [id: string]: EngagementRecord }
  news: { [id: string]: EngagementRecord }
  content: { [id: string]: EngagementRecord }
  lastUpdated: string
}

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load engagement data
const loadEngagementData = (): EngagementStore => {
  ensureDataDir()
  
  if (!fs.existsSync(DATA_FILE)) {
    const defaultData: EngagementStore = {
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
    return JSON.parse(data) as EngagementStore
  } catch (error) {
    console.error('Error reading engagement data file, initializing new one:', error)
    const defaultData: EngagementStore = {
      submissions: {},
      news: {},
      content: {},
      lastUpdated: new Date().toISOString()
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
}

// Save engagement data
const saveEngagementData = (data: EngagementStore) => {
  ensureDataDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  if (!type || !id) {
    return NextResponse.json({ error: 'Missing required query parameters: type, id' }, { status: 400 })
  }

  // Validate type is a valid key
  if (!['submissions', 'news', 'content'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
  }

  const engagementData = loadEngagementData()
  let record: EngagementRecord
  
  if (type === 'submissions') {
    record = engagementData.submissions[id] || { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
  } else if (type === 'news') {
    record = engagementData.news[id] || { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
  } else {
    record = engagementData.content[id] || { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
  }
  
  return NextResponse.json(record)
}

export async function POST(request: NextRequest) {
  try {
    const { type, id, action, userId } = await request.json()

    if (!type || !id || !action || !userId) {
      return NextResponse.json({ error: 'Missing required fields: type, id, action, userId' }, { status: 400 })
    }

    if (action !== 'share') {
      return NextResponse.json({ error: 'Invalid action. Only "share" is supported.' }, { status: 400 })
    }

    // Validate type is a valid key
    if (!['submissions', 'news', 'content'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }

    const engagementData = loadEngagementData()
    let record: EngagementRecord

    if (type === 'submissions') {
      if (!engagementData.submissions[id]) {
        engagementData.submissions[id] = { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
      }
      record = engagementData.submissions[id]
    } else if (type === 'news') {
      if (!engagementData.news[id]) {
        engagementData.news[id] = { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
      }
      record = engagementData.news[id]
    } else {
      if (!engagementData.content[id]) {
        engagementData.content[id] = { id, shares: 0, sharedBy: [], lastUpdated: new Date().toISOString() }
      }
      record = engagementData.content[id]
    }

    if (action === 'share') {
      if (!record.sharedBy.includes(userId)) {
        record.shares += 1
        record.sharedBy.push(userId)
      }
    }
    
    record.lastUpdated = new Date().toISOString()
    saveEngagementData(engagementData)

    return NextResponse.json(record)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
