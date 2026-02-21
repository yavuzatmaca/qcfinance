'use client'

import { useState, useEffect, useRef } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Calculator, Receipt, TrendingUp, ArrowDown, Plus, Minus, DollarSign, FileText, Share2, X } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

type CalculationMode = 'add' | 'extract'

export default function SalesTaxClient() {
  const [amount, setAmount] = useState<number>(100)
  const [mode, setMode] = useState<CalculationMode>('add')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  // Tax rates for 2026
  const TPS_RATE = 0.05 // 5%
  const TVQ_RATE = 0.09975 // 9.975%
  const COMBINED_RATE = 0.14975 // 14.975%

  // Calculate based on mode
  let price: number, tps: number, tvq: number, total: number

  if (mode === 'add') {
    // Adding taxes to a pre-tax amount
    price = amount
    tps = price * TPS_RATE
    tvq = price * TVQ_RATE
    total = price + tps + tvq
  } else {
    // Extracting taxes from a total amount
    total = amount
    price = total / (1 + COMBINED_RATE)
    tps = price * TPS_RATE
    tvq = price * TVQ_RATE
  }

  // Trigger animation on value change
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [amount, mode])

  // Haptic feedback simulation
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  // Smooth scroll to result
  const scrollToResult = () => {
    triggerHaptic()
    resultRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    })
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleShare = async () => {
    const text = `💰 ${mode === 'add' ? 'Prix final' : 'Prix avant taxes'}: ${mode === 'add' ? formatCurrency(total) : formatCurrency(price)}\nTPS: ${formatCurrency(tps)} | TVQ: ${formatCurrency(tvq)}\n\nCalculé sur QCFinance.ca`
    
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

  const taxPercentage = ((tps + tvq) / total) * 100

  return (
    <>
      {/* MOBILE ONLY: Minimal + Expandable Sticky Bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-violet-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {mode === 'add' ? formatCurrency(total) : formatCurrency(price)}
                </div>
                <div className="text-white/70 text-xs">
                  {mode === 'add' ? 'Prix final' : 'Prix avant taxes'} • Taxes: {formatCurrency(tps + tvq)}
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
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">TPS/TVQ Québec</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">{mode === 'add' ? 'Prix final' : 'Prix avant taxes'}</div>
                  <div className="text-white text-2xl font-bold">{mode === 'add' ? formatCurrency(total) : formatCurrency(price)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Taxes</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(tps + tvq)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('add')}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                    mode === 'add' ? 'bg-white text-violet-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Ajouter
                </button>
                <button
                  onClick={() => setMode('extract')}
                  className={`py-2.5 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                    mode === 'extract' ? 'bg-white text-violet-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Minus className="w-4 h-4 inline mr-1" />
                  Extraire
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Montant</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[50, 100, 500, 1000].map((quick) => (
                    <button
                      key={quick}
                      onClick={() => setAmount(quick)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        amount === quick ? 'bg-white text-violet-600' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quick}$
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('tps-tvq-last', JSON.stringify({ amount, mode }))
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

    <div className="space-y-4 md:space-y-6">
      {/* OLD STICKY BAR - REMOVE THIS SECTION */}
      <div className="lg:hidden sticky top-16 z-40 bg-white border-b-2 border-violet-200 shadow-lg mb-4">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-violet-600 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-700">Calculez vos taxes</span>
          </div>
          
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => {
                setMode('add')
                triggerHaptic()
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all touch-manipulation ${
                mode === 'add'
                  ? 'bg-violet-600 text-white'
                  : 'bg-violet-100 text-violet-700'
              }`}
            >
              + Ajouter
            </button>
            <button
              onClick={() => {
                setMode('extract')
                triggerHaptic()
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all touch-manipulation ${
                mode === 'extract'
                  ? 'bg-violet-600 text-white'
                  : 'bg-violet-100 text-violet-700'
              }`}
            >
              - Extraire
            </button>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold pointer-events-none">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-8 pr-3 py-2.5 text-base font-bold border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 touch-manipulation"
              placeholder="100"
            />
          </div>
        </div>
      </div>

      {/* Mode Selector Card - Prominent (Desktop) */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-xl border-2 border-violet-200 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-3 md:p-4 text-center">
          <Calculator className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto mb-1 md:mb-2" />
          <h2 className="text-base md:text-lg font-bold text-white">Choisissez votre calcul</h2>
        </div>
        
        <div className="p-3 md:p-5">
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <button
              onClick={() => {
                setMode('add')
                triggerHaptic()
              }}
              className={`group relative overflow-hidden rounded-2xl p-4 md:p-5 transition-all duration-300 ${
                mode === 'add'
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-2xl scale-105'
                  : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-2 border-violet-200'
              }`}
            >
              <div className="relative z-10">
                <Plus className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-1 md:mb-2 stroke-[3]" />
                <div className="font-bold text-sm md:text-base mb-0.5">Ajouter</div>
                <div className="text-xs opacity-90">les taxes</div>
              </div>
              {mode === 'add' && (
                <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
              )}
            </button>

            <button
              onClick={() => {
                setMode('extract')
                triggerHaptic()
              }}
              className={`group relative overflow-hidden rounded-2xl p-4 md:p-5 transition-all duration-300 ${
                mode === 'extract'
                  ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-2xl scale-105'
                  : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border-2 border-violet-200'
              }`}
            >
              <div className="relative z-10">
                <Minus className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-1 md:mb-2 stroke-[3]" />
                <div className="font-bold text-sm md:text-base mb-0.5">Extraire</div>
                <div className="text-xs opacity-90">les taxes</div>
              </div>
              {mode === 'extract' && (
                <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Input Card - Clean & Simple */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-violet-200 p-5 md:p-8">
        <label className="block text-center mb-3 md:mb-4">
          <span className="text-sm md:text-base font-bold text-slate-700 flex items-center justify-center gap-2 mb-2">
            {mode === 'add' ? (
              <>
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-violet-600" />
                <span>Montant avant taxes</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-violet-600" />
                <span>Montant après taxes</span>
              </>
            )}
          </span>
        </label>
        
        <div className="relative mb-4 md:mb-6">
          <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-slate-400 text-3xl md:text-4xl font-bold">
            $
          </div>
          <input
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            onFocus={triggerHaptic}
            className="w-full pl-16 md:pl-20 pr-6 md:pr-8 py-4 md:py-5 text-5xl md:text-7xl font-bold text-center border-4 border-violet-300 rounded-3xl focus:ring-4 focus:ring-violet-200 focus:border-violet-500 transition-all bg-violet-50"
            placeholder="100"
            step="0.01"
            inputMode="decimal"
          />
        </div>

        {/* Quick Amounts */}
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {[50, 100, 500, 1000].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => {
                setAmount(quickAmount)
                triggerHaptic()
              }}
              className={`py-3 md:py-4 px-2 rounded-2xl text-sm md:text-base font-bold transition-all active:scale-95 ${
                amount === quickAmount
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
              }`}
            >
              {quickAmount}$
            </button>
          ))}
        </div>

        {/* Calculate Button - Smooth Scroll */}
        <button
          onClick={scrollToResult}
          className="w-full mt-4 md:mt-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-4 md:py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 group"
        >
          <span className="text-base md:text-lg">Voir le résultat</span>
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Results Card - Big & Bold */}
      <div 
        ref={resultRef}
        className={`bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 scroll-mt-4 ${isAnimating ? 'scale-[0.98]' : 'scale-100'}`}
      >
        <div className="p-6 md:p-8">
          {/* Main Result */}
          <div className="text-center mb-6 md:mb-8">
            <Receipt className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-3 md:mb-4" />
            <div className="text-white text-sm md:text-base font-semibold mb-2 opacity-90">
              {mode === 'add' ? 'Prix final avec taxes' : 'Prix avant taxes'}
            </div>
            <div className="text-5xl md:text-7xl font-extrabold text-white mb-2">
              {mode === 'add' ? formatCurrency(total) : formatCurrency(price)}
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="text-white text-xs md:text-sm font-bold">
                {mode === 'add' ? `+${taxPercentage.toFixed(2)}%` : `Économie de ${formatCurrency(tps + tvq)}`}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center text-white">
              <span className="text-sm md:text-base font-semibold">Prix de base</span>
              <span className="text-xl md:text-2xl font-bold">{formatCurrency(price)}</span>
            </div>
            
            <div className="h-px bg-white/20"></div>
            
            <div className="flex justify-between items-center text-white">
              <div>
                <span className="text-sm md:text-base font-semibold">TPS</span>
                <span className="text-xs ml-2 opacity-75">5%</span>
              </div>
              <span className="text-lg md:text-xl font-bold">{formatCurrency(tps)}</span>
            </div>
            
            <div className="flex justify-between items-center text-white">
              <div>
                <span className="text-sm md:text-base font-semibold">TVQ</span>
                <span className="text-xs ml-2 opacity-75">9.975%</span>
              </div>
              <span className="text-lg md:text-xl font-bold">{formatCurrency(tvq)}</span>
            </div>
            
            <div className="h-px bg-white/20"></div>
            
            <div className="flex justify-between items-center text-white">
              <span className="text-sm md:text-base font-bold">Total des taxes</span>
              <span className="text-xl md:text-2xl font-extrabold">{formatCurrency(tps + tvq)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Progress Bars */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-violet-200 p-5 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 text-center">
          📊 Répartition détaillée
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2 font-semibold">
              <span className="text-slate-700">Prix de base</span>
              <span className="text-slate-600">{((price / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 md:h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-slate-400 to-slate-600 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${(price / total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2 font-semibold">
              <span className="text-red-700">TPS (5%)</span>
              <span className="text-red-600">{formatCurrency(tps)}</span>
            </div>
            <div className="h-3 md:h-4 bg-red-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${(tps / total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2 font-semibold">
              <span className="text-blue-700">TVQ (9.975%)</span>
              <span className="text-blue-600">{formatCurrency(tvq)}</span>
            </div>
            <div className="h-3 md:h-4 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${(tvq / total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Summary Pills */}
        <div className="grid grid-cols-2 gap-3 mt-5 md:mt-6">
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-3 md:p-4 text-center border-2 border-violet-200">
            <div className="text-xs text-violet-600 font-bold mb-1">Taxes totales</div>
            <div className="text-lg md:text-xl font-extrabold text-violet-900">{formatCurrency(tps + tvq)}</div>
          </div>
          <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 rounded-2xl p-3 md:p-4 text-center border-2 border-fuchsia-200">
            <div className="text-xs text-fuchsia-600 font-bold mb-1">Taux combiné</div>
            <div className="text-lg md:text-xl font-extrabold text-fuchsia-900">14.975%</div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 p-5 md:p-6">
        <div className="flex gap-3 md:gap-4">
          <div className="text-3xl md:text-4xl">💡</div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm md:text-base mb-2">
              {mode === 'add' ? 'Mode Ajout activé' : 'Mode Extraction activé'}
            </h3>
            <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
              {mode === 'add'
                ? 'Ajoutez automatiquement la TPS (5%) et la TVQ (9.975%) à votre montant de base pour obtenir le prix final.'
                : 'Extrayez les taxes d\'un montant total pour connaître le prix avant taxes et le montant des taxes payées.'}
            </p>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full flex items-center justify-center gap-2 py-3 lg:py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl lg:rounded-2xl transition-all shadow-lg touch-manipulation active:scale-95 min-h-[44px] text-sm lg:text-base"
      >
        <Share2 className="w-5 h-5 flex-shrink-0" />
        <span>Partager mon résultat</span>
      </button>

      {/* Affiliate Card - Desktop Only */}
      <div className="hidden md:block">
        <AffiliateCard variant="savings" />
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
