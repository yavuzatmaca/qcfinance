/**
 * Site-wide Configuration
 * Centralized place to update dates, versions, and other global settings
 */

export const siteConfig = {
  // Last Updated Date - Update this once and it reflects everywhere
  lastUpdated: {
    date: 'Janvier 2026',
    fullDate: '2026-01-29', // ISO format for schema markup
    year: 2026,
  },

  // Tax Year Configuration
  taxYear: {
    current: 2026,
    label: 'Taux 2026',
    description: 'Données officielles 2026',
  },

  // Site Information
  site: {
    name: 'QCFinance.ca',
    url: 'https://qcfinance.ca',
    description: 'Calculateurs financiers gratuits spécialisés pour le Québec',
    locale: 'fr_CA',
  },

  // Social Links
  social: {
    twitter: 'https://twitter.com/qcfinanceca',
    linkedin: 'https://linkedin.com/company/qcfinanceca',
  },

  // Rating Information (for schema markup)
  rating: {
    value: 4.8,
    count: 2450,
  },

  // Data Sources - Update these when official sources change
  dataSources: {
    revenuQuebec: {
      label: 'Revenu Québec - Tables de retenues 2026 (TP-1015.3)',
      url: 'https://www.revenuquebec.ca/fr/entreprises/retenues-et-cotisations/calcul-des-retenues-a-la-source/tables-de-retenues/',
      lastUpdate: 'Janvier 2026',
    },
    bankOfCanada: {
      label: 'Banque du Canada - Taux directeurs actuels',
      url: 'https://www.banqueducanada.ca/taux/',
      lastUpdate: 'En temps réel',
    },
    statisticsCanada: {
      label: 'Statistique Canada - Données économiques',
      url: 'https://www.statcan.gc.ca/',
      lastUpdate: 'Janvier 2026',
    },
  },

  // Tax Constants - Update annually
  taxConstants: {
    federal: {
      basicPersonalAmount: 15705,
      maxRRSPContribution: 32490,
      rrspRate: 0.18, // 18% of income
    },
    quebec: {
      basicPersonalAmount: 18056,
      rrqMaxEarnings: 68500,
      rrqRate: 0.064,
      rqapRate: 0.00494,
      eiRate: 0.0127,
      eiMaxInsurable: 63200,
    },
  },

  // Feature Flags
  features: {
    showLastUpdatedBadge: true,
    showDataSources: true,
    enableAnalytics: true,
  },
} as const

// Helper function to get formatted last updated date
export function getLastUpdatedText(format: 'short' | 'long' = 'short'): string {
  if (format === 'long') {
    return `Dernière mise à jour: ${siteConfig.lastUpdated.date}`
  }
  return siteConfig.lastUpdated.date
}

// Helper function to get current tax year label
export function getTaxYearLabel(): string {
  return siteConfig.taxYear.label
}

// Helper function to check if data is current year
export function isCurrentTaxYear(): boolean {
  const currentYear = new Date().getFullYear()
  return siteConfig.taxYear.current === currentYear
}
