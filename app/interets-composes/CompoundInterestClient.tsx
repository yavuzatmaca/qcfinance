'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function CompoundInterestClient() {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200)
  const [years, setYears] = useState<number>(20)
  const [interestRate, setInterestRate] = useState<number>(7.0)

  // Calculate compound interest with monthly contributions
  const monthlyRate = interestRate / 100 / 12
  const months = years * 12

  // Future value of initial deposit
  const futureValueInitial = initialDeposit * Math.pow(1 + monthlyRate, months)

  // Future value of monthly contributions
  const futureValueContributions = monthlyRate > 0
    ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    : monthlyContribution * months

  // Total future value
  const finalValue = futureValueInitial + futureValueContributions

  // Total invested
  const totalInvested = initialDeposit + (monthlyContribution * 12 * years)

  // Total interest earned (THE MAGIC!)
  const totalInterest = finalValue - totalInvested

  // Interest percentage
  const interestPercentage = finalValue > 0 ? (totalInterest / finalValue) * 100 : 0

  // Generate year-by-year data for visualization
  const generateYearlyData = () => {
    const data = []
    for (let year = 0; year <= years; year++) {
      const m = year * 12
      const fvInitial = initialDeposit * Math.pow(1 + monthlyRate, m)
      const fvContrib = monthlyRate > 0
        ? monthlyContribution * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate)
        : monthlyContribution * m
      const total = fvInitial + fvContrib
      const invested = initialDeposit + (monthlyContribution * 12 * year)
      const interest = total - invested
      
      data.push({
        year,
        invested,
        interest,
        total
      })
    }
    return data
  }

  const yearlyData = generateYearlyData()
  const maxValue = Math.max(...yearlyData.map(d => d.total))

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getRateLabel = (rate: number): string => {
    if (rate <= 2) return 'Compte épargne'
    if (rate <= 5) return 'Obligations'
    if (rate <= 8) return 'Portefeuille équilibré'
    return 'Actions'
  }

  // Rule of 72 calculation
  const yearsToDouble = 72 / interestRate

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">💰</span>
            Vos paramètres
          </h2>

          {/* Initial Deposit */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Dépôt initial
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={initialDeposit || ''}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                step="1000"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[1000, 5000, 10000, 25000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setInitialDeposit(quickAmount)}
                  className="flex-1 py-1 px-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount / 1000}k
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
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                step="50"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[100, 200, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setMonthlyContribution(quickAmount)}
                  className="flex-1 py-1 px-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount}$
                </button>
              ))}
            </div>
          </div>

          {/* Years Slider */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Durée : {years} ans
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 an</span>
              <span>50 ans</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux de rendement : {interestRate.toFixed(1)}% ({getRateLabel(interestRate)})
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1%</span>
              <span>15%</span>
            </div>
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-700">
                💡 <strong>Règle de 72 :</strong> Votre argent doublera en ~{yearsToDouble.toFixed(1)} ans
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* Hero Card - Final Value */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl">🚀</span>
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                Valeur finale
              </span>
            </div>
            <div className="text-6xl lg:text-7xl font-black mb-2">
              {formatCurrency(finalValue)}
            </div>
            <p className="text-indigo-100 text-sm">
              Après {years} ans d'investissement
            </p>
          </div>

          {/* The Magic Card - Interest Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">✨</span>
              <h3 className="text-xl font-bold text-slate-900">La magie des intérêts composés</h3>
            </div>

            {/* Visual Stacked Bar */}
            <div className="mb-6">
              <div className="h-16 rounded-xl overflow-hidden flex shadow-inner">
                <div 
                  className="bg-indigo-500 flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
                  style={{ width: `${(totalInvested / finalValue) * 100}%` }}
                >
                  {totalInvested / finalValue > 0.15 && 'Votre argent'}
                </div>
                <div 
                  className="bg-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm transition-all duration-500"
                  style={{ width: `${(totalInterest / finalValue) * 100}%` }}
                >
                  {totalInterest / finalValue > 0.15 && 'Intérêts GRATUITS'}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-sm text-indigo-600 font-semibold mb-1">Vous investissez</div>
                <div className="text-2xl font-bold text-indigo-900">{formatCurrency(totalInvested)}</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <div className="text-sm text-amber-600 font-semibold mb-1">Intérêts gagnés</div>
                <div className="text-2xl font-bold text-amber-900">{formatCurrency(totalInterest)}</div>
              </div>
            </div>

            {/* Percentage Callout */}
            <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-xl p-4 text-center">
              <div className="text-3xl font-black text-amber-900">
                {interestPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-amber-700 font-semibold">
                de votre fortune vient des intérêts !
              </div>
            </div>
          </div>

          {/* Year-by-Year Growth Visualization */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">📈</span>
              <h3 className="text-xl font-bold text-slate-900">Croissance année par année</h3>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {yearlyData.map((data, index) => {
                if (index === 0) return null // Skip year 0
                
                const investedWidth = (data.invested / maxValue) * 100
                const interestWidth = (data.interest / maxValue) * 100
                const showLabels = years <= 25 || index % 2 === 0 // Show all if ≤25 years, else every other

                return showLabels ? (
                  <div key={data.year} className="group">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-slate-500 w-16">Année {data.year}</span>
                      <div className="flex-1 h-8 rounded-lg overflow-hidden flex shadow-sm">
                        <div 
                          className="bg-indigo-400 transition-all duration-300 group-hover:bg-indigo-500"
                          style={{ width: `${investedWidth}%` }}
                        />
                        <div 
                          className="bg-amber-300 transition-all duration-300 group-hover:bg-amber-400"
                          style={{ width: `${interestWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-24 text-right">
                        {formatCurrency(data.total)}
                      </span>
                    </div>
                  </div>
                ) : null
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-400 rounded"></div>
                <span className="text-slate-600 font-semibold">Capital investi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-300 rounded"></div>
                <span className="text-slate-600 font-semibold">Intérêts composés</span>
              </div>
            </div>
          </div>

          {/* Rule of 72 Explanation Card */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🎯</span>
              <h3 className="text-xl font-bold text-amber-900">La règle de 72</h3>
            </div>
            <p className="text-slate-700 mb-3 text-sm leading-relaxed">
              Voici un truc simple pour calculer combien de temps il faut pour <strong>doubler votre argent</strong> :
            </p>
            <div className="bg-white rounded-xl p-4 mb-3 border border-amber-200">
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Années pour doubler =</div>
                <div className="text-3xl font-black text-amber-900">
                  72 ÷ {interestRate.toFixed(1)}% = {yearsToDouble.toFixed(1)} ans
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              💡 À {interestRate.toFixed(1)}% de rendement, votre argent double tous les ~{yearsToDouble.toFixed(1)} ans. 
              C'est pourquoi commencer tôt est si important !
            </p>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="investment" />

        </div>
      </div>
    </div>
  )
}
