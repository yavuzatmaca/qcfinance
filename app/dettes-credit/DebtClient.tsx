'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function DebtClient() {
  const [balance, setBalance] = useState<number>(5000)
  const [interestRate, setInterestRate] = useState<number>(19.99)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200)

  // Calculate minimum payment (typically 3% of balance or $10, whichever is greater)
  const minimumPayment = Math.max(10, balance * 0.03)

  // Calculate months to payoff with user's payment
  const monthlyRate = interestRate / 100 / 12
  let monthsToPayoff = 0
  let totalInterest = 0

  if (monthlyPayment > balance * monthlyRate) {
    // Can actually pay off the debt
    monthsToPayoff = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate)
    totalInterest = (monthlyPayment * monthsToPayoff) - balance
  } else {
    // Payment is too low, debt will never be paid off
    monthsToPayoff = 999
    totalInterest = 999999
  }

  // Calculate scenario with minimum payment only
  let monthsMinimum = 0
  let totalInterestMinimum = 0

  if (minimumPayment > balance * monthlyRate) {
    monthsMinimum = Math.log(minimumPayment / (minimumPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate)
    totalInterestMinimum = (minimumPayment * monthsMinimum) - balance
  } else {
    monthsMinimum = 999
    totalInterestMinimum = 999999
  }

  // Calculate payoff date
  const payoffDate = new Date()
  payoffDate.setMonth(payoffDate.getMonth() + Math.round(monthsToPayoff))

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' })
  }

  const isDangerous = monthlyPayment <= minimumPayment * 1.1 // Within 10% of minimum
  const isImpossible = monthsToPayoff > 500

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-300 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">💳</span>
            Votre dette
          </h2>

          {/* Balance */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Solde total de la dette
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={balance || ''}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                step="100"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[2000, 5000, 10000, 20000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setBalance(quickAmount)}
                  className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux d'intérêt annuel : {interestRate.toFixed(2)}%
            </label>
            <input
              type="range"
              min="10"
              max="30"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>10%</span>
              <span>30%</span>
            </div>
            <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700">
                💡 <strong>Taux moyen carte de crédit :</strong> 19.99%
              </p>
            </div>
          </div>

          {/* Monthly Payment */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Votre paiement mensuel
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={monthlyPayment || ''}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                step="10"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Paiement minimum : {formatCurrency(minimumPayment)}
            </p>
          </div>

          {/* Warning if payment is too low */}
          {isDangerous && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h3 className="font-bold text-red-900 text-sm mb-1">
                    Attention !
                  </h3>
                  <p className="text-xs text-red-800">
                    Votre paiement est trop proche du minimum. Vous paierez énormément d'intérêts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Freedom Date Card */}
          {!isImpossible ? (
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
              <div className="text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-lg font-medium opacity-90 mb-2">
                  Libre de dettes en
                </h2>
                <div className="text-6xl lg:text-7xl font-extrabold mb-2">
                  {Math.round(monthsToPayoff)} mois
                </div>
                <p className="text-xl opacity-90 mb-4">
                  {formatDate(payoffDate)}
                </p>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="text-sm opacity-80">Intérêts totaux</p>
                  <div className="text-3xl font-bold mt-1">
                    {formatCurrency(totalInterest)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
              <div className="text-center">
                <div className="text-5xl mb-3">🚨</div>
                <h2 className="text-2xl font-bold mb-4">
                  Paiement insuffisant !
                </h2>
                <p className="text-lg opacity-90 mb-4">
                  Votre paiement de {formatCurrency(monthlyPayment)} ne couvre même pas les intérêts mensuels 
                  de {formatCurrency(balance * monthlyRate)}.
                </p>
                <p className="text-sm opacity-80">
                  Votre dette augmentera chaque mois au lieu de diminuer.
                </p>
              </div>
            </div>
          )}

          {/* The Trap Warning - Minimum Payment Comparison */}
          {isDangerous && !isImpossible && (
            <div className="bg-red-50 border-4 border-red-400 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  Le piège du paiement minimum
                </h3>
                <p className="text-sm text-red-800">
                  En payant seulement le minimum, vous prendrez <strong>{Math.round(monthsMinimum / 12)} ans</strong> 
                  et paierez <strong>{formatCurrency(totalInterestMinimum)}</strong> en intérêts !
                </p>
              </div>
            </div>
          )}

          {/* Visual Comparison */}
          {!isImpossible && (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Comparaison des scénarios
              </h3>

              <div className="space-y-6">
                {/* Your Plan */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-bold text-emerald-700 flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      Votre plan ({formatCurrency(monthlyPayment)}/mois)
                    </span>
                    <span className="text-lg font-bold text-emerald-900">{Math.round(monthsToPayoff)} mois</span>
                  </div>
                  <div className="h-16 bg-emerald-100 rounded-xl overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-end pr-4"
                      style={{ width: '100%' }}
                    >
                      <span className="text-white font-bold text-sm">
                        Intérêts : {formatCurrency(totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Minimum Payment Scenario */}
                {monthsMinimum < 500 && (
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-bold text-red-700 flex items-center gap-2">
                        <span className="text-2xl">❌</span>
                        Paiement minimum ({formatCurrency(minimumPayment)}/mois)
                      </span>
                      <span className="text-lg font-bold text-red-900">{Math.round(monthsMinimum)} mois</span>
                    </div>
                    <div className="h-16 bg-red-100 rounded-xl overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-end pr-4"
                        style={{ width: `${Math.min((monthsMinimum / monthsToPayoff) * 100, 300)}%` }}
                      >
                        <span className="text-white font-bold text-sm">
                          Intérêts : {formatCurrency(totalInterestMinimum)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Savings Display */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-900">Économie avec votre plan</span>
                    <span className="text-2xl font-extrabold text-emerald-900">
                      {formatCurrency(Math.max(0, totalInterestMinimum - totalInterest))}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Vous économisez {Math.round(monthsMinimum - monthsToPayoff)} mois de paiements
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          {!isImpossible && (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Détails du remboursement
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Dette initiale</span>
                  <span className="font-bold text-slate-900">{formatCurrency(balance)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Intérêts totaux</span>
                  <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
                </div>

                <div className="h-px bg-slate-200"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Total à rembourser</span>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(balance + totalInterest)}
                  </span>
                </div>

                <div className="h-px bg-slate-300"></div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-slate-700">Paiement mensuel</span>
                  <span className="text-lg font-bold text-slate-900">{formatCurrency(monthlyPayment)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Durée</span>
                  <span className="text-lg font-bold text-slate-900">
                    {Math.round(monthsToPayoff)} mois ({(monthsToPayoff / 12).toFixed(1)} ans)
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-700">Date de liberté</span>
                  <span className="text-lg font-bold text-emerald-600">{formatDate(payoffDate)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Accelerated Payment Tip */}
          {!isImpossible && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Payez plus, économisez plus
              </h4>
              <p className="text-sm text-blue-800 mb-3">
                En ajoutant seulement <strong>50$ par mois</strong>, vous pourriez économiser des centaines 
                de dollars en intérêts et vous libérer plus rapidement.
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-700 font-semibold">Paiement accéléré</span>
                  <span className="text-lg font-bold text-blue-900">
                    {formatCurrency(monthlyPayment + 50)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Affiliate Card */}
          <AffiliateCard variant="debt" />
        </div>
      </div>
    </div>
  )
}
