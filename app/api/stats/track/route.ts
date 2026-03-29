import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Simple file-based stats (production'da Vercel KV veya Redis kullan)
const STATS_FILE = path.join(process.cwd(), 'data', 'stats.json')

interface Stats {
  totalCalculations: number
  totalUsers: number
  lastUpdated: string
  dailyCalculations: Record<string, number>
  calculatorUsage: Record<string, number>
}

function getStats(): Stats {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading stats:', error)
  }

  // Default stats
  return {
    totalCalculations: 0,
    totalUsers: 0,
    lastUpdated: new Date().toISOString(),
    dailyCalculations: {},
    calculatorUsage: {},
  }
}

function saveStats(stats: Stats) {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2))
  } catch (error) {
    console.error('Error saving stats:', error)
  }
}

export async function POST(request: Request) {
  try {
    const { calculator, action } = await request.json()

    const stats = getStats()
    const today = new Date().toISOString().split('T')[0]

    // Update calculations
    if (action === 'calculate') {
      stats.totalCalculations++
      stats.dailyCalculations[today] = (stats.dailyCalculations[today] || 0) + 1
      
      if (calculator) {
        stats.calculatorUsage[calculator] = (stats.calculatorUsage[calculator] || 0) + 1
      }
    }

    // Update users (based on unique session)
    if (action === 'visit') {
      stats.totalUsers++
    }

    stats.lastUpdated = new Date().toISOString()
    saveStats(stats)

    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error('Error tracking stats:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  try {
    const stats = getStats()
    
    // Calculate some derived stats
    const today = new Date().toISOString().split('T')[0]
    const todayCalculations = stats.dailyCalculations[today] || 0
    
    // Get last 7 days
    const last7Days = Object.entries(stats.dailyCalculations)
      .slice(-7)
      .reduce((sum, [, count]) => sum + count, 0)

    return NextResponse.json({
      totalCalculations: stats.totalCalculations,
      totalUsers: stats.totalUsers,
      todayCalculations,
      last7DaysCalculations: last7Days,
      lastUpdated: stats.lastUpdated,
      topCalculators: Object.entries(stats.calculatorUsage)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { 
        totalCalculations: 0,
        totalUsers: 0,
        todayCalculations: 0,
        last7DaysCalculations: 0,
        lastUpdated: new Date().toISOString(),
        topCalculators: [],
      },
      { status: 200 }
    )
  }
}
