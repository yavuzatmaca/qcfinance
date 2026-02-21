'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { X, Share2, Bookmark } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function StudentLoanClient() {
  const [loanAmount, setLoanAmount] = useState<number>(20000)
  const [interestRate, setInterestRate] = useState<number>(7.2)
  const [term, setTerm] = useState<number>(120) // months
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  const TAX_CREDIT_RATE = 0.20 // 20% Quebec tax credit on student loan interest

  // Calculate monthly payment
  const monthlyRate = interestRate / 100 / 12
  const monthlyPayment = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
    : loanAmount / term

  // Calculate total interest
  const totalPaid = monthlyPayment * term
  const totalInterest = totalPaid - loanAmount

  // Calculate tax credit (Quebec gives ~20% credit on student loan interest)
  const taxCredit = totalInterest * TAX_CREDIT_RATE
  const effectiveInterest = totalInterest - taxCredit

  // Calculate percentages for visual bar
  const principalPercent = (loanAmount / totalPaid) * 100
  const effectiveInterestPercent = (effectiveInterest / totalPaid) * 100
  const taxCreditPercent = (taxCredit / totalPaid) * 100

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleShare = async () => {
    const text = `🎓 Prêt Étudiant:\n💵 ${formatCurrency(loanAmount)}\n📅 ${(term/12).toFixed(1)} ans\n💳 ${formatCurrency(monthlyPayment)}/mois\n🎉 Crédit: ${formatCurrency(taxCredit)}\n\nCalculé sur QCFinance.ca`;
    
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
    const calc = { id: Date.now(), loanAmount, interestRate, term, monthlyPayment, timestamp: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('qc-student-calcs') || '[]');
    localStorage.setItem('qc-student-calcs', JSON.stringify([calc, ...saved].slice(0, 3)));
    
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500');
      setTimeout(() => btn.classList.remove('scale-110', 'bg-green-500'), 500);
    }
  };

  return (
    <>
      {/* Sticky Bar - Mobile + Desktop */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-indigo-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(monthlyPayment)}/mois
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(loanAmount)} • {(term/12).toFixed(1)} ans
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Prêt Étudiant</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Paiement mensuel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Crédit d'impôt</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(taxCredit)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Montant du prêt
                </label>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(loanAmount)}</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Taux d'intérêt
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{interestRate.toFixed(2)}%</div>
              </div>

              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Durée
                </label>
                <input
                  type="range"
                  min="60"
                  max="180"
                  step="12"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{term} mois ({(term/12).toFixed(1)} ans)</div>
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
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 p-8">
          <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-6">
            <div className="flex gap-3">
              <svg className="w-8 h-8 text-violet-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-violet-900 text-lg mb-2">
                  Prêt étudiant AFE
                </h3>
                <p className="text-sm text-violet-800 leading-relaxed">
                  Les prêts de l'Aide financière aux études (AFE) ont des taux d'intérêt 
                  avantageux et donnent droit à un crédit d'impôt de 20% sur les intérêts payés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Payment Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Paiement mensuel
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-4">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-sm opacity-80">
                pendant {(term / 12).toFixed(1)} ans
              </p>
            </div>
          </div>

          {/* Tax Credit Badge */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-6 text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">
              Bonne nouvelle !
            </h3>
            <p className="text-sm opacity-90 mb-3">
              Vous récupérez en crédits d'impôt
            </p>
            <div className="text-5xl font-extrabold mb-2">
              {formatCurrency(taxCredit)}
            </div>
            <p className="text-xs opacity-80">
              20% des intérêts payés (crédit d'impôt Québec)
            </p>
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
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${principalPercent}%` }}
                >
                  {principalPercent > 15 && 'Principal'}
                </div>
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${effectiveInterestPercent}%` }}
                >
                  {effectiveInterestPercent > 10 && 'Intérêts nets'}
                </div>
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${taxCreditPercent}%` }}
                >
                  {taxCreditPercent > 5 && 'Crédit'}
                </div>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  <span className="text-sm text-slate-700">Montant emprunté</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-slate-700">Intérêts totaux</span>
                </div>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                  <span className="text-sm text-slate-700">Crédit d'impôt (20%)</span>
                </div>
                <span className="font-bold text-emerald-600">-{formatCurrency(taxCredit)}</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm font-semibold text-slate-700">Intérêts nets</span>
                </div>
                <span className="font-bold text-orange-600">{formatCurrency(effectiveInterest)}</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-slate-900">Coût total</span>
                <span className="text-2xl font-extrabold text-indigo-900">{formatCurrency(totalPaid)}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Durée</div>
              <div className="text-2xl font-bold text-slate-900">{(term / 12).toFixed(1)} ans</div>
              <div className="text-xs text-slate-500 mt-1">{term} mois</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Taux effectif</div>
              <div className="text-2xl font-bold text-slate-900">{(interestRate * 0.8).toFixed(2)}%</div>
              <div className="text-xs text-slate-500 mt-1">après crédit d'impôt</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Total payé</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalPaid)}</div>
              <div className="text-xs text-slate-500 mt-1">sur {(term / 12).toFixed(1)} ans</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-center">
              <div className="text-xs text-slate-600 font-semibold mb-1">Économie fiscale</div>
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(taxCredit)}</div>
              <div className="text-xs text-slate-500 mt-1">crédit d'impôt</div>
            </div>
          </div>

          {/* Early Payoff Tip */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border-2 border-violet-200 p-6">
            <h4 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Remboursez plus rapidement
            </h4>
            <p className="text-sm text-violet-800 mb-3">
              En ajoutant seulement <strong>50$ par mois</strong> à votre paiement, vous pourriez économiser 
              des centaines de dollars en intérêts et terminer votre prêt plus tôt.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-violet-700 font-semibold">Paiement accéléré</span>
                <span className="text-lg font-bold text-violet-900">
                  {formatCurrency(monthlyPayment + 50)}
                </span>
              </div>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="education" />
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
