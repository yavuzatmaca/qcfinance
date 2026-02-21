'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { X, Share2, Bookmark } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function AutoLoanClient() {
  const [price, setPrice] = useState<number>(35000)
  const [tradeIn, setTradeIn] = useState<number>(0)
  const [downPayment, setDownPayment] = useState<number>(0)
  const [rate, setRate] = useState<number>(7.99)
  const [term, setTerm] = useState<number>(60)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

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

  // Share functionality
  const handleShare = async () => {
    const text = `🚗 Prêt Auto:\n💵 ${formatCurrency(price)}\n📅 ${term} mois\n💳 ${formatCurrency(biWeeklyPayment)}/2 semaines\n\nCalculé sur QCFinance.ca`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href });
      } catch (err) {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copié dans le presse-papier!');
  };

  const handleSave = () => {
    const calc = { id: Date.now(), price, rate, term, biWeeklyPayment, timestamp: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('qc-auto-calcs') || '[]');
    localStorage.setItem('qc-auto-calcs', JSON.stringify([calc, ...saved].slice(0, 3)));
    
    const btn = document.getElementById('save-btn');
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500');
      setTimeout(() => btn.classList.remove('scale-110', 'bg-green-500'), 500);
    }
  };

  return (
    <>
      {/* MOBILE ONLY: Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-blue-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(biWeeklyPayment)}/2 sem
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(price)} • {term} mois
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Prêt Auto</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Paiement bi-hebdo</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(biWeeklyPayment)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Mensuel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
                </div>
              </div>
            </div>

            {/* Quick Inputs */}
            <div className="space-y-3">
              {/* Price Slider */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Prix du véhicule
                </label>
                <input
                  type="range"
                  min="10000"
                  max="80000"
                  step="1000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(price)}</div>
              </div>

              {/* Rate Slider */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Taux d'intérêt
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.25"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{rate.toFixed(2)}%</div>
              </div>

              {/* Term Slider */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Durée du prêt
                </label>
                <input
                  type="range"
                  min="24"
                  max="96"
                  step="12"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{term} mois</div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-1.5">
                  Mise de fonds
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.floor(price * 0.5)}
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="text-white text-center font-bold mt-1">{formatCurrency(downPayment)}</div>
              </div>
            </div>

            {/* Action Buttons */}
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
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
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
                <p className="text-xs text-red-700 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Attention : Financement long terme ({term} mois)
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
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
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
                <p className="font-bold text-sm flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Financement long terme !
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
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
