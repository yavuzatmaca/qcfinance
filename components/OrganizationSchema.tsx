'use client'

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QCFinance',
    alternateName: 'Calculateurs Québec',
    url: 'https://qcfinance.ca',
    logo: 'https://qcfinance.ca/logo.png',
    description: 'Outils financiers gratuits pour le Québec - Calculateurs d\'impôts, hypothèque, salaire net et plus',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Quebec, Canada',
    },
    knowsAbout: [
      'Calcul d\'impôts',
      'Salaire net',
      'Hypothèque',
      'Allocations familiales',
      'Finances personnelles',
      'Immobilier Québec',
    ],
    sameAs: [
      // Ajoutez vos réseaux sociaux ici quand disponibles
      // 'https://facebook.com/qcfinance',
      // 'https://twitter.com/qcfinance',
      // 'https://linkedin.com/company/qcfinance',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://qcfinance.ca',
    name: 'QCFinance',
    image: 'https://qcfinance.ca/logo.png',
    url: 'https://qcfinance.ca',
    telephone: '', // Ajoutez si disponible
    priceRange: 'Gratuit',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.8139,
      longitude: -71.2080,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5420',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QCFinance',
    url: 'https://qcfinance.ca',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://qcfinance.ca/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-CA',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

