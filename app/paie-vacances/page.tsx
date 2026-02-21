import { Metadata } from 'next'
import VacationPayClient from './VacationPayClient'
import { Calendar, Percent, CheckCircle } from 'lucide-react'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: "Calculateur Paie de Vacances Québec - 4% ou 6% Indemnité",
  description: "Calculez votre indemnité de vacances selon la loi québécoise. 4% pour moins de 3 ans, 6% pour 3 ans et plus. Planifiez vos vacances dès maintenant.",
  keywords: [
    'paie de vacances québec',
    'indemnité vacances',
    'calculateur vacances 4%',
    'vacances 6%',
    'loi normes travail',
    'calcul vacances québec',
  ],
  alternates: {
    canonical: '/paie-vacances',
  },
  openGraph: {
    title: "Calculateur Paie de Vacances Québec - 4% ou 6%",
    description: "Calculez votre indemnité de vacances selon la loi. 4% ou 6% selon votre ancienneté. Gratuit.",
    url: '/paie-vacances',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Paie de Vacances Québec",
    description: "Calculez votre indemnité de vacances",
  },
}

export default function VacationPayPage() {
  return (
    <>
      <DarkPageHeader
        badge="Temps de Repos"
        badgeIcon="Calendar"
        title="Calculez Votre Paie de"
        titleAccent="Vacances"
        description="Découvrez combien vous recevrez pour vos vacances selon la loi québécoise (4% ou 6%)"
        accentColor="blue"
        breadcrumbLabel="Paie de Vacances"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          <div className="mb-12">
            <VacationPayClient />
          </div>

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
                  <Percent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pourcentage selon l'ancienneté</h3>
                <p className="text-sm text-gray-600">
                  <strong>4%</strong> de votre salaire brut pour moins de 3 ans de service continu, 
                  <strong> 6%</strong> pour 3 ans et plus. Ce pourcentage s'applique sur tous vos gains de l'année de référence.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Année de référence</h3>
                <p className="text-sm text-gray-600">
                  L'indemnité est calculée sur le salaire brut gagné pendant <strong>l'année de référence</strong> (du 1er mai au 30 avril). 
                  Tous vos revenus de cette période comptent, incluant les heures supplémentaires et primes.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Droit garanti par la loi</h3>
                <p className="text-sm text-gray-600">
                  Tous les employés ont droit à une indemnité de vacances selon la <strong>Loi sur les normes du travail du Québec</strong>. 
                  C'est un droit minimal que votre employeur doit respecter.
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
              Conseils pour optimiser votre indemnité de vacances
            </h2>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Vérifiez votre ancienneté</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Si vous approchez des 3 ans de service, attendez d'atteindre ce seuil avant de prendre vos vacances pour bénéficier du taux de 6%. 
                  La différence peut représenter plusieurs centaines de dollars.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Incluez les heures supplémentaires</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  L'indemnité est calculée sur votre salaire brut total, incluant les heures supplémentaires et les primes. 
                  Plus vous gagnez pendant l'année de référence, plus l'indemnité est élevée.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Planifiez à l'avance</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Réservez vos voyages plusieurs mois à l'avance pour obtenir les meilleurs prix. 
                  Votre indemnité peut couvrir une bonne partie des coûts de vacances si vous planifiez bien.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                  <span>Demandez le paiement anticipé</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Vous pouvez demander à votre employeur de vous verser l'indemnité avant vos vacances pour mieux planifier vos dépenses. 
                  C'est votre droit selon la loi.
                </p>
              </div>
            </div>
          </section>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="CNESST - Normes du travail (Vacances annuelles)" 
              url="https://www.cnesst.gouv.qc.ca/fr/conditions-travail/conges/vacances-annuelles" 
              lastUpdate="Viguer 2026" 
            />
          </div>

          {/* Related Tools */}
          <RelatedTools currentTool="/paie-vacances" currentCategory="tax" />
        </div>
      </main>
    </>
  )
}

