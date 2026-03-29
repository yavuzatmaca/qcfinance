'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
interface MobileAnchorAdProps {
  adSlot: string
  enabled?: boolean
}

/**
 * Mobile Anchor Ad Component
 * 
 * Compliant Implementation:
 * - Occupies less than 15% of viewport height (max 100px)
 * - Does not overlap content or buttons
 * - Loads after user scroll (not immediately)
 * - Dismissible with close button
 * - Only on mobile devices
 * 
 * Better Ads Standards Compliance:
 * - Not sticky on initial load
 * - User can dismiss
 * - Does not block content
 * - Reasonable size
 */
export default function MobileAnchorAd({
  adSlot,
  enabled = false
}: MobileAnchorAdProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (!enabled || isDismissed) return

    // Only show after user scrolls 50% of viewport
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.5
      if (scrolled && !hasScrolled) {
        setHasScrolled(true)
        // Delay showing by 1 second after scroll threshold
        setTimeout(() => {
          setIsVisible(true)
        }, 1000)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, isDismissed, hasScrolled])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // Remember dismissal for session
    sessionStorage.setItem('anchorAdDismissed', 'true')
  }

  // Check if already dismissed in session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('anchorAdDismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  if (!enabled || !isVisible || isDismissed) {
    return null
  }

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="lg:hidden h-[100px]" aria-hidden="true" />

      {/* Anchor Ad Container */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg animate-slide-up"
        style={{
          maxHeight: '100px', // 15% of typical mobile viewport (667px)
          minHeight: '90px'   // CLS prevention
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-1 right-1 z-50 w-7 h-7 bg-slate-800/90 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all touch-manipulation active:scale-95"
          aria-label="Fermer la publicité"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ad Content */}
        {/* Ad container removed - Auto Ads will handle placement */}
      </div>
    </>
  )
}
