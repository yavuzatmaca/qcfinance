'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { X, Share2, Bookmark } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function CompoundInterestClient() {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200)
  const [years, setYears] = useState<number>(20)
  const [interestRate, setInterestRate] = useState<number>(7.0)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

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

  const handleShare = async () => {
    const text = `💰 Intérêts Composés:\n🚀 ${formatCurrency(finalValue)} après ${years} ans\n📈 ${interestPercentage.toFixed(0)}% d'intérêts\n💵 Investi: ${formatCurrency(totalInvested)}\n\nCalculé sur QCFinance.ca`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href });
      } catch (err) {
        navigator.clipboard.writeText(text);
        alert('✅ Copié dans le presse-papier!');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('✅ Copié dans le presse-papier!');
    }
  };

  const handleSave = () => {
    const calc = { id: Date.now(), initialDeposit, monthlyContribution, years, interestRate, finalValue, totalInterest, timestamp: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('qc-compound-calcs') || '[]');
    localStorage.setItem('qc-compound-calcs', JSON.stringify([calc, ...saved].slice(0, 3)));
    
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500');
      setTimeout(() => btn.classList.remove('scale-110', 'bg-green-500'), 500);
    }
  };

  return (
    <>
      {/* Sticky Bar - Mobile + Desktop */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-indigo-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(finalValue)}
                </div>
                <div className="text-white/70 text-xs">
                  après {years} ans • {interestPercentage.toFixed(0)}% d'intérêts
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
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Intérêts Composés</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Valeur finale</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(finalValue)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Intérêts gagnés</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(totalInterest)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Dépôt initial
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(initialDeposit)}</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Cotisation mensuelle
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(monthlyContribution)}</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Durée
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{years} ans</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Taux de rendement
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{interestRate.toFixed(1)}% ({getRateLabel(interestRate)})</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                id="save-btn"
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
        )}
      </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Info Box Only (Desktop) */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none hidden lg:block">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-8">
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
            <div className="flex gap-3">
              <svg className="w-8 h-8 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h3 className="font-bold text-indigo-900 text-lg mb-2">
                  Règle de 72
                </h3>
                <p className="text-sm text-indigo-800 leading-relaxed mb-2">
                  À {interestRate.toFixed(1)}% de rendement, votre argent double tous les ~{yearsToDouble.toFixed(1)} ans.
                </p>
                <p className="text-xs text-indigo-700">
                  Les portefeuilles équilibrés (60/40) ont historiquement généré ~7% annuellement.
                </p>
              </div>
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
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
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
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
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
              <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
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
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
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
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              À {interestRate.toFixed(1)}% de rendement, votre argent double tous les ~{yearsToDouble.toFixed(1)} ans. 
              C'est pourquoi commencer tôt est si important !
            </p>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="investment" />

        </div>
      </div>
    </div>

    {/* Sticky Bottom Ad - Mobile Only */}
    {showStickyAd && (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-slate-200 shadow-2xl lg:hidden">
        <button
          onClick={() => setShowStickyAd(false)}
          className="absolute -top-8 right-2 w-8 h-8 bg-slate-800 hover:bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg touch-manipulation active:scale-95 transition-all"
          aria-label="Fermer la publicité"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="h-[100px] flex items-center justify-center">
          <AdSenseAd 
            adSlot="1234567890"
            adFormat="auto"
            fullWidthResponsive={true}
          />
        </div>
      </div>
    )}
  </>
  )
}
