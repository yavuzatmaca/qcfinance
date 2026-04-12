/**
 * SEO Utilities for QCFinance
 * Centralized SEO configuration to ensure consistency
 */

export const SITE_CONFIG = {
  name: 'QCFinance',
  url: 'https://qcfinance.ca',
  description: 'Calculateurs financiers gratuits pour le Québec',
  locale: 'fr-CA',
} as const

/**
 * Generate canonical URL
 * Always returns full URL for consistency
 */
export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${SITE_CONFIG.url}/${cleanPath}`
}

/**
 * Generate Open Graph URL
 */
export function getOgUrl(path: string): string {
  return getCanonicalUrl(path)
}

/**
 * Common metadata for all pages
 */
export function getBaseMetadata() {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        'fr-CA': SITE_CONFIG.url,
      },
    },
  }
}
