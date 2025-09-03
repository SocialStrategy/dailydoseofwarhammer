import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'Instagram URL is required' },
      { status: 400 }
    )
  }

  try {
    // Instagram oEmbed API endpoint (no token required for public content)
    const oembedUrl = `https://graph.instagram.com/instagram_oembed?url=${encodeURIComponent(url)}`
    
    const response = await fetch(oembedUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`Instagram API responded with ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.html) {
      throw new Error('No embed HTML received from Instagram')
    }

    // Return the oEmbed data
    return NextResponse.json(data)

  } catch (error) {
    console.error('Instagram oEmbed API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch Instagram embed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
