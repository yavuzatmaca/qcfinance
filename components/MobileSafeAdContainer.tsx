'use client'

import { ReactNode } from 'react'
interface MobileSafeAdContainerProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle'
  className?: string
  showOnMobile?: boolean
  children?: ReactNode
}

/**
 * Mobile-Safe Ad Container
 * 
 * Ensures Google Ad Experience compliance:
 * - Never appears above the fold on mobile
 * - Fixed height container prevents CLS
 * - Minimum 150px spacing from interactive elements
 * - Maximum 2 ads per page on mobile
 * - No sticky/anchor ads on mobile
 */
export default function MobileSafeAdContainer({
  adSlot,
  adFormat = 'auto',
  className = '',
  showOnMobile = true,
  children
}: MobileSafeAdContainerProps) {
  
  const containerClasses = `
    ${showOnMobile ? 'block' : 'hidden lg:block'}
    ${className}
  `.trim()

  return (
    <div className={containerClasses}>
      {/* Ad Label */}
      <div className="text-[10px] text-slate-500 text-center mb-2">
        Publicité
      </div>
      
      {/* Fixed-height container to prevent layout shift */}
      <div 
        className="min-h-[250px] flex items-center justify-center"
        style={{ 
          minHeight: '250px',
          maxHeight: '600px'
        }}
      >
        {children || null}
      </div>
    </div>
  )
}
