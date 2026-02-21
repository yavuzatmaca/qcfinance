import { NextResponse } from 'next/server'
import { siteConfig } from '@/app/site-config'

/**
 * GET /api/ads/config
 * Returns ads configuration from site-config.ts
 */
export async function GET() {
  try {
    return NextResponse.json({
      enabled: siteConfig.ads.isEnabled,
      googleAdSenseId: siteConfig.ads.googleAdSenseId,
      slots: siteConfig.ads.slots
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load ads configuration' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/ads/config
 * Note: In stateless architecture, config changes require editing site-config.ts
 * This endpoint returns a message indicating manual update is required
 */
export async function POST(request: Request) {
  try {
    const newConfig = await request.json()
    
    return NextResponse.json({ 
      success: false,
      message: 'Configuration is managed in app/site-config.ts. Please edit the file directly and redeploy.',
      receivedConfig: newConfig
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update ads configuration' },
      { status: 500 }
    )
  }
}

