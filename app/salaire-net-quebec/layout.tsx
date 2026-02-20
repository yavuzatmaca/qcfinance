import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Calculateur Salaire Net Québec 2026 - Précis & Gratuit',
  description: 'Estimez votre revenu net après impôts en 2 secondes. Intègre les taux 2026, RRQ, RQAP, AE et toutes les déductions fédérales et provinciales. 100% gratuit.',
  keywords: [
    'salaire net québec',
    'calculateur impôt québec 2026',
    'revenu net après impôt',
    'calculateur salaire québec',
    'impôt québec',
    'RRQ RQAP',
    'déductions québec',
  ],
  alternates: {
    canonical: '/salaire-net-quebec',
  },
  openGraph: {
    title: 'Calculateur Salaire Net Québec 2026 - Précis & Gratuit',
    description: 'Estimez votre revenu net après impôts en 2 secondes. Intègre les taux 2026, RRQ, RQAP et toutes les déductions.',
    url: '/salaire-net-quebec',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Salaire Net Québec 2026',
    description: 'Estimez votre revenu net après impôts en 2 secondes.',
  },
}

export default function SalaireNetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData
        name="Calculateur Salaire Net Québec 2026"
        description="Calculateur d'impôt gratuit pour le Québec. Estimez votre revenu net après impôts fédéral, provincial, RRQ, RQAP et AE. Résultats instantanés avec déductions détaillées."
        url="https://qcfinance.ca/salaire-net-quebec"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 1250,
        }}
      />
      {children}
    </>
  )
}

