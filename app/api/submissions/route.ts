import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// In a real application, you'd use a database
// This is a simple file-based storage for demonstration
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions.json')

interface FanSubmission {
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
  approvedDate?: string
  isFeatured?: boolean
}

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(SUBMISSIONS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load submissions from file
function loadSubmissions(): FanSubmission[] {
  try {
    ensureDataDir()
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading submissions:', error)
  }
  return []
}

// Save submissions to file
function saveSubmissions(submissions: FanSubmission[]) {
  try {
    ensureDataDir()
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
  } catch (error) {
    console.error('Error saving submissions:', error)
  }
}

// GET - Retrieve all submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let submissions = loadSubmissions()
    
    if (status) {
      submissions = submissions.filter(s => s.status === status)
    }
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

// POST - Create new submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.artist || !body.title || !body.description || !body.category || !body.images) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const newSubmission: FanSubmission = {
      id: Date.now().toString(),
      artist: body.artist,
      title: body.title,
      description: body.description,
      category: body.category,
      images: body.images,
      date: new Date().toISOString().split('T')[0],
      socialHandle: body.socialHandle,
      email: body.email,
      status: 'pending'
    }
    
    const submissions = loadSubmissions()
    submissions.push(newSubmission)
    saveSubmissions(submissions)
    
    return NextResponse.json(
      { 
        message: 'Submission received successfully',
        submissionId: newSubmission.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}

// PUT - Update submission status (approve/reject/feature)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action, ...updates } = body
    
    if (!id || !action) {
      return NextResponse.json(
        { error: 'Missing submission ID or action' },
        { status: 400 }
      )
    }
    
    const submissions = loadSubmissions()
    const submissionIndex = submissions.findIndex(s => s.id === id)
    
    if (submissionIndex === -1) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }
    
    const submission = submissions[submissionIndex]
    
    switch (action) {
      case 'approve':
        submission.status = 'approved'
        submission.approvedDate = new Date().toISOString().split('T')[0]
        submission.isFeatured = false
        break
        
      case 'reject':
        submission.status = 'rejected'
        break
        
      case 'toggleFeatured':
        if (submission.status === 'approved') {
          // Only one submission can be featured at a time
          submissions.forEach(s => s.isFeatured = false)
          submission.isFeatured = !submission.isFeatured
        }
        break
        
      case 'update':
        Object.assign(submission, updates)
        break
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
    
    saveSubmissions(submissions)
    
    return NextResponse.json({ 
      message: 'Submission updated successfully',
      submission 
    })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    )
  }
}

// DELETE - Remove submission
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing submission ID' },
        { status: 400 }
      )
    }
    
    const submissions = loadSubmissions()
    const filteredSubmissions = submissions.filter(s => s.id !== id)
    
    if (filteredSubmissions.length === submissions.length) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }
    
    saveSubmissions(filteredSubmissions)
    
    return NextResponse.json({ 
      message: 'Submission deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}
