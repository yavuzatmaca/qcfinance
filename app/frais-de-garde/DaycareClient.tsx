'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function DaycareClient() {
  const [income, setIncome] = useState<number>(90000)
  const [dailyRate, setDailyRate] = useState<number>(50)
  const [days, setDays] = useState<number>(260)
  const [children, setChildren] = useState<number>(1)

  const CPE_RATE = 9.10 // Fixed CPE rate for 2026

  // Calculate Quebec tax credit rate based on income (simplified 2026 brackets)
  const getTaxCreditRate = (income: number): number => {
    if (income < 36000) return 0.78
    if (income < 50000) return 0.75
    if (income < 75000) return 0.70
    if (income < 100000) return 0.67
    if (income < 125000) return 0.57
    if (income < 150000) return 0.47
    if (income < 175000) return 0.37
    return 0.26 // Minimum credit rate
  }

  const taxCreditRate = getTaxCreditRate(income)

  // Calculate federal deduction savings (estimate marginal tax savings)
  const marginalTaxRate = income > 100000 ? 0.20 : income > 50000 ? 0.15 : 0.10
  const federalSavings = dailyRate * marginalTaxRate

  // Calculate net daily cost after credits
  const quebecCredit = dailyRate * taxCreditRate
  const netDailyCost = dailyRate - quebecCredit - federalSavings

  // Annual costs
  const annualPrivateCost = dailyRate * days * children
  const annualQuebecCredit = quebecCredit * days * children
  const annualFederalSavings = federalSavings * days * children
  const annualNetCost = netDailyCost * days * children
  const annualCPECost = CPE_RATE * days * children

  // Government contribution percentage
  const govContribution = ((quebecCredit + federalSavings) / dailyRate) * 100
  const youPay = 100 - govContribution

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-rose-200 p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">👶</span>
            Votre situation
          </h2>

          {/* Income */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Revenu familial net : {formatCurrency(income)}
            </label>
            <input
              type="range"
              min="20000"
              max="200000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>20k</span>
              <span>200k</span>
            </div>
          </div>

          {/* Daily Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Coût par jour (garderie privée)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={dailyRate || ''}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                step="5"
                min="35"
                max="80"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[40, 50, 60].map((quickRate) => (
                <button
                  key={quickRate}
                  onClick={() => setDailyRate(quickRate)}
                  className="flex-1 py-1 px-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickRate}$
                </button>
              ))}
            </div>
          </div>

          {/* Days per year */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Jours de garde par année : {days}
            </label>
            <input
              type="range"
              min="200"
              max="260"
              step="10"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>200</span>
              <span>260</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              ~{Math.round(days / 5)} semaines de garde
            </p>
          </div>

          {/* Number of children */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Nombre d'enfants
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChildren(Math.max(1, children - 1))}
                className="w-12 h-12 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl font-bold text-xl transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold text-purple-900">{children}</div>
              </div>
              <button
                onClick={() => setChildren(Math.min(5, children + 1))}
                className="w-12 h-12 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl font-bold text-xl transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-purple-900 text-sm mb-1">
                  Crédit d'impôt : {(taxCreditRate * 100).toFixed(0)}%
                </h3>
                <p className="text-xs text-purple-800">
                  Avec votre revenu de {formatCurrency(income)}, vous avez droit à un crédit 
                  d'impôt remboursable de {(taxCreditRate * 100).toFixed(0)}% sur vos frais de garde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Real Cost Card */}
          <div className="bg-gradient-to-br from-purple-600 to-rose-600 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Coût réel après crédits
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-2">
                {formatCurrency(netDailyCost)}
              </div>
              <p className="text-xl opacity-90 mb-1">
                par jour
              </p>
              <p className="text-sm opacity-75">
                vs CPE : {formatCurrency(CPE_RATE)}/jour
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Coût annuel net</span>
                <span className="text-2xl font-bold">{formatCurrency(annualNetCost)}</span>
              </div>
            </div>
          </div>

          {/* Government Contribution Visual */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Qui paie quoi ?
            </h3>

            {/* Stacked Bar */}
            <div className="mb-6">
              <div className="h-20 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-rose-500 to-rose-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${youPay}%` }}
                >
                  <span className="text-xs font-bold">VOUS PAYEZ</span>
                  <span className="text-lg font-extrabold">{formatCurrency(netDailyCost)}</span>
                </div>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${govContribution}%` }}
                >
                  <span className="text-xs font-bold">GOUVERNEMENT</span>
                  <span className="text-lg font-extrabold">{formatCurrency(quebecCredit + federalSavings)}</span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Coût affiché</span>
                <span className="font-bold text-slate-900">{formatCurrency(dailyRate)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-slate-700">Crédit Québec ({(taxCreditRate * 100).toFixed(0)}%)</span>
                </div>
                <span className="font-bold text-emerald-600">-{formatCurrency(quebecCredit)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-slate-700">Déduction fédérale</span>
                </div>
                <span className="font-bold text-green-600">-{formatCurrency(federalSavings)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rose-500 rounded"></div>
                  <span className="text-lg font-bold text-slate-900">Coût réel</span>
                </div>
                <span className="text-2xl font-extrabold text-rose-600">{formatCurrency(netDailyCost)}</span>
              </div>
            </div>
          </div>

          {/* CPE Comparison */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏫</span>
              Comparaison avec CPE
            </h4>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-700">CPE (subventionné)</span>
                  <span className="text-xl font-bold text-blue-900">{formatCurrency(CPE_RATE)}/jour</span>
                </div>
                <div className="text-xs text-blue-600">
                  Coût annuel : {formatCurrency(annualCPECost)}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-rose-700">Garderie privée (net)</span>
                  <span className="text-xl font-bold text-rose-900">{formatCurrency(netDailyCost)}/jour</span>
                </div>
                <div className="text-xs text-rose-600">
                  Coût annuel : {formatCurrency(annualNetCost)}
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Différence annuelle</span>
                  <span className={`text-xl font-bold ${annualNetCost > annualCPECost ? 'text-red-600' : 'text-green-600'}`}>
                    {annualNetCost > annualCPECost ? '+' : ''}{formatCurrency(annualNetCost - annualCPECost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Coût brut annuel</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(annualPrivateCost)}</div>
              <div className="text-xs text-slate-500 mt-1">{dailyRate}$ × {days} jours</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Crédits totaux</div>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(annualQuebecCredit + annualFederalSavings)}</div>
              <div className="text-xs text-slate-500 mt-1">{govContribution.toFixed(0)}% remboursé</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Coût net annuel</div>
              <div className="text-2xl font-bold text-rose-600">{formatCurrency(annualNetCost)}</div>
              <div className="text-xs text-slate-500 mt-1">ce que vous payez</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Enfants</div>
              <div className="text-2xl font-bold text-purple-900">{children}</div>
              <div className="text-xs text-slate-500 mt-1">en garderie</div>
            </div>
          </div>

          {/* REEE Tip */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
            <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Investissez dans l'avenir
            </h4>
            <p className="text-sm text-violet-800 mb-3">
              Avec les économies réalisées grâce aux crédits d'impôt, ouvrez un <strong>REEE</strong> pour 
              votre enfant. Le gouvernement ajoute <strong>30% de subventions</strong> (SCEE + IQEE) sur vos cotisations !
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-violet-700 font-semibold">Économie annuelle vs CPE</span>
                <span className="text-lg font-bold text-violet-900">
                  {formatCurrency(Math.max(0, annualCPECost - annualNetCost))}
                </span>
              </div>
              <p className="text-xs text-violet-600 mt-1">
                À investir dans un REEE pour maximiser les subventions
              </p>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="education" />
        </div>
      </div>
    </div>
  )
}
