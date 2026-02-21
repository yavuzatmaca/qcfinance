'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { CreditCard, Share2, Bookmark, X, AlertTriangle, CheckCircle } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function DebtClient() {
  const [balance, setBalance] = useState<number>(5000)
  const [interestRate, setInterestRate] = useState<number>(19.99)
  const [monthlyPayment, setMonthlyPayment] = useState<number>(200)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)
  const [showStickyAd, setShowStickyAd] = useState(true)

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

  const handleShare = async () => {
    const shareData = {
      title: 'Calculateur de Dette',
      text: `Libre de dettes en ${Math.round(monthsToPayoff)} mois!\nÉconomie: ${formatCurrency(Math.max(0, totalInterestMinimum - totalInterest))}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert('Copié dans le presse-papier!')
    }
  }

  return (
    <>
      {/* MOBILE ONLY: Minimal + Expandable Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-red-600 to-orange-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-red-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {isImpossible ? 'Paiement insuffisant!' : `${Math.round(monthsToPayoff)} mois`}
                </div>
                <div className="text-white/70 text-xs">
                  {isImpossible ? 'Augmentez votre paiement' : `Intérêts: ${formatCurrency(totalInterest)}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-xs font-semibold">Modifier</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        ) : (
          <div className="p-4 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Calculateur de Dette</h3>
                  <p className="text-white/70 text-xs">Ajustez vos paramètres</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickCalcExpanded(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center touch-manipulation active:scale-95 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>

            {/* Quick Inputs Grid */}
            <div className="space-y-3">
              {/* Balance */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Solde de la dette
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center font-bold focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm min-h-[44px] touch-manipulation"
                  placeholder="5000"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Taux d'intérêt: {interestRate.toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-white touch-manipulation"
                />
              </div>

              {/* Monthly Payment */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Paiement mensuel
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center font-bold focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm min-h-[44px] touch-manipulation"
                  placeholder="200"
                />
              </div>
            </div>

            {/* Result Display */}
            <div className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="text-center">
                <div className="text-white/80 text-xs font-medium mb-1">
                  {isImpossible ? 'Paiement insuffisant' : 'Libre de dettes en'}
                </div>
                <div className="text-white text-3xl font-bold">
                  {isImpossible ? '∞' : `${Math.round(monthsToPayoff)} mois`}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  {isImpossible ? 'Augmentez votre paiement' : `Intérêts: ${formatCurrency(totalInterest)}`}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isImpossible && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-semibold transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
                <button
                  onClick={() => alert('Scénario sauvegardé!')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-semibold transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  <Bookmark className="w-4 h-4" />
                  Sauvegarder
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-300 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-red-600" />
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
                inputMode="decimal"
                value={balance || ''}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px] touch-manipulation"
                step="100"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[2000, 5000, 10000, 20000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setBalance(quickAmount)}
                  className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded text-xs font-semibold transition-colors min-h-[44px] touch-manipulation active:scale-95"
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
              <p className="text-xs text-red-700 flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <strong>Taux moyen carte de crédit :</strong> 19.99%
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
                inputMode="decimal"
                value={monthlyPayment || ''}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px] touch-manipulation"
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
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
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
                <div className="mb-3 flex justify-center">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
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
                <div className="mb-3 flex justify-center">
                  <AlertTriangle className="w-16 h-16" />
                </div>
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
                <div className="mb-2 flex justify-center">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
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
                      <CheckCircle className="w-6 h-6" />
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
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
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
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
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

      {/* STICKY BOTTOM AD - Mobile Only */}
      {showStickyAd && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
          <div className="relative">
            <button
              onClick={() => setShowStickyAd(false)}
              className="absolute -top-8 right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700 transition-colors z-10 touch-manipulation active:scale-95"
              aria-label="Fermer la publicité"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="min-h-[100px] flex items-center justify-center">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
