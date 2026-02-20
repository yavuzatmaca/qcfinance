'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        // LCP: lastEntry.renderTime || lastEntry.loadTime
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          // FID/INP: entry.processingStart - entry.startTime
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            // CLS: clsValue
          }
        })
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}
