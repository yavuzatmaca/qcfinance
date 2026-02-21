'use client'

import { useState, useRef } from 'react'
import { AlertTriangle, Home, TrendingUp, DollarSign, Clock, CheckCircle, Share2, Download, X } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { generateMortgagePDF } from '@/utils/pdfGenerator'
import AdSenseAd from '@/components/AdSenseAd'

// CMHC Insurance rates (when down payment < 20%)
const getCMHCInsurance = (price: number, downPayment: number): number => {
  const downPaymentPercent = (downPayment / price) * 100
  const loanAmount = price - downPayment
  
  if (downPaymentPercent >= 20) return 0
  if (downPaymentPercent >= 15) return loanAmount * 0.028
  if (downPaymentPercent >= 10) return loanAmount * 0.031
  return loanAmount * 0.04
}

// Mortgage payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12
  
  if (monthlyRate === 0) return principal / numberOfPayments
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
}

export default function MortgageCalculatorClient() {
  // State
  const [price, setPrice] = useState(400000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [rate, setRate] = useState(4.8)
  const [amortization, setAmortization] = useState(25)
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true)
  const [isTimelineOpen, setIsTimelineOpen] = useState(false)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  
  // Calculations
  const downPayment = (price * downPaymentPercent) / 100
  const cmhcInsurance = getCMHCInsurance(price, downPayment)
  const mortgageAmount = price - downPayment + cmhcInsurance
  const monthlyPayment = calculateMonthlyPayment(mortgageAmount, rate, amortization)
  const totalPaid = monthlyPayment * 12 * amortization
  const totalInterest = totalPaid - mortgageAmount
  
  // Biweekly calculations
  const biweeklyPayment = monthlyPayment / 2.17
  const biweeklyPaymentsPerYear = 26
  const biweeklyAnnualPayment = biweeklyPayment * biweeklyPaymentsPerYear
  const biweeklyYearsToPayoff = Math.log(biweeklyAnnualPayment / (biweeklyAnnualPayment - (mortgageAmount * (rate / 100)))) / Math.log(1 + (rate / 100))
  const biweeklySavings = totalInterest - (biweeklyPayment * biweeklyPaymentsPerYear * biweeklyYearsToPayoff - mortgageAmount)
  
  // Progress timeline calculations
  const calculateRemainingBalance = (years: number): number => {
    const monthlyRate = rate / 100 / 12
    const totalPayments = amortization * 12
    const paymentsMade = years * 12
    const paymentsRemaining = totalPayments - paymentsMade
    
    if (paymentsRemaining <= 0) return 0
    
    return mortgageAmount * (Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, paymentsMade)) / 
           (Math.pow(1 + monthlyRate, totalPayments) - 1)
  }
  
  const timelineMilestones = [5, 10, 15, 20, 25].filter(year => year <= amortization).map(year => ({
    year,
    balance: calculateRemainingBalance(year),
    percentPaid: ((mortgageAmount - calculateRemainingBalance(year)) / mortgageAmount) * 100
  }))
  
  // The "Shock" Badge Logic
  const showShockBadge = totalInterest > price * 0.5
  
  // Visual bar percentages
  const principalPercent = (mortgageAmount / totalPaid) * 100
  const interestPercent = (totalInterest / totalPaid) * 100
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleShare = async () => {
    const text = `💰 Paiement mensuel: ${formatCurrency(monthlyPayment)} sur ${amortization} ans à ${rate}%`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon Calcul Hypothécaire',
          text,
          url: window.location.href
        })
      } catch (err) {
        navigator.clipboard.writeText(`${text}\n${window.location.href}`)
        alert('✅ Copié dans le presse-papiers!')
      }
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`)
      alert('✅ Copié dans le presse-papiers!')
    }
  }

  const handleDownloadPDF = () => {
    const result = {
      loanAmount: mortgageAmount,
      interestRate: rate,
      amortizationYears: amortization,
      paymentFrequency: 'monthly' as const,
      paymentAmount: monthlyPayment,
      totalPayments: totalPaid,
      totalInterest: totalInterest,
      balanceOverTime: timelineMilestones.map(m => ({ year: m.year, balance: m.balance }))
    }
    generateMortgagePDF(result)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12" ref={topRef}>
      
      {/* MOBILE ONLY: Minimal Sticky Bar with Expand */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          /* COLLAPSED STATE - Minimal */
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-indigo-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(monthlyPayment)}
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(price)} • {rate}% • {amortization} ans
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
          /* EXPANDED STATE - Full Calculator */
          <div className="p-4 animate-slide-down">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Calculateur Hypothèque</h3>
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

            {/* Result Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <div className="text-white/80 text-xs font-semibold mb-1">Votre paiement mensuel</div>
              <div className="text-white text-3xl font-bold tracking-tight mb-1">
                {formatCurrency(monthlyPayment)}
              </div>
              <div className="flex items-center gap-3 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {amortization} ans
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {rate}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Prix de la propriété</span>
                  <span className="text-sm font-bold text-white">{formatCurrency(price)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[300000, 400000, 500000, 600000].map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setPrice(amount)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        price === amount
                          ? 'bg-white text-indigo-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {amount / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Mise de fonds</span>
                  <span className="text-sm font-bold text-white">{downPaymentPercent}% • {formatCurrency(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                {downPaymentPercent < 20 && (
                  <div className="flex items-center gap-2 mt-2 p-2 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                    <AlertTriangle className="w-4 h-4 text-yellow-200 flex-shrink-0" />
                    <span className="text-xs text-yellow-100">Assurance SCHL: {formatCurrency(cmhcInsurance)}</span>
                  </div>
                )}
              </div>

              {/* Collapsible Advanced Options */}
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer touch-manipulation py-2 text-white/80 hover:text-white list-none">
                  <span className="text-xs font-semibold">+ Options avancées</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                
                <div className="mt-3 space-y-3 pt-3 border-t border-white/20">
                  {/* Rate Selection */}
                  <div>
                    <label className="text-xs font-semibold text-white block mb-2">Taux d'intérêt</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[4.5, 4.8, 5.25, 6.0].map(rateValue => (
                        <button
                          key={rateValue}
                          type="button"
                          onClick={() => setRate(rateValue)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                            rate === rateValue
                              ? 'bg-white text-indigo-600 shadow-lg'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          {rateValue}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amortization Selection */}
                  <div>
                    <label className="text-xs font-semibold text-white block mb-2">Amortissement</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[15, 20, 25, 30].map(years => (
                        <button
                          key={years}
                          type="button"
                          onClick={() => setAmortization(years)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                            amortization === years
                              ? 'bg-white text-indigo-600 shadow-lg'
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          {years}a
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              {/* Action Button */}
              <button
                onClick={() => {
                  setIsQuickCalcExpanded(false)
                  scrollToTop()
                }}
                className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl touch-manipulation active:scale-95 transition-all shadow-lg min-h-[52px] text-sm"
              >
                Voir tous les détails
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LEFT COLUMN - INPUTS (Mobile: Order 2, Desktop: Full Form) */}
      <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du prêt</h2>
          
          {/* FEATURE 1: Quick Presets */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Montant rapide
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[300000, 400000, 500000, 600000].map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setPrice(amount)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] touch-manipulation active:scale-95 ${
                    price === amount
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                  }`}
                >
                  {amount / 1000}k
                </button>
              ))}
            </div>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix de la propriété
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all touch-manipulation min-h-[44px]"
              />
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="10000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full mt-3 accent-indigo-600"
            />
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mise de fonds ({downPaymentPercent}% = {formatCurrency(downPayment)})
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>50%</span>
            </div>
            {downPaymentPercent < 20 && (
              <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Assurance SCHL requise: {formatCurrency(cmhcInsurance)}
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Taux d'intérêt annuel
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.01"
                min="0"
                max="15"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all touch-manipulation min-h-[44px]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[4.5, 4.8, 5.25, 6.0].map(rateValue => (
                <button
                  key={rateValue}
                  type="button"
                  onClick={() => setRate(rateValue)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] touch-manipulation active:scale-95 ${
                    rate === rateValue
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rateValue}%
                </button>
              ))}
            </div>
          </div>

          {/* Amortization */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Période d'amortissement
            </label>
            <select
              value={amortization}
              onChange={(e) => setAmortization(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all touch-manipulation min-h-[44px]"
            >
              <option value={15}>15 ans</option>
              <option value={20}>20 ans</option>
              <option value={25}>25 ans</option>
              <option value={30}>30 ans</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        <div className="lg:sticky lg:top-24 space-y-5 lg:space-y-6">
          
          {/* HERO NUMBER - Monthly Payment */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-2xl p-6 lg:p-8 text-white">
            <p className="text-sm lg:text-lg opacity-90 mb-2">Votre paiement mensuel</p>
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 lg:mb-4">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-indigo-100 text-xs lg:text-sm">
              Sur {amortization} ans à {rate}%
            </p>
          </div>

          {/* FEATURE 2: Biweekly Comparison Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-5 lg:p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-base lg:text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Économisez avec paiements aux 2 sem.</span>
              </h3>
              <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4">
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <div className="text-[10px] lg:text-xs text-gray-500 mb-1">Paiement aux 2 sem.</div>
                <div className="text-lg lg:text-xl font-bold text-gray-900">{formatCurrency(biweeklyPayment)}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <div className="text-[10px] lg:text-xs text-emerald-600 font-semibold mb-1">Économie totale</div>
                <div className="text-lg lg:text-xl font-bold text-emerald-600">{formatCurrency(Math.max(0, biweeklySavings))}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-xs lg:text-sm text-gray-700 bg-white rounded-lg p-3 border border-emerald-200">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Remboursé en <strong className="text-emerald-700">{Math.floor(biweeklyYearsToPayoff)} ans</strong> au lieu de {amortization} ans</span>
            </div>
          </div>

          {/* THE "SHOCK" BADGE */}
          {showShockBadge && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-5 lg:p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-7 h-7 lg:w-8 lg:h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-base lg:text-lg mb-1">Attention : Coût élevé des intérêts</p>
                  <p className="text-orange-50 text-sm lg:text-base">
                    Vous paierez <span className="font-bold text-xl lg:text-2xl">{formatCurrency(totalInterest)}</span> en intérêts sur {amortization} ans !
                  </p>
                  <p className="text-xs lg:text-sm text-orange-100 mt-2 flex items-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                    </svg>
                    <span>Réduisez votre amortissement ou augmentez votre mise de fonds pour économiser.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 3: Collapsible Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <button
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="w-full flex items-center justify-between p-5 lg:p-6 hover:bg-gray-50 transition-colors touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <DollarSign className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-base lg:text-xl font-bold text-gray-900">Résumé du prêt</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isBreakdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            {isBreakdownOpen && (
              <div className="px-5 lg:px-6 pb-5 lg:pb-6">
            <div className="space-y-2 lg:space-y-3 mb-5 lg:mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs lg:text-sm text-gray-700">Prix de la propriété</span>
                <span className="font-semibold text-sm lg:text-base text-gray-900">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs lg:text-sm text-gray-700">Mise de fonds ({downPaymentPercent}%)</span>
                <span className="font-semibold text-sm lg:text-base text-green-600">-{formatCurrency(downPayment)}</span>
              </div>
              {cmhcInsurance > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs lg:text-sm text-gray-700">Assurance SCHL</span>
                  <span className="font-semibold text-sm lg:text-base text-orange-600">+{formatCurrency(cmhcInsurance)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b-2 border-indigo-200">
                <span className="text-xs lg:text-sm text-gray-700 font-semibold">Montant hypothécaire</span>
                <span className="font-bold text-sm lg:text-base text-indigo-600">{formatCurrency(mortgageAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs lg:text-sm text-gray-700">Total des paiements</span>
                <span className="font-semibold text-sm lg:text-base text-gray-900">{formatCurrency(totalPaid)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs lg:text-sm text-gray-700">Total des intérêts</span>
                <span className="font-bold text-sm lg:text-base text-red-600">{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            {/* VISUAL BAR - Principal vs Interest */}
            <div className="mt-5 lg:mt-6">
              <p className="text-xs lg:text-sm font-semibold text-gray-700 mb-2">Répartition du coût total</p>
              <div className="flex h-7 lg:h-8 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-indigo-500 flex items-center justify-center text-white text-[10px] lg:text-xs font-semibold"
                  style={{ width: `${principalPercent}%` }}
                >
                  {principalPercent > 15 && 'Principal'}
                </div>
                <div 
                  className="bg-red-500 flex items-center justify-center text-white text-[10px] lg:text-xs font-semibold"
                  style={{ width: `${interestPercent}%` }}
                >
                  {interestPercent > 15 && 'Intérêts'}
                </div>
              </div>
              <div className="flex justify-between text-[10px] lg:text-xs text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-indigo-500 rounded-sm"></span>
                  Principal: {principalPercent.toFixed(0)}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                  Intérêts: {interestPercent.toFixed(0)}%
                </span>
              </div>
            </div>
              </div>
            )}
          </div>

          {/* FEATURE 4: Progress Timeline */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <button
              onClick={() => setIsTimelineOpen(!isTimelineOpen)}
              className="w-full flex items-center justify-between p-5 lg:p-6 hover:bg-gray-50 transition-colors touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <h3 className="text-base lg:text-xl font-bold text-gray-900">Évolution du solde</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isTimelineOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            {isTimelineOpen && (
              <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                <div className="space-y-2 lg:space-y-3">
                  {timelineMilestones.map((milestone) => (
                    <div key={milestone.year} className="flex items-center gap-2 lg:gap-3">
                      <div className="flex-shrink-0 w-10 lg:w-12 text-xs lg:text-sm font-semibold text-gray-600">
                        {milestone.year} ans
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${milestone.balance === 0 ? 'bg-emerald-600' : 'bg-indigo-600'}`}
                            style={{ width: `${milestone.percentPaid}%` }}
                          />
                        </div>
                      </div>
                      <div className={`flex-shrink-0 w-20 lg:w-24 text-right text-xs lg:text-sm font-semibold ${milestone.balance === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {formatCurrency(milestone.balance)}{milestone.balance === 0 ? ' ✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                    </svg>
                    <p className="text-[10px] lg:text-xs text-emerald-800">
                      <strong>Astuce:</strong> Chaque paiement supplémentaire de 100$/mois peut réduire votre amortissement de 3-4 ans!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FEATURE 5: Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-5 lg:p-6">
            <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all touch-manipulation min-h-[44px] active:scale-95 text-sm lg:text-base"
              >
                <Share2 className="w-4 h-4 flex-shrink-0" />
                Partager
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl transition-all touch-manipulation min-h-[44px] active:scale-95 text-sm lg:text-base"
              >
                <Download className="w-4 h-4 flex-shrink-0" />
                PDF
              </button>
            </div>
            
            <button
              onClick={scrollToTop}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 lg:hidden touch-manipulation min-h-[44px] active:scale-95 text-sm"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Calculer un autre scénario
            </button>
          </div>

          {/* AFFILIATE CARD - Inside Sticky Results */}
          <AffiliateCard variant="mortgage" />
        </div>
      </div>
    </div>

    {/* MOBILE ONLY: Sticky Bottom Ad */}
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
    </>
  )
}
