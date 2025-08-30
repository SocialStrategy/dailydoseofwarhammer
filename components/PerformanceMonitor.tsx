'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      if (metric.label === 'web-vital') {
        // Send to analytics (replace with your analytics service)
        console.log('Web Vital:', {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        })

        // Example: Send to Google Analytics 4
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          })
        }
      }
    }

    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry as PerformanceEntry
              reportWebVitals({
                name: 'LCP',
                value: lcp.startTime,
                rating: lcp.startTime < 2500 ? 'good' : lcp.startTime < 4000 ? 'needs-improvement' : 'poor',
                delta: lcp.startTime,
                id: lcp.name,
                label: 'web-vital'
              })
            }
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('LCP monitoring failed:', e)
      }
    }

    // Monitor First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              const fid = entry as any
              const processingStart = fid.processingStart || fid.startTime
              const delay = processingStart - fid.startTime
              reportWebVitals({
                name: 'FID',
                value: delay,
                rating: delay < 100 ? 'good' : delay < 300 ? 'needs-improvement' : 'poor',
                delta: delay,
                id: fid.name,
                label: 'web-vital'
              })
            }
          }
        })
        observer.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID monitoring failed:', e)
      }
    }

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0
    let clsEntries: any[] = []

    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              const clsEntry = entry as any
              if (!clsEntry.hadRecentInput) {
                clsValue += clsEntry.value
                clsEntries.push(clsEntry)
              }
            }
          }
        })
        observer.observe({ entryTypes: ['layout-shift'] })

        // Report CLS when page is hidden
        const reportCLS = () => {
          if (clsValue > 0) {
            reportWebVitals({
              name: 'CLS',
              value: clsValue,
              rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
              delta: clsValue,
              id: 'cls-report',
              label: 'web-vital'
            })
          }
        }

        // Report CLS on page unload
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            reportCLS()
          }
        })

        // Report CLS on page unload
        window.addEventListener('beforeunload', reportCLS)
      } catch (e) {
        console.warn('CLS monitoring failed:', e)
      }
    }

    // Monitor Time to First Byte (TTFB)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming
              const ttfb = navEntry.responseStart - navEntry.requestStart
              reportWebVitals({
                name: 'TTFB',
                value: ttfb,
                rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
                delta: ttfb,
                id: 'ttfb-report',
                label: 'web-vital'
              })
            }
          }
        })
        observer.observe({ entryTypes: ['navigation'] })
      } catch (e) {
        console.warn('TTFB monitoring failed:', e)
      }
    }

    // Monitor First Contentful Paint (FCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-contentful-paint') {
              const fcp = entry as PerformanceEntry
              reportWebVitals({
                name: 'FCP',
                value: fcp.startTime,
                rating: fcp.startTime < 1800 ? 'good' : fcp.startTime < 3000 ? 'needs-improvement' : 'poor',
                delta: fcp.startTime,
                id: fcp.name,
                label: 'web-vital'
              })
            }
          }
        })
        observer.observe({ entryTypes: ['first-contentful-paint'] })
      } catch (e) {
        console.warn('FCP monitoring failed:', e)
      }
    }

    // Cleanup function
    return () => {
      // Cleanup observers if needed
    }
  }, [])

  return null // This component doesn't render anything
}
