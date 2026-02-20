'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function AutoLoanClient() {
  const [price, setPrice] = useState<number>(35000)
  const [tradeIn, setTradeIn] = useState<number>(0)
  const [downPayment, setDownPayment] = useState<number>(0)
  const [rate, setRate] = useState<number>(7.99)
  const [term, setTerm] = useState<number>(60)

  const TAX_RATE = 0.14975 // 14.975% (TPS + TVQ)

  // Calculate amount to finance
  const priceAfterTradeIn = price - tradeIn - downPayment
  const taxes = priceAfterTradeIn * TAX_RATE
  const amountToFinance = priceAfterTradeIn + taxes

  // Calculate monthly payment
  const monthlyRate = rate / 100 / 12
  const monthlyPayment = monthlyRate > 0
    ? (amountToFinance * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : amountToFinance / term

  // Calculate bi-weekly payment (26 payments per year = 13 months)
  const biWeeklyPayment = (monthlyPayment * 12) / 26

  // Calculate total cost
  const totalPaid = monthlyPayment * term
  const totalInterest = totalPaid - amountToFinance

  // Calculate percentages for visual bar
  const vehicleCostPercent = (priceAfterTradeIn / totalPaid) * 100
  const taxesPercent = (taxes / totalPaid) * 100
  const interestPercent = (totalInterest / totalPaid) * 100

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const isLongTerm = term > 72

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🚗</span>
            Détails du véhicule
          </h2>

          {/* Vehicle Price */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Prix du véhicule
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="1000"
              />
            </div>
          </div>

          {/* Trade-In */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Valeur de l'échange (optionnel)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={tradeIn || ''}
                onChange={(e) => setTradeIn(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="1000"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Mise de fonds (comptant)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={downPayment || ''}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="1000"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {((downPayment / price) * 100).toFixed(1)}% du prix
            </p>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux d'intérêt annuel : {rate.toFixed(2)}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>15%</span>
            </div>
            <div className="mt-2 flex gap-2">
              {[4.99, 6.99, 8.99].map((quickRate) => (
                <button
                  key={quickRate}
                  onClick={() => setRate(quickRate)}
                  className="flex-1 py-1 px-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickRate}%
                </button>
              ))}
            </div>
          </div>

          {/* Term */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Durée du prêt : {term} mois
            </label>
            <input
              type="range"
              min="24"
              max="96"
              step="12"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>24</span>
              <span>96</span>
            </div>
            {isLongTerm && (
              <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-700 font-semibold">
                  ⚠️ Attention : Financement long terme ({term} mois)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Payment Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">💳</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Paiement bi-hebdomadaire
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-2">
                {formatCurrency(biWeeklyPayment)}
              </div>
              <p className="text-sm opacity-80">
                26 paiements par année (aux 2 semaines)
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 text-center">
              <p className="text-sm opacity-80 mb-1">ou mensuel</p>
              <div className="text-3xl font-bold">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-xs opacity-70 mt-1">
                12 paiements par année
              </p>
            </div>

            {/* Interest Warning Badge */}
            {isLongTerm && (
              <div className="mt-6 bg-red-500 rounded-xl p-4 text-center">
                <p className="font-bold text-sm">
                  ⚠️ Financement long terme !
                </p>
                <p className="text-xs mt-1 opacity-90">
                  Vous paierez {formatCurrency(totalInterest)} en intérêts
                </p>
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Répartition des coûts
            </h3>

            {/* Visual Stacked Bar */}
            <div className="mb-6">
              <div className="h-12 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${vehicleCostPercent}%` }}
                >
                  {vehicleCostPercent > 15 && 'Véhicule'}
                </div>
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${taxesPercent}%` }}
                >
                  {taxesPercent > 8 && 'Taxes'}
                </div>
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${interestPercent}%` }}
                >
                  {interestPercent > 8 && 'Intérêts'}
                </div>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-500 rounded"></div>
                  <span className="text-sm text-slate-700">Prix du véhicule</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(priceAfterTradeIn)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-slate-700">Taxes (TPS + TVQ)</span>
                </div>
                <span className="font-bold text-orange-600">{formatCurrency(taxes)}</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">Montant financé</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(amountToFinance)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-slate-700">Intérêts totaux</span>
                </div>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-slate-900">Coût total</span>
                <span className="text-2xl font-extrabold text-blue-900">{formatCurrency(totalPaid)}</span>
              </div>
            </div>
          </div>

          {/* Bi-Weekly Advantage */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200 p-6">
            <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Avantage des paiements bi-hebdomadaires
            </h4>
            <p className="text-sm text-emerald-800 mb-3">
              En payant aux 2 semaines au lieu de mensuellement, vous faites <strong>26 paiements par année</strong> 
              (équivalent à 13 mois), ce qui rembourse votre prêt plus rapidement.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-emerald-700 font-semibold">Économie estimée d'intérêts</span>
                <span className="text-lg font-bold text-emerald-900">
                  {formatCurrency(totalInterest * 0.08)}
                </span>
              </div>
              <p className="text-xs text-emerald-600 mt-1">
                ~8% d'économie sur les intérêts totaux
              </p>
            </div>
          </div>

          {/* Payment Summary Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Durée</div>
              <div className="text-2xl font-bold text-slate-900">{term} mois</div>
              <div className="text-xs text-slate-500 mt-1">{(term / 12).toFixed(1)} ans</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Taux</div>
              <div className="text-2xl font-bold text-slate-900">{rate.toFixed(2)}%</div>
              <div className="text-xs text-slate-500 mt-1">annuel</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Mise de fonds</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(downPayment + tradeIn)}</div>
              <div className="text-xs text-slate-500 mt-1">
                {tradeIn > 0 ? `${formatCurrency(downPayment)} + ${formatCurrency(tradeIn)} échange` : 'comptant'}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Paiements</div>
              <div className="text-2xl font-bold text-slate-900">{term}</div>
              <div className="text-xs text-slate-500 mt-1">mensuels</div>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="auto" />
        </div>
      </div>
    </div>
  )
}
