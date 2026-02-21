'use client'

import { useState } from 'react'
import { Home, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Share2, Bookmark, X } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'
import AdSenseAd from '@/components/AdSenseAd'

// Banking Constants
const GDS_LIMIT = 0.39 // 39% - Gross Debt Service
const TDS_LIMIT = 0.44 // 44% - Total Debt Service
const PROPERTY_TAX_RATE = 0.01 / 12 // 1% annually
const HEATING_ESTIMATE = 150 // Monthly
const CONDO_FEES_DEFAULT = 0 // Monthly

export default function AffordabilityClient() {
  const [income, setIncome] = useState(80000)
  const [debts, setDebts] = useState(0)
  const [downPayment, setDownPayment] = useState(50000)
  const [rate, setRate] = useState(5.0)
  const [expenses, setExpenses] = useState(HEATING_ESTIMATE + CONDO_FEES_DEFAULT)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  // Calculations
  const monthlyIncome = income / 12
  const stressTestRate = rate + 2 // Stress test = rate + 2%

  // GDS Limit (39% of income for housing costs)
  const gdsLimit = monthlyIncome * GDS_LIMIT

  // TDS Limit (44% of income minus other debts)
  const tdsLimit = (monthlyIncome * TDS_LIMIT) - debts

  // Max Payment Allowed (most restrictive)
  const maxPaymentAllowed = Math.min(gdsLimit, tdsLimit)

  // Available for mortgage (after expenses)
  const availableForMortgage = Math.max(0, maxPaymentAllowed - expenses)

  // Calculate Max Mortgage using stress test rate
  const monthlyStressRate = stressTestRate / 100 / 12
  const numberOfPayments = 25 * 12
  let maxMortgage = 0

  if (monthlyStressRate > 0) {
    const factor = Math.pow(1 + monthlyStressRate, numberOfPayments)
    maxMortgage = availableForMortgage * (factor - 1) / (monthlyStressRate * factor)
  } else {
    maxMortgage = availableForMortgage * numberOfPayments
  }

  // Max Purchase Price
  const maxPrice = maxMortgage + downPayment

  // Calculate actual ratios
  const monthlyMortgagePayment = calculateMonthlyPayment(maxMortgage, stressTestRate, 25)
  const totalHousingCosts = monthlyMortgagePayment + expenses
  const gdsRatio = (totalHousingCosts / monthlyIncome) * 100
  const tdsRatio = ((totalHousingCosts + debts) / monthlyIncome) * 100

  // Debt reduction impact
  const debtReduction = debts > 0 ? (debts / monthlyStressRate) * (Math.pow(1 + monthlyStressRate, numberOfPayments) - 1) / Math.pow(1 + monthlyStressRate, numberOfPayments) : 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
    const monthlyRate = annualRate / 100 / 12
    const numberOfPayments = years * 12
    
    if (monthlyRate === 0) return principal / numberOfPayments
    
    const factor = Math.pow(1 + monthlyRate, numberOfPayments)
    return principal * (monthlyRate * factor) / (factor - 1)
  }

  const handleShare = async () => {
    const text = `🏠 Ma capacité d'emprunt:\nPrix maximum: ${formatCurrency(maxPrice)}\nHypothèque: ${formatCurrency(maxMortgage)}\n\nCalculé sur QCFinance.ca`
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href })
      } catch (err) {
        navigator.clipboard.writeText(text)
        alert('✅ Copié!')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('✅ Copié!')
    }
  }

  const handleSave = () => {
    const calculation = {
      income, debts, downPayment, rate, maxPrice, maxMortgage,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('capacite-emprunt-last', JSON.stringify(calculation))
    alert('✅ Sauvegardé!')
  }

  return (
    <>
      {/* MOBILE ONLY: Minimal Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-violet-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(maxPrice)}
                </div>
                <div className="text-white/70 text-xs">
                  Hypothèque: {formatCurrency(maxMortgage)}
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
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Capacité d'Emprunt</h3>
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

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white/80 text-xs font-semibold mb-1">Prix maximum</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(maxPrice)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Hypothèque</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(maxMortgage)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-white/70">GDS: <span className="font-bold text-white">{gdsRatio.toFixed(1)}%</span></div>
                <div className="text-white/70">TDS: <span className="font-bold text-white">{tdsRatio.toFixed(1)}%</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Revenu annuel</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Mise de fonds</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  <Bookmark className="w-4 h-4" />
                  Sauvegarder
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Income & Debts Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-violet-600" />
            Revenus & Dettes
          </h2>
          
          {/* Annual Income */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenu annuel brut (vous + partenaire)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all touch-manipulation min-h-[44px]"
              />
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mt-3 accent-violet-600"
            />
          </div>

          {/* Monthly Debts */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dettes mensuelles (cartes, prêts auto)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all touch-manipulation min-h-[44px]"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Incluez tous les paiements mensuels récurrents
            </p>
          </div>
        </div>

        {/* Down Payment & Rate Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-600" />
            Mise de Fonds & Taux
          </h2>
          
          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mise de fonds disponible
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all touch-manipulation min-h-[44px]"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full mt-3 accent-violet-600"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Taux d'intérêt hypothécaire
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.1"
                min="2"
                max="10"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all touch-manipulation min-h-[44px]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button
                onClick={() => setRate(4.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                  rate === 4.5 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.5%
              </button>
              <button
                onClick={() => setRate(5.0)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                  rate === 5.0 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.0%
              </button>
              <button
                onClick={() => setRate(5.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                  rate === 5.5 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.5%
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Test de résistance: {(rate + 2).toFixed(1)}% (taux + 2%)
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Max Price */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Prix maximum</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(maxPrice)}
            </p>
            <p className="text-violet-100 text-lg">
              Hypothèque max: {formatCurrency(maxMortgage)}
            </p>
          </div>

          {/* THE "RATIO" BADGE */}
          {debts > 0 && debtReduction > 0 && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">⚠️ Impact de vos dettes</p>
                  <p className="text-orange-50">
                    Vos dettes de <span className="font-bold">{formatCurrency(debts)}/mois</span> réduisent votre budget d'environ <span className="font-bold text-2xl">{formatCurrency(debtReduction)}</span>
                  </p>
                  <p className="text-sm text-orange-100 mt-2">
                    💡 Remboursez vos dettes pour augmenter votre capacité d'achat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VISUAL GAUGE - GDS/TDS Usage */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ratios d'endettement</h3>
            
            {/* GDS Ratio */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Ratio ABD (GDS) - Logement</span>
                <span className={`text-xl font-bold ${gdsRatio <= 39 ? 'text-green-600' : 'text-red-600'}`}>
                  {gdsRatio.toFixed(1)}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${gdsRatio <= 39 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((gdsRatio / 39) * 100, 100)}%` }}
                  />
                </div>
                <div className="absolute right-0 top-5 text-xs text-gray-500">
                  Max: 39%
                </div>
              </div>
            </div>

            {/* TDS Ratio */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Ratio ATD (TDS) - Total</span>
                <span className={`text-xl font-bold ${tdsRatio <= 44 ? 'text-green-600' : 'text-red-600'}`}>
                  {tdsRatio.toFixed(1)}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${tdsRatio <= 44 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((tdsRatio / 44) * 100, 100)}%` }}
                  />
                </div>
                <div className="absolute right-0 top-5 text-xs text-gray-500">
                  Max: 44%
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {gdsRatio <= 39 && tdsRatio <= 44 ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-semibold">
                  ✅ Excellent ! Vos ratios respectent les normes bancaires.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-semibold">
                  ⚠️ Attention : Vos ratios dépassent les limites recommandées.
                </p>
              </div>
            )}
          </div>

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Revenu mensuel</span>
                <span className="font-semibold text-gray-900">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Paiement max (GDS 39%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(gdsLimit)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Paiement max (TDS 44%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(tdsLimit)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Dettes mensuelles</span>
                <span className="font-semibold text-red-600">{formatCurrency(debts)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Dépenses (taxes, chauffage)</span>
                <span className="font-semibold text-orange-600">{formatCurrency(expenses)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-violet-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Hypothèque maximum</span>
                <span className="font-bold text-violet-600 text-xl">{formatCurrency(maxMortgage)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-indigo-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Prix maximum</span>
                <span className="font-bold text-indigo-600 text-2xl">{formatCurrency(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="mortgage" />

          {/* Info Card */}
          <div className="bg-violet-50 border-l-4 border-violet-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ce calcul utilise le test de résistance ({(rate + 2).toFixed(1)}%) et un amortissement de 25 ans. Les banques peuvent avoir des critères additionnels. Consultez un courtier hypothécaire pour une évaluation précise.
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* Sticky Bottom Ad - Mobile Only */}
      {showStickyAd && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-slate-200 shadow-2xl">
          <div className="relative">
            <button
              onClick={() => setShowStickyAd(false)}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-slate-800/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all touch-manipulation active:scale-95"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-4 pb-6">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" adFormat="auto" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
