import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LuxurySalaryCalculator from '@/components/LuxurySalaryCalculator'
import PurchasePowerCard from '@/components/ui/PurchasePowerCard'
import PaychequePreview from '@/components/ui/PaychequePreview'
import DataSource from '@/components/ui/DataSource'
import SalaryLinkGrid from '@/components/calculators/SalaryLinkGrid'
import SalaryStatsSwiper from '@/components/SalaryStatsSwiper'
import { calculateTaxes } from '@/utils/taxLogic'
import ResponsiveAd from '@/components/ResponsiveAd'
import DarkPageHeader from '@/components/DarkPageHeader'
import { Sparkles } from 'lucide-react'


// Generate static paths for 341 salary pages (30k to 200k in 500$ increments)
// This creates more SEO entry points for long-tail salary searches
export async function generateStaticParams() {
  const salaries = []
  
  // Generate salary pages with 500$ increments for better SEO coverage
  // Range: 30,000$ to 200,000$ (covers 95% of Quebec salaries)
  // Total pages: 341 (vs 171 with 1k increments)
  for (let i = 30000; i <= 200000; i += 500) {
    salaries.push({ salary: i.toString() })
  }
  
  return salaries
}

// Allow dynamic params outside of static generation
export const dynamicParams = true

// Dynamic SEO metadata for each salary page - Optimized for Google
export async function generateMetadata({ params }: { params: { salary: string } }): Promise<Metadata> {
  const salaryNum = parseInt(params.salary)
  
  if (isNaN(salaryNum) || salaryNum < 0 || salaryNum > 1000000) {
    return {
      title: 'Salaire non valide',
      description: 'Le montant de salaire spécifié n\'est pas valide.'
    }
  }

  // Format with space separator for better readability (45 000 instead of 45,000)
  const formattedSalary = salaryNum.toLocaleString('fr-CA').replace(',', ' ')
  
  return {
    title: `Salaire Net ${formattedSalary} $ au Québec 2026 : Calcul et Impôts | QC Finance`,
    description: `Découvrez votre salaire net pour ${formattedSalary} $ par année au Québec. Calcul précis des impôts, RRQ et RQAP pour 2026.`,
    keywords: [
      `salaire net ${formattedSalary}`,
      `${formattedSalary} net québec`,
      `impôt ${formattedSalary} québec`,
      `calcul salaire ${formattedSalary}`,
      'salaire après impôts québec',
      'revenu net québec 2026',
      `${formattedSalary} dollars québec`,
      'calculateur salaire québec',
    ],
    alternates: {
      canonical: `https://qcfinance.ca/salaire-net-quebec/${params.salary}`,
    },
    openGraph: {
      title: `Salaire Net ${formattedSalary} $ au Québec 2026 : Calcul et Impôts`,
      description: `Découvrez votre salaire net pour ${formattedSalary} $ par année au Québec. Calcul précis des impôts, RRQ et RQAP pour 2026.`,
      url: `https://qcfinance.ca/salaire-net-quebec/${params.salary}`,
      type: 'website',
      locale: 'fr_CA',
      siteName: 'QC Finance',
      images: [
        {
          url: `https://qcfinance.ca/salaire-net-quebec/${params.salary}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Salaire Net ${formattedSalary} $ Québec 2026`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Salaire Net ${formattedSalary} $ au Québec 2026`,
      description: `Découvrez votre salaire net pour ${formattedSalary} $ par année au Québec. Calcul précis des impôts, RRQ et RQAP pour 2026.`,
      images: [`https://qcfinance.ca/salaire-net-quebec/${params.salary}/opengraph-image`],
    },
  }
}

export default function DynamicSalaryPage({ params }: { params: { salary: string } }) {
  const salaryNum = parseInt(params.salary)
  
  // Validate salary range
  if (isNaN(salaryNum) || salaryNum < 0 || salaryNum > 1000000) {
    notFound()
  }

  const formattedAmount = salaryNum.toLocaleString('fr-CA')
  const taxResults = calculateTaxes(salaryNum)
  const marginalRate = calculateMarginalRate(salaryNum)
  const effectiveRate = ((taxResults.totalDeductions / salaryNum) * 100).toFixed(1)
  const monthlyNet = Math.round(taxResults.netIncome / 12)
  
  // Helper function to determine income bracket
  const getIncomeBracket = () => {
    if (salaryNum < 49275) return 'de base'
    if (salaryNum < 98540) return 'intermédiaire'
    if (salaryNum < 165430) return 'supérieure'
    return 'maximale'
  }
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => 
    amount.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })
  
  // Helper function to calculate percentage
  const calcPercentage = (part: number, total: number) => 
    ((part / total) * 100).toFixed(1)
  
  // Table row component for cleaner code
  const TaxRow = ({ label, amount, className = "hover:bg-slate-50" }: { label: string, amount: number, className?: string }) => (
    <tr className={className}>
      <td className="px-6 py-4 text-sm text-slate-700">{label}</td>
      <td className="px-6 py-4 text-sm text-right font-semibold text-slate-900">
        {formatCurrency(amount)}
      </td>
      <td className="px-6 py-4 text-sm text-right text-slate-600">
        {calcPercentage(amount, salaryNum)}%
      </td>
    </tr>
  )

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-emerald-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: `Calculateur d'impôt Québec - ${formattedAmount} $`,
            description: `Estimation précise du revenu net pour un salaire brut de ${formattedAmount} $ au Québec en 2026.`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'CAD'
            }
          })
        }}
      />

      {/* Dark Header - Dynamic Salary */}
      <DarkPageHeader
        badge="Données Fiscales 2026"
        badgeIcon="TrendingUp"
        title={`Salaire Net ${formattedAmount} $`}
        titleAccent="Québec 2026"
        description="Découvrez votre véritable pouvoir d'achat au Québec après impôts, RRQ et RQAP."
        accentColor="emerald"
        breadcrumbLabel={`Salaire ${formattedAmount} $`}
        showLastUpdated={true}
      />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <LuxurySalaryCalculator initialIncome={salaryNum} />

            {/* Responsive Ad - After Calculator, Before Purchase Power */}
            <ResponsiveAd />



            {/* Votre Pouvoir d'Achat - NO SWIPE (Normal Grid) */}
            <PurchasePowerCard 
              netIncome={taxResults.netIncome}
              grossIncome={salaryNum}
            />

            {/* Objectif d'Épargne - Separate Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Objectif d'Épargne</h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Visez à épargner <span className="font-bold text-amber-700">{Math.round((taxResults.netIncome / 12) * 0.20).toLocaleString('fr-CA')} $/mois</span> (20% de votre revenu net) 
                    pour bâtir un fonds d'urgence et investir pour l'avenir.
                  </p>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Automatisez vos épargnes dès la réception de votre paie
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Impact fiscal de {formattedAmount}$ au Québec
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Avec un revenu brut de <strong>{formattedAmount} $</strong>, vous vous situez dans la tranche d'imposition {getIncomeBracket()} au Québec. 
                Votre taux marginal d'imposition est de <strong>{marginalRate}%</strong>, ce qui signifie que chaque dollar supplémentaire 
                gagné sera imposé à ce taux.
              </p>
            </div>
            

          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <PaychequePreview
                grossIncome={salaryNum}
                netIncome={taxResults.netIncome}
                federalTax={taxResults.federalTax}
                provincialTax={taxResults.provincialTax}
                qpp={taxResults.qpp}
                qpip={taxResults.qpip}
                ei={taxResults.ei}
                marginalRate={marginalRate}
                effectiveRate={effectiveRate}
              />
              

            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <DataSource source="revenuQuebec" />
        </div>
      </div>

      {/* Vos indicateurs clés - Swipeable on Mobile */}
      <div className="bg-slate-50 py-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
            Vos indicateurs clés
          </h2>
          
          {/* Mobile: Swipeable Cards */}
          <div className="lg:hidden">
            <div className="flex items-center justify-end mb-3">
              <span className="text-xs text-slate-500">Swipe →</span>
            </div>
            <SalaryStatsSwiper
              netIncome={taxResults.netIncome}
              totalDeductions={taxResults.totalDeductions}
              grossIncome={salaryNum}
              marginalRate={marginalRate}
              effectiveRate={effectiveRate}
            />
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-red-50 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {marginalRate}%
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                Taux Marginal
              </div>
              <p className="text-xs text-slate-500">
                Sur chaque $ additionnel
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {effectiveRate}%
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                Taux Moyen
              </div>
              <p className="text-xs text-slate-500">
                Votre impôt réel
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                ~{monthlyNet.toLocaleString('fr-CA')} $
              </div>
              <div className="text-sm font-semibold text-slate-700 mb-1">
                Revenu Mensuel
              </div>
              <p className="text-xs text-slate-500">
                Dans votre poche
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* Dynamic SEO Content - Programmatic SEO */}
      <div className="bg-white py-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <article className="prose prose-slate max-w-none">
            {/* Section 1: Is this a good salary? */}
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Est-ce que {formattedAmount} $ est un bon salaire au Québec?
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Avec un revenu brut de <strong>{formattedAmount} $</strong>, vous vous situez dans la tranche d'imposition {getIncomeBracket()} au Québec. 
              Votre taux marginal d'imposition est de <strong>{marginalRate}%</strong>, ce qui signifie que chaque dollar supplémentaire 
              gagné sera imposé à ce taux. Cependant, votre taux effectif (le pourcentage réel d'impôt payé) est de <strong>{effectiveRate}%</strong>, 
              car les premiers dollars sont imposés à des taux inférieurs grâce au système progressif.
            </p>

            {/* Section 2: Tax Breakdown Table */}
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Répartition de vos impôts pour {formattedAmount} $
            </h2>
            <p className="text-slate-700 mb-4">
              Voici le détail complet des déductions sur votre salaire brut de {formattedAmount} $ :
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Type de déduction
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Montant annuel
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700 border-b border-slate-200">
                      % du brut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <TaxRow label="Impôt Fédéral" amount={taxResults.federalTax} />
                  <TaxRow label="Impôt Provincial (Québec)" amount={taxResults.provincialTax} />
                  <TaxRow label="RRQ (Régime de rentes du Québec)" amount={taxResults.qpp} />
                  <TaxRow label="RQAP (Assurance parentale)" amount={taxResults.qpip} />
                  <TaxRow label="AE (Assurance-emploi)" amount={taxResults.ei} />
                  
                  <tr className="bg-red-50 font-semibold">
                    <td className="px-6 py-4 text-sm text-slate-900">Total des déductions</td>
                    <td className="px-6 py-4 text-sm text-right text-red-700 font-bold">
                      {formatCurrency(taxResults.totalDeductions)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-red-700">
                      {effectiveRate}%
                    </td>
                  </tr>
                  <tr className="bg-emerald-50 font-semibold">
                    <td className="px-6 py-4 text-sm text-slate-900">Revenu net annuel</td>
                    <td className="px-6 py-4 text-sm text-right text-emerald-700 font-bold text-lg">
                      {formatCurrency(taxResults.netIncome)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-emerald-700">
                      {calcPercentage(taxResults.netIncome, salaryNum)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Additional Context */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <h3 className="text-lg font-bold text-blue-900 mb-1.5">💡 Bon à savoir</h3>
              <p className="text-blue-800 text-sm">
                Ces calculs sont basés sur les taux d'imposition 2026 et supposent que vous n'avez aucune déduction fiscale 
                (REER, frais de garde, etc.). En réalité, votre revenu net peut être plus élevé si vous profitez des crédits 
                d'impôt et déductions disponibles. Consultez un planificateur financier pour optimiser votre situation fiscale.
              </p>
            </div>



            {/* FAQ Section - Schema Markup Ready */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              {/* Responsive Ad - Before FAQ */}
              <ResponsiveAd />

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Questions fréquentes sur {formattedAmount} $
              </h2>
              

              
              <div className="space-y-4">
                {/* FAQ 1 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Quel est le salaire net mensuel sur {formattedAmount} $ ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    Sur un salaire brut annuel de <strong>{formattedAmount} $</strong>, votre revenu net mensuel sera d'environ <strong>{monthlyNet.toLocaleString('fr-CA')} $</strong>. 
                    Cela représente <strong>{Math.round(taxResults.netIncome / 26).toLocaleString('fr-CA')} $</strong> aux deux semaines. 
                    Ce montant tient compte de toutes les déductions obligatoires : impôts fédéral et provincial, RRQ, RQAP et assurance-emploi.
                  </div>
                </details>

                {/* FAQ 2 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Combien d'impôts je paie sur {formattedAmount} $ ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    Les déductions totales sur {formattedAmount} $ s'élèvent à <strong>{formatCurrency(taxResults.totalDeductions)}</strong>, 
                    soit <strong>{effectiveRate}%</strong> de votre revenu brut. Ce montant se divise ainsi : 
                    impôt fédéral ({formatCurrency(taxResults.federalTax)}), 
                    impôt provincial ({formatCurrency(taxResults.provincialTax)}), 
                    RRQ ({formatCurrency(taxResults.qpp)}), 
                    RQAP ({formatCurrency(taxResults.qpip)}) et 
                    AE ({formatCurrency(taxResults.ei)}).
                  </div>
                </details>

                {/* FAQ 3 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Quelle est ma tranche d'imposition avec {formattedAmount} $ ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    Avec un revenu de {formattedAmount} $, votre <strong>taux marginal d'imposition</strong> est de <strong>{marginalRate}%</strong> (combiné fédéral + provincial). 
                    Cela signifie que chaque dollar supplémentaire gagné sera imposé à ce taux. Cependant, votre <strong>taux effectif</strong> est de <strong>{effectiveRate}%</strong>, 
                    car les premiers dollars sont imposés à des taux inférieurs grâce au système progressif canadien.
                  </div>
                </details>

                {/* FAQ 4 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Comment réduire mes impôts avec {formattedAmount} $ ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    Plusieurs stratégies peuvent réduire vos impôts : <strong>1) Cotisez à un REER</strong> (jusqu'à 18% de votre revenu, soit {Math.round(salaryNum * 0.18).toLocaleString('fr-CA')} $ dans votre cas) 
                    pour économiser environ {Math.round(salaryNum * 0.18 * (parseFloat(marginalRate) / 100)).toLocaleString('fr-CA')} $ en impôts. 
                    <strong>2) Déduisez vos frais de garde</strong> (jusqu'à 8 000 $/enfant). 
                    <strong>3) Réclamez vos dépenses de télétravail</strong> (2 $/jour, max 500 $/an). 
                    <strong>4) Cotisez au CELIAPP</strong> (8 000 $/an) si vous êtes futur acheteur. 
                    <strong>5) Maximisez votre CELI</strong> pour faire croître votre épargne à l'abri de l'impôt.
                  </div>
                </details>

                {/* FAQ 5 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Puis-je acheter une maison avec {formattedAmount} $ au Québec ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    Oui ! Avec un revenu de {formattedAmount} $, vous pourriez être admissible à un prêt hypothécaire d'environ <strong>{Math.round(salaryNum * 4.5).toLocaleString('fr-CA')} $</strong> selon 
                    les règles bancaires standard (4,5 fois le revenu brut). Avec une mise de fonds de 20%, vous pourriez acheter une propriété d'environ <strong>{Math.round(salaryNum * 5.6).toLocaleString('fr-CA')} $</strong>. 
                    Votre capacité d'emprunt dépendra aussi de vos autres dettes (ratio d'endettement), de votre cote de crédit et des taux d'intérêt actuels. 
                    Utilisez notre <a href="/calcul-hypotheque" className="text-emerald-600 hover:underline font-semibold">calculateur hypothécaire</a> pour une estimation précise.
                  </div>
                </details>

                {/* FAQ 6 */}
                <details className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-emerald-300 transition-colors">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50">
                    <span>Est-ce que {formattedAmount} $ est un bon salaire au Québec en 2026 ?</span>
                    <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm border-t border-slate-100">
                    {salaryNum < 50000 && `Un salaire de ${formattedAmount} $ se situe légèrement en dessous du salaire moyen québécois (55 000-60 000 $). C'est un revenu d'entrée de gamme qui permet de vivre confortablement en région, mais peut être serré à Montréal ou Québec. Vous avez une bonne marge de progression.`}
                    {salaryNum >= 50000 && salaryNum < 75000 && `Un salaire de ${formattedAmount} $ est proche du salaire moyen au Québec (55 000-60 000 $). C'est un revenu solide qui permet de vivre confortablement, surtout en région. Vous pouvez épargner, voyager et envisager l'achat d'une propriété.`}
                    {salaryNum >= 75000 && salaryNum < 100000 && `Un salaire de ${formattedAmount} $ est supérieur à la moyenne québécoise. Vous faites partie des 30% de salariés les mieux rémunérés. Ce revenu permet un excellent niveau de vie, une épargne substantielle et l'achat d'une belle propriété.`}
                    {salaryNum >= 100000 && `Un salaire de ${formattedAmount} $ est excellent ! Vous faites partie des 10% de salariés les mieux rémunérés au Québec. Ce revenu permet un niveau de vie très confortable, une épargne importante et des investissements significatifs. Pensez à optimiser votre fiscalité avec un planificateur financier.`}
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
                        name: `Quel est le salaire net mensuel sur ${formattedAmount} $ ?`,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: `Sur un salaire brut annuel de ${formattedAmount} $, votre revenu net mensuel sera d'environ ${monthlyNet.toLocaleString('fr-CA')} $. Cela représente ${Math.round(taxResults.netIncome / 26).toLocaleString('fr-CA')} $ aux deux semaines.`
                        }
                      },
                      {
                        '@type': 'Question',
                        name: `Combien d'impôts je paie sur ${formattedAmount} $ ?`,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: `Les déductions totales sur ${formattedAmount} $ s'élèvent à ${formatCurrency(taxResults.totalDeductions)}, soit ${effectiveRate}% de votre revenu brut.`
                        }
                      },
                      {
                        '@type': 'Question',
                        name: `Quelle est ma tranche d'imposition avec ${formattedAmount} $ ?`,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: `Avec un revenu de ${formattedAmount} $, votre taux marginal d'imposition est de ${marginalRate}% (combiné fédéral + provincial). Votre taux effectif est de ${effectiveRate}%.`
                        }
                      }
                    ]
                  })
                }}
              />
            </div>
          </article>
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

      {/* Internal Linking - Salary Link Grid */}
      <div className="bg-slate-50 py-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <SalaryLinkGrid />
        </div>
      </div>
    </div>
  )
}

// Helper function to calculate marginal tax rate
function calculateMarginalRate(income: number): string {
  // Federal brackets 2026
  const federalMarginal = 
    income <= 55867 ? 15.0 :
    income <= 111733 ? 20.5 :
    income <= 173205 ? 26.0 :
    income <= 246752 ? 29.0 : 33.0

  // Quebec brackets 2026
  const quebecMarginal = 
    income <= 51780 ? 14.0 :
    income <= 103545 ? 19.0 :
    income <= 126000 ? 24.0 : 25.75

  return (federalMarginal + quebecMarginal).toFixed(2)
}
