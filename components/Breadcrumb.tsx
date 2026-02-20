'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  theme?: 'light' | 'dark'
}

export default function Breadcrumb({ items, theme = 'light' }: BreadcrumbProps) {
  // Generate Schema.org BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://qcfinance.ca',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `https://qcfinance.ca${item.href}` }),
      })),
    ],
  }

  return (
    <>
      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
          <li>
            <Link 
              href="/" 
              className={`flex items-center gap-1 transition-colors ${
                theme === 'dark' 
                  ? 'hover:text-white' 
                  : 'hover:text-emerald-600'
              }`}
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Accueil</span>
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`} aria-hidden="true" />
              {item.href ? (
                <Link 
                  href={item.href}
                  className={`transition-colors ${
                    theme === 'dark' 
                      ? 'hover:text-white' 
                      : 'hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

