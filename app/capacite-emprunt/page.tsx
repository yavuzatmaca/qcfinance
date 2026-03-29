import { Metadata } from 'next'
import AffordabilityClient from './AffordabilityClient'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'

export const metadata: Metadata = {
  title: 'Calculateur Capacité d\'Emprunt Québec 2026 | Hypothèque',
  description: 'Calculez votre capacité d\'emprunt hypothécaire au Québec. Test de résistance B-20, ratio d\'endettement et simulation. Gratuit.',
  keywords: [
    'capacité emprunt québec',
    'calculateur hypothèque',
    'test résistance b-20',
    'ratio endettement',
    'prêt hypothécaire',
    'achat maison québec',
  ],
  alternates: {
    canonical: '/capacite-emprunt',
  },
  openGraph: {
    title: "Calculateur Capacité d'Emprunt Québec 2026",
    description: "Calculez votre capacité d'emprunt hypothécaire. Test de résistance B-20 inclus.",
    url: '/capacite-emprunt',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Capacité d'Emprunt Québec",
    description: "Découvrez combien vous pouvez emprunter",
  },
}

export default function AffordabilityPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Capacité d'Emprunt Québec 2026"
        description="Calculez votre capacité d'emprunt hypothécaire au Québec. Test de résistance B-20, ratio d'endettement et simulation. Gratuit."
        url="/capacite-emprunt"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 920,
        }}
      />
      <DarkPageHeader
        badge="Achat Immobilier"
        badgeIcon="DollarSign"
        title="Votre Capacité d'"
        titleAccent="Emprunt"
        description="Découvrez le montant maximal que vous pouvez emprunter selon les critères bancaires et le test de résistance B-20"
        accentColor="emerald"
        breadcrumbLabel="Capacité d'Emprunt"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <AffordabilityClient />

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />



          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-mortgage" />

          {/* Responsive Ad 2 - After Cross-Link */}
          <ResponsiveAd />

          <div className="mt-8">
            <DataSource 
              label="SCHL - Règles hypothécaires" 
              url="https://www.cmhc-schl.gc.ca/consommateurs" 
              lastUpdate="Test de stress (B-20)" 
            />
          </div>

          {/* Responsive Ad 3 - After DataSource */}
          <ResponsiveAd />
        </div>
      </main>
    </>
  )
}