'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Home, Share2, Bookmark, X } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export default function RentVsBuyClient() {
  const [homePrice, setHomePrice] = useState<number>(400000)
  const [rent, setRent] = useState<number>(1500)
  const [downPayment, setDownPayment] = useState<number>(50000)
  const [rate, setRate] = useState<number>(5.0)
  const [appreciation, setAppreciation] = useState<number>(3.0)
  const [investmentReturn, setInvestmentReturn] = useState<number>(6.0)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  const YEARS = 5
  const PROPERTY_TAX_RATE = 0.012 // 1.2% annually
  const MAINTENANCE_RATE = 0.01 // 1% annually
  const RENT_INCREASE_RATE = 0.025 // 2.5% annually
  const TRANSFER_TAX_RATE = 0.015 // ~1.5% average
  const SELLING_COSTS_RATE = 0.05 // 5% (realtor fees, etc.)

  // BUY SCENARIO
  const mortgage = homePrice - downPayment
  const monthlyRate = rate / 100 / 12
  const numPayments = 25 * 12 // 25-year amortization
  const monthlyPayment = mortgage * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  
  // Calculate mortgage balance after 5 years
  const paymentsAfter5Years = YEARS * 12
  const remainingBalance = mortgage * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, paymentsAfter5Years)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  const principalPaid = mortgage - remainingBalance
  
  // Home value after appreciation
  const futureHomeValue = homePrice * Math.pow(1 + appreciation / 100, YEARS)
  
  // Total costs for buying
  const transferTax = homePrice * TRANSFER_TAX_RATE
  const totalInterestPaid = (monthlyPayment * paymentsAfter5Years) - principalPaid
  const totalPropertyTax = homePrice * PROPERTY_TAX_RATE * YEARS
  const totalMaintenance = homePrice * MAINTENANCE_RATE * YEARS
  const sellingCosts = futureHomeValue * SELLING_COSTS_RATE
  
  const totalBuyCosts = transferTax + totalInterestPaid + totalPropertyTax + totalMaintenance + sellingCosts
  const buyNetWorth = futureHomeValue - remainingBalance - totalBuyCosts + downPayment

  // RENT SCENARIO
  // Calculate total rent paid over 5 years with increases
  let totalRentPaid = 0
  let currentRent = rent
  for (let year = 0; year < YEARS; year++) {
    totalRentPaid += currentRent * 12
    currentRent *= (1 + RENT_INCREASE_RATE)
  }
  
  // Investment portfolio value
  // Down payment invested
  const downPaymentGrowth = downPayment * Math.pow(1 + investmentReturn / 100, YEARS)
  
  // Monthly savings invested (if rent < mortgage payment + costs)
  const monthlyOwnershipCost = monthlyPayment + (homePrice * PROPERTY_TAX_RATE / 12) + (homePrice * MAINTENANCE_RATE / 12)
  const monthlySavings = Math.max(0, monthlyOwnershipCost - rent)
  
  // Future value of monthly savings
  const monthlyReturnRate = investmentReturn / 100 / 12
  const savingsGrowth = monthlySavings > 0 
    ? monthlySavings * ((Math.pow(1 + monthlyReturnRate, paymentsAfter5Years) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate)
    : 0
  
  const rentNetWorth = downPaymentGrowth + savingsGrowth - totalRentPaid

  // THE VERDICT
  const difference = Math.abs(buyNetWorth - rentNetWorth)
  const buyWins = buyNetWorth > rentNetWorth

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleShare = async () => {
    const winner = buyWins ? 'Acheter' : 'Louer'
    const text = `${winner} est mieux!\nDifférence: ${formatCurrency(difference)}\nAprès 5 ans\n\nCalculé sur QCFinance.ca`
    
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
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-4">
        {!isQuickCalcExpanded ? (
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-blue-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {buyWins ? 'Acheter' : 'Louer'} est mieux
                </div>
                <div className="text-white/70 text-xs">
                  Différence: {formatCurrency(difference)} après 5 ans
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
                  <h3 className="text-white font-bold text-base">Louer ou Acheter</h3>
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
              <div className="text-center">
                <div className="text-white/80 text-xs font-semibold mb-1">Meilleur choix</div>
                <div className="text-white text-2xl font-bold flex items-center justify-center gap-2">
                  {buyWins ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {buyWins ? 'Acheter' : 'Louer'}
                </div>
                <div className="text-white/70 text-xs mt-1">Différence: {formatCurrency(difference)}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Prix propriété</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white mb-2 block">Loyer mensuel</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    localStorage.setItem('louer-acheter-last', JSON.stringify({ homePrice, rent, downPayment }))
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

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Vos paramètres
          </h2>

          {/* Home Price */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Prix de la propriété
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={homePrice || ''}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="10000"
              />
            </div>
          </div>

          {/* Monthly Rent */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Loyer mensuel
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={rent || ''}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="50"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Mise de fonds
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={downPayment || ''}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="5000"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {((downPayment / homePrice) * 100).toFixed(1)}% du prix
            </p>
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Taux hypothécaire : {rate.toFixed(2)}%
            </label>
            <input
              type="range"
              min="3"
              max="8"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3%</span>
              <span>8%</span>
            </div>
          </div>

          {/* Appreciation Rate */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Appréciation annuelle : {appreciation.toFixed(1)}%
            </label>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={appreciation}
              onChange={(e) => setAppreciation(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>8%</span>
            </div>
          </div>

          {/* Investment Return */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Rendement des placements : {investmentReturn.toFixed(1)}%
            </label>
            <input
              type="range"
              min="2"
              max="10"
              step="0.5"
              value={investmentReturn}
              onChange={(e) => setInvestmentReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>2%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Winner Badge */}
          <div className={`${
            buyWins 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
          } rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center`}>
            <div className="mb-4 flex justify-center">
              {buyWins ? (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ) : (
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {buyWins ? 'ACHETER' : 'LOUER'} est plus avantageux
            </h2>
            <div className="text-5xl lg:text-6xl font-extrabold mb-4">
              {formatCurrency(difference)}
            </div>
            <p className="text-lg opacity-90">
              de différence après {YEARS} ans
            </p>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Valeur nette après {YEARS} ans
            </h3>
            
            <div className="space-y-6">
              {/* Buy Bar */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-green-700 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Acheter
                  </span>
                  <span className="text-2xl font-bold text-green-900">{formatCurrency(buyNetWorth)}</span>
                </div>
                <div className="h-16 bg-green-100 rounded-xl overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-end pr-4 transition-all duration-500"
                    style={{ width: `${Math.min((buyNetWorth / Math.max(buyNetWorth, rentNetWorth)) * 100, 100)}%` }}
                  >
                    {buyWins && (
                      <span className="text-white font-bold text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        GAGNANT
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rent Bar */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-blue-700 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Louer
                  </span>
                  <span className="text-2xl font-bold text-blue-900">{formatCurrency(rentNetWorth)}</span>
                </div>
                <div className="h-16 bg-blue-100 rounded-xl overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-end pr-4 transition-all duration-500"
                    style={{ width: `${Math.min((rentNetWorth / Math.max(buyNetWorth, rentNetWorth)) * 100, 100)}%` }}
                  >
                    {!buyWins && (
                      <span className="text-white font-bold text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        GAGNANT
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Buy Breakdown */}
            <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6">
              <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Scénario Achat
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Valeur future</span>
                  <span className="font-bold text-green-900">{formatCurrency(futureHomeValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Hypothèque restante</span>
                  <span className="font-bold text-red-600">-{formatCurrency(remainingBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Capital remboursé</span>
                  <span className="font-bold text-green-900">{formatCurrency(principalPaid)}</span>
                </div>
                <div className="h-px bg-green-300"></div>
                <div className="flex justify-between">
                  <span className="text-green-700">Coûts totaux</span>
                  <span className="font-bold text-red-600">-{formatCurrency(totalBuyCosts)}</span>
                </div>
                <div className="text-xs text-green-600 ml-4 space-y-1">
                  <div>• Intérêts: {formatCurrency(totalInterestPaid)}</div>
                  <div>• Taxes: {formatCurrency(totalPropertyTax)}</div>
                  <div>• Entretien: {formatCurrency(totalMaintenance)}</div>
                  <div>• Frais vente: {formatCurrency(sellingCosts)}</div>
                </div>
                <div className="h-px bg-green-400"></div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-green-900">Valeur nette</span>
                  <span className="text-xl font-extrabold text-green-900">{formatCurrency(buyNetWorth)}</span>
                </div>
              </div>
            </div>

            {/* Rent Breakdown */}
            <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Scénario Location
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Mise de fonds investie</span>
                  <span className="font-bold text-blue-900">{formatCurrency(downPaymentGrowth)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Épargne mensuelle</span>
                  <span className="font-bold text-blue-900">{formatCurrency(savingsGrowth)}</span>
                </div>
                <div className="text-xs text-blue-600 ml-4">
                  {monthlySavings > 0 
                    ? `• ${formatCurrency(monthlySavings)}/mois investi`
                    : '• Aucune épargne (loyer ≥ coûts achat)'}
                </div>
                <div className="h-px bg-blue-300"></div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Loyers payés</span>
                  <span className="font-bold text-red-600">-{formatCurrency(totalRentPaid)}</span>
                </div>
                <div className="text-xs text-blue-600 ml-4">
                  • Augmentation 2.5%/an
                </div>
                <div className="h-px bg-blue-400"></div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-blue-900">Valeur nette</span>
                  <span className="text-xl font-extrabold text-blue-900">{formatCurrency(rentNetWorth)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Costs Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h4 className="font-bold text-slate-900 mb-4">Coûts mensuels (Année 1)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-xs text-green-600 font-semibold mb-1">Paiement hypothécaire</div>
                <div className="text-2xl font-bold text-green-900">{formatCurrency(monthlyPayment)}</div>
                <div className="text-xs text-green-600 mt-1">+ taxes + entretien</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-xs text-blue-600 font-semibold mb-1">Loyer mensuel</div>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(rent)}</div>
                <div className="text-xs text-blue-600 mt-1">tout inclus</div>
              </div>
            </div>
          </div>

          {/* Contextual Affiliate Card */}
          {buyWins ? (
            <AffiliateCard variant="mortgage" />
          ) : (
            <AffiliateCard variant="investment" />
          )}
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
