'use client'

import AdSenseAd from './AdSenseAd'

interface ResponsiveAdProps {
  adSlot?: string
  label?: string
}

export default function ResponsiveAd({ 
  adSlot = "6737944215",
  label = "Publicité" 
}: ResponsiveAdProps) {
  return (
    <div className="my-8">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Ad Label */}
          <div className="text-[10px] text-slate-400 text-center mb-2 uppercase tracking-wide">
            {label}
          </div>
          
          {/* Desktop Ad */}
          <AdSenseAd
            adSlot={adSlot}
            className="hidden lg:block"
          />
          
          {/* Tablet Ad */}
          <AdSenseAd
            adSlot={adSlot}
            className="hidden md:block lg:hidden"
          />
          
          {/* Mobile Ad */}
          <AdSenseAd
            adSlot={adSlot}
            className="block md:hidden"
          />
        </div>
      </div>
    </div>
  )
}