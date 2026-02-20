'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function RetirementClient() {
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentSavings, setCurrentSavings] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500)
  const [returnRate, setReturnRate] = useState<number>(6.0)

  // Calculate years to grow
  const yearsToGrow = Math.max(0, retirementAge - currentAge)
  const monthsToGrow = yearsToGrow * 12
  const monthlyRate = returnRate / 100 / 12

  // Future Value of Current Savings (Principal)
  const futureValuePrincipal = currentSavings * Math.pow(1 + monthlyRate, monthsToGrow)

  // Future Value of Monthly Contributions (Series)
  const futureValueContributions = monthlyRate > 0
    ? monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToGrow) - 1) / monthlyRate)
    : monthlyContribution * monthsToGrow

  // Total Capital at Retirement
  const totalCapital = futureValuePrincipal + futureValueContributions

  // Monthly Retirement Income (4% Rule)
  const monthlyRetirementIncome = (totalCapital * 0.04) / 12

  // Total Contributed
  const totalContributed = currentSavings + (monthlyContribution * 12 * yearsToGrow)

  // Total Interest Earned (The Magic!)
  const totalInterestEarned = totalCapital - totalContributed

  // Percentage from compound interest
  const interestPercentage = totalCapital > 0 ? (totalInterestEarned / totalCapital) * 100 : 0

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getReturnRateLabel = (rate: number): string => {
    if (rate <= 4) return 'Conservateur'
    if (rate <= 6) return 'Modéré'
    return 'Agressif'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 p-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            Votre plan
          </h2>

          {/* Age Sliders */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Âge actuel : {currentAge} ans
            </label>
            <input
              type="range"
              min="18"
              max="70"
              step="1"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>18</span>
              <span>70</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Âge de retraite : {retirementAge} ans
            </label>
            <input
              type="range"
              min="50"
              max="75"
              step="1"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>50</span>
              <span>75</span>
            </div>
            <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-xs text-emerald-700 font-semibold">
                ⏰ {yearsToGrow} années pour faire croître votre épargne
              </p>
            </div>
          </div>

          {/* Current Savings */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Épargne actuelle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={currentSavings || ''}
                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                step="1000"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[0, 5000, 10000, 25000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setCurrentSavings(quickAmount)}
                  className="flex-1 py-1 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount === 0 ? '0' : `${quickAmount / 1000}k`}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Cotisation mensuelle
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={monthlyContribution || ''}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                step="50"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[200, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setMonthlyContribution(quickAmount)}
                  className="flex-1 py-1 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount}$
                </button>
              ))}
            </div>
          </div>

          {/* Return Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Rendement espéré : {returnRate.toFixed(1)}% ({getReturnRateLabel(returnRate)})
            </label>
            <input
              type="range"
              min="4"
              max="8"
              step="0.5"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4%</span>
              <span>8%</span>
            </div>
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-700">
                💡 <strong>Historique :</strong> Les portefeuilles diversifiés (60/40) ont généré ~6% annuellement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Monthly Income Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">🌴</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Rente mensuelle estimée à la retraite
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-4">
                {formatCurrency(monthlyRetirementIncome)}
              </div>
              <p className="text-sm opacity-80 mb-1">
                Basé sur la règle du 4% (retrait sécuritaire)
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Capital total à {retirementAge} ans</span>
                <span className="text-2xl font-bold">{formatCurrency(totalCapital)}</span>
              </div>
            </div>
          </div>

          {/* The Magic Visual - Compound Interest Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
              ✨ La magie des intérêts composés
            </h3>

            {/* Stacked Bar */}
            <div className="mb-6">
              <div className="h-20 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${(totalContributed / totalCapital) * 100}%` }}
                >
                  <span className="text-xs font-bold">VOTRE ARGENT</span>
                  <span className="text-lg font-extrabold">{formatCurrency(totalContributed)}</span>
                </div>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${(totalInterestEarned / totalCapital) * 100}%` }}
                >
                  <span className="text-xs font-bold">INTÉRÊTS</span>
                  <span className="text-lg font-extrabold">{formatCurrency(totalInterestEarned)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-6 text-center">
              <p className="text-lg font-bold text-amber-900 mb-2">
                🎉 Regardez ! {interestPercentage.toFixed(0)}% de votre retraite provient des intérêts !
              </p>
              <p className="text-sm text-amber-800">
                Vous investissez {formatCurrency(totalContributed)}, le marché vous donne {formatCurrency(totalInterestEarned)} GRATUITEMENT
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Détails de votre épargne
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Épargne initiale</span>
                <span className="font-bold text-slate-900">{formatCurrency(currentSavings)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Cotisations mensuelles</span>
                <span className="font-bold text-slate-900">{formatCurrency(monthlyContribution)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Durée d'investissement</span>
                <span className="font-bold text-slate-900">{yearsToGrow} ans</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Rendement annuel</span>
                <span className="font-bold text-emerald-600">{returnRate.toFixed(1)}%</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-slate-700">Total investi</span>
                </div>
                <span className="font-bold text-blue-600">{formatCurrency(totalContributed)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-slate-700">Intérêts gagnés</span>
                </div>
                <span className="font-bold text-emerald-600">{formatCurrency(totalInterestEarned)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-slate-900">Capital total</span>
                <span className="text-2xl font-extrabold text-emerald-900">{formatCurrency(totalCapital)}</span>
              </div>
            </div>
          </div>

          {/* 4% Rule Explanation */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-6">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              La règle du 4%
            </h4>
            <p className="text-sm text-purple-800 mb-3">
              La <strong>règle du 4%</strong> suggère que vous pouvez retirer 4% de votre capital chaque année 
              sans risquer d'épuiser vos économies. C'est une stratégie éprouvée pour une retraite de 30+ ans.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-purple-700 font-semibold">Retrait annuel sécuritaire</span>
                <span className="text-lg font-bold text-purple-900">
                  {formatCurrency(totalCapital * 0.04)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-700 font-semibold">Soit par mois</span>
                <span className="text-lg font-bold text-purple-900">
                  {formatCurrency(monthlyRetirementIncome)}
                </span>
              </div>
            </div>
          </div>

          {/* Start Early Impact */}
          {currentAge < 35 && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="text-xl font-bold mb-2">
                  Vous avez un avantage ÉNORME !
                </h4>
                <p className="text-sm opacity-90 mb-3">
                  En commençant à {currentAge} ans, vous avez {yearsToGrow} années pour profiter des intérêts composés. 
                  C'est l'arme secrète des millionnaires !
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-xs font-semibold">
                    💡 Chaque année que vous attendez vous coûte des dizaines de milliers de dollars
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Affiliate Card */}
          <AffiliateCard variant="investment" />
        </div>
      </div>
    </div>
  )
}
