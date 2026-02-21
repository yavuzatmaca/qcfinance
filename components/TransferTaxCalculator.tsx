'use client'

import { useState, useRef } from 'react'
import { calculateTransferTax, Location, TransferTaxResult, formatCurrency, formatPercentage, getLocationName } from '@/utils/transferTaxLogic'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Home, Share2, Bookmark, X } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function TransferTaxCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('')
  const [location, setLocation] = useState<Location>('quebec')
  const [result, setResult] = useState<TransferTaxResult | null>(null)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const price = parseFloat(propertyPrice)
    if (isNaN(price) || price <= 0) {
      alert('Veuillez entrer un prix valide')
      return
    }

    const calculatedResult = calculateTransferTax(price, location)
    setResult(calculatedResult)

    // Auto-scroll to results on mobile
    if (window.innerWidth < 1024 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const handleShare = async () => {
    if (!result) return
    const text = `🏠 Taxe de bienvenue: ${formatCurrency(result.totalTax)}\nPropriété: ${formatCurrency(result.propertyPrice)}\nÀ ${getLocationName(result.location)}\n\nCalculé sur QCFinance.ca`
    
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

  return (
    <>
      {/* MOBILE ONLY: Minimal + Expandable Sticky Bar */}
      {result && (
        <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg mb-4">
          {!isQuickCalcExpanded ? (
            <button
              onClick={() => setIsQuickCalcExpanded(true)}
              className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-purple-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white text-xl font-bold leading-tight">
                    {formatCurrency(result.totalTax)}
                  </div>
                  <div className="text-white/70 text-xs">
                    Propriété: {formatCurrency(result.propertyPrice)}
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
                    <h3 className="text-white font-bold text-base">Taxe de Bienvenue</h3>
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
                <div className="text-white/80 text-xs font-semibold mb-1">Taxe à payer</div>
                <div className="text-white text-2xl font-bold">{formatCurrency(result.totalTax)}</div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-white mb-2 block">Prix de la propriété</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full py-2.5 bg-white text-purple-600 rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 min-h-[44px]"
                >
                  Recalculer
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('taxe-bienvenue-last', JSON.stringify({ propertyPrice, location }))
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
      )}

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Input Form */}
      <div className="lg:col-span-1 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de la propriété</h2>
          
          <div className="space-y-5">
            {/* Property Price */}
            <div>
              <label htmlFor="propertyPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                Prix de la propriété
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-lg">$</span>
                </div>
                <input
                  id="propertyPrice"
                  type="number"
                  inputMode="decimal"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  placeholder="350000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg touch-manipulation min-h-[44px]"
                />
              </div>
            </div>

            {/* Location Selection */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Emplacement
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    value="quebec"
                    checked={location === 'quebec'}
                    onChange={(e) => setLocation(e.target.value as Location)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Ailleurs au Québec</span>
                    <p className="text-sm text-gray-500">Taux standard provincial</p>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    value="montreal"
                    checked={location === 'montreal'}
                    onChange={(e) => setLocation(e.target.value as Location)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">Montréal</span>
                    <p className="text-sm text-gray-500">Taux progressifs jusqu'à 3,5%</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg touch-manipulation active:scale-95 min-h-[44px]"
            >
              Calculer la taxe
            </button>
          </div>
        </div>


      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-2 order-1 lg:order-none" ref={resultsRef}>
        {result ? (
          <div className="space-y-6">
            {/* HERO RESULT - V2 Gold Standard */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-medium mb-4 opacity-90">Taxe de Bienvenue à Payer</h2>
              <p className="text-6xl md:text-7xl font-bold mb-6">
                {formatCurrency(result.totalTax)}
              </p>
              <p className="text-xl text-purple-100 mb-2">
                Pour une propriété de {formatCurrency(result.propertyPrice)}
              </p>
              <p className="text-lg text-purple-100">
                à {getLocationName(result.location)} • Taux effectif: {formatPercentage(result.effectiveRate)}
              </p>
            </div>

            {/* Breakdown by Bracket with Progress Bars */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Calcul par tranche (Brackets)</h3>
              <div className="space-y-5">
                {result.breakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="text-sm font-semibold text-gray-700">{item.bracketLabel}</span>
                        <p className="text-xs text-gray-500">Taux: {formatPercentage(item.rate * 100)}</p>
                      </div>
                      <span className="font-bold text-purple-600 text-lg">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(item.amount / result.totalTax) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 mt-4">
                  <span className="text-gray-900 font-bold text-lg">Total</span>
                  <span className="font-bold text-purple-600 text-3xl">
                    {formatCurrency(result.totalTax)}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Qu'est-ce que la taxe de bienvenue?</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    La taxe de bienvenue (droits de mutation) est un montant unique payé lors de l'achat d'une propriété. 
                    Elle est calculée selon des tranches progressives basées sur le prix d'achat. 
                    Cette taxe est payable à la municipalité dans les 30 jours suivant la transaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Affiliate Card - Mortgage Context */}
            <AffiliateCard variant="mortgage" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Entrez le prix de la propriété
            </h3>
            <p className="text-gray-500">
              Les résultats apparaîtront ici après le calcul
            </p>
          </div>
        )}
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

