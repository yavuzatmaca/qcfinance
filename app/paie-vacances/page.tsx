import { Metadata } from 'next'
import VacationPayClient from './VacationPayClient'
import { Calendar, Percent, CheckCircle } from 'lucide-react'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

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

          {/* Pro Tips Section - V2 Gold Standard */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour optimiser votre indemnité de vacances
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Vérifiez votre ancienneté
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous approchez des 3 ans de service, attendez d'atteindre ce seuil avant de prendre vos vacances pour bénéficier du taux de 6%. 
                  La différence peut représenter plusieurs centaines de dollars.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Incluez les heures supplémentaires
                </h3>
                <p className="text-sm text-gray-600">
                  L'indemnité est calculée sur votre salaire brut total, incluant les heures supplémentaires et les primes. 
                  Plus vous gagnez pendant l'année de référence, plus l'indemnité est élevée.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Planifiez à l'avance
                </h3>
                <p className="text-sm text-gray-600">
                  Réservez vos voyages plusieurs mois à l'avance pour obtenir les meilleurs prix. 
                  Votre indemnité peut couvrir une bonne partie des coûts de vacances si vous planifiez bien.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  Demandez le paiement anticipé
                </h3>
                <p className="text-sm text-gray-600">
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

