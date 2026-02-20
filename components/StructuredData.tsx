'use client'

interface StructuredDataProps {
  name: string
  description: string
  url: string
  category?: 'FinanceApplication' | 'BusinessApplication' | 'UtilitiesApplication'
  aggregateRating?: {
    ratingValue: number
    ratingCount: number
  }
}

export default function StructuredData({
  name,
  description,
  url,
  category = 'FinanceApplication',
  aggregateRating,
}: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    description,
    url,
    inLanguage: 'fr-CA',
    availableOnDevice: ['Desktop', 'Mobile', 'Tablet'],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2026',
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: 'QCFinance',
      url: 'https://qcfinance.ca',
    },
    provider: {
      '@type': 'Organization',
      name: 'QCFinance',
      url: 'https://qcfinance.ca',
    },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  // Also add WebPage schema for better context
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: 'fr-CA',
    isPartOf: {
      '@type': 'WebSite',
      name: 'QCFinance',
      url: 'https://qcfinance.ca',
    },
    about: {
      '@type': 'Thing',
      name: 'Financial Calculators for Quebec',
    },
    audience: {
      '@type': 'Audience',
      geographicArea: {
        '@type': 'Place',
        name: 'Quebec, Canada',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
    </>
  )
}

