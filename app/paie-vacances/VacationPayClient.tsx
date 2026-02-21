'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Palmtree, Info, TrendingUp, Calendar, Share2, Bookmark, X, Plane, Gift } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function VacationPayClient() {
  const [grossSalary, setGrossSalary] = useState<number>(50000)
  const [yearsOfService, setYearsOfService] = useState<number>(1)
  const [includeOvertime, setIncludeOvertime] = useState<boolean>(true)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  // Quebec Labour Standards: 4% for <3 years, 6% for >=3 years
  const vacationRate = yearsOfService >= 3 ? 0.06 : 0.04
  const vacationWeeks = yearsOfService >= 3 ? 3 : 2

  // Calculate vacation pay
  const vacationPay = grossSalary * vacationRate

  // Calculate daily vacation pay (assuming 5-day work week)
  const dailyVacationPay = vacationPay / (vacationWeeks * 5)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const isEligibleForBonus = yearsOfService >= 3

  const handleShare = async () => {
    const text = `💰 Mon indemnité de vacances: ${formatCurrency(vacationPay)}\n${vacationWeeks} semaines de vacances (${(vacationRate * 100).toFixed(0)}%)\n\nCalculé sur QCFinance.ca`
    
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
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-teal-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Palmtree className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(vacationPay)}
                </div>
                <div className="text-white/70 text-xs">
                  {yearsOfService} {yearsOfService === 1 ? 'an' : 'ans'} • {(vacationRate * 100).toFixed(0)}% • {vacationWeeks} sem
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
                  <Palmtree className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Indemnité Vacances</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Indemnité</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(vacationPay)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Semaines</div>
                  <div className="text-white text-2xl font-bold">{vacationWeeks}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Salaire brut annuel</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[40000, 50000, 60000, 75000].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setGrossSalary(quick)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        grossSalary === quick ? 'bg-white text-teal-600' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quick / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Années de service</span>
                  <span className="text-sm font-bold text-white">{yearsOfService} {yearsOfService === 1 ? 'an' : 'ans'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[1, 3, 5].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setYearsOfService(quick)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        yearsOfService === quick ? 'bg-white text-teal-600' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quick} {quick === 1 ? 'an' : 'ans'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('paie-vacances-last', JSON.stringify({ grossSalary, yearsOfService }))
                    alert('✅ Sauvegardé!')
                  }}
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

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-4 lg:space-y-6 order-2 lg:order-1">
        {/* Desktop Full Form */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-teal-900 mb-4 lg:mb-6 flex items-center gap-2">
            <Palmtree className="w-6 h-6 lg:w-8 lg:h-8 text-teal-600 flex-shrink-0" />
            <span>Vos informations</span>
          </h2>

          {/* Gross Salary */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2">
              Salaire brut annuel (année de référence)
            </label>
            <div className="relative">
              <span className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base lg:text-lg font-semibold pointer-events-none">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={grossSalary || ''}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full pl-8 lg:pl-10 pr-4 py-3 text-lg lg:text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 touch-manipulation"
                step="1000"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[40000, 50000, 60000, 75000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setGrossSalary(quickAmount)}
                  className="flex-1 py-2 px-2 bg-teal-100 hover:bg-teal-200 active:bg-teal-300 text-teal-900 rounded text-xs font-semibold transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  {quickAmount / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Years of Service */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-xs lg:text-sm font-bold text-slate-700 mb-2">
              Années de service continu : {yearsOfService} {yearsOfService === 1 ? 'an' : 'ans'}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600 touch-manipulation"
            />
            <div className="flex justify-between text-[10px] lg:text-xs text-slate-500 mt-1">
              <span>1 an</span>
              <span>10+ ans</span>
            </div>
            
            {/* Rate Display */}
            <div className={`mt-3 rounded-lg p-3 ${isEligibleForBonus ? 'bg-amber-50 border-2 border-amber-300' : 'bg-teal-50 border border-teal-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm font-semibold text-slate-700">Taux applicable</span>
                <span className={`text-xl lg:text-2xl font-bold ${isEligibleForBonus ? 'text-amber-600' : 'text-teal-600'}`}>
                  {(vacationRate * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[10px] lg:text-xs text-slate-600 mt-1">
                {vacationWeeks} semaines de vacances
              </p>
            </div>
          </div>

          {/* Include Overtime Toggle */}
          <div className="mb-4 lg:mb-6">
            <label className="flex items-center gap-3 cursor-pointer touch-manipulation">
              <input
                type="checkbox"
                checked={includeOvertime}
                onChange={(e) => setIncludeOvertime(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500 touch-manipulation"
              />
              <div>
                <span className="text-xs lg:text-sm font-bold text-slate-700">Inclure les heures supplémentaires</span>
                <p className="text-[10px] lg:text-xs text-slate-500">
                  L'indemnité est calculée sur tous vos gains (salaire + heures sup + primes)
                </p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-3 lg:p-4">
            <div className="flex gap-2 lg:gap-3">
              <Info className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-teal-900 text-xs lg:text-sm mb-1">
                  Année de référence
                </h3>
                <p className="text-[10px] lg:text-xs text-teal-800 leading-relaxed">
                  L'indemnité est calculée sur votre salaire brut gagné du <strong>1er mai au 30 avril</strong>. 
                  Tous vos revenus de cette période comptent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Collapsible Advanced Options */}
        <details className="lg:hidden bg-white rounded-xl shadow-lg border-2 border-teal-200 overflow-hidden">
          <summary className="p-4 cursor-pointer touch-manipulation active:bg-teal-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span className="font-bold text-slate-900 text-sm">Options avancées</span>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="p-4 pt-2 border-t border-teal-100 space-y-3">
            <div>
              <label className="flex items-center gap-3 cursor-pointer touch-manipulation">
                <input
                  type="checkbox"
                  checked={includeOvertime}
                  onChange={(e) => setIncludeOvertime(e.target.checked)}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-700">Inclure les heures supplémentaires</span>
                  <p className="text-[10px] text-slate-500">
                    Tous vos gains comptent dans le calcul
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-teal-900 text-xs mb-1">
                    Année de référence
                  </h3>
                  <p className="text-[10px] text-teal-800 leading-relaxed">
                    Du <strong>1er mai au 30 avril</strong>. Tous vos revenus comptent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
          {/* Hero Vacation Pay Card */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl lg:rounded-2xl shadow-2xl p-6 lg:p-10 text-white">
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <svg className="w-12 h-12 lg:w-16 lg:h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <h2 className="text-sm lg:text-lg font-medium opacity-90 mb-2">
                Indemnité de vacances
              </h2>
              <div className="text-4xl lg:text-7xl font-extrabold mb-3 lg:mb-4">
                {formatCurrency(vacationPay)}
              </div>
              <p className="text-base lg:text-xl opacity-90 mb-1">
                {(vacationRate * 100).toFixed(0)}% de votre salaire brut
              </p>
            </div>

            <div className="border-t border-white/20 pt-4 lg:pt-6 mt-4 lg:mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xs lg:text-sm opacity-80">Vous avez droit à</span>
                <span className="text-xl lg:text-2xl font-bold">{vacationWeeks} semaines</span>
              </div>
            </div>
          </div>

          {/* Bonus Badge for 3+ years */}
          {isEligibleForBonus && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl lg:rounded-2xl shadow-xl p-5 lg:p-6 text-white text-center">
              <div className="mb-3 flex justify-center">
                <Gift className="w-10 h-10 lg:w-12 lg:h-12" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-2">
                Félicitations !
              </h3>
              <p className="text-xs lg:text-sm opacity-90 mb-2">
                Avec {yearsOfService} ans de service, vous avez droit à
              </p>
              <div className="text-3xl lg:text-4xl font-extrabold mb-2">
                6% (3 semaines)
              </div>
              <p className="text-[10px] lg:text-xs opacity-80">
                Au lieu de 4% (2 semaines) pour les employés de moins de 3 ans
              </p>
            </div>
          )}

          {/* Breakdown */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-slate-200 p-5 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-4 lg:mb-6">
              Détails de votre indemnité
            </h3>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs lg:text-sm text-slate-700">Salaire brut annuel</span>
                <span className="font-bold text-slate-900 text-sm lg:text-base">{formatCurrency(grossSalary)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs lg:text-sm text-slate-700">Taux d'indemnité</span>
                <span className="font-bold text-teal-600 text-sm lg:text-base">{(vacationRate * 100).toFixed(0)}%</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-base lg:text-lg font-bold text-slate-900">Indemnité totale</span>
                <span className="text-xl lg:text-2xl font-extrabold text-teal-900">{formatCurrency(vacationPay)}</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <span className="text-xs lg:text-sm text-slate-700">Par semaine de vacances</span>
                <span className="font-bold text-slate-900 text-sm lg:text-base">{formatCurrency(vacationPay / vacationWeeks)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs lg:text-sm text-slate-700">Par jour de vacances</span>
                <span className="font-bold text-slate-900 text-sm lg:text-base">{formatCurrency(dailyVacationPay)}</span>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-slate-200 p-5 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-4 lg:mb-6 text-center">
              Répartition annuelle
            </h3>

            <div className="mb-4 lg:mb-6">
              <div className="h-12 lg:h-16 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center text-white text-xs lg:text-sm font-bold"
                  style={{ width: `${((grossSalary - vacationPay) / grossSalary) * 100}%` }}
                >
                  <span className="hidden sm:inline">Salaire régulier</span>
                </div>
                <div
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xs lg:text-sm font-bold"
                  style={{ width: `${(vacationPay / grossSalary) * 100}%` }}
                >
                  <span className="hidden sm:inline">Vacances</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="text-center">
                <div className="text-[10px] lg:text-xs text-slate-600 mb-1">Salaire régulier</div>
                <div className="text-base lg:text-lg font-bold text-slate-900">{formatCurrency(grossSalary - vacationPay)}</div>
                <div className="text-[10px] lg:text-xs text-slate-500">{(((grossSalary - vacationPay) / grossSalary) * 100).toFixed(0)}%</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] lg:text-xs text-slate-600 mb-1">Indemnité vacances</div>
                <div className="text-base lg:text-lg font-bold text-teal-600">{formatCurrency(vacationPay)}</div>
                <div className="text-[10px] lg:text-xs text-slate-500">{((vacationPay / grossSalary) * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {/* Vacation Planning Tip */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl lg:rounded-2xl border-2 border-amber-200 p-4 lg:p-6">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600 flex-shrink-0" />
              <span className="text-sm lg:text-base">Planifiez vos vacances</span>
            </h4>
            <p className="text-xs lg:text-sm text-amber-800 mb-3 leading-relaxed">
              Avec {formatCurrency(vacationPay)} d'indemnité, vous pouvez planifier de belles vacances ! 
              Réservez à l'avance pour obtenir les meilleurs prix et maximisez vos points de voyage.
            </p>
            <div className="bg-white rounded-lg p-3 lg:p-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] lg:text-xs text-amber-700 font-semibold">Budget vacances disponible</span>
                <span className="text-base lg:text-lg font-bold text-amber-900">
                  {formatCurrency(vacationPay)}
                </span>
              </div>
              <p className="text-[10px] lg:text-xs text-amber-600 mt-1">
                Pour {vacationWeeks} semaines de repos bien mérité
              </p>
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

          {/* Affiliate Card */}
          <AffiliateCard variant="general" />
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
