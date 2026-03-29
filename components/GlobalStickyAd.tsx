'use client'

import { useEffect, useRef } from 'react'

interface GlobalStickyAdProps {
  adSlot: string
  enabled?: boolean
}

/**
 * Global Sticky Ad Banner - Very Compact Size
 * - 50% smaller than standard sizes
 * - Minimal space usage
 * - Dismissible by user
 */
export default function GlobalStickyAd({
  adSlot,
  enabled = true
}: GlobalStickyAdProps) {
  const desktopAdRef = useRef<HTMLModElement>(null)
  const tabletAdRef = useRef<HTMLModElement>(null)
  const mobileAdRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Push for each ad unit
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-white shadow-sm">
      <style jsx>{`
        .adsbygoogle {
          max-width: none !important;
          max-height: none !important;
          overflow: hidden !important;
        }
        .adsbygoogle[style*="728px"] {
          width: 728px !important;
          height: 90px !important;
        }
        .adsbygoogle[style*="468px"] {
          width: 468px !important;
          height: 60px !important;
        }
        .adsbygoogle[style*="320px"] {
          width: 224px !important;
          height: 77px !important;
          margin: 0 auto !important;
        }
        /* AdSense container sabitlenmesi */
        .mobile-ad-container .adsbygoogle {
          width: 224px !important;
          height: 77px !important;
          max-width: 224px !important;
          max-height: 77px !important;
          min-width: 224px !important;
          min-height: 77px !important;
          margin: 0 auto !important;
          overflow: hidden !important;
        }
        .tablet-ad-container .adsbygoogle {
          width: 468px !important;
          height: 60px !important;
          max-width: 468px !important;
          max-height: 60px !important;
          margin: 0 auto !important;
          overflow: hidden !important;
        }
        .desktop-ad-container .adsbygoogle {
          width: 728px !important;
          height: 90px !important;
          max-width: 728px !important;
          max-height: 90px !important;
          margin: 0 auto !important;
          overflow: hidden !important;
        }
      `}</style>
      <div className="flex items-center justify-center px-4 pb-0">
        <div className="flex items-center w-full max-w-7xl">
          
          {/* Ad Container - Full Width */}
          <div className="flex-1">
            <div className="relative w-full">
              {/* Ad Label - Minimal */}
              <div className="text-[7px] text-gray-400 text-center uppercase tracking-wide py-0.5">
                Pub
              </div>
              
              {/* Desktop Ad - Full width */}
              <div className="desktop-ad-container w-full h-[90px] overflow-hidden hidden lg:block">
                <ins
                  ref={desktopAdRef}
                  className="adsbygoogle block"
                  style={{ 
                    display: 'inline-block',
                    width: '728px',
                    height: '90px'
                  }}
                  data-ad-client="ca-pub-2733523563879283"
                  data-ad-slot="1429777212"
                />
              </div>
              
              {/* Tablet Ad - Full width */}
              <div className="tablet-ad-container w-full h-[60px] overflow-hidden hidden md:block lg:hidden">
                <ins
                  ref={tabletAdRef}
                  className="adsbygoogle block"
                  style={{ 
                    display: 'inline-block',
                    width: '468px',
                    height: '60px'
                  }}
                  data-ad-client="ca-pub-2733523563879283"
                  data-ad-slot="3014321628"
                />
              </div>
              
              {/* Mobile Ad - Optimized Size */}
              <div className="mobile-ad-container w-full h-[100px] overflow-hidden block md:hidden flex justify-center">
                <ins
                  ref={mobileAdRef}
                  className="adsbygoogle block"
                  style={{ 
                    display: 'inline-block',
                    width: '320px',
                    height: '100px'
                  }}
                  data-ad-client="ca-pub-2733523563879283"
                  data-ad-slot="6068225333"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}