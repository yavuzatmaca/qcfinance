'use client'

import { useState, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { generateMortgagePDF } from '@/utils/pdfGenerator'

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mon Calcul Hypothécaire',
        text: `Paiement mensuel: ${formatCurrency(monthlyPayment)} sur ${amortization} ans à ${rate}%`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(`Paiement mensuel: ${formatCurrency(monthlyPayment)} sur ${amortization} ans à ${rate}% - ${window.location.href}`)
      alert('Lien copié dans le presse-papiers!')
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12" ref={topRef}>
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du prêt</h2>
          
          {/* FEATURE 1: Quick Presets */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Montant rapide
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPrice(300000)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  price === 300000
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                300k
              </button>
              <button
                type="button"
                onClick={() => setPrice(400000)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  price === 400000
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                400k
              </button>
              <button
                type="button"
                onClick={() => setPrice(500000)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  price === 500000
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                500k
              </button>
              <button
                type="button"
                onClick={() => setPrice(600000)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  price === 600000
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                600k
              </button>
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
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
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
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.01"
                min="0"
                max="15"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              <button
                type="button"
                onClick={() => setRate(4.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 4.5
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.5%
              </button>
              <button
                type="button"
                onClick={() => setRate(4.8)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 4.8
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.8%
              </button>
              <button
                type="button"
                onClick={() => setRate(5.25)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 5.25
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.25%
              </button>
              <button
                type="button"
                onClick={() => setRate(6.0)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 6.0
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                6.0%
              </button>
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
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
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Monthly Payment */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Votre paiement mensuel</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-indigo-100 text-sm">
              Sur {amortization} ans à {rate}%
            </p>
          </div>

          {/* FEATURE 2: Biweekly Comparison Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">💰 Économisez avec paiements aux 2 sem.</h3>
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <div className="text-xs text-gray-500 mb-1">Paiement aux 2 sem.</div>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(biweeklyPayment)}</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <div className="text-xs text-emerald-600 font-semibold mb-1">Économie totale</div>
                <div className="text-xl font-bold text-emerald-600">{formatCurrency(Math.max(0, biweeklySavings))}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg p-3 border border-emerald-200">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
              <span>Remboursé en <strong className="text-emerald-700">{Math.floor(biweeklyYearsToPayoff)} ans</strong> au lieu de {amortization} ans</span>
            </div>
          </div>

          {/* THE "SHOCK" BADGE */}
          {showShockBadge && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Attention : Coût élevé des intérêts</p>
                  <p className="text-orange-50">
                    Vous paierez <span className="font-bold text-2xl">{formatCurrency(totalInterest)}</span> en intérêts sur {amortization} ans !
                  </p>
                  <p className="text-sm text-orange-100 mt-2">
                    💡 Réduisez votre amortissement ou augmentez votre mise de fonds pour économiser.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 3: Collapsible Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <button
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900">Résumé du prêt</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isBreakdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            {isBreakdownOpen && (
              <div className="px-6 pb-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Prix de la propriété</span>
                <span className="font-semibold text-gray-900">{formatCurrency(price)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Mise de fonds ({downPaymentPercent}%)</span>
                <span className="font-semibold text-green-600">-{formatCurrency(downPayment)}</span>
              </div>
              {cmhcInsurance > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Assurance SCHL</span>
                  <span className="font-semibold text-orange-600">+{formatCurrency(cmhcInsurance)}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b-2 border-indigo-200">
                <span className="text-gray-700 font-semibold">Montant hypothécaire</span>
                <span className="font-bold text-indigo-600">{formatCurrency(mortgageAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Total des paiements</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalPaid)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Total des intérêts</span>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            {/* VISUAL BAR - Principal vs Interest */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Répartition du coût total</p>
              <div className="flex h-8 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${principalPercent}%` }}
                >
                  {principalPercent > 15 && 'Principal'}
                </div>
                <div 
                  className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${interestPercent}%` }}
                >
                  {interestPercent > 15 && 'Intérêts'}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>💙 Principal: {principalPercent.toFixed(0)}%</span>
                <span>❤️ Intérêts: {interestPercent.toFixed(0)}%</span>
              </div>
            </div>
              </div>
            )}
          </div>

          {/* FEATURE 4: Progress Timeline */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
            <button
              onClick={() => setIsTimelineOpen(!isTimelineOpen)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900">Évolution du solde</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isTimelineOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            {isTimelineOpen && (
              <div className="px-6 pb-6">
                <div className="space-y-3">
                  {timelineMilestones.map((milestone) => (
                    <div key={milestone.year} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 text-sm font-semibold text-gray-600">
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
                      <div className={`flex-shrink-0 w-24 text-right text-sm font-semibold ${milestone.balance === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {formatCurrency(milestone.balance)}{milestone.balance === 0 ? ' ✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <p className="text-xs text-emerald-800">
                      <strong>Astuce:</strong> Chaque paiement supplémentaire de 100$/mois peut réduire votre amortissement de 3-4 ans!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FEATURE 5: Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                Partager
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                PDF
              </button>
            </div>
            
            <button
              onClick={scrollToTop}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 md:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}
