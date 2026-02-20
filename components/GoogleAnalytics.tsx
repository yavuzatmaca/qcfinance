'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

function GoogleAnalyticsInner({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (pathname && typeof window !== 'undefined' && (window as any).gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return null
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  // Clean the measurement ID
  const cleanId = GA_MEASUREMENT_ID.trim().replace(/[\r\n]/g, '');
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${cleanId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${cleanId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner GA_MEASUREMENT_ID={cleanId} />
      </Suspense>
    </>
  )
}

