'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = { display: 'block' }
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-2733523563879283"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}