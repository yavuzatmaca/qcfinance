'use client'

import { useState, useEffect, useRef } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Calculator, Receipt, TrendingUp, ArrowDown, Plus, Minus, DollarSign, FileText } from 'lucide-react'

type CalculationMode = 'add' | 'extract'

export default function SalesTaxClient() {
  const [amount, setAmount] = useState<number>(100)
  const [mode, setMode] = useState<CalculationMode>('add')
  const [isAnimating, setIsAnimating] = useState(false)
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

  const taxPercentage = ((tps + tvq) / total) * 100

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mode Selector Card - Prominent */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-violet-200 overflow-hidden">
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

      {/* Affiliate Card - Desktop Only */}
      <div className="hidden md:block">
        <AffiliateCard variant="savings" />
      </div>
    </div>
  )
}
