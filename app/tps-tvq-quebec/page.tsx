import { Metadata } from 'next'
import SalesTaxClient from './SalesTaxClient'
import { ShoppingCart, FileText, CheckCircle, Receipt } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: 'TPS TVQ Québec 2026 | Calculateur Taxes de Vente',
  description: 'Calculez les taxes de vente au Québec (14,975%). Mode inversé inclus. Simple et rapide.',
  keywords: [
    'tps tvq québec',
    'calculateur taxes vente',
    'taxes québec 14.975%',
    'tps 5%',
    'tvq 9.975%',
    'calculateur tps tvq',
  ],
  alternates: {
    canonical: '/tps-tvq-quebec',
  },
  openGraph: {
    title: "TPS TVQ Québec 2026 - Calculateur Taxes de Vente",
    description: "Calculez les taxes de vente (14,975%). Mode inversé inclus. Résultat instantané.",
    url: '/tps-tvq-quebec',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TPS TVQ Québec 2026",
    description: "Calculez vos taxes de vente",
  },
}

export default function SalesTaxPage() {
  return (
    <>
      <StructuredData
        name="Calculateur TPS TVQ Québec"
        description="Calculez les taxes de vente au Québec (14,975%)"
        url="/tps-tvq-quebec"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 650,
        }}
      />
      
      <DarkPageHeader
        badge="Taxes de Vente"
        badgeIcon="Receipt"
        title="Calculez Vos Taxes"
        titleAccent="TPS/TVQ"
        description="Ajoutez ou extrayez les taxes de vente québécoises (14,975%) en un clic"
        accentColor="violet"
        breadcrumbLabel="TPS TVQ Québec"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 py-6 md:py-12 pb-0 md:pb-12">
      <div className="container mx-auto px-3 md:px-4 max-w-7xl">

        <div className="mb-6 md:mb-12">
          <SalesTaxClient />
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

        {/* Educational Section - V2 Gold Standard - Mobile Optimized */}
        <section className="mt-8 md:mt-12 bg-white rounded-2xl md:rounded-xl shadow-lg p-5 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Comment fonctionnent les taxes de vente ?
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">TPS (Fédérale) - 5%</h3>
              <p className="text-xs md:text-sm text-gray-600">
                La <strong>Taxe sur les produits et services</strong> est perçue par le gouvernement fédéral. 
                Elle s'applique sur la plupart des biens et services au Canada, sauf les produits de base.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <FileText className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">TVQ (Provinciale) - 9,975%</h3>
              <p className="text-xs md:text-sm text-gray-600">
                La <strong>Taxe de vente du Québec</strong> est perçue par le gouvernement provincial. 
                Elle s'applique sur le prix incluant la TPS, ce qui donne un taux combiné de 14,975%.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">Produits détaxés (0%)</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Certains biens sont <strong>exonérés de taxes</strong> : produits alimentaires de base, médicaments sur ordonnance, 
                services médicaux, loyers résidentiels, et services de garde d'enfants.
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

        {/* Pro Tips Section - V2 Gold Standard - Mobile Optimized */}
        <section className="mt-8 md:mt-12 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl md:rounded-xl shadow-lg p-5 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Conseils pour gérer les taxes de vente
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl md:rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                <span>Réclamez vos crédits de TPS/TVQ</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Si votre revenu est faible ou modeste, vous pourriez avoir droit au <strong>crédit de TPS/TVQ</strong> 
                (jusqu'à 467$ par année). Remplissez votre déclaration de revenus pour en bénéficier automatiquement.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                <span>Achetez des produits de base</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Les <strong>aliments de base</strong> (fruits, légumes, viande, pain, lait) ne sont pas taxés. 
                Privilégiez ces produits pour économiser sur vos achats d'épicerie.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                <span>Utilisez une carte avec cashback</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Récupérez jusqu'à <strong>5% de remise en argent</strong> sur vos achats avec une bonne carte de crédit. 
                Cela compense partiellement les taxes payées.
              </p>
            </div>

            <div className="bg-white rounded-xl md:rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-5 h-5 text-violet-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                </svg>
                <span>Gardez vos reçus pour les entreprises</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Si vous êtes travailleur autonome ou propriétaire d'entreprise, vous pouvez <strong>récupérer la TPS/TVQ</strong> 
                sur vos achats professionnels. Conservez tous vos reçus!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Mobile Optimized */}
        <section className="mt-8 md:mt-12 bg-white rounded-2xl md:rounded-xl shadow-lg p-5 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Questions fréquentes sur les taxes de vente
          </h2>
          <div className="space-y-3 md:space-y-4">
            <details className="group bg-gray-50 rounded-xl md:rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 md:p-6 hover:bg-gray-100 active:bg-gray-200 transition-colors">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 pr-3 md:pr-4">
                  Pourquoi les taxes au Québec sont-elles si élevées?
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
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-xs md:text-base text-gray-700 leading-relaxed">
                  Le Québec a un taux combiné de <strong>14,975%</strong> (TPS 5% + TVQ 9,975%), ce qui est effectivement plus élevé 
                  que certaines provinces comme l'Alberta (5% seulement). Ces taxes financent les services publics québécois comme 
                  les garderies subventionnées à 9,10$/jour, l'assurance médicaments, et les services de santé. Comparé à d'autres 
                  provinces avec TVH, le Québec est similaire à l'Ontario (13%) et moins élevé que les Maritimes (15%).
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl md:rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 md:p-6 hover:bg-gray-100 active:bg-gray-200 transition-colors">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 pr-3 md:pr-4">
                  Quels produits sont exempts de taxes au Québec?
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
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-xs md:text-base text-gray-700 leading-relaxed mb-3">
                  Plusieurs produits et services essentiels sont <strong>détaxés (0%)</strong> au Québec :
                </p>
                <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2 text-xs md:text-base text-gray-700">
                  <li><strong>Aliments de base</strong> : fruits, légumes, viande, poisson, pain, lait, œufs, céréales</li>
                  <li><strong>Médicaments sur ordonnance</strong> et certains produits de santé</li>
                  <li><strong>Services médicaux et dentaires</strong></li>
                  <li><strong>Loyers résidentiels</strong> (mais pas les hôtels)</li>
                  <li><strong>Services de garde d'enfants</strong> et frais de scolarité</li>
                  <li><strong>Services financiers</strong> (intérêts, assurances)</li>
                </ul>
                <p className="text-xs md:text-base text-gray-700 leading-relaxed mt-3">
                  Par contre, les aliments préparés, restaurants, alcool, et produits transformés sont taxés.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl md:rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 md:p-6 hover:bg-gray-100 active:bg-gray-200 transition-colors">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 pr-3 md:pr-4">
                  Comment récupérer la TPS/TVQ pour mon entreprise?
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
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-xs md:text-base text-gray-700 leading-relaxed">
                  Si vous êtes inscrit aux fichiers de la TPS et de la TVQ (obligatoire si vos revenus dépassent 30 000$/an), 
                  vous pouvez <strong>récupérer les taxes payées</strong> sur vos achats professionnels via les Crédits de Taxe 
                  sur les Intrants (CTI). Conservez tous vos reçus et factures, puis déclarez ces montants dans vos rapports 
                  de taxes (mensuels, trimestriels ou annuels selon votre chiffre d'affaires). Vous recevrez un remboursement 
                  ou réduirez vos taxes à payer. C'est un avantage majeur d'être travailleur autonome ou propriétaire d'entreprise.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl md:rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-4 md:p-6 hover:bg-gray-100 active:bg-gray-200 transition-colors">
                <h3 className="text-sm md:text-lg font-bold text-gray-900 pr-3 md:pr-4">
                  Qu'est-ce que le crédit de TPS/TVQ pour particuliers?
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
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-xs md:text-base text-gray-700 leading-relaxed">
                  Le crédit de TPS/TVQ est un <strong>remboursement trimestriel</strong> versé aux personnes et familles à revenu 
                  faible ou modeste pour compenser les taxes payées sur les biens essentiels. En 2026, le montant maximum est 
                  d'environ <strong>467$ par adulte</strong> et 123$ par enfant par année. Vous n'avez rien à faire - si vous êtes 
                  admissible, le crédit est calculé automatiquement lorsque vous produisez votre déclaration de revenus et versé 
                  directement dans votre compte bancaire chaque trimestre (janvier, avril, juillet, octobre).
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Data Source - Mobile Optimized */}
        <div className="mt-6 md:mt-8 mb-20 md:mb-0">
          <DataSource 
            label="Revenu Québec - TVQ et TPS/TVH" 
            url="https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/" 
            lastUpdate="Taux 2026" 
          />
        </div>
      </div>
    </main>
    </>
  )
}

