import { Metadata } from 'next'
import EVComparisonClient from './EVComparisonClient'
import { Leaf, DollarSign, TrendingDown } from 'lucide-react'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: "Auto Électrique vs Essence Québec 2026 | Calculateur",
  description: "Calculez vos économies en passant à l'électrique. Subventions, coûts et impact environnemental. Gratuit.",
  alternates: {
    canonical: '/auto-electrique-vs-essence',
  },
}

export default function EVSavingsPage() {
  return (
    <>
      <DarkPageHeader
        badge="Transition Verte"
        badgeIcon="Leaf"
        title="Électrique vs Essence :"
        titleAccent="Vos Vraies Économies"
        description="Découvrez combien vous économiserez chaque année en passant à l'électrique au Québec"
        accentColor="lime"
        breadcrumbLabel="Électrique vs Essence"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-sky-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <EVComparisonClient />

          {/* Ad Placement 1 - After Calculator */}
          <div className="flex justify-center py-6 md:py-8">
            <div className="max-w-3xl w-full">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-auto-loan" />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pourquoi passer à l'électrique au Québec?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Économies Massives</h3>
                <p className="text-sm text-gray-600">
                  L'électricité au Québec est parmi les moins chères en Amérique du Nord
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Énergie Propre</h3>
                <p className="text-sm text-gray-600">
                  95% de l'électricité québécoise provient de sources renouvelables
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingDown className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Entretien Réduit</h3>
                <p className="text-sm text-gray-600">
                  Moins de pièces mobiles = moins de réparations et d'entretien
                </p>
              </div>
            </div>
          </section>

          {/* Ad Placement 2 - After Info Section */}
          <div className="flex justify-center py-6 md:py-8">
            <div className="max-w-3xl w-full">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Guide Section */}
          <section className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Guide des subventions au Québec
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Programme Roulez Vert
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Le gouvernement du Québec offre jusqu'à 7 000 $ pour l'achat d'un véhicule électrique neuf.
                </p>
                <p className="text-sm text-gray-600">
                  Véhicules d'occasion: jusqu'à 3 500 $.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Programme fédéral iVZE
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Le gouvernement fédéral offre jusqu'à 5 000 $ supplémentaires pour les véhicules admissibles.
                </p>
                <p className="text-sm text-gray-600">
                  Total possible: jusqu'à 12 000 $ en subventions!
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Borne de recharge
                </h3>
                <p className="text-sm text-gray-600">
                  Subvention jusqu'à 600 $ pour l'installation d'une borne de recharge résidentielle.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Avantages fiscaux
                </h3>
                <p className="text-sm text-gray-600">
                  Exemption de la taxe sur les véhicules de luxe et réduction des frais d'immatriculation.
                </p>
              </div>
            </div>
          </section>

          {/* Ad Placement 4 - Before FAQ (Desktop Only) */}
          <div className="hidden lg:flex justify-center py-6 md:py-8">
            <div className="max-w-3xl w-full">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Quelle est l'autonomie moyenne d'un VÉ?</h3>
                <p className="text-sm text-gray-600">
                  Les véhicules électriques modernes offrent entre 300 et 500 km d'autonomie. 
                  Parfait pour la majorité des déplacements quotidiens au Québec.
                </p>
              </div>

              {/* Ad Placement 3 - Middle of FAQ (Mobile Only) */}
              <div className="lg:hidden flex justify-center py-4">
                <div className="max-w-3xl w-full">
                  <AdSenseAd adSlot="7290777867" />
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Comment recharger en hiver?</h3>
                <p className="text-sm text-gray-600">
                  Les VÉ modernes sont conçus pour l'hiver québécois. Une borne de recharge à domicile 
                  permet de partir avec une batterie pleine chaque matin. L'autonomie peut diminuer de 20-30% par temps très froid.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Combien coûte une recharge complète?</h3>
                <p className="text-sm text-gray-600">
                  Avec le tarif résidentiel d'Hydro-Québec, une recharge complète coûte entre 5 $ et 10 $, 
                  comparé à 60-80 $ pour un plein d'essence.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Y a-t-il assez de bornes publiques?</h3>
                <p className="text-sm text-gray-600">
                  Le Québec compte plus de 5 000 bornes publiques via le Circuit électrique et autres réseaux. 
                  Le réseau continue de s'étendre rapidement.
                </p>
              </div>
            </div>
          </section>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="Gouv. Québec - Roulez vert (Subventions)" 
              url="https://www.quebec.ca/transports/transport-electrique/aide-financiere-vehicule-electrique" 
              lastUpdate="Montants 2026" 
            />
          </div>
        </div>
      </main>
    </>
  )
}

