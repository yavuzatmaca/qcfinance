'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { X, Share2, Bookmark } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function RetirementClient() {
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentSavings, setCurrentSavings] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500)
  const [returnRate, setReturnRate] = useState<number>(6.0)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

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

  const handleShare = async () => {
    const text = `🌴 Retraite:\n💰 ${formatCurrency(totalCapital)} à ${retirementAge} ans\n💵 ${formatCurrency(monthlyRetirementIncome)}/mois\n📈 ${interestPercentage.toFixed(0)}% d'intérêts\n\nCalculé sur QCFinance.ca`;
    
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
    const calc = { id: Date.now(), currentAge, retirementAge, currentSavings, monthlyContribution, returnRate, totalCapital, monthlyRetirementIncome, timestamp: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('qc-retirement-calcs') || '[]');
    localStorage.setItem('qc-retirement-calcs', JSON.stringify([calc, ...saved].slice(0, 3)));
    
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500');
      setTimeout(() => btn.classList.remove('scale-110', 'bg-green-500'), 500);
    }
  };

  return (
    <>
      {/* Sticky Bar - Mobile + Desktop */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-emerald-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(monthlyRetirementIncome)}/mois
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(totalCapital)} à {retirementAge} ans
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Épargne Retraite</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Rente mensuelle</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(monthlyRetirementIncome)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Capital total</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(totalCapital)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Âge actuel
                </label>
                <input
                  type="range"
                  min="18"
                  max="70"
                  step="1"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{currentAge} ans</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Âge de retraite
                </label>
                <input
                  type="range"
                  min="50"
                  max="75"
                  step="1"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{retirementAge} ans ({yearsToGrow} ans)</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Épargne actuelle
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(currentSavings)}</div>
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
                  Rendement espéré
                </label>
                <input
                  type="range"
                  min="4"
                  max="8"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{returnRate.toFixed(1)}% ({getReturnRateLabel(returnRate)})</div>
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
        <div className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 p-8">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
            <div className="flex gap-3">
              <svg className="w-8 h-8 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h3 className="font-bold text-emerald-900 text-lg mb-2">
                  Intérêts composés
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Les portefeuilles diversifiés (60/40) ont historiquement généré ~6% annuellement. 
                  Plus vous commencez tôt, plus les intérêts composés travaillent pour vous.
                </p>
              </div>
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
              <svg className="w-16 h-16 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center flex items-center justify-center gap-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              La magie des intérêts composés
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
              <p className="text-lg font-bold text-amber-900 mb-2 flex items-center justify-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Regardez ! {interestPercentage.toFixed(0)}% de votre retraite provient des intérêts !
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
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
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
                <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="text-xl font-bold mb-2">
                  Vous avez un avantage ÉNORME !
                </h4>
                <p className="text-sm opacity-90 mb-3">
                  En commençant à {currentAge} ans, vous avez {yearsToGrow} années pour profiter des intérêts composés. 
                  C'est l'arme secrète des millionnaires !
                </p>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-xs font-semibold flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Chaque année que vous attendez vous coûte des dizaines de milliers de dollars
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
            adFormat="horizontal"
            fullWidthResponsive={true}
          />
        </div>
      </div>
    )}
  </>
  )
}
