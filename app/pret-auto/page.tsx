import { Metadata } from 'next'
import AutoLoanClient from './AutoLoanClient'
import { Car, TrendingDown, DollarSign } from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: 'Prêt Auto Québec 2026 | Calculateur Financement',
  description: 'Calculez vos paiements de financement automobile. TPS/TVQ inclus. Mensuel et bi-hebdo. Gratuit.',
  keywords: [
    'prêt auto québec',
    'financement automobile',
    'calculateur auto',
    'paiement voiture',
    'financement véhicule',
    'prêt auto 2026',
  ],
  alternates: {
    canonical: '/pret-auto',
  },
  openGraph: {
    title: "Prêt Auto Québec 2026 - Calculateur Financement",
    description: "Calculez vos paiements mensuels et bi-hebdo. TPS/TVQ inclus. Résultat instantané.",
    url: '/pret-auto',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prêt Auto Québec 2026",
    description: "Calculez votre paiement automobile",
  },
}

export default function AutoLoanPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Prêt Auto Québec"
        description="Calculez vos paiements de financement automobile avec TPS/TVQ"
        url="/pret-auto"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 720,
        }}
      />
      
      <DarkPageHeader
        badge="Financement Auto"
        badgeIcon="Car"
        title="Votre Paiement Auto"
        titleAccent="Réel"
        description="Calculez vos paiements mensuels et découvrez combien vous économiserez avec les paiements bi-hebdomadaires"
        accentColor="blue"
        breadcrumbLabel="Prêt Auto"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        {/* Calculator */}
        <div className="mb-12">
          <AutoLoanClient />
        </div>

        {/* Ad Placement 1 - After Calculator */}
        <div className="flex justify-center py-6 md:py-8">
          <div className="max-w-3xl w-full">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-salary" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le financement auto ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Bi-hebdomadaire vs Mensuel</h3>
              <p className="text-sm text-gray-600">
                Payer <strong>aux 2 semaines</strong> signifie 26 paiements par an (équivalent à 13 mois). 
                Cela réduit votre dette plus rapidement et économise des intérêts comparé aux paiements mensuels (12 par an).
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Coût des intérêts</h3>
              <p className="text-sm text-gray-600">
                Plus la durée du prêt est longue, plus vous payez d'intérêts. 
                Un prêt de <strong>84 mois</strong> peut coûter 50% de plus en intérêts qu'un prêt de <strong>48 mois</strong>, 
                même si les paiements sont plus bas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mise de fonds</h3>
              <p className="text-sm text-gray-600">
                Une mise de fonds de <strong>20% ou plus</strong> réduit votre montant financé, 
                vos paiements mensuels, et le total des intérêts payés. 
                Cela vous protège aussi contre la dépréciation rapide du véhicule.
              </p>
            </div>
          </div>
        </section>

        {/* Ad Placement 2 - After Educational Section */}
        <div className="flex justify-center py-6 md:py-8">
          <div className="max-w-3xl w-full">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour économiser sur votre prêt auto
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Financer sur 84 mois coûte cher en intérêts
              </h3>
              <p className="text-sm text-gray-600">
                Même si les paiements sont plus bas, un prêt de <strong>7 ans (84 mois)</strong> peut vous coûter 
                des milliers de dollars de plus en intérêts. Visez <strong>48-60 mois</strong> maximum si possible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Améliorez votre cote de crédit avant
              </h3>
              <p className="text-sm text-gray-600">
                Une cote de crédit de <strong>700+</strong> vous donne accès aux meilleurs taux (4-6%). 
                Une cote sous 600 peut vous coûter 10-15% d'intérêt, soit des milliers de dollars de plus.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Négociez le prix, pas le paiement
              </h3>
              <p className="text-sm text-gray-600">
                Les concessionnaires aiment négocier sur le paiement mensuel. Concentrez-vous plutôt sur le <strong>prix total du véhicule</strong> 
                et le <strong>taux d'intérêt</strong>. C'est là que vous économisez vraiment.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">💡</span>
                Considérez l'achat d'un véhicule d'occasion
              </h3>
              <p className="text-sm text-gray-600">
                Un véhicule neuf perd <strong>20-30% de sa valeur</strong> dans les 2 premières années. 
                Acheter un véhicule de 2-3 ans vous fait économiser énormément tout en ayant un véhicule quasi-neuf.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source */}
        <div className="mt-8">
          <DataSource 
            label="OPC - Office de la protection du consommateur" 
            url="https://www.opc.gouv.qc.ca/consommateur/bien-service/vehicule/auto-achat/financement/" 
            lastUpdate="Calculateur" 
          />
        </div>
      </div>
    </main>
    </>
  )
}

