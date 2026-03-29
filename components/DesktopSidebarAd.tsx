'use client'

import { useEffect, useState } from 'react'
interface DesktopSidebarAdProps {
  adSlot: string
  sticky?: boolean
}

/**
 * Desktop Sidebar Ad Component
 * 
 * Features:
 * - Desktop only (hidden on mobile)
 * - Optional sticky positioning
 * - Proper spacing and sizing
 * - CLS prevention
 */
export default function DesktopSidebarAd({
  adSlot,
  sticky = true
}: DesktopSidebarAdProps) {
  const [topOffset, setTopOffset] = useState(96) // Default: 96px (header height)

  useEffect(() => {
    // Calculate proper top offset based on header height
    const header = document.querySelector('header')
    if (header) {
      setTopOffset(header.offsetHeight + 24) // Header + 24px spacing
    }
  }, [])

  return (
    <div className="hidden lg:block">
      <div
        className={sticky ? 'sticky' : 'relative'}
        style={sticky ? { top: `${topOffset}px` } : undefined}
      >
        {/* Ad Label */}
        <div className="text-[10px] text-slate-400 text-center mb-3 uppercase tracking-wide">
          Publicité
        </div>

        {/* Ad Container */}
        {/* Ad removed - will be replaced with Auto Ads */}
      </div>
    </div>
  )
}
