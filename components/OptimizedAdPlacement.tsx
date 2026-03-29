'use client'

import { useEffect, useState, useRef } from 'react'
interface OptimizedAdPlacementProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle'
  placement: 'after-result' | 'before-faq' | 'mid-content' | 'sidebar'
  className?: string
  lazyLoad?: boolean
}

/**
 * Optimized Ad Placement Component
 * 
 * High RPM placement strategy:
 * - after-result: Directly after calculator results (highest engagement)
 * - before-faq: Before FAQ section (high viewability)
 * - mid-content: Mid-page after 3-4 paragraphs
 * - sidebar: Desktop sidebar (sticky allowed)
 * 
 * Features:
 * - Lazy loading for below-fold ads
 * - Optimal spacing (40px min)
 * - CLS prevention
 * - Mobile/desktop responsive
 */
export default function OptimizedAdPlacement({
  adSlot,
  adFormat = 'auto',
  placement,
  className = '',
  lazyLoad = true
}: OptimizedAdPlacementProps) {
  const [isVisible, setIsVisible] = useState(!lazyLoad)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!lazyLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px' // Load 200px before entering viewport
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoad])

  // Placement-specific configurations
  const placementConfig = {
    'after-result': {
      mobileClasses: 'block',
      desktopClasses: 'block',
      spacing: 'my-8 md:my-10',
      label: 'Publicité'
    },
    'before-faq': {
      mobileClasses: 'block',
      desktopClasses: 'block',
      spacing: 'my-8 md:my-10',
      label: 'Publicité'
    },
    'mid-content': {
      mobileClasses: 'hidden lg:block', // Desktop only for mid-content
      desktopClasses: 'block',
      spacing: 'my-10 md:my-12',
      label: 'Publicité'
    },
    'sidebar': {
      mobileClasses: 'hidden',
      desktopClasses: 'hidden lg:block',
      spacing: 'sticky top-24',
      label: 'Publicité'
    }
  }

  const config = placementConfig[placement]

  return (
    <div
      ref={containerRef}
      className={`${config.mobileClasses} ${config.spacing} ${className}`}
      data-placement={placement}
    >
      {/* Ad Label */}
      <div className="text-[10px] text-slate-400 text-center mb-3 uppercase tracking-wide">
        {config.label}
      </div>

      {/* Ad Container with CLS Prevention */}
      <div
        className="min-h-[250px] max-h-[600px] flex items-center justify-center bg-slate-50/50 rounded-lg overflow-hidden"
        style={{
          minHeight: placement === 'sidebar' ? '600px' : '250px'
        }}
      >
        {isVisible ? (
          <div className="text-slate-300 text-sm">
            {/* Ad removed - will be replaced with Auto Ads */}
          </div>
        ) : (
          <div className="text-slate-300 text-sm">Chargement...</div>
        )}
      </div>

      {/* Spacing enforcement */}
      <div className="h-10" aria-hidden="true" />
    </div>
  )
}
