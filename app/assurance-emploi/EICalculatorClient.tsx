'use client'

import { useState } from 'react'
import { Clock, DollarSign, TrendingDown, CheckCircle, AlertCircle, Share2, X, Lightbulb } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'
import AdSenseAd from '@/components/AdSenseAd'

// 2026 EI Constants
const MAX_INSURABLE_EARNINGS = 63200
const EI_RATE = 0.55 // 55%
const MAX_WEEKLY_BENEFIT = 668
const ESTIMATED_TAX_RATE = 0.10

// Simplified duration table based on hours worked and regional unemployment
const getDuration = (weeksWorked: number, unemploymentRate: number): number => {
  // Simplified: More weeks worked + higher unemployment = longer benefits
  const baseWeeks = Math.floor(weeksWorked * 0.6)
  const regionalBonus = unemploymentRate > 8 ? 8 : unemploymentRate > 6 ? 5 : 2
  return Math.min(45, Math.max(14, baseWeeks + regionalBonus))
}

export default function EICalculatorClient() {
  const [salary, setSalary] = useState(50000)
  const [weeksWorked, setWeeksWorked] = useState(40)
  const [unemploymentRate, setUnemploymentRate] = useState(6)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  // Calculations
  const insurableEarnings = Math.min(salary, MAX_INSURABLE_EARNINGS)
  const averageWeeklyEarnings = insurableEarnings / 52
  let weeklyBenefit = averageWeeklyEarnings * EI_RATE
  const isAtMaximum = weeklyBenefit >= MAX_WEEKLY_BENEFIT
  weeklyBenefit = Math.min(weeklyBenefit, MAX_WEEKLY_BENEFIT)

  const taxWithholding = weeklyBenefit * ESTIMATED_TAX_RATE
  const weeklyBenefitAfterTax = weeklyBenefit - taxWithholding
  const monthlyBenefit = weeklyBenefit * 4.33

  const duration = getDuration(weeksWorked, unemploymentRate)
  const totalBenefit = weeklyBenefit * duration

  // Gap calculation for visual
  const replacementRate = (weeklyBenefit / (salary / 52)) * 100
  const gapPercent = 100 - replacementRate

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRegionLabel = (rate: number) => {
    if (rate <= 5) return 'Faible (Montréal, Laval)'
    if (rate <= 7) return 'Moyen (Québec, Sherbrooke)'
    return 'Élevé (Gaspésie, Côte-Nord)'
  }

  const handleShare = async () => {
    const text = `💰 Mes prestations AE: ${formatCurrency(weeklyBenefit)}/semaine\nDurée: ${duration} semaines\nTotal: ${formatCurrency(totalBenefit)}\n\nCalculé sur QCFinance.ca`
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href })
      } catch (err) {
        navigator.clipboard.writeText(text)
        alert('✅ Copié dans le presse-papier!')
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('✅ Copié dans le presse-papier!')
    }
  }

  return (
    <>
      {/* MOBILE ONLY: Minimal + Expandable Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-blue-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(weeklyBenefit)}/sem
                </div>
                <div className="text-white/70 text-xs">
                  {duration} semaines • {formatCurrency(totalBenefit)} total
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
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Assurance-Emploi</h3>
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-xs font-semibold mb-1">Par semaine</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(weeklyBenefit)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Durée</div>
                  <div className="text-white text-2xl font-bold">{duration} sem</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Salaire annuel</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Semaines travaillées</span>
                  <span className="text-sm font-bold text-white">{weeksWorked} sem</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="52"
                  value={weeksWorked}
                  onChange={(e) => setWeeksWorked(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('ae-last', JSON.stringify({ salary, weeksWorked }))
                    alert('✅ Sauvegardé!')
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
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

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-1 space-y-4 lg:space-y-6">
        
        {/* Desktop Full Form */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600 flex-shrink-0" />
            <span>Votre Salaire</span>
          </h2>
          
          {/* Salary Input */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              Salaire annuel brut
            </label>
            <div className="relative">
              <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={salary || ''}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full pl-8 lg:pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all touch-manipulation"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full mt-3 accent-blue-600 touch-manipulation"
            />
            {salary > MAX_INSURABLE_EARNINGS && (
              <p className="text-[10px] lg:text-xs text-orange-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>Plafonné à {formatCurrency(MAX_INSURABLE_EARNINGS)} (maximum assurable)</span>
              </p>
            )}
          </div>
        </div>

        {/* Work History Card */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-slate-600 flex-shrink-0" />
            <span>Historique de Travail</span>
          </h2>
          
          {/* Weeks Worked */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              Semaines travaillées (dernière année)
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min="14"
                max="52"
                step="1"
                value={weeksWorked}
                onChange={(e) => setWeeksWorked(Number(e.target.value))}
                className="flex-1 accent-blue-600 touch-manipulation"
              />
              <span className="text-xl lg:text-2xl font-bold text-blue-600 w-16 text-right">
                {weeksWorked}
              </span>
            </div>
            <div className="flex justify-between text-[10px] lg:text-xs text-gray-500">
              <span>14 sem.</span>
              <span>52 sem.</span>
            </div>
          </div>

          {/* Regional Unemployment Rate */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-xs lg:text-sm font-semibold text-gray-700 mb-2">
              Taux de chômage régional
            </label>
            <select
              value={unemploymentRate}
              onChange={(e) => setUnemploymentRate(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all touch-manipulation"
            >
              <option value={4}>4% - Faible (Montréal, Laval)</option>
              <option value={6}>6% - Moyen (Québec, Sherbrooke)</option>
              <option value={9}>9% - Élevé (Gaspésie, Côte-Nord)</option>
            </select>
            <p className="text-[10px] lg:text-xs text-gray-500 mt-2">
              Le taux de chômage de votre région influence la durée des prestations
            </p>
          </div>
        </div>

        {/* Mobile: Collapsible Advanced Options */}
        <details className="lg:hidden bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          <summary className="p-4 cursor-pointer touch-manipulation active:bg-blue-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="font-bold text-slate-900 text-sm">Options avancées</span>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="p-4 pt-2 border-t border-blue-100 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Taux de chômage régional
              </label>
              <select
                value={unemploymentRate}
                onChange={(e) => setUnemploymentRate(Number(e.target.value))}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all touch-manipulation text-sm"
              >
                <option value={4}>4% - Faible</option>
                <option value={6}>6% - Moyen</option>
                <option value={9}>9% - Élevé</option>
              </select>
              <p className="text-[10px] text-gray-500 mt-1">
                Influence la durée des prestations
              </p>
            </div>
          </div>
        </details>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
          
          {/* HERO NUMBER - Weekly Benefit */}
          <div className="bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl lg:rounded-2xl shadow-2xl p-6 lg:p-8 text-white">
            <p className="text-sm lg:text-lg opacity-90 mb-2">Votre prestation hebdomadaire</p>
            <p className="text-4xl md:text-7xl font-bold mb-3 lg:mb-4">
              {formatCurrency(weeklyBenefit)}
            </p>
            <p className="text-blue-100 text-base lg:text-lg mb-2">
              ≈ {formatCurrency(monthlyBenefit)} / mois
            </p>
            <p className="text-xs lg:text-sm text-blue-200">
              (Avant retenue d'impôt de ~10%)
            </p>
          </div>

          {/* TRUST BADGE - Maximum Reached */}
          {isAtMaximum && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl lg:rounded-2xl shadow-xl p-5 lg:p-6 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-base lg:text-lg mb-1">✅ Maximum atteint</p>
                  <p className="text-green-50 text-sm lg:text-base">
                    Vous recevez le montant maximum de <span className="font-bold">{formatCurrency(MAX_WEEKLY_BENEFIT)}/semaine</span>
                  </p>
                  <p className="text-xs lg:text-sm text-green-100 mt-2">
                    Votre salaire dépasse le plafond des gains assurables.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VISUAL BAR - Salary vs Benefit Gap */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-blue-100 p-5 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Remplacement du revenu</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-2">
                <span>Salaire hebdomadaire</span>
                <span className="font-semibold">{formatCurrency(salary / 52)}</span>
              </div>
              <div className="flex h-8 lg:h-10 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-blue-500 flex items-center justify-center text-white text-[10px] lg:text-xs font-semibold"
                  style={{ width: `${replacementRate}%` }}
                >
                  {replacementRate > 20 && `${replacementRate.toFixed(0)}% Couvert`}
                </div>
                <div 
                  className="bg-red-400 flex items-center justify-center text-white text-[10px] lg:text-xs font-semibold"
                  style={{ width: `${gapPercent}%` }}
                >
                  {gapPercent > 20 && `${gapPercent.toFixed(0)}% Écart`}
                </div>
              </div>
              <div className="flex justify-between text-[10px] lg:text-xs text-gray-600 mt-2">
                <span>💙 Prestation AE: {formatCurrency(weeklyBenefit)}</span>
                <span>❤️ Écart: {formatCurrency((salary / 52) - weeklyBenefit)}</span>
              </div>
            </div>

            {/* After Tax */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 lg:p-4 rounded-lg">
              <p className="text-xs lg:text-sm font-semibold text-gray-900 mb-1">Après retenue d'impôt (~10%)</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-xs lg:text-sm">Net estimé par semaine:</span>
                <span className="text-lg lg:text-xl font-bold text-green-600">{formatCurrency(weeklyBenefitAfterTax)}</span>
              </div>
            </div>
          </div>

          {/* TIMELINE - Duration */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-blue-100 p-5 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Durée des prestations</h3>
            
            <div className="text-center mb-4">
              <p className="text-4xl lg:text-5xl font-bold text-indigo-600 mb-2">{duration}</p>
              <p className="text-base lg:text-lg text-gray-700">semaines de couverture</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-3 lg:p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs lg:text-sm text-gray-700">Total des prestations</span>
                <span className="text-xl lg:text-2xl font-bold text-indigo-600">{formatCurrency(totalBenefit)}</span>
              </div>
              <p className="text-[10px] lg:text-xs text-gray-600">
                Basé sur {duration} semaines à {formatCurrency(weeklyBenefit)}/semaine
              </p>
            </div>

            {/* Timeline Visual */}
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${(duration / 45) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] lg:text-xs text-gray-500 mt-1">
                <span>14 sem.</span>
                <span className="font-semibold text-indigo-600">{duration} sem.</span>
                <span>45 sem. (max)</span>
              </div>
            </div>

            <p className="text-[10px] lg:text-xs text-gray-600 mt-4 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 flex-shrink-0" />
              <span>La durée dépend de vos heures travaillées et du taux de chômage régional</span>
            </p>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-blue-100 p-5 lg:p-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
            
            <div className="space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-xs lg:text-sm">Salaire annuel</span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{formatCurrency(salary)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-xs lg:text-sm">Gains assurables</span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{formatCurrency(insurableEarnings)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-xs lg:text-sm">Taux de prestation</span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">55%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-xs lg:text-sm">Semaines travaillées</span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{weeksWorked} semaines</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-xs lg:text-sm">Région</span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{getRegionLabel(unemploymentRate)}</span>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-3 lg:py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg touch-manipulation active:scale-95 min-h-[44px] text-sm lg:text-base"
          >
            <Share2 className="w-5 h-5 flex-shrink-0" />
            <span>Partager mon résultat</span>
          </button>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="savings" />

          {/* Info Note */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
              <strong>Note:</strong> Ceci est une estimation. Service Canada calculera votre prestation exacte basée sur vos relevés d'emploi (RE) des 52 dernières semaines.
            </p>
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
              aria-label="Fermer la publicité"
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
    </div>
    </>
  )
}
