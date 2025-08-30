import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate Vercel cron request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🚀 Vercel cron job triggered - starting news scraping...');

    // Import and run the scraper
    const { WarhammerNewsScraper } = await import('../../../../scripts/scrape-news.js');
    const scraper = new WarhammerNewsScraper();
    
    const news = await scraper.scrapeNews();
    
    console.log(`✅ Cron job completed successfully. Found ${news.length} articles.`);

    return NextResponse.json({
      success: true,
      message: 'News scraping completed successfully',
      articlesFound: news.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Cron job failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'News scraping failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Allow manual triggering via POST as well
  return GET(request);
}
