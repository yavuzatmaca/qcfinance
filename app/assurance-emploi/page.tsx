import { Metadata } from 'next'
import EICalculatorClient from './EICalculatorClient'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import { Shield } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

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

        {/* AdSense - Après calculator */}
        <div className="flex justify-center py-6 md:py-8">
          <div className="w-full max-w-3xl">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" adFormat="fluid" />
          </div>
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-salary" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Règle des 55%</h3>
              <p className="text-sm text-gray-600">
                Vous recevez <strong>55%</strong> de votre salaire hebdomadaire moyen, calculé sur vos meilleures semaines de travail des 52 dernières semaines
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Plafond des gains assurables</h3>
              <p className="text-sm text-gray-600">
                Maximum de <strong>63 200 $</strong> par année (2026). Au-delà de ce montant, vos gains ne sont pas assurables pour l'AE
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Durée des prestations</h3>
              <p className="text-sm text-gray-600">
                Entre <strong>14 et 45 semaines</strong> selon votre région et le nombre d'heures travaillées. Le taux de chômage local influence la durée
              </p>
            </div>
          </div>
        </section>

        {/* AdSense - Après section éducative (Desktop Only) */}
        <div className="hidden lg:flex justify-center py-6 md:py-8">
          <div className="w-full max-w-3xl">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

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

        {/* Data Source */}
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

