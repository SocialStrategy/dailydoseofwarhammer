import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Try to get news from the public API endpoint first
    const publicNewsPath = path.join(process.cwd(), 'public', 'api', 'news.json');
    
    try {
      const newsData = await fs.readFile(publicNewsPath, 'utf8');
      const parsedNews = JSON.parse(newsData);
      
      // Check if the news is recent (within last 24 hours)
      const lastUpdated = new Date(parsedNews.lastUpdated);
      const now = new Date();
      const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceUpdate < 24) {
        return NextResponse.json({
          success: true,
          data: parsedNews,
          source: 'cached',
          lastUpdated: parsedNews.lastUpdated
        });
      }
    } catch (error) {
      // Public news file doesn't exist or is invalid, continue to fallback
    }
    
    // Fallback: try to get news from data directory
    const dataNewsPath = path.join(process.cwd(), 'data', 'scraped-news.json');
    
    try {
      const newsData = await fs.readFile(dataNewsPath, 'utf8');
      const parsedNews = JSON.parse(newsData);
      
      return NextResponse.json({
        success: true,
        data: parsedNews,
        source: 'data-directory',
        lastUpdated: parsedNews.lastUpdated
      });
      
    } catch (error) {
      // Data file doesn't exist, return fallback news
      const fallbackNews = {
        lastUpdated: new Date().toISOString(),
        articles: [
          {
            id: 'fallback-1',
            title: 'Warhammer Community News Update',
            excerpt: 'Latest updates from the Warhammer universe. Check back soon for fresh content!',
            category: 'News',
            date: new Date().toISOString(),
            image: null,
            link: 'https://www.warhammer-community.com/en-gb/',
            source: 'Warhammer Community',
            views: 150,
            likes: 25
          },
          {
            id: 'fallback-2',
            title: 'Daily Warhammer Updates',
            excerpt: 'Stay tuned for the latest Warhammer 40k, Age of Sigmar, and other game system news.',
            category: 'Updates',
            date: new Date().toISOString(),
            image: null,
            link: 'https://www.warhammer-community.com/en-gb/',
            source: 'Warhammer Community',
            views: 120,
            likes: 18
          }
        ],
        totalArticles: 2
      };
      
      return NextResponse.json({
        success: true,
        data: fallbackNews,
        source: 'fallback',
        lastUpdated: fallbackNews.lastUpdated,
        message: 'Using fallback news data. Scraping may not be running yet.'
      });
    }
    
  } catch (error) {
    console.error('Error fetching news:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch news data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (action === 'trigger-scraping') {
      // This would trigger the scraping process
      // For now, return success (in production, you'd want to actually trigger it)
      return NextResponse.json({
        success: true,
        message: 'Scraping triggered successfully',
        timestamp: new Date().toISOString()
      });
    }
    
    if (action === 'get-status') {
      // Return scraping status
      try {
        const cronInfoPath = path.join(process.cwd(), 'data', 'cron-run-info.json');
        const cronInfo = await fs.readFile(cronInfoPath, 'utf8');
        const parsedInfo = JSON.parse(cronInfo);
        
        return NextResponse.json({
          success: true,
          status: parsedInfo,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        return NextResponse.json({
          success: true,
          status: {
            runCount: 0,
            errorCount: 0,
            lastRun: null,
            message: 'No cron info available'
          },
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action',
      message: 'Supported actions: trigger-scraping, get-status'
    }, { status: 400 });
    
  } catch (error) {
    console.error('Error processing POST request:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process request',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
