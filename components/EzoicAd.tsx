'use client';

import { useEffect } from 'react';

interface EzoicAdProps {
  placementId: number;
  className?: string;
}

/**
 * Ezoic Ad Component
 * 
 * Usage:
 * <EzoicAd placementId={101} />
 * 
 * Placement IDs should be created in Ezoic Dashboard first
 */
export default function EzoicAd({ placementId, className = '' }: EzoicAdProps) {
  useEffect(() => {
    // Check if ezstandalone is available
    if (typeof window !== 'undefined' && (window as any).ezstandalone) {
      const ezstandalone = (window as any).ezstandalone;
      
      // Queue the ad display command
      ezstandalone.cmd = ezstandalone.cmd || [];
      ezstandalone.cmd.push(function () {
        ezstandalone.showAds(placementId);
      });
    }
  }, [placementId]);

  return (
    <div className={className}>
      <div id={`ezoic-pub-ad-placeholder-${placementId}`} />
    </div>
  );
}
