'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' }
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      // Silent fail
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-2733523563879283"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  )
}
