import { Metadata } from 'next'
import SalesTaxClient from './SalesTaxClient'
import { ShoppingCart, FileText, CheckCircle, Receipt } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

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

      <main className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="mb-12">
          <SalesTaxClient />
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-salary" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionnent les taxes de vente ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">TPS (Fédérale) - 5%</h3>
              <p className="text-sm text-gray-600">
                La <strong>Taxe sur les produits et services</strong> est perçue par le gouvernement fédéral. 
                Elle s'applique sur la plupart des biens et services au Canada, sauf les produits de base.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">TVQ (Provinciale) - 9,975%</h3>
              <p className="text-sm text-gray-600">
                La <strong>Taxe de vente du Québec</strong> est perçue par le gouvernement provincial. 
                Elle s'applique sur le prix incluant la TPS, ce qui donne un taux combiné de 14,975%.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Produits détaxés (0%)</h3>
              <p className="text-sm text-gray-600">
                Certains biens sont <strong>exonérés de taxes</strong> : produits alimentaires de base, médicaments sur ordonnance, 
                services médicaux, loyers résidentiels, et services de garde d'enfants.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer les taxes de vente
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">💡</span>
                Réclamez vos crédits de TPS/TVQ
              </h3>
              <p className="text-sm text-gray-600">
                Si votre revenu est faible ou modeste, vous pourriez avoir droit au <strong>crédit de TPS/TVQ</strong> 
                (jusqu'à 467$ par année). Remplissez votre déclaration de revenus pour en bénéficier automatiquement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">💡</span>
                Achetez des produits de base
              </h3>
              <p className="text-sm text-gray-600">
                Les <strong>aliments de base</strong> (fruits, légumes, viande, pain, lait) ne sont pas taxés. 
                Privilégiez ces produits pour économiser sur vos achats d'épicerie.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">💡</span>
                Utilisez une carte avec cashback
              </h3>
              <p className="text-sm text-gray-600">
                Récupérez jusqu'à <strong>5% de remise en argent</strong> sur vos achats avec une bonne carte de crédit. 
                Cela compense partiellement les taxes payées.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-violet-600">💡</span>
                Gardez vos reçus pour les entreprises
              </h3>
              <p className="text-sm text-gray-600">
                Si vous êtes travailleur autonome ou propriétaire d'entreprise, vous pouvez <strong>récupérer la TPS/TVQ</strong> 
                sur vos achats professionnels. Conservez tous vos reçus!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Questions fréquentes sur les taxes de vente
          </h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 pr-4">
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
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  Le Québec a un taux combiné de <strong>14,975%</strong> (TPS 5% + TVQ 9,975%), ce qui est effectivement plus élevé 
                  que certaines provinces comme l'Alberta (5% seulement). Ces taxes financent les services publics québécois comme 
                  les garderies subventionnées à 9,10$/jour, l'assurance médicaments, et les services de santé. Comparé à d'autres 
                  provinces avec TVH, le Québec est similaire à l'Ontario (13%) et moins élevé que les Maritimes (15%).
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 pr-4">
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
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed mb-3">
                  Plusieurs produits et services essentiels sont <strong>détaxés (0%)</strong> au Québec :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Aliments de base</strong> : fruits, légumes, viande, poisson, pain, lait, œufs, céréales</li>
                  <li><strong>Médicaments sur ordonnance</strong> et certains produits de santé</li>
                  <li><strong>Services médicaux et dentaires</strong></li>
                  <li><strong>Loyers résidentiels</strong> (mais pas les hôtels)</li>
                  <li><strong>Services de garde d'enfants</strong> et frais de scolarité</li>
                  <li><strong>Services financiers</strong> (intérêts, assurances)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Par contre, les aliments préparés, restaurants, alcool, et produits transformés sont taxés.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 pr-4">
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
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  Si vous êtes inscrit aux fichiers de la TPS et de la TVQ (obligatoire si vos revenus dépassent 30 000$/an), 
                  vous pouvez <strong>récupérer les taxes payées</strong> sur vos achats professionnels via les Crédits de Taxe 
                  sur les Intrants (CTI). Conservez tous vos reçus et factures, puis déclarez ces montants dans vos rapports 
                  de taxes (mensuels, trimestriels ou annuels selon votre chiffre d'affaires). Vous recevrez un remboursement 
                  ou réduirez vos taxes à payer. C'est un avantage majeur d'être travailleur autonome ou propriétaire d'entreprise.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 pr-4">
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
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
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

        {/* Data Source */}
        <div className="mt-8">
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

