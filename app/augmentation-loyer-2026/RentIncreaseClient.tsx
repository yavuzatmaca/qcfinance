'use client'

import { useState } from 'react'
import { Home, Scale, AlertTriangle, CheckCircle, TrendingUp, Share2, Bookmark, X } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'
import AdSenseAd from '@/components/AdSenseAd'

// 2026 TAL Constants (Simplified)
const BASE_INDEX = 0.04 // 4% base inflation adjustment
const TAX_IMPACT_RATE = 0.001 // 0.1% for every 1% tax increase
const REPAIRS_MONTHLY_RATE = 2.5 / 1000 // $2.50 per month for every $1000 of repairs

export default function RentIncreaseClient() {
  const [currentRent, setCurrentRent] = useState(1000)
  const [municipalTaxIncrease, setMunicipalTaxIncrease] = useState(2)
  const [majorRepairs, setMajorRepairs] = useState(0)
  const [proposedIncrease, setProposedIncrease] = useState(0)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  // Calculations
  const baseIncrease = currentRent * BASE_INDEX
  const taxImpact = currentRent * (municipalTaxIncrease * TAX_IMPACT_RATE)
  const repairsImpact = majorRepairs * REPAIRS_MONTHLY_RATE
  
  const allowedIncrease = baseIncrease + taxImpact + repairsImpact
  const fairRent = currentRent + allowedIncrease
  const allowedPercent = (allowedIncrease / currentRent) * 100

  // Verdict logic
  const isAbusive = proposedIncrease > allowedIncrease
  const difference = proposedIncrease - allowedIncrease

  // Visual bar percentages
  const currentRentPercent = (currentRent / fairRent) * 100
  const increasePercent = (allowedIncrease / fairRent) * 100

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleShare = async () => {
    const text = `🏠 Augmentation loyer juste: ${formatCurrency(allowedIncrease)}\nLoyer actuel: ${formatCurrency(currentRent)}\nNouveau loyer: ${formatCurrency(fairRent)}\n\nCalculé sur QCFinance.ca`
    
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
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-emerald-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(currentRent)} → {formatCurrency(fairRent)}
                </div>
                <div className="text-white/70 text-xs">
                  Augmentation: {formatCurrency(allowedIncrease)} ({allowedPercent.toFixed(1)}%)
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
                  <h3 className="text-white font-bold text-base">Augmentation Loyer</h3>
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
                  <div className="text-white/80 text-xs font-semibold mb-1">Loyer actuel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(currentRent)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Nouveau loyer</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(fairRent)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Loyer mensuel actuel</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={currentRent}
                    onChange={(e) => setCurrentRent(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('loyer-last', JSON.stringify({ currentRent, municipalTaxIncrease, majorRepairs }))
                    alert('✅ Sauvegardé!')
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white text-emerald-600 rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 min-h-[44px]"
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

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Current Situation Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Home className="w-6 h-6 text-emerald-600" />
            Votre Logement
          </h2>
          
          {/* Current Rent */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loyer mensuel actuel
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={currentRent}
                onChange={(e) => setCurrentRent(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all touch-manipulation min-h-[44px]"
              />
            </div>
            <input
              type="range"
              min="500"
              max="3000"
              step="50"
              value={currentRent}
              onChange={(e) => setCurrentRent(Number(e.target.value))}
              className="w-full mt-3 accent-emerald-600"
            />
          </div>

          {/* Proposed Increase (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Augmentation proposée par le propriétaire (optionnel)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={proposedIncrease}
                onChange={(e) => setProposedIncrease(Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Entrez le montant si vous voulez comparer avec l'estimation du TAL
            </p>
          </div>
        </div>

        {/* Justifications Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Scale className="w-6 h-6 text-slate-600" />
            Justifications
          </h2>
          
          {/* Municipal Tax Increase */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Augmentation taxes municipales ({municipalTaxIncrease}%)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={municipalTaxIncrease}
              onChange={(e) => setMunicipalTaxIncrease(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>10%</span>
            </div>
          </div>

          {/* Major Repairs */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Travaux majeurs (coût total)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={majorRepairs}
                onChange={(e) => setMajorRepairs(Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ex: Nouvelle toiture, fenêtres, rénovations majeures
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Fair Rent */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Loyer équitable estimé (TAL)</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(fairRent)}
            </p>
            <p className="text-emerald-100 text-lg">
              Augmentation suggérée: {formatCurrency(allowedIncrease)} ({allowedPercent.toFixed(1)}%)
            </p>
          </div>

          {/* THE "VERDICT" BADGE */}
          {proposedIncrease > 0 && (
            <>
              {isAbusive ? (
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">⚠️ Augmentation potentiellement abusive</p>
                      <p className="text-red-50">
                        L'augmentation proposée de <span className="font-bold text-2xl">{formatCurrency(proposedIncrease)}</span> dépasse l'estimation du TAL de <span className="font-bold">{formatCurrency(difference)}</span>
                      </p>
                      <p className="text-sm text-red-100 mt-2">
                        💡 Vous avez 21 jours pour contester par écrit auprès du TAL.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-1">✅ Augmentation raisonnable</p>
                      <p className="text-green-50">
                        L'augmentation proposée de <span className="font-bold text-2xl">{formatCurrency(proposedIncrease)}</span> est dans les normes du TAL
                      </p>
                      <p className="text-sm text-green-100 mt-2">
                        L'augmentation respecte les règles du Tribunal administratif du logement.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* VISUAL BAR - Current Rent vs Increase */}
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Répartition du loyer</h3>
            
            <div className="mb-4">
              <div className="flex h-12 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-slate-500 flex items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${currentRentPercent}%` }}
                >
                  {currentRentPercent > 30 && 'Loyer actuel'}
                </div>
                <div 
                  className="bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${increasePercent}%` }}
                >
                  {increasePercent > 15 && 'Augmentation'}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>🏠 Actuel: {formatCurrency(currentRent)}</span>
                <span>📈 +{formatCurrency(allowedIncrease)}</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Indice de base (4%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(baseIncrease)}</span>
              </div>
              {taxImpact > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Impact taxes ({municipalTaxIncrease}%)</span>
                  <span className="font-semibold text-purple-600">{formatCurrency(taxImpact)}</span>
                </div>
              )}
              {repairsImpact > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Travaux majeurs</span>
                  <span className="font-semibold text-orange-600">{formatCurrency(repairsImpact)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 bg-emerald-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Total augmentation TAL</span>
                <span className="font-bold text-emerald-600 text-xl">{formatCurrency(allowedIncrease)}</span>
              </div>
            </div>
          </div>

          {/* Comparison Card (if proposed) */}
          {proposedIncrease > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comparaison</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Augmentation TAL (estimée)</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(allowedIncrease)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Augmentation proposée</span>
                  <span className={`font-semibold ${isAbusive ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(proposedIncrease)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-slate-50 rounded-lg px-3">
                  <span className="font-bold text-gray-900">Différence</span>
                  <span className={`font-bold text-xl ${isAbusive ? 'text-red-600' : 'text-green-600'}`}>
                    {isAbusive ? '+' : ''}{formatCurrency(difference)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Comment utiliser cet outil</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Entrez votre loyer actuel et les justifications du propriétaire</li>
                  <li>• Comparez avec l'augmentation proposée (si vous en avez reçu une)</li>
                  <li>• Si l'augmentation semble abusive, vous avez 21 jours pour contester</li>
                  <li>• Utilisez le formulaire officiel du TAL pour refuser</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="savings" />

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ceci est une estimation simplifiée basée sur les règles générales du TAL. Le calcul officiel peut varier selon votre situation spécifique. Consultez le TAL pour un calcul précis.
            </p>
          </div>
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
