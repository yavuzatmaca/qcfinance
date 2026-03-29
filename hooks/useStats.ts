'use client'

import { useEffect, useState } from 'react'

interface StatsData {
  totalCalculations: number
  totalUsers: number
  todayCalculations: number
  last7DaysCalculations: number
  lastUpdated: string
  topCalculators: Array<{ name: string; count: number }>
}

export function useStats() {
  const [stats, setStats] = useState<StatsData>({
    totalCalculations: 0,
    totalUsers: 0,
    todayCalculations: 0,
    last7DaysCalculations: 0,
    lastUpdated: new Date().toISOString(),
    topCalculators: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats/track')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackCalculation = async (calculator: string) => {
    try {
      await fetch('/api/stats/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calculator, action: 'calculate' }),
      })
      // Refresh stats after tracking
      fetchStats()
    } catch (error) {
      console.error('Error tracking calculation:', error)
    }
  }

  const trackVisit = async () => {
    try {
      // Only track once per session
      const hasTracked = sessionStorage.getItem('stats_tracked')
      if (!hasTracked) {
        await fetch('/api/stats/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visit' }),
        })
        sessionStorage.setItem('stats_tracked', 'true')
      }
    } catch (error) {
      console.error('Error tracking visit:', error)
    }
  }

  return {
    stats,
    loading,
    trackCalculation,
    trackVisit,
  }
}
