import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GlobalWrapper from '@/components/GlobalWrapper'
import OrganizationSchema from '@/components/OrganizationSchema'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import ConditionalLayout from '@/components/ConditionalLayout'
import IntroPopup from '@/components/IntroPopup'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://qcfinance.ca'),
  icons: {
    icon: '/images/favicon.png',
  },
  title: {
    template: '%s | QCFinance - Outils Financiers Québec',
    default: 'QCFinance | Calculateurs Financiers Québec 2026',
  },
  description: 'Calculateurs financiers gratuits pour le Québec : impôt, salaire net, hypothèque, allocations familiales et plus.',
  keywords: [
    'impôt québec 2026',
    'calcul salaire net québec',
    'calculatrice hypothécaire québec',
    'frais de garde',
    'rrq',
    'rqap',
    'calculateur impôt québec',
    'salaire net québec',
    'allocations familiales',
    'outils financiers québec',
    'taxe de bienvenue',
    'loyer québec',
    'assurance-emploi',
  ],
  authors: [{ name: 'QCFinance' }],
  creator: 'QCFinance',
  publisher: 'QCFinance',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'fr-CA': '/',
      'fr': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://qcfinance.ca',
    siteName: 'QC Finance',
    title: 'QC Finance - Votre guide financier au Québec',
    description: '19 calculateurs gratuits pour impôts, hypothèque, salaire net et allocations familiales au Québec. Outils financiers 2026.',
    images: [
      {
        url: 'https://qcfinance.ca/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'QC Finance - Votre guide financier au Québec',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@qcfinance',
    creator: '@qcfinance',
    title: 'QC Finance - Votre guide financier au Québec',
    description: '19 calculateurs gratuits pour vos finances au Québec. Impôts, hypothèque, salaire net et plus.',
    images: ['https://qcfinance.ca/opengraph-image'],
  },
  verification: {
    google: 'googlee90bcef2687129b9',
  },
  other: {
    'theme-color': '#10b981',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-CA">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2733523563879283" />
        
        {/* Google AdSense - Otomatik Reklamlar */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2733523563879283"
          crossOrigin="anonymous"
        />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="QCFinance" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" hrefLang="fr-CA" href="https://qcfinance.ca/" />
        <link rel="alternate" hrefLang="fr" href="https://qcfinance.ca/" />
        <link rel="alternate" hrefLang="x-default" href="https://qcfinance.ca/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <style dangerouslySetInnerHTML={{__html: `
          *,*::before,*::after{box-sizing:border-box}
          body{margin:0;padding:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          .hero-gradient{background:linear-gradient(to bottom,rgb(236 253 245 / 0.5),transparent)}
          img{max-width:100%;height:auto}
          button,input,select,textarea{font:inherit;min-height:44px;min-width:44px}
        `}} />
        <OrganizationSchema />
      </head>
      <body className={`${plusJakartaSans.className} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white text-slate-900`}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-4E6L3DHKPJ" />
        <PerformanceMonitor />
        <IntroPopup />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}

