import { Metadata } from 'next'
import EICalculatorClient from './EICalculatorClient'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'

export const metadata: Metadata = {
  title: 'Calculateur Assurance-Emploi Québec 2026 - Prestations AE (Chômage)',
  description: 'Calculez vos prestations d\'assurance-emploi (AE) au Québec. Estimation basée sur 55% de votre salaire (max 668$/semaine). Taux fédéraux 2026. Gratuit.',
  keywords: [
    'assurance-emploi québec',
    'prestations ae 2026',
    'calculateur chômage',
    'ae québec',
    'prestations chômage',
    'service canada',
    'assurance emploi calcul',
  ],
  alternates: {
    canonical: '/assurance-emploi',
  },
  openGraph: {
    title: "Calculateur Assurance-Emploi Québec 2026 - Prestations AE",
    description: "Calculez vos prestations d'assurance-emploi. 55% de votre salaire, max 668$/semaine. Résultat instantané.",
    url: '/assurance-emploi',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Assurance-Emploi Québec 2026",
    description: "Calculez vos prestations AE instantanément",
  },
}

export default function EIPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Assurance-Emploi Québec 2026"
        description="Calculez vos prestations d'assurance-emploi (AE) au Québec. Estimation basée sur 55% de votre salaire (max 668$/semaine). Taux fédéraux 2026. Gratuit."
        url="/assurance-emploi"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.4,
          ratingCount: 380,
        }}
      />
      <DarkPageHeader
        badge="Protection Revenu"
        badgeIcon="Shield"
        title="Vos Prestations d'"
        titleAccent="Assurance-Emploi"
        description="Calculez rapidement vos versements hebdomadaires et sécurisez votre budget pendant votre recherche d'emploi"
        accentColor="blue"
        breadcrumbLabel="Assurance-Emploi"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <EICalculatorClient />

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />


          
          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-salary" />

          {/* Educational Section - V2 Gold Standard */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne le calcul ?
            </h2>
          </section>

          {/* Responsive Ad 2 - After Educational Section */}
          <ResponsiveAd />

          {/* Pro Tips Section - V2 Gold Standard */}
          <section className="mt-8 lg:mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">
              Conseils pour optimiser vos prestations
            </h2>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Déclarez vos revenus à temps</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Remplissez vos rapports bimensuels à temps pour éviter les retards de paiement. Déclarez tous vos revenus, même minimes, pour rester conforme.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Conservez vos relevés d'emploi</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Gardez tous vos relevés d'emploi (RE) des 52 dernières semaines. Service Canada en a besoin pour calculer votre prestation exacte.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Demandez le Programme d'aide au remboursement</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Si vous avez des difficultés financières, le PAR peut réduire ou suspendre temporairement le remboursement de vos prestations excédentaires.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Cherchez activement un emploi</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Vous devez prouver que vous cherchez activement du travail. Gardez un registre de vos démarches (candidatures, entrevues) en cas de vérification.
                </p>
              </div>
            </div>

          </section>

          {/* Responsive Ad 3 - After Pro Tips Section */}
          <ResponsiveAd />

          <div className="mt-8">
            <DataSource 
              label="Gouvernement du Canada - Assurance-emploi" 
              url="https://www.canada.ca/fr/services/prestations/ae.html" 
              lastUpdate="Maximums 2026" 
            />
          </div>

          {/* Related Tools */}
          <RelatedTools currentTool="/assurance-emploi" currentCategory="tax" />
        </div>
      </main>
    </>
  )
}