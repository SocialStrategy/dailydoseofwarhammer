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
    
    // Try multiple approaches for Instagram oEmbed
    const approaches = [
      // Approach 1: Try the old public oEmbed endpoint
      {
        name: 'Legacy oEmbed',
        url: `https://graph.instagram.com/instagram_oembed?url=${encodeURIComponent(cleanUrl)}&omitscript=true`
      },
      // Approach 2: Try without omitscript
      {
        name: 'Legacy oEmbed (with script)',
        url: `https://graph.instagram.com/instagram_oembed?url=${encodeURIComponent(cleanUrl)}`
      },
      // Approach 3: Try the Facebook Graph API endpoint
      {
        name: 'Facebook Graph API',
        url: `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(cleanUrl)}`
      }
    ]

    for (const approach of approaches) {
      try {
        console.log(`Trying ${approach.name} for:`, cleanUrl)
        
        const response = await fetch(approach.url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Referer': 'https://dailydoseofwarhammer.com/',
            'Origin': 'https://dailydoseofwarhammer.com'
          },
        })

        console.log(`${approach.name} response status:`, response.status)

        if (response.ok) {
          const data = await response.json()
          console.log(`${approach.name} success:`, { title: data.title, hasHtml: !!data.html })
          
          if (data.html) {
            return NextResponse.json(data)
          }
        } else {
          const errorText = await response.text()
          console.log(`${approach.name} failed:`, response.status, errorText)
        }
      } catch (err) {
        console.log(`${approach.name} error:`, err)
        continue
      }
    }

    // All approaches failed, return fallback
    throw new Error('All Instagram oEmbed approaches failed')

  } catch (error) {
    console.error('Instagram oEmbed API error:', error)
    
    // Return a fallback response that will trigger the component's error state
    return NextResponse.json(
      { 
        error: 'Failed to fetch Instagram embed',
        message: error instanceof Error ? error.message : 'Unknown error',
        fallback: true,
        requiresToken: true
      },
      { status: 500 }
    )
  }
}
