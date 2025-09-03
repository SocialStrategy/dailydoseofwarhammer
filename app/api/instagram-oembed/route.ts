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
    // Ensure URL ends with / for Instagram oEmbed API
    const cleanUrl = url.endsWith('/') ? url : `${url}/`
    
    // Instagram oEmbed API endpoint (no token required for public content)
    const oembedUrl = `https://graph.instagram.com/instagram_oembed?url=${encodeURIComponent(cleanUrl)}&omitscript=true`
    
    console.log('Fetching Instagram oEmbed for:', cleanUrl)
    
    const response = await fetch(oembedUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })

    console.log('Instagram API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Instagram API error response:', errorText)
      throw new Error(`Instagram API responded with ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log('Instagram oEmbed data received:', { title: data.title, hasHtml: !!data.html })
    
    if (!data.html) {
      throw new Error('No embed HTML received from Instagram')
    }

    // Return the oEmbed data
    return NextResponse.json(data)

  } catch (error) {
    console.error('Instagram oEmbed API error:', error)
    
    // Return a fallback response that will trigger the component's error state
    return NextResponse.json(
      { 
        error: 'Failed to fetch Instagram embed',
        message: error instanceof Error ? error.message : 'Unknown error',
        fallback: true
      },
      { status: 500 }
    )
  }
}
