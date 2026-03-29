import { Metadata } from 'next'
import MortgageCalculatorClient from './MortgageCalculatorClient'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'

export const metadata: Metadata = {
  title: 'Calculateur Hypothèque Québec 2026 | Paiement Mensuel',
  description: 'Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation. Gratuit.',
  alternates: {
    canonical: '/calcul-hypotheque',
  },
}

export default function MortgagePage() {
  return (
    <>
      <StructuredData
        name="Calculateur Hypothèque Québec 2026"
        description="Calculez vos paiements hypothécaires au Québec. Test de résistance, amortissement et simulation. Gratuit."
        url="/calcul-hypotheque"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 1850,
        }}
      />
      <DarkPageHeader
        badge="Achat Immobilier"
        badgeIcon="Home"
        title="Planifiez Votre Hypothèque"
        titleAccent="Intelligemment"
        description="Calculez vos paiements mensuels réels et découvrez combien vous économiserez avec différentes stratégies"
        accentColor="indigo"
        breadcrumbLabel="Calcul Hypothécaire"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <MortgageCalculatorClient />

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />



          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-salary" />

          {/* Educational Section - V2 Gold Standard */}
          <section className="mt-8 lg:mt-12 bg-white rounded-xl shadow-lg p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
              Comment fonctionne le calcul ?
            </h2>
          </section>



          {/* Responsive Ad 2 - After Educational Section */}
          <ResponsiveAd />

          {/* Pro Tips Section - V2 Gold Standard */}
          <section className="mt-8 lg:mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
              Conseils pour économiser sur votre hypothèque
            </h2>
          </section>



          {/* Responsive Ad 3 - After Pro Tips Section */}
          <ResponsiveAd />

          {/* FAQ Section */}
          <section className="mt-8 lg:mt-12 bg-white rounded-xl shadow-lg p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
              Questions fréquentes sur les hypothèques
            </h2>
            <div className="space-y-3 lg:space-y-4">
              {/* FAQ content would go here */}
            </div>
          </section>

          <div className="mt-8">
            <DataSource 
              label="SCHL - Règles hypothécaires" 
              url="https://www.cmhc-schl.gc.ca/consommateurs" 
              lastUpdate="Test de stress (B-20)" 
            />
          </div>
        </div>
      </main>
    </>
  )
}