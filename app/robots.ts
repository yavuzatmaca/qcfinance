import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/stats'], // Block API routes and stats
      },
    ],
    sitemap: [
      'https://qcfinance.ca/sitemap.xml',
      'https://qcfinance.ca/image-sitemap.xml',
    ],
  }
}

