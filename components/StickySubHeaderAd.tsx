'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface StickySubHeaderAdProps {
  adSlot: string
  enabled?: boolean
}

/**
 * Sticky Sub-Header Ad Banner
 * - Sticks right below the header when scrolling
 * - Same behavior as header (sticky)
 * - Dismissible by user
 */
export default function StickySubHeaderAd({
  adSlot,
  enabled = true
}: StickySubHeaderAdProps) {
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
    <div className="sticky top-16 z-[90] bg-white py-4 border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        {/* Ad Container */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Ad Label */}
            <div className="text-[8px] text-slate-400 text-center mb-2 uppercase tracking-wide">
              Publicité
            </div>
            
            {/* Desktop AdSense Unit */}
            <ins
              ref={adRef}
              className="adsbygoogle block"
              style={{ 
                display: 'inline-block',
                width: '728px',
                height: '90px'
              }}
              data-ad-client="ca-pub-2733523563879283"
              data-ad-slot={adSlot}
              data-ad-format="horizontal"
              data-full-width-responsive="false"
            />
            
            {/* Mobile version - smaller */}
            <ins
              className="adsbygoogle block lg:hidden"
              style={{ 
                display: 'inline-block',
                width: '320px',
                height: '50px'
              }}
              data-ad-client="ca-pub-2733523563879283"
              data-ad-slot={adSlot}
              data-ad-format="horizontal"
              data-full-width-responsive="false"
            />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors group"
          aria-label="Fermer la publicité"
        >
          <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
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