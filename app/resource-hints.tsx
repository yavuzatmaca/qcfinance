/**
 * Resource Hints Component
 * Preconnect, DNS-prefetch, and preload critical resources
 */

export default function ResourceHints() {
  return (
    <>
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS-prefetch for analytics and ads */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preload critical assets */}
      <link
        rel="preload"
        href="/images/logo2.png"
        as="image"
        type="image/png"
      />
    </>
  )
}
