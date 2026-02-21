'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { X, Share2, Bookmark } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function DaycareClient() {
  const [income, setIncome] = useState<number>(90000)
  const [dailyRate, setDailyRate] = useState<number>(50)
  const [days, setDays] = useState<number>(260)
  const [children, setChildren] = useState<number>(1)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  const CPE_RATE = 9.10 // Fixed CPE rate for 2026

  // Calculate Quebec tax credit rate based on income (simplified 2026 brackets)
  const getTaxCreditRate = (income: number): number => {
    if (income < 36000) return 0.78
    if (income < 50000) return 0.75
    if (income < 75000) return 0.70
    if (income < 100000) return 0.67
    if (income < 125000) return 0.57
    if (income < 150000) return 0.47
    if (income < 175000) return 0.37
    return 0.26 // Minimum credit rate
  }

  const taxCreditRate = getTaxCreditRate(income)

  // Calculate federal deduction savings (estimate marginal tax savings)
  const marginalTaxRate = income > 100000 ? 0.20 : income > 50000 ? 0.15 : 0.10
  const federalSavings = dailyRate * marginalTaxRate

  // Calculate net daily cost after credits
  const quebecCredit = dailyRate * taxCreditRate
  const netDailyCost = dailyRate - quebecCredit - federalSavings

  // Annual costs
  const annualPrivateCost = dailyRate * days * children
  const annualQuebecCredit = quebecCredit * days * children
  const annualFederalSavings = federalSavings * days * children
  const annualNetCost = netDailyCost * days * children
  const annualCPECost = CPE_RATE * days * children

  // Government contribution percentage
  const govContribution = ((quebecCredit + federalSavings) / dailyRate) * 100
  const youPay = 100 - govContribution

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleShare = async () => {
    const text = `👶 Frais de Garde:\n💰 Coût réel: ${formatCurrency(netDailyCost)}/jour\n📊 Crédits: ${govContribution.toFixed(0)}%\n💵 Annuel: ${formatCurrency(annualNetCost)}\n\nCalculé sur QCFinance.ca`;
    
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
    const calc = { id: Date.now(), income, dailyRate, days, children, netDailyCost, timestamp: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('qc-daycare-calcs') || '[]');
    localStorage.setItem('qc-daycare-calcs', JSON.stringify([calc, ...saved].slice(0, 3)));
    
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500');
      setTimeout(() => btn.classList.remove('scale-110', 'bg-green-500'), 500);
    }
  };

  return (
    <>
      {/* MOBILE ONLY: Sticky Bar */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-purple-600 to-rose-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-purple-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(netDailyCost)}/jour
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(annualNetCost)}/an • {children} enfant{children > 1 ? 's' : ''}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Frais de Garde</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Coût réel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(netDailyCost)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Annuel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(annualNetCost)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Revenu familial
                </label>
                <input
                  type="range"
                  min="20000"
                  max="200000"
                  step="5000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(income)}</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Coût par jour
                </label>
                <input
                  type="range"
                  min="35"
                  max="80"
                  step="5"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(dailyRate)}</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Jours par année
                </label>
                <input
                  type="range"
                  min="200"
                  max="260"
                  step="10"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{days} jours</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Nombre d'enfants
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildren(Math.max(1, children - 1))}
                    className="flex-1 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all touch-manipulation active:scale-95 min-h-[44px]"
                  >
                    −
                  </button>
                  <div className="text-white text-2xl font-bold">{children}</div>
                  <button
                    onClick={() => setChildren(Math.min(5, children + 1))}
                    className="flex-1 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all touch-manipulation active:scale-95 min-h-[44px]"
                  >
                    +
                  </button>
                </div>
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
      {/* Left Column - Empty on mobile, Info on desktop */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        {/* Info Box - Desktop Only */}
        <div className="hidden lg:block bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold text-purple-900 text-base mb-2">
                Crédit d'impôt : {(taxCreditRate * 100).toFixed(0)}%
              </h3>
              <p className="text-sm text-purple-800 mb-3">
                Avec votre revenu de {formatCurrency(income)}, vous avez droit à un crédit 
                d'impôt remboursable de {(taxCreditRate * 100).toFixed(0)}% sur vos frais de garde.
              </p>
              <div className="text-xs text-purple-700 bg-white rounded-lg p-3">
                <strong>Astuce:</strong> Utilisez la barre en haut pour ajuster vos paramètres rapidement!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Real Cost Card */}
          <div className="bg-gradient-to-br from-purple-600 to-rose-600 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Coût réel après crédits
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-2">
                {formatCurrency(netDailyCost)}
              </div>
              <p className="text-xl opacity-90 mb-1">
                par jour
              </p>
              <p className="text-sm opacity-75">
                vs CPE : {formatCurrency(CPE_RATE)}/jour
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Coût annuel net</span>
                <span className="text-2xl font-bold">{formatCurrency(annualNetCost)}</span>
              </div>
            </div>
          </div>

          {/* Government Contribution Visual */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Qui paie quoi ?
            </h3>

            {/* Stacked Bar */}
            <div className="mb-6">
              <div className="h-20 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-rose-500 to-rose-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${youPay}%` }}
                >
                  <span className="text-xs font-bold">VOUS PAYEZ</span>
                  <span className="text-lg font-extrabold">{formatCurrency(netDailyCost)}</span>
                </div>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 flex flex-col items-center justify-center text-white"
                  style={{ width: `${govContribution}%` }}
                >
                  <span className="text-xs font-bold">GOUVERNEMENT</span>
                  <span className="text-lg font-extrabold">{formatCurrency(quebecCredit + federalSavings)}</span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Coût affiché</span>
                <span className="font-bold text-slate-900">{formatCurrency(dailyRate)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-slate-700">Crédit Québec ({(taxCreditRate * 100).toFixed(0)}%)</span>
                </div>
                <span className="font-bold text-emerald-600">-{formatCurrency(quebecCredit)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-slate-700">Déduction fédérale</span>
                </div>
                <span className="font-bold text-green-600">-{formatCurrency(federalSavings)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rose-500 rounded"></div>
                  <span className="text-lg font-bold text-slate-900">Coût réel</span>
                </div>
                <span className="text-2xl font-extrabold text-rose-600">{formatCurrency(netDailyCost)}</span>
              </div>
            </div>
          </div>

          {/* CPE Comparison */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏫</span>
              Comparaison avec CPE
            </h4>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-700">CPE (subventionné)</span>
                  <span className="text-xl font-bold text-blue-900">{formatCurrency(CPE_RATE)}/jour</span>
                </div>
                <div className="text-xs text-blue-600">
                  Coût annuel : {formatCurrency(annualCPECost)}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-rose-700">Garderie privée (net)</span>
                  <span className="text-xl font-bold text-rose-900">{formatCurrency(netDailyCost)}/jour</span>
                </div>
                <div className="text-xs text-rose-600">
                  Coût annuel : {formatCurrency(annualNetCost)}
                </div>
              </div>

              <div className="bg-slate-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Différence annuelle</span>
                  <span className={`text-xl font-bold ${annualNetCost > annualCPECost ? 'text-red-600' : 'text-green-600'}`}>
                    {annualNetCost > annualCPECost ? '+' : ''}{formatCurrency(annualNetCost - annualCPECost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Coût brut annuel</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(annualPrivateCost)}</div>
              <div className="text-xs text-slate-500 mt-1">{dailyRate}$ × {days} jours</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Crédits totaux</div>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(annualQuebecCredit + annualFederalSavings)}</div>
              <div className="text-xs text-slate-500 mt-1">{govContribution.toFixed(0)}% remboursé</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Coût net annuel</div>
              <div className="text-2xl font-bold text-rose-600">{formatCurrency(annualNetCost)}</div>
              <div className="text-xs text-slate-500 mt-1">ce que vous payez</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Enfants</div>
              <div className="text-2xl font-bold text-purple-900">{children}</div>
              <div className="text-xs text-slate-500 mt-1">en garderie</div>
            </div>
          </div>

          {/* REEE Tip */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
            <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Investissez dans l'avenir
            </h4>
            <p className="text-sm text-violet-800 mb-3">
              Avec les économies réalisées grâce aux crédits d'impôt, ouvrez un <strong>REEE</strong> pour 
              votre enfant. Le gouvernement ajoute <strong>30% de subventions</strong> (SCEE + IQEE) sur vos cotisations !
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-violet-700 font-semibold">Économie annuelle vs CPE</span>
                <span className="text-lg font-bold text-violet-900">
                  {formatCurrency(Math.max(0, annualCPECost - annualNetCost))}
                </span>
              </div>
              <p className="text-xs text-violet-600 mt-1">
                À investir dans un REEE pour maximiser les subventions
              </p>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="education" />
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
            <AdSenseAd 
              adSlot="7290777867"
              adFormat="auto"
            />
          </div>
        </div>
      </div>
    )}
    </>
  )
}
