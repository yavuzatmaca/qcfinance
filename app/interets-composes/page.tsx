import { Metadata } from 'next'
import CompoundInterestClient from './CompoundInterestClient'
import { TrendingUp, Sparkles, DollarSign, Clock } from 'lucide-react'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'
export const metadata: Metadata = {
  title: "Intérêts Composés Québec 2026 | Calculateur Investissement",
  description: "Calculez la croissance de vos investissements avec les intérêts composés. REER, CELI et plus. Gratuit.",
  alternates: {
    canonical: '/interets-composes',
  },
}

export default function CompoundInterestPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Intérêts Composés Québec 2026"
        description="Calculez la puissance des intérêts composés pour vos investissements. Planifiez votre épargne avec notre outil gratuit."
        url="/interets-composes"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.5,
          ratingCount: 760,
        }}
      /><main className="min-h-screen bg-white">
        <DarkPageHeader
          badge="Croissance Exponentielle"
          badgeIcon="Sparkles"
          title="Voyez Votre Argent Se"
          titleAccent="Multiplier"
          description="Découvrez la puissance des intérêts composés et combien votre épargne vaudra dans 10, 20 ou 30 ans"
          accentColor="blue"
          breadcrumbLabel="Intérêts Composés"
          showLastUpdated={true}
        />
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          <div className="mb-12">
            <CompoundInterestClient />
          </div>

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />



          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-retirement" />

          {/* Educational Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Qu'est-ce que les intérêts composés?
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Les intérêts composés sont souvent appelés la <strong>"huitième merveille du monde"</strong>. 
                C'est le principe où vos intérêts génèrent eux-mêmes des intérêts, créant un effet boule de neige.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 1</h3>
                  <p className="text-sm text-gray-600">
                    Vous investissez 1 000 $ à 10%. Vous gagnez 100 $ d'intérêts.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 2</h3>
                  <p className="text-sm text-gray-600">
                    Vous avez maintenant 1 100 $. Vous gagnez 110 $ d'intérêts (sur 1 100 $, pas 1 000 $).
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Année 30</h3>
                  <p className="text-sm text-gray-600">
                    Votre 1 000 $ initial vaut maintenant 17 449 $ sans rien faire!
                  </p>
                </div>
              </div>
            </div>
          </section>



          {/* Responsive Ad 2 - After Educational Section */}
          <ResponsiveAd />

          {/* Rule of 72 Deep Dive Section */}
          <section className="mt-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow-lg p-8 border-2 border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
              <span className="text-3xl">🎯</span>
              La règle de 72 expliquée
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                La règle de 72 est un raccourci mathématique simple pour estimer combien de temps il faudra 
                pour <strong>doubler votre investissement</strong>. Il suffit de diviser 72 par votre taux de rendement annuel.
              </p>

              <div className="bg-white rounded-xl p-6 mb-6 border-2 border-amber-300 shadow-md">
                <div className="text-center mb-4">
                  <div className="text-4xl font-black text-amber-900 mb-2">
                    Années pour doubler = 72 ÷ Taux de rendement
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-amber-600 font-semibold mb-1">À 6% par an</div>
                    <div className="text-3xl font-bold text-amber-900">12 ans</div>
                    <div className="text-xs text-gray-600 mt-1">72 ÷ 6 = 12</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-amber-600 font-semibold mb-1">À 8% par an</div>
                    <div className="text-3xl font-bold text-amber-900">9 ans</div>
                    <div className="text-xs text-gray-600 mt-1">72 ÷ 8 = 9</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-amber-600 font-semibold mb-1">À 10% par an</div>
                    <div className="text-3xl font-bold text-amber-900">7.2 ans</div>
                    <div className="text-xs text-gray-600 mt-1">72 ÷ 10 = 7.2</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Exemple concret
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Si vous investissez <strong>10 000 $</strong> dans un portefeuille qui rapporte <strong>8% par an</strong>, 
                  votre argent doublera en environ <strong>9 ans</strong> (72 ÷ 8 = 9). Après 18 ans, vous aurez 
                  <strong> 40 000 $</strong> (doublé deux fois). Après 27 ans : <strong>80 000 $</strong>. 
                  Et tout ça sans ajouter un seul dollar supplémentaire !
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour maximiser vos intérêts composés
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Commencez tôt</h3>
                    <p className="text-sm text-gray-600">
                      Le temps est votre meilleur allié. Commencer à 25 ans vs 35 ans peut faire une différence 
                      de centaines de milliers de dollars à la retraite.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Investissez régulièrement</h3>
                    <p className="text-sm text-gray-600">
                      Même de petites contributions mensuelles (100-200 $) peuvent devenir une fortune 
                      grâce aux intérêts composés sur 20-30 ans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Réinvestissez les dividendes</h3>
                    <p className="text-sm text-gray-600">
                      Ne retirez pas vos gains! Laissez-les se réinvestir automatiquement pour 
                      maximiser l'effet des intérêts composés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Utilisez un CELI ou REER</h3>
                    <p className="text-sm text-gray-600">
                      Les comptes enregistrés vous permettent de faire croître votre argent sans payer 
                      d'impôts sur les gains, maximisant ainsi vos rendements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsive Ad 3 - After Tips Section */}
          <ResponsiveAd />

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Quel est un bon taux de rendement?</h3>
                <p className="text-sm text-gray-600">
                  Historiquement, le marché boursier (S&P 500) a généré environ 10% par an sur le long terme. 
                  Les obligations offrent 3-5%, et les comptes d'épargne 1-2%. Un portefeuille diversifié 
                  pourrait viser 6-8% de rendement annuel.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">CELI ou REER: lequel choisir?</h3>
                <p className="text-sm text-gray-600">
                  Le CELI est idéal pour la flexibilité (retraits libres d'impôt). Le REER offre une déduction 
                  fiscale immédiate et est parfait pour la retraite. Beaucoup de Québécois utilisent les deux!
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Combien devrais-je investir par mois?</h3>
                <p className="text-sm text-gray-600">
                  Une règle générale est d'épargner 10-20% de votre revenu brut. Si vous gagnez 60 000 $/an, 
                  visez 500-1 000 $/mois. Commencez petit si nécessaire - l'important est de commencer!
                </p>
              </div>

              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">Est-ce que je peux perdre de l'argent?</h3>
                <p className="text-sm text-gray-600">
                  Oui, les investissements comportent des risques. Les marchés fluctuent à court terme, 
                  mais historiquement, ils ont toujours progressé sur le long terme (15-20 ans+). 
                  La diversification et la patience sont clés.
                </p>
              </div>
            </div>
          </section>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="Commission des valeurs mobilières - Calculatrices" 
              url="https://www.investor.gov/" 
              lastUpdate="Formule Universelle" 
            />
          </div>
        </div>
      </main>
    </>
  )
}

