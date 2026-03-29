'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface StickyTopAdBannerProps {
  adSlot: string
  enabled?: boolean
}

/**
 * Sticky Top Ad Banner
 * - Always visible at the very top
 * - Above header (header will be pushed down)
 * - Dismissible by user
 * - Responsive: 728x90 desktop, 320x50 mobile
 */
export default function StickyTopAdBanner({
  adSlot,
  enabled = true
}: StickyTopAdBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (!isDismissed && adRef.current) {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  if (!enabled || isDismissed) {
    return null
  }

  return (
    <div className="sticky top-0 z-[300] bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 py-1 flex items-center justify-between">
        
        {/* Ad Container - Compact & Logo-Safe */}
        <div className="flex-1 flex justify-center items-center min-h-[50px] max-w-[600px] mx-auto">
          <div className="relative w-full flex flex-col items-center">
            {/* Ad Label - Smaller */}
            <div className="text-[7px] text-slate-400 text-center mb-0.5 uppercase tracking-wide">
              Publicité
            </div>
            
            {/* Desktop AdSense Unit - Compact Size */}
            <ins
              ref={adRef}
              className="adsbygoogle hidden lg:block"
              style={{ 
                display: 'inline-block',
                minWidth: '300px',
                maxWidth: '600px',
                width: '100%',
                height: 'auto',
                minHeight: '50px',
                maxHeight: '70px'
              }}
              data-ad-client="ca-pub-2733523563879283"
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            
            {/* Mobile AdSense Unit - Very Compact */}
            <ins
              className="adsbygoogle block lg:hidden"
              style={{ 
                display: 'inline-block',
                minWidth: '200px',
                maxWidth: '280px', 
                width: '100%',
                height: 'auto',
                minHeight: '40px',
                maxHeight: '50px'
              }}
              data-ad-client="ca-pub-2733523563879283"
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* Close Button - Compact */}
        <button
          onClick={handleDismiss}
          className="ml-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors group flex-shrink-0"
          aria-label="Fermer la publicité"
        >
          <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}