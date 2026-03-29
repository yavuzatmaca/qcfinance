import { Metadata } from 'next'
import VacationPayClient from './VacationPayClient'
import { Calendar, Percent, CheckCircle, Lightbulb, DollarSign } from 'lucide-react'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'
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
      <StructuredData
        name="Calculateur Paie de Vacances Québec"
        description="Calculez votre indemnité de vacances selon la loi québécoise. 4% pour moins de 3 ans, 6% pour 3 ans et plus. Planifiez vos vacances dès maintenant."
        url="/paie-vacances"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 420,
        }}
      />
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
        <div className="container mx-auto px-4">
          <VacationPayClient />

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />

          <ToolCrossLink variant="to-salary" />

          {/* Educational Section - V2 Gold Standard */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne le calcul ?
            </h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="w-8 h-8 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Pourcentage selon l'ancienneté</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <strong>4%</strong> de votre salaire brut pour moins de 3 ans de service continu, 
                  <strong> 6%</strong> pour 3 ans et plus. Ce pourcentage s'applique sur tous vos gains de l'année de référence.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <h3 className="font-bold text-gray-900">Année de référence</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  L'indemnité est calculée sur le salaire brut gagné pendant l'année de référence 
                  <strong> (du 1er mai au 30 avril)</strong>. Tous vos revenus de cette période comptent, 
                  incluant les heures supplémentaires et primes.
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                  <h3 className="font-bold text-gray-900">Droit garanti par la loi</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tous les employés ont droit à une indemnité de vacances selon la 
                  <strong> Loi sur les normes du travail du Québec</strong>. C'est un droit minimal 
                  que votre employeur doit respecter.
                </p>
              </div>
            </div>
          </section>

          {/* Responsive Ad 2 - After Educational Section */}
          <ResponsiveAd />

          {/* Pro Tips Section - V2 Gold Standard */}
          <section className="mt-8 lg:mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">
              Conseils pour optimiser votre indemnité de vacances
            </h2>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Vérifiez votre ancienneté</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Si vous approchez des 3 ans de service, attendez d'atteindre ce seuil avant de prendre vos vacances pour bénéficier du taux de 6%. 
                  La différence peut représenter plusieurs centaines de dollars.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Incluez les heures supplémentaires</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  L'indemnité est calculée sur votre salaire brut total, incluant les heures supplémentaires et les primes. 
                  Plus vous gagnez pendant l'année de référence, plus l'indemnité est élevée.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <span>Planifiez à l'avance</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Réservez vos voyages plusieurs mois à l'avance pour obtenir les meilleurs prix. 
                  Votre indemnité peut couvrir une bonne partie des coûts de vacances si vous planifiez bien.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Demandez le paiement anticipé</span>
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Vous pouvez demander à votre employeur de vous verser l'indemnité avant vos vacances pour mieux planifier vos dépenses. 
                  C'est votre droit selon la loi.
                </p>
              </div>
            </div>
          </section>

          {/* Responsive Ad 3 - After Pro Tips Section */}
          <ResponsiveAd />

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="CNESST - Normes du travail (Vacances annuelles)" 
              url="https://www.cnesst.gouv.qc.ca/fr/conditions-travail/conges/vacances-annuelles" 
              lastUpdate="Viguer 2026" 
            />
          </div>
        </div>
      </main>
    </>
  )
}

