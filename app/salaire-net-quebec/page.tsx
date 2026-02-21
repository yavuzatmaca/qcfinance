import { Metadata } from 'next'
import Link from 'next/link'
import LuxurySalaryCalculator from '@/components/LuxurySalaryCalculator'
import EmptyStatePreview from '@/components/ui/EmptyStatePreview'
import DataSource from '@/components/ui/DataSource'
import SalaryLinkGrid from '@/components/calculators/SalaryLinkGrid'
import DarkPageHeader from '@/components/DarkPageHeader'
import AdSenseAd from '@/components/AdSenseAd'
import { TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: "Calculateur Impôt Québec 2026 | Salaire Net Gratuit",
  description: "💰 Calculez votre salaire net au Québec en 2026. Impôts fédéral et provincial, RRQ, RQAP, AE. Résultat instantané avec répartition détaillée et pouvoir d'achat.",
  keywords: [
    'calcul impôt québec',
    'calcul impôt québec 2026',
    'salaire net québec',
    'calculateur impôt québec',
    'revenu net après impôt',
    'taux imposition québec',
    'impôt fédéral provincial',
    'RRQ RQAP AE',
    'déductions salariales québec',
    'taux marginal effectif',
  ],
  alternates: {
    canonical: 'https://qcfinance.ca/salaire-net-quebec',
  },
  openGraph: {
    title: "Calcul Impôt Québec 2026 - Calculateur Salaire Net Gratuit",
    description: "Calculez votre salaire net après impôts au Québec. Taux officiels 2026, impôts fédéral et provincial, RRQ, RQAP, AE. Résultat instantané.",
    url: '/salaire-net-quebec',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calcul Impôt Québec 2026 - Salaire Net",
    description: "Calculez votre salaire net après impôts au Québec avec les taux officiels 2026",
  },
}

export default function SalaryLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Calculateur Salaire Net Québec 2026',
            description: 'Calculateur gratuit pour estimer votre salaire net après impôts au Québec. Intègre tous les taux d\'imposition 2026, RRQ, RQAP, AE et déductions fédérales et provinciales.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CAD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '2450'
            }
          })
        }}
      />

      {/* Dark Header - Flagship Design */}
      <DarkPageHeader
        badge="Données Fiscales 2026"
        badgeIcon="TrendingUp"
        title="Calculateur d'Impôt"
        titleAccent="Québec 2026"
        description="Calculez instantanément votre salaire net après impôts, RRQ, RQAP et découvrez votre véritable pouvoir d'achat."
        accentColor="emerald"
        breadcrumbLabel="Salaire Net Québec"
        showLastUpdated={true}
      />

      {/* Ad Placement 1 - Top Banner (Desktop + Mobile) */}
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <div className="flex justify-center">
          <div className="max-w-3xl w-full">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <LuxurySalaryCalculator initialIncome={0} />
            
            {/* Ad Placement 2 - After Calculator (Desktop + Mobile) */}
            <div className="flex justify-center py-6 md:py-8">
              <div className="max-w-3xl w-full">
                <AdSenseAd adSlot="7290777867" />
              </div>
            </div>

            {/* SEO Content Block */}
            <div className="prose prose-slate max-w-none bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Comment calculer votre salaire net au Québec?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Le calcul du salaire net au Québec implique plusieurs déductions obligatoires qui sont automatiquement retenues par votre employeur. 
                Notre calculateur intègre tous les taux officiels 2026 pour vous donner une estimation précise et instantanée.
              </p>
            </div>
            
            {/* Ad Placement 3 - After Educational Content (Mobile Only) */}
            <div className="lg:hidden flex justify-center py-6">
              <div className="max-w-3xl w-full">
                <AdSenseAd adSlot="7290777867" />
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Sidebar (4 cols) - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <EmptyStatePreview />
              
              {/* Ad Placement 4 - Sidebar (Desktop Only) */}
              <div className="flex justify-center">
                <div className="w-full">
                  <AdSenseAd adSlot="7290777867" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge - Data Source */}
      <div className="bg-white py-4 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <DataSource source="revenuQuebec" />
        </div>
      </div>

      {/* Key Metrics Info Cards */}
      <div className="bg-slate-50 py-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
            Les déductions sur votre paie
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* Federal Tax Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                Impôt Fédéral
              </div>
              <p className="text-xs text-slate-500">
                15% à 33% selon revenu
              </p>
            </div>

            {/* Provincial Tax Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                Impôt Provincial
              </div>
              <p className="text-xs text-slate-500">
                14% à 25,75% au Québec
              </p>
            </div>

            {/* RRQ Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                RRQ
              </div>
              <p className="text-xs text-slate-500">
                6,4% jusqu'à 68 500$
              </p>
            </div>

            {/* RQAP + AE Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                RQAP + AE
              </div>
              <p className="text-xs text-slate-500">
                0,494% + 1,63%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Optimisez votre revenu net
            </h2>
            <p className="text-slate-700 mb-4">
              Plusieurs stratégies légales permettent de réduire vos impôts et maximiser votre revenu net:
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-6 not-prose">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Cotisez à un REER</h3>
                    <p className="text-sm text-slate-700">Réduisez votre revenu imposable jusqu'à 18% de votre revenu annuel</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Utilisez un CELI</h3>
                    <p className="text-sm text-slate-700">Faites croître vos épargnes à l'abri de l'impôt (7 000$ en 2026)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Déduisez vos frais de garde</h3>
                    <p className="text-sm text-slate-700">Jusqu'à 8 000$ par enfant de moins de 7 ans, 5 000$ pour 7-16 ans</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Réclamez vos dépenses de télétravail</h3>
                    <p className="text-sm text-slate-700">Méthode simplifiée : 2$ par jour (max 500$/an)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Cotisez au CELIAPP</h3>
                    <p className="text-sm text-slate-700">8 000$/an pour futurs acheteurs (déduction immédiate + retrait libre d'impôt)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ad Placement 5 - Before FAQ (Mobile Only) */}
            <div className="lg:hidden my-6 flex justify-center not-prose">
              <div className="w-full max-w-3xl">
                <AdSenseAd adSlot="7290777867" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-3 mt-8">
              Taux marginal vs taux effectif
            </h2>
            <p className="text-slate-700 mb-4">
              Le <strong>taux marginal</strong> s'applique à votre dernier dollar gagné, tandis que le <strong>taux effectif</strong> représente 
              le pourcentage réel d'impôt payé sur votre revenu total.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 not-prose">
              <h3 className="text-lg font-bold text-blue-900 mb-1.5">
                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Exemple concret
              </h3>
              <p className="text-blue-800 text-sm">
                Avec un salaire de 70 000$, votre taux marginal pourrait être de 37,12%, mais votre taux effectif sera d'environ 23% 
                car les premiers dollars sont imposés à des taux plus bas grâce au système progressif canadien.
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Questions fréquentes
          </h2>
          
          {/* Ad Placement 6 - Middle of FAQ (Mobile Only) */}
          <div className="lg:hidden my-6 flex justify-center">
            <div className="w-full max-w-3xl">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>
          
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Comment est calculé le salaire net au Québec?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Le salaire net est calculé en soustrayant toutes les déductions obligatoires de votre salaire brut : impôt fédéral, 
                impôt provincial du Québec, cotisations au RRQ (Régime de rentes du Québec), RQAP (Régime québécois d'assurance parentale) 
                et assurance-emploi fédérale. Notre calculateur utilise les taux officiels 2026 pour vous donner un résultat précis.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Quelle est la différence entre taux marginal et taux effectif?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Le taux marginal est le taux d'imposition appliqué à votre dernier dollar gagné. Le taux effectif est le pourcentage 
                réel d'impôt que vous payez sur votre revenu total. Par exemple, si vous gagnez 80 000$, votre taux marginal pourrait 
                être de 41,12%, mais votre taux effectif sera plus bas (environ 25%) car les premiers dollars sont imposés à des taux inférieurs.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Comment réduire mes impôts au Québec?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Les meilleures stratégies incluent : cotiser à un REER (déduction immédiate), maximiser votre CELI (croissance libre d'impôt), 
                déduire vos frais de garde d'enfants, réclamer vos dépenses de télétravail, cotiser au CELIAPP si vous êtes futur acheteur, 
                et déduire vos dons de charité. Un planificateur financier peut vous aider à optimiser votre situation.
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                <span>Les taux d'imposition 2026 sont-ils à jour?</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                Oui, notre calculateur utilise les taux officiels 2026 publiés par Revenu Québec et l'Agence du revenu du Canada. 
                Les taux sont mis à jour dès leur publication officielle. Cela inclut les tranches d'imposition fédérales et provinciales, 
                les taux de RRQ, RQAP et assurance-emploi, ainsi que les montants personnels de base.
              </div>
            </details>
          </div>

          {/* FAQ Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Comment est calculé le salaire net au Québec?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Le salaire net est calculé en soustrayant toutes les déductions obligatoires de votre salaire brut : impôt fédéral, impôt provincial du Québec, cotisations au RRQ, RQAP et assurance-emploi.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Quelle est la différence entre taux marginal et taux effectif?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Le taux marginal est le taux d\'imposition appliqué à votre dernier dollar gagné. Le taux effectif est le pourcentage réel d\'impôt que vous payez sur votre revenu total.'
                    }
                  }
                ]
              })
            }}
          />
        </div>
      </div>

      {/* Cross-Sell CTA - Mortgage Calculator */}
      <div className="bg-white py-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-indigo-100">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  Combien pouvez-vous emprunter ?
                </h3>
                <p className="text-slate-600 text-base">
                  Maintenant que vous connaissez votre salaire net, découvrez votre capacité d'emprunt pour une maison.
                </p>
              </div>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <a
                href="/calcul-hypotheque"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors group whitespace-nowrap"
              >
                <span>Calculer mon hypothèque</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Links Grid */}
      <div className="bg-slate-50 py-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <SalaryLinkGrid />
        </div>
      </div>

      {/* Ad Placement 7 - Footer (Desktop Only) */}
      <div className="hidden lg:block bg-white py-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <div className="max-w-3xl w-full">
            <AdSenseAd adSlot="7290777867" />
          </div>
        </div>
      </div>
    </div>
  )
}
