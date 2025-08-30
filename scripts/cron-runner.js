const cron = require('node-cron');
const WarhammerNewsScraper = require('./scrape-news');
const fs = require('fs').promises;
const path = require('path');

class NewsCronRunner {
  constructor() {
    this.scraper = new WarhammerNewsScraper();
    this.isRunning = false;
    this.lastRun = null;
    this.runCount = 0;
    this.errorCount = 0;
  }

  async start() {
    console.log('🚀 Starting Daily Dose of Warhammer News Cron Runner...');
    
    // Load last run info
    await this.loadRunInfo();
    
    // Schedule daily scraping at 9:00 AM UTC (adjustable)
    const cronSchedule = process.env.NEWS_CRON_SCHEDULE || '0 9 * * *';
    
    console.log(`⏰ Scheduling news scraping with cron: ${cronSchedule}`);
    console.log(`📅 Next run: ${this.getNextRunTime(cronSchedule)}`);
    
    cron.schedule(cronSchedule, async () => {
      await this.runScraping();
    }, {
      scheduled: true,
      timezone: "UTC"
    });
    
    // Also run immediately if it's the first time or if we haven't run today
    if (!this.lastRun || !this.isToday(this.lastRun)) {
      console.log('🔄 Running initial scraping...');
      await this.runScraping();
    }
    
    console.log('✅ Cron runner started successfully');
    
    // Keep the process alive
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down cron runner...');
      process.exit(0);
    });
  }

  async runScraping() {
    if (this.isRunning) {
      console.log('⏳ Scraping already in progress, skipping...');
      return;
    }
    
    this.isRunning = true;
    const startTime = Date.now();
    
    try {
      console.log(`\n🔄 Starting scheduled news scraping (Run #${this.runCount + 1})...`);
      
      const news = await this.scraper.scrapeNews();
      
      const duration = Date.now() - startTime;
      this.runCount++;
      this.lastRun = new Date().toISOString();
      
      console.log(`✅ Scraping completed successfully in ${duration}ms`);
      console.log(`📊 Found ${news.length} articles`);
      console.log(`📈 Total runs: ${this.runCount}, Errors: ${this.errorCount}`);
      
      // Save run info
      await this.saveRunInfo();
      
      // Log success
      await this.logRun('SUCCESS', news.length, duration);
      
    } catch (error) {
      this.errorCount++;
      const duration = Date.now() - startTime;
      
      console.error(`💥 Scraping failed after ${duration}ms:`, error.message);
      console.error(`📊 Total runs: ${this.runCount}, Errors: ${this.errorCount}`);
      
      // Save run info
      await this.saveRunInfo();
      
      // Log error
      await this.logRun('ERROR', 0, duration, error.message);
      
    } finally {
      this.isRunning = false;
    }
  }

  async loadRunInfo() {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'cron-run-info.json');
      
      const data = await fs.readFile(filePath, 'utf8');
      const runInfo = JSON.parse(data);
      
      this.runCount = runInfo.runCount || 0;
      this.errorCount = runInfo.errorCount || 0;
      this.lastRun = runInfo.lastRun || null;
      
      console.log(`📊 Loaded run info: ${this.runCount} runs, ${this.errorCount} errors`);
      
    } catch (error) {
      console.log('📝 No previous run info found, starting fresh');
      this.runCount = 0;
      this.errorCount = 0;
      this.lastRun = null;
    }
  }

  async saveRunInfo() {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });
      
      const filePath = path.join(dataDir, 'cron-run-info.json');
      const runInfo = {
        runCount: this.runCount,
        errorCount: this.errorCount,
        lastRun: this.lastRun,
        lastUpdated: new Date().toISOString()
      };
      
      await fs.writeFile(filePath, JSON.stringify(runInfo, null, 2));
      
    } catch (error) {
      console.error('Error saving run info:', error);
    }
  }

  async logRun(status, articleCount, duration, errorMessage = null) {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      await fs.mkdir(dataDir, { recursive: true });
      
      const logPath = path.join(dataDir, 'cron-logs.json');
      
      let logs = [];
      try {
        const existingLogs = await fs.readFile(logPath, 'utf8');
        logs = JSON.parse(existingLogs);
      } catch (error) {
        // File doesn't exist or is invalid, start with empty array
      }
      
      const logEntry = {
        timestamp: new Date().toISOString(),
        status,
        articleCount,
        duration,
        errorMessage,
        runNumber: this.runCount
      };
      
      logs.push(logEntry);
      
      // Keep only last 100 log entries
      if (logs.length > 100) {
        logs = logs.slice(-100);
      }
      
      await fs.writeFile(logPath, JSON.stringify(logs, null, 2));
      
    } catch (error) {
      console.error('Error logging run:', error);
    }
  }

  getNextRunTime(cronSchedule) {
    try {
      // Simple calculation for next run time
      const now = new Date();
      const [minute, hour, day, month, dayOfWeek] = cronSchedule.split(' ');
      
      let nextRun = new Date(now);
      
      if (minute !== '*' && minute !== '0') {
        nextRun.setMinutes(parseInt(minute));
        if (nextRun <= now) {
          nextRun.setHours(nextRun.getHours() + 1);
        }
      } else if (hour !== '*' && hour !== '9') {
        nextRun.setHours(parseInt(hour));
        nextRun.setMinutes(0);
        if (nextRun <= now) {
          nextRun.setDate(nextRun.getDate() + 1);
        }
      } else {
        // Default to 9:00 AM UTC tomorrow
        nextRun.setDate(nextRun.getDate() + 1);
        nextRun.setHours(9, 0, 0, 0);
      }
      
      return nextRun.toISOString();
    } catch (error) {
      return 'Unknown';
    }
  }

  isToday(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  // Manual trigger method
  async triggerNow() {
    console.log('🔧 Manually triggering news scraping...');
    await this.runScraping();
  }

  // Get status
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun,
      runCount: this.runCount,
      errorCount: this.errorCount,
      nextRun: this.getNextRunTime(process.env.NEWS_CRON_SCHEDULE || '0 9 * * *')
    };
  }
}

// Run the cron runner if called directly
if (require.main === module) {
  const runner = new NewsCronRunner();
  
  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--now') || args.includes('-n')) {
    // Run scraping immediately
    runner.triggerNow()
      .then(() => {
        console.log('✅ Manual scraping completed');
        process.exit(0);
      })
      .catch(error => {
        console.error('💥 Manual scraping failed:', error);
        process.exit(1);
      });
  } else if (args.includes('--status') || args.includes('-s')) {
    // Show status
    console.log('📊 Cron Runner Status:', JSON.stringify(runner.getStatus(), null, 2));
    process.exit(0);
  } else {
    // Start the cron runner
    runner.start();
  }
}

module.exports = NewsCronRunner;
