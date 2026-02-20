import { Metadata } from 'next'
import FamilyBenefitsClient from './FamilyBenefitsClient'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DarkPageHeader from '@/components/DarkPageHeader'

export const metadata: Metadata = {
  title: "Allocations Familiales Québec 2026 | Calculateur ACE",
  description: "Calculez vos allocations familiales (ACE + Soutien Québec). Estimation gratuite et instantanée. Non-imposable.",
  keywords: [
    'allocations familiales québec',
    'ACE allocation canadienne enfants',
    'soutien aux enfants québec',
    'calculateur allocations 2026',
    'prestations familiales',
    'aide financière enfants',
  ],
  alternates: {
    canonical: '/allocations-familiales',
  },
  openGraph: {
    title: "Calculateur Allocations Familiales Québec 2026 (ACE + Soutien)",
    description: "Estimez vos allocations pour enfants en 2026. ACE fédérale + Soutien aux enfants du Québec. Argent non-imposable.",
    url: '/allocations-familiales',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Allocations Familiales Québec 2026",
    description: "Estimez vos allocations pour enfants (ACE + Soutien Québec)",
  },
}

export default function FamilyBenefitsPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Allocations Familiales Québec 2026"
        description="Calculateur gratuit pour estimer vos allocations familiales au Québec. Combine l'Allocation canadienne pour enfants (ACE) et le Soutien aux enfants du Québec. Calcul basé sur votre revenu familial et le nombre d'enfants."
        url="https://qcfinance.ca/allocations-familiales"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.7,
          ratingCount: 890,
        }}
      />
      <main className="min-h-screen bg-white">
        <DarkPageHeader
          badge="Aide Familiale"
          badgeIcon="Baby"
          title="Calculez Vos Allocations"
          titleAccent="Familiales"
          description="Découvrez combien vous recevrez chaque mois pour vos enfants avec l'ACE et le Soutien Québec"
          accentColor="pink"
          breadcrumbLabel="Allocations Familiales"
          showLastUpdated={true}
        />
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <FamilyBenefitsClient />

          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-salary" />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi utiliser ce calculateur ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Estimation rapide</h3>
                <p className="text-sm text-gray-600">
                  Découvrez instantanément combien vous recevrez pour vos enfants
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Non-imposable</h3>
                <p className="text-sm text-gray-600">
                  Ces allocations ne sont pas imposables et n'affectent pas votre déclaration
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Deux programmes</h3>
                <p className="text-sm text-gray-600">
                  Combine l'ACE fédérale et le Soutien aux enfants du Québec
                </p>
              </div>
            </div>
          </section>

          {/* Guide Section */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Guide des allocations familiales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">🇨🇦</span>
                  Allocation canadienne pour enfants (ACE)
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Programme fédéral qui verse jusqu'à 648$/mois par enfant de moins de 6 ans et 547$/mois pour les 6-17 ans.
                </p>
                <p className="text-sm text-gray-600">
                  Le montant diminue progressivement si votre revenu familial dépasse 36 502$.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">⚜️</span>
                  Soutien aux enfants du Québec
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Programme provincial qui verse jusqu'à 240$/mois par enfant, peu importe l'âge.
                </p>
                <p className="text-sm text-gray-600">
                  Le montant diminue si votre revenu familial dépasse 57 000$.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">👨‍👩‍👧</span>
                  Garde partagée
                </h3>
                <p className="text-sm text-gray-600">
                  Si vous avez la garde partagée (50%), chaque parent reçoit 50% des allocations. Notre calculateur ajuste automatiquement les montants.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">🎓</span>
                  REEE et subventions
                </h3>
                <p className="text-sm text-gray-600">
                  Utilisez vos allocations pour cotiser à un REEE et obtenez 30% de subventions gouvernementales supplémentaires (SCEE + IQEE).
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour maximiser vos allocations
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Inscrivez-vous dès la naissance</h3>
                  <p className="text-sm text-gray-600">
                    Inscrivez votre enfant à l'ACE et au Soutien aux enfants dès sa naissance pour ne rien manquer. Les paiements commencent automatiquement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Produisez vos déclarations à temps</h3>
                  <p className="text-sm text-gray-600">
                    Vous devez produire vos déclarations de revenus chaque année pour continuer à recevoir vos allocations, même si vous n'avez aucun revenu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Signalez les changements</h3>
                  <p className="text-sm text-gray-600">
                    Informez l'ARC et Retraite Québec de tout changement dans votre situation familiale (naissance, séparation, garde partagée, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Ouvrez un REEE</h3>
                  <p className="text-sm text-gray-600">
                    Investissez vos allocations dans un REEE pour profiter de 30% de subventions additionnelles (jusqu'à 1 200$/an par enfant).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <SEOContent
            title="Comprendre vos allocations en 2026"
            intro="Les allocations familiales au Québec combinent deux programmes gouvernementaux distincts : l'Allocation canadienne pour enfants (ACE) du gouvernement fédéral et le Soutien aux enfants du gouvernement du Québec. Ces prestations sont conçues pour aider les familles à assumer les coûts liés à l'éducation et aux soins des enfants."
            faqs={[
              {
                question: "Quand les versements sont-ils effectués?",
                answer: "Les paiements de l'Allocation canadienne pour enfants (ACE) sont versés le 20 de chaque mois. Le Soutien aux enfants du Québec est versé le 1er jour ouvrable de chaque mois. Si ces dates tombent un weekend ou un jour férié, le paiement est effectué le jour ouvrable précédent. Les montants sont déposés directement dans votre compte bancaire par dépôt direct."
              },
              {
                question: "Est-ce que c'est imposable?",
                answer: "Non, les allocations familiales ne sont pas imposables. Ni l'Allocation canadienne pour enfants (ACE) ni le Soutien aux enfants du Québec ne sont considérés comme un revenu imposable. Vous n'avez pas à les déclarer dans votre déclaration de revenus et ils n'affectent pas votre taux d'imposition. C'est de l'argent libre d'impôt que vous pouvez utiliser comme bon vous semble pour les besoins de vos enfants."
              },
              {
                question: "Comment faire une demande d'allocations familiales?",
                answer: "Pour l'ACE fédérale, vous devez faire une demande auprès de l'Agence du revenu du Canada (ARC) dès la naissance de votre enfant. Vous pouvez le faire en ligne via Mon dossier, par la poste, ou en personne. Pour le Soutien aux enfants du Québec, la demande se fait automatiquement lorsque vous inscrivez la naissance de votre enfant au Directeur de l'état civil. Assurez-vous de faire ces démarches rapidement après la naissance pour ne pas perdre de paiements."
              },
              {
                question: "Que se passe-t-il en cas de garde partagée?",
                answer: "En cas de garde partagée (50/50), chaque parent reçoit 50% des allocations auxquelles l'enfant donne droit. Les deux parents doivent faire une demande séparée et indiquer qu'il s'agit d'une garde partagée. Le calcul des montants est basé sur le revenu familial de chaque parent dans leur foyer respectif. Si la garde n'est pas exactement 50/50, c'est le parent qui a la garde principale (plus de 50% du temps) qui reçoit 100% des allocations."
              },
              {
                question: "Les allocations changent-elles selon mon revenu?",
                answer: "Oui, les montants des allocations sont calculés en fonction de votre revenu familial net ajusté de l'année précédente. Plus votre revenu est élevé, moins vous recevrez d'allocations. L'ACE commence à diminuer si votre revenu familial dépasse environ 36 502$ par année. Le Soutien aux enfants du Québec commence à diminuer si votre revenu dépasse environ 57 000$. Les montants sont recalculés automatiquement chaque juillet en fonction de votre déclaration de revenus de l'année précédente."
              },
              {
                question: "Puis-je utiliser les allocations pour un REEE?",
                answer: "Absolument! C'est même fortement recommandé. En investissant vos allocations familiales dans un Régime enregistré d'épargne-études (REEE), vous pouvez bénéficier de subventions gouvernementales supplémentaires. Le gouvernement fédéral ajoute 20% via la Subvention canadienne pour l'épargne-études (SCEE) et le Québec ajoute 10% via l'Incitatif québécois à l'épargne-études (IQEE). Cela représente jusqu'à 30% de subventions gratuites sur vos cotisations, jusqu'à un maximum de 1 200$ par année par enfant."
              }
            ]}
          />
        </div>
      </main>
    </>
  )
}

