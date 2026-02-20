'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { calculateTaxes, formatCurrency } from '@/utils/taxLogic'
import { generateSalaryPDF } from '@/utils/pdfGenerator'
import InteractiveDonutChart from './ui/InteractiveDonutChart'
import { AffiliateCard } from '@/components/AffiliateCard'
import { useDebouncedAnalytics } from '@/hooks/useDebouncedAnalytics'

interface LuxurySalaryCalculatorProps {
  initialIncome: number
}

type PayPeriod = 'annual' | 'monthly' | 'biweekly' | 'weekly'

export default function LuxurySalaryCalculator({ initialIncome }: LuxurySalaryCalculatorProps) {
  const router = useRouter()
  // Store the annual gross as the base value
  const [annualGross, setAnnualGross] = useState(initialIncome)
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('annual')
  const [useFTQ, setUseFTQ] = useState(false)
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true)
  const [isChartOpen, setIsChartOpen] = useState(false)
  const [isRRSPOpen, setIsRRSPOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Analytics tracking
  const trackEvent = useDebouncedAnalytics(800)
  
  // Calculate the display value based on the current pay period
  const getDisplayValue = () => {
    if (annualGross === 0) return ''
    switch (payPeriod) {
      case 'annual':
        return annualGross.toString()
      case 'monthly':
        return (annualGross / 12).toFixed(2)
      case 'biweekly':
        return (annualGross / 26).toFixed(2)
      case 'weekly':
        return (annualGross / 52).toFixed(2)
      default:
        return annualGross.toString()
    }
  }
  
  // Handle input change - convert to annual gross
  const handleIncomeChange = (value: string) => {
    const numericValue = parseFloat(value) || 0
    
    // Convert the input value to annual gross based on current period
    let newAnnualGross = 0
    switch (payPeriod) {
      case 'annual':
        newAnnualGross = numericValue
        break
      case 'monthly':
        newAnnualGross = numericValue * 12
        break
      case 'biweekly':
        newAnnualGross = numericValue * 26
        break
      case 'weekly':
        newAnnualGross = numericValue * 52
        break
    }
    
    setAnnualGross(newAnnualGross)
  }

  const results = calculateTaxes(annualGross)
  
  // RRSP calculations
  const rrspLimit = Math.min(annualGross * 0.18, 31560) // 2026 limit
  const rrspContribution = Math.min(5000, rrspLimit) // Max FTQ contribution
  
  // FTQ/Fondaction calculations
  const ftqTaxCredit = useFTQ ? rrspContribution * 0.30 : 0 // 30% tax credit
  const rrspTaxSavings = rrspContribution * (results.totalDeductions / results.grossIncome) // Approximate marginal rate
  const totalTaxSavings = rrspTaxSavings + ftqTaxCredit
  const realCost = rrspContribution - totalTaxSavings
  
  // Check if income is in highest tax bracket (2027 rule change warning)
  const isHighIncome = annualGross >= 119910 // Approximate 2026 highest bracket threshold

  // Handle calculate button click
  const handleCalculate = () => {
    if (annualGross > 0) {
      const salaryToNavigate = Math.round(annualGross)
      
      // Track calculation event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'calculate_salary', {
          event_category: 'Calculator',
          event_label: 'Salary Calculator',
          value: salaryToNavigate,
          pay_period: payPeriod,
          net_income: Math.round(results.netIncome),
          total_deductions: Math.round(results.totalDeductions),
        })
      }
      
      // Dispatch custom event for IntroPopup
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('qcfinance:calculation-complete'))
      }
      
      // Smooth scroll to top before navigation
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Navigate after a short delay to allow scroll animation
      setTimeout(() => {
        router.push(`/salaire-net-quebec/${salaryToNavigate}`)
      }, 300)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      {/* Header and Input Section - Only show on landing page */}
      {initialIncome === 0 && (
        <>
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Calculateur Interactif
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Calculez Votre Salaire Net
            </h2>
            <p className="text-slate-600">
              Entrez votre revenu et découvrez instantanément votre salaire net après impôts
            </p>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Income Input */}
        <div>
          <label htmlFor="income-input" className="block text-sm font-semibold text-slate-700 mb-3">
            Votre Revenu Brut
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              id="income-input"
              type="number"
              value={getDisplayValue()}
              onChange={(e) => {
                handleIncomeChange(e.target.value)
                trackEvent('salary_input_change', {
                  calculator: 'salary',
                  field: 'income',
                  pay_period: payPeriod,
                })
              }}
              className="w-full pl-14 pr-4 py-4 text-2xl font-bold border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="50000"
            />
          </div>
        </div>

        {/* Pay Period Toggle */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Fréquence de Paie
          </label>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-2 md:gap-2.5 md:p-1">
            <button
              onClick={() => {
                setPayPeriod('annual')
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'change_pay_period', {
                    calculator: 'salary',
                    pay_period: 'annual',
                  })
                }
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                payPeriod === 'annual'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Annuel
            </button>
            <button
              onClick={() => setPayPeriod('monthly')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                payPeriod === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setPayPeriod('biweekly')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                payPeriod === 'biweekly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Bi-hebdo
            </button>
            <button
              onClick={() => setPayPeriod('weekly')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                payPeriod === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Hebdo
            </button>
          </div>
        </div>
      </div>

      {/* Calculate Button - Landing Page Only */}
      {initialIncome === 0 && (
        <div className="mb-8">
          <button
            onClick={handleCalculate}
            disabled={!annualGross || annualGross <= 0}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculer mon salaire net
          </button>
        </div>
      )}
        </>
      )}

      {/* Results Section - Only show on result pages (when initialIncome > 0) */}
      {initialIncome > 0 && (
        <div className="space-y-8">
          {/* Big Result */}
          <div className="text-center py-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
            <div className="text-sm font-semibold text-emerald-700 mb-2">
              REVENU NET ANNUEL
            </div>
            <div className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
              {formatCurrency(results.netIncome)}
            </div>
            <div className="text-slate-600 text-lg">
              sur {formatCurrency(results.grossIncome)} brut
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 rounded-2xl p-3 md:p-4 text-center border border-emerald-100">
              <div className="text-xs text-emerald-600 font-medium mb-1">Net Mensuel</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 12)}
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 md:p-4 text-center border border-emerald-100">
              <div className="text-xs text-emerald-600 font-medium mb-1">Net Bi-hebdo</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 26)}
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-3 md:p-4 text-center border border-emerald-100">
              <div className="text-xs text-emerald-600 font-medium mb-1">Net Hebdo</div>
              <div className="text-xl font-bold text-slate-900">
                {formatCurrency(results.netIncome / 52)}
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl p-3 md:p-4 text-center border border-slate-100">
              <div className="text-xs text-red-600 font-medium mb-1">Déductions</div>
              <div className="text-xl font-bold text-red-700">
                {formatCurrency(results.totalDeductions)}
              </div>
            </div>
          </div>

          {/* Detailed Breakdown - Collapsible */}
          <div className="border-t border-slate-200 pt-8">
            <button
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 md:py-4 hover:opacity-70 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-slate-900">Détail des déductions</span>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${isBreakdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isBreakdownOpen && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Impôt Provincial (QC)</div>
                  <div className="text-xs text-slate-500">
                    {((results.provincialTax / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="font-bold text-blue-600">
                  {formatCurrency(results.provincialTax)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Impôt Fédéral</div>
                  <div className="text-xs text-slate-500">
                    {((results.federalTax / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="font-bold text-indigo-600">
                  {formatCurrency(results.federalTax)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="text-sm font-semibold text-slate-900">RRQ (Régime de rentes)</div>
                  <div className="text-xs text-slate-500">
                    {((results.qpp / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="font-bold text-amber-600">
                  {formatCurrency(results.qpp)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <div>
                  <div className="text-sm font-semibold text-slate-900">RQAP (Assurance parentale)</div>
                  <div className="text-xs text-slate-500">
                    {((results.qpip / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="font-bold text-pink-600">
                  {formatCurrency(results.qpip)}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-semibold text-slate-900">AE (Assurance-emploi)</div>
                  <div className="text-xs text-slate-500">
                    {((results.ei / results.grossIncome) * 100).toFixed(1)}% du brut
                  </div>
                </div>
                <div className="font-bold text-purple-600">
                  {formatCurrency(results.ei)}
                </div>
              </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Chart - Collapsible */}
          <div className="border-t border-slate-200 pt-8">
            <button
              onClick={() => setIsChartOpen(!isChartOpen)}
              className="w-full flex items-center justify-between px-4 py-3 md:py-4 hover:opacity-70 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <span className="font-semibold text-slate-900">Visualisation graphique</span>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${isChartOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isChartOpen && (
              <InteractiveDonutChart
                netIncome={results.netIncome}
                federalTax={results.federalTax}
                provincialTax={results.provincialTax}
                qpp={results.qpp}
                qpip={results.qpip}
                ei={results.ei}
              />
            )}
          </div>

          {/* RRSP/FTQ Optimization Card - Collapsible */}
          <div className="border-t border-slate-200 pt-8">
            <button
              onClick={() => setIsRRSPOpen(!isRRSPOpen)}
              className="w-full flex items-center justify-between px-4 py-3 md:py-4 hover:opacity-70 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold text-slate-900">Optimisation REER</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded">Économisez</span>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${isRRSPOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isRRSPOpen && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-lg mb-1">
                  💰 Optimisez avec un REER
                </h4>
                <p className="text-sm text-amber-800">
                  Réduisez vos impôts en cotisant à un REER. Limite annuelle : {formatCurrency(rrspLimit)}
                </p>
              </div>
            </div>

            {/* FTQ/Fondaction Toggle */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={useFTQ}
                  onChange={(e) => {
                    setUseFTQ(e.target.checked)
                    
                    // Track FTQ toggle
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'toggle_ftq', {
                        calculator: 'salary',
                        enabled: e.target.checked,
                      })
                    }
                  }}
                  className="mt-1 w-5 h-5 text-amber-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 group-hover:text-amber-900 transition-colors">
                    Fonds FTQ / Fondaction (RRSP+)
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Obtenez 30% de crédit d'impôt supplémentaire (15% Québec + 15% Fédéral)
                  </div>
                </div>
                <div className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">
                  +30%
                </div>
              </label>
            </div>

            {/* Calculation Results */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700">Cotisation REER suggérée</span>
                <span className="font-bold text-slate-900">{formatCurrency(rrspContribution)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700">Économie d'impôt REER</span>
                <span className="font-semibold text-emerald-600">{formatCurrency(rrspTaxSavings)}</span>
              </div>

              {useFTQ && (
                <>
                  <div className="flex justify-between items-center text-sm bg-amber-100 -mx-4 px-4 py-2 rounded">
                    <span className="text-amber-900 font-medium">Crédit FTQ/Fondaction (30%)</span>
                    <span className="font-bold text-amber-900">{formatCurrency(ftqTaxCredit)}</span>
                  </div>
                  
                  <div className="h-px bg-amber-300"></div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <div className="font-bold text-slate-900">Coût réel après crédits</div>
                      <div className="text-xs text-slate-600">Sur {formatCurrency(rrspContribution)} investi</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-emerald-600">
                        {formatCurrency(realCost)}
                      </div>
                      <div className="text-xs text-emerald-700 font-semibold">
                        Économie : {formatCurrency(totalTaxSavings)}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!useFTQ && (
                <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                  <span className="font-bold text-slate-900">Coût réel</span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatCurrency(rrspContribution - rrspTaxSavings)}
                  </span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-blue-800">
                  <strong>FTQ/Fondaction :</strong> Maximum 5 000$/an. Le crédit de 30% (max 1 500$) s'ajoute à votre déduction REER normale. 
                  Disponible via retenues salariales ou tirage au sort.
                </p>
              </div>
            </div>

            {/* 2027 Rule Change Warning for High Income */}
            {useFTQ && isHighIncome && (
              <div className="mt-4 bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-bold text-orange-900 mb-1">
                      ⚠️ Changement en 2027
                    </div>
                    <p className="text-xs text-orange-800 leading-relaxed">
                      À partir de 2027, les contribuables dans la tranche d'imposition la plus élevée (≈120 000$+) 
                      perdront le crédit provincial de 15%. Vous conserverez seulement le crédit fédéral de 15%. 
                      <span className="font-semibold"> Profitez du crédit complet de 30% en 2026!</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
            )}
          </div>

          {/* Life Simulator CTA - Professional Button */}
          <div className="border-t border-slate-200 pt-6 mb-6">
            <button
              onClick={() => {
                router.push(`/simulateur-vie-quebec?income=${annualGross}`);
                
                // Track simulator navigation
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'navigate_to_simulator', {
                    event_category: 'Engagement',
                    event_label: 'Life Simulator',
                    value: Math.round(annualGross),
                  })
                }
              }}
              className="group w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 text-center active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold leading-tight">
                    Simulez votre budget complet
                  </div>
                  <div className="text-sm font-normal opacity-90 leading-tight mt-0.5">
                    Loyer, épicerie, allocations et plus
                  </div>
                </div>
                <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="border-t border-slate-200 pt-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;
                  
                  // Track share event
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'share', {
                      event_category: 'Engagement',
                      event_label: 'Salary Result',
                      method: hasNativeShare ? 'native' : 'clipboard',
                    })
                  }
                  
                  if (hasNativeShare) {
                    navigator.share({
                      title: 'Mon Salaire Net',
                      text: `Salaire Net: ${formatCurrency(results.netIncome)} sur ${formatCurrency(results.grossIncome)} brut`,
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(`Salaire Net: ${formatCurrency(results.netIncome)} sur ${formatCurrency(results.grossIncome)} brut - ${window.location.href}`);
                    alert('Lien copié dans le presse-papiers!');
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Partager
              </button>
              <button
                onClick={() => {
                  generateSalaryPDF(results, payPeriod);
                  
                  // Track PDF download
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'download_pdf', {
                      event_category: 'Engagement',
                      event_label: 'Salary PDF',
                      value: Math.round(results.grossIncome),
                    })
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Imprimer
              </button>
            </div>
          </div>

          {/* Recalculate Section - Show on result pages */}
          {initialIncome > 0 && (
            <div className="border-t border-slate-200 pt-8 mt-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Calculer un autre montant
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="recalc-input" className="block text-sm font-semibold text-slate-700 mb-2">
                      Nouveau Revenu Brut
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        id="recalc-input"
                        type="number"
                        value={getDisplayValue()}
                        onChange={(e) => handleIncomeChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCalculate()
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 text-lg font-semibold border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Fréquence
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['annual', 'monthly', 'biweekly', 'weekly'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setPayPeriod(period as PayPeriod)}
                          className={`px-3 py-3 rounded-lg font-semibold text-sm transition-all ${
                            payPeriod === period
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
                          }`}
                        >
                          {period === 'annual' ? 'Annuel' : period === 'monthly' ? 'Mensuel' : period === 'biweekly' ? 'Bi-hebdo' : 'Hebdo'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  disabled={!annualGross || annualGross <= 0}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Recalculer
                </button>
              </div>
            </div>
          )}

          {/* Affiliate Card - Tax/RRSP Context */}
          <AffiliateCard variant="tax" />
        </div>
      )}
    </div>
  )
}
