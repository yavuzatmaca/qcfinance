import { Metadata } from 'next'
import EVComparisonClient from './EVComparisonClient'
import { Leaf, DollarSign, TrendingDown } from 'lucide-react'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

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

          {/* Guide Section */}
          <section className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Guide des subventions au Québec
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">⚜️</span>
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
                  <span className="text-green-600">🇨🇦</span>
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
                  <span className="text-green-600">🔌</span>
                  Borne de recharge
                </h3>
                <p className="text-sm text-gray-600">
                  Subvention jusqu'à 600 $ pour l'installation d'une borne de recharge résidentielle.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">💰</span>
                  Avantages fiscaux
                </h3>
                <p className="text-sm text-gray-600">
                  Exemption de la taxe sur les véhicules de luxe et réduction des frais d'immatriculation.
                </p>
              </div>
            </div>
          </section>

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

