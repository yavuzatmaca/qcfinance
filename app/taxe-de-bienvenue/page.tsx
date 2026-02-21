import { Metadata } from 'next'
import TransferTaxCalculator from '@/components/TransferTaxCalculator'
import { Home, MapPin, Calculator } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: 'Taxe de Bienvenue Québec 2026 | Calculateur Gratuit',
  description: 'Calculez les droits de mutation pour votre achat immobilier. Taux officiels 2026. Gratuit.',
  keywords: [
    'taxe de bienvenue québec',
    'droits de mutation',
    'calculateur taxe bienvenue',
    'achat maison québec',
    'taxe transfert immobilier',
    'taxe bienvenue 2026',
  ],
  alternates: {
    canonical: '/taxe-de-bienvenue',
  },
  openGraph: {
    title: "Taxe de Bienvenue Québec 2026 - Calculateur Gratuit",
    description: "Calculez les droits de mutation pour votre achat immobilier. Taux officiels 2026.",
    url: '/taxe-de-bienvenue',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Taxe de Bienvenue Québec 2026",
    description: "Calculez vos droits de mutation",
  },
}

export default function TransferTaxPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Taxe de Bienvenue Québec"
        description="Calculez les droits de mutation pour votre achat immobilier"
        url="/taxe-de-bienvenue"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.8,
          ratingCount: 1240,
        }}
      />
      
      <DarkPageHeader
        badge="Droits de Mutation"
        badgeIcon="Home"
        title="Calculateur de Taxe de"
        titleAccent="Bienvenue 2026"
        description="Calculez les droits de mutation pour votre achat immobilier au Québec"
        accentColor="purple"
        breadcrumbLabel="Taxe de Bienvenue"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        <div className="mb-12">
          <TransferTaxCalculator />
        </div>

        {/* AdSense - Après calculator */}
        <div className="flex justify-center py-6 md:py-8">
          <div className="w-full max-w-3xl">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-mortgage" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Tranches progressives</h3>
              <p className="text-sm text-gray-600">
                La taxe est calculée par <strong>tranches progressives</strong> selon le prix d'achat. 
                Plus le prix est élevé, plus le taux augmente pour chaque tranche. 
                C'est similaire à l'impôt sur le revenu.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Montréal vs Québec</h3>
              <p className="text-sm text-gray-600">
                <strong>Montréal</strong> a des taux plus élevés (jusqu'à 3,5%) que le reste du Québec (max 1,5%). 
                Pour une maison de 500 000$, la différence peut atteindre <strong>10 000$</strong> de plus à Montréal.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Paiement unique</h3>
              <p className="text-sm text-gray-600">
                La taxe de bienvenue est payable <strong>une seule fois</strong> lors de l'achat. 
                Vous avez <strong>30 jours</strong> après la transaction pour payer à la municipalité. 
                Certaines villes offrent des exemptions pour premiers acheteurs.
              </p>
            </div>
          </div>
        </section>

        {/* AdSense - Après section éducative */}
        <div className="flex justify-center py-6 md:py-8">
          <div className="w-full max-w-3xl">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer la taxe de bienvenue
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Incluez-la dans votre budget d'achat
              </h3>
              <p className="text-sm text-gray-600">
                Beaucoup d'acheteurs oublient cette taxe! Ajoutez <strong>1-3% du prix</strong> à votre budget total. 
                Pour une maison de 400 000$, prévoyez environ 5 000-7 000$ pour la taxe de bienvenue.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Vérifiez les exemptions disponibles
              </h3>
              <p className="text-sm text-gray-600">
                Certaines municipalités offrent des <strong>exemptions partielles ou totales</strong> pour les premiers acheteurs. 
                Contactez votre ville pour connaître les programmes disponibles et économiser des milliers de dollars.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Négociez avec le vendeur
              </h3>
              <p className="text-sm text-gray-600">
                Dans un marché d'acheteurs, vous pouvez parfois négocier pour que le vendeur paie une partie de la taxe de bienvenue. 
                Cela peut faire partie de votre <strong>offre d'achat</strong>.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-purple-600">💡</span>
                Planifiez le paiement à l'avance
              </h3>
              <p className="text-sm text-gray-600">
                Vous avez 30 jours pour payer, mais planifiez dès maintenant. Certaines banques permettent d'inclure la taxe dans votre prêt hypothécaire 
                si vous avez une <strong>mise de fonds suffisante</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source */}
        <div className="mt-8">
          <DataSource 
            label="Gouv. Québec - Droits de mutation immobilière" 
            url="https://www.quebec.ca/habitations-et-logement/achat-vente/droits-mutation-immobiliere" 
            lastUpdate="Seuils 2026" 
          />
        </div>
      </div>
    </main>
    </>
  )
}

