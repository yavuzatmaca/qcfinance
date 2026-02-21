import { Metadata } from 'next'
import MortgageCalculatorClient from './MortgageCalculatorClient'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import { Home, TrendingUp, DollarSign } from 'lucide-react'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

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

        {/* Native In-Feed Ad - Mobile */}
        <div className="flex justify-center py-5 lg:hidden">
          <div className="w-full">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" adFormat="fluid" />
          </div>
        </div>

        {/* Desktop Ad */}
        <div className="hidden lg:flex justify-center py-6 lg:py-8">
          <div className="w-full max-w-3xl">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-salary" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-8 lg:mt-12 bg-white rounded-xl shadow-lg p-5 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                <DollarSign className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Principal vs Intérêt</h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Au début, la majorité de votre paiement va vers les <strong>intérêts</strong>. 
                Avec le temps, une plus grande partie rembourse le <strong>capital</strong> (principal). 
                C'est pourquoi l'amortissement accéléré économise tant d'argent.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Test de résistance (+2%)</h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Les banques vérifient si vous pouvez payer avec un taux <strong>2% plus élevé</strong>. 
                Cela garantit que vous pourrez toujours payer si les taux augmentent lors du renouvellement.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                <Home className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Amortissement</h3>
              <p className="text-xs lg:text-sm text-gray-600">
                La période d'amortissement est le temps total pour rembourser le prêt. 
                <strong>25 ans</strong> est standard, mais <strong>15-20 ans</strong> économise beaucoup d'intérêts.
              </p>
            </div>
          </div>
        </section>

        {/* Native In-Feed Ad - Mobile */}
        <div className="flex justify-center py-5 lg:hidden">
          <div className="w-full">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" adFormat="fluid" />
          </div>
        </div>

        {/* Desktop Ad */}
        <div className="hidden lg:flex justify-center py-6 lg:py-8">
          <div className="w-full max-w-3xl">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-8 lg:mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-5 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
            Conseils pour économiser sur votre hypothèque
          </h2>
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white rounded-lg p-4 lg:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                Payer aux 2 semaines accéléré réduit l'amortissement
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                En payant aux 2 semaines accéléré, vous faites <strong>26 paiements par an</strong> (équivalent à 13 mois). 
                Cela peut réduire votre amortissement de <strong>3-5 ans</strong> et économiser des dizaines de milliers en intérêts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 lg:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                Augmentez votre mise de fonds à 20%
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Avec une mise de fonds de <strong>20% ou plus</strong>, vous évitez l'assurance prêt hypothécaire (SCHL) 
                qui peut coûter 2-4% du montant emprunté. Cela économise des milliers de dollars.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 lg:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                Magasinez votre taux d'intérêt
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                Une différence de <strong>0,25%</strong> sur le taux peut vous faire économiser des milliers sur 25 ans. 
                Comparez les offres de plusieurs prêteurs et négociez avec votre banque.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 lg:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                Profitez des paiements anticipés
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                La plupart des hypothèques permettent de payer jusqu'à <strong>15-20% du capital</strong> par année sans pénalité. 
                Utilisez vos bonus ou remboursements d'impôt pour réduire votre dette plus rapidement.
              </p>
            </div>
          </div>
        </section>

        {/* Ad After Pro Tips - Mobile */}
        <div className="flex justify-center py-5 lg:hidden">
          <div className="w-full">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" adFormat="fluid" />
          </div>
        </div>

        {/* Ad After Pro Tips - Desktop */}
        <div className="hidden lg:flex justify-center py-6 lg:py-8">
          <div className="w-full max-w-3xl">
            <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-8 lg:mt-12 bg-white rounded-xl shadow-lg p-5 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
            Questions fréquentes sur les hypothèques
          </h2>
          <div className="space-y-3 lg:space-y-4">
            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 lg:p-6 hover:bg-gray-100 transition-colors touch-manipulation min-h-[44px]">
                <h3 className="text-sm lg:text-lg font-bold text-gray-900 pr-4">
                  Quel est le meilleur taux hypothécaire au Québec en 2026?
                </h3>
                <svg 
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                  Les meilleurs taux hypothécaires au Québec en 2026 varient entre <strong>4,5% et 5,5%</strong> pour un terme de 5 ans fixe. 
                  Les taux variables sont généralement 0,5-1% plus bas. Pour obtenir le meilleur taux, comparez plusieurs prêteurs, 
                  améliorez votre cote de crédit (700+), et négociez. Les courtiers hypothécaires peuvent souvent obtenir de meilleurs 
                  taux que votre banque directement.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 lg:p-6 hover:bg-gray-100 transition-colors touch-manipulation min-h-[44px]">
                <h3 className="text-sm lg:text-lg font-bold text-gray-900 pr-4">
                  Combien de mise de fonds faut-il pour acheter une maison au Québec?
                </h3>
                <svg 
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                  Le minimum légal est <strong>5% pour les premiers 500 000$</strong> et 10% pour le montant excédant 500 000$. 
                  Cependant, avec moins de 20% de mise de fonds, vous devez payer l'assurance prêt hypothécaire (SCHL) qui coûte 
                  2-4% du montant emprunté. Pour une maison de 400 000$, visez une mise de fonds de 80 000$ (20%) pour éviter 
                  l'assurance et économiser environ 8 000-12 000$.
                </p>
              </div>
            </details>

            {/* Ad in Middle of FAQ - Mobile Only */}
            <div className="flex justify-center lg:hidden">
              <div className="w-full">
                <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
                <AdSenseAd adSlot="7290777867" adFormat="fluid" />
              </div>
            </div>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 lg:p-6 hover:bg-gray-100 transition-colors touch-manipulation min-h-[44px]">
                <h3 className="text-sm lg:text-lg font-bold text-gray-900 pr-4">
                  Qu'est-ce que le test de résistance hypothécaire?
                </h3>
                <svg 
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                  Le test de résistance oblige les banques à vérifier si vous pouvez payer votre hypothèque avec un taux 
                  <strong> 2% plus élevé</strong> que votre taux contractuel. Par exemple, si votre taux est 5%, la banque calcule 
                  vos paiements à 7% pour s'assurer que vous pouvez toujours payer si les taux augmentent au renouvellement. 
                  Cela réduit votre capacité d'emprunt d'environ 15-20% mais vous protège contre les hausses de taux.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 lg:p-6 hover:bg-gray-100 transition-colors touch-manipulation min-h-[44px]">
                <h3 className="text-sm lg:text-lg font-bold text-gray-900 pr-4">
                  Vaut-il mieux choisir un taux fixe ou variable?
                </h3>
                <svg 
                  className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </summary>
              <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                  Le <strong>taux fixe</strong> offre la stabilité et la prévisibilité - votre paiement ne change jamais pendant le terme. 
                  C'est idéal si vous avez un budget serré ou si les taux sont bas. Le <strong>taux variable</strong> est généralement 
                  0,5-1% plus bas et peut vous faire économiser si les taux baissent, mais comporte plus de risque. Historiquement, 
                  le variable a été plus avantageux 60-70% du temps, mais en 2026 avec des taux élevés, le fixe offre plus de sécurité.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Data Source */}
        <div className="mt-8">
          <DataSource source="bankOfCanada" />
        </div>
      </div>
      </main>
    </>
  )
}
