'use client'

import { useState } from 'react'
import { Home, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'

// Banking Constants
const GDS_LIMIT = 0.39 // 39% - Gross Debt Service
const TDS_LIMIT = 0.44 // 44% - Total Debt Service
const PROPERTY_TAX_RATE = 0.01 / 12 // 1% annually
const HEATING_ESTIMATE = 150 // Monthly
const CONDO_FEES_DEFAULT = 0 // Monthly

export default function AffordabilityClient() {
  const [income, setIncome] = useState(80000)
  const [debts, setDebts] = useState(0)
  const [downPayment, setDownPayment] = useState(50000)
  const [rate, setRate] = useState(5.0)
  const [expenses, setExpenses] = useState(HEATING_ESTIMATE + CONDO_FEES_DEFAULT)

  // Calculations
  const monthlyIncome = income / 12
  const stressTestRate = rate + 2 // Stress test = rate + 2%

  // GDS Limit (39% of income for housing costs)
  const gdsLimit = monthlyIncome * GDS_LIMIT

  // TDS Limit (44% of income minus other debts)
  const tdsLimit = (monthlyIncome * TDS_LIMIT) - debts

  // Max Payment Allowed (most restrictive)
  const maxPaymentAllowed = Math.min(gdsLimit, tdsLimit)

  // Available for mortgage (after expenses)
  const availableForMortgage = Math.max(0, maxPaymentAllowed - expenses)

  // Calculate Max Mortgage using stress test rate
  const monthlyStressRate = stressTestRate / 100 / 12
  const numberOfPayments = 25 * 12
  let maxMortgage = 0

  if (monthlyStressRate > 0) {
    const factor = Math.pow(1 + monthlyStressRate, numberOfPayments)
    maxMortgage = availableForMortgage * (factor - 1) / (monthlyStressRate * factor)
  } else {
    maxMortgage = availableForMortgage * numberOfPayments
  }

  // Max Purchase Price
  const maxPrice = maxMortgage + downPayment

  // Calculate actual ratios
  const monthlyMortgagePayment = calculateMonthlyPayment(maxMortgage, stressTestRate, 25)
  const totalHousingCosts = monthlyMortgagePayment + expenses
  const gdsRatio = (totalHousingCosts / monthlyIncome) * 100
  const tdsRatio = ((totalHousingCosts + debts) / monthlyIncome) * 100

  // Debt reduction impact
  const debtReduction = debts > 0 ? (debts / monthlyStressRate) * (Math.pow(1 + monthlyStressRate, numberOfPayments) - 1) / Math.pow(1 + monthlyStressRate, numberOfPayments) : 0

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
    const monthlyRate = annualRate / 100 / 12
    const numberOfPayments = years * 12
    
    if (monthlyRate === 0) return principal / numberOfPayments
    
    const factor = Math.pow(1 + monthlyRate, numberOfPayments)
    return principal * (monthlyRate * factor) / (factor - 1)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Income & Debts Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-violet-600" />
            Revenus & Dettes
          </h2>
          
          {/* Annual Income */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenu annuel brut (vous + partenaire)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mt-3 accent-violet-600"
            />
          </div>

          {/* Monthly Debts */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dettes mensuelles (cartes, prêts auto)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={debts}
                onChange={(e) => setDebts(Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Incluez tous les paiements mensuels récurrents
            </p>
          </div>
        </div>

        {/* Down Payment & Rate Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Home className="w-6 h-6 text-indigo-600" />
            Mise de Fonds & Taux
          </h2>
          
          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mise de fonds disponible
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full mt-3 accent-violet-600"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Taux d'intérêt hypothécaire
            </label>
            <div className="relative">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.1"
                min="2"
                max="10"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button
                onClick={() => setRate(4.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 4.5 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4.5%
              </button>
              <button
                onClick={() => setRate(5.0)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 5.0 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.0%
              </button>
              <button
                onClick={() => setRate(5.5)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  rate === 5.5 ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                5.5%
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Test de résistance: {(rate + 2).toFixed(1)}% (taux + 2%)
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Max Price */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Prix maximum</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(maxPrice)}
            </p>
            <p className="text-violet-100 text-lg">
              Hypothèque max: {formatCurrency(maxMortgage)}
            </p>
          </div>

          {/* THE "RATIO" BADGE */}
          {debts > 0 && debtReduction > 0 && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">⚠️ Impact de vos dettes</p>
                  <p className="text-orange-50">
                    Vos dettes de <span className="font-bold">{formatCurrency(debts)}/mois</span> réduisent votre budget d'environ <span className="font-bold text-2xl">{formatCurrency(debtReduction)}</span>
                  </p>
                  <p className="text-sm text-orange-100 mt-2">
                    💡 Remboursez vos dettes pour augmenter votre capacité d'achat.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VISUAL GAUGE - GDS/TDS Usage */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ratios d'endettement</h3>
            
            {/* GDS Ratio */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Ratio ABD (GDS) - Logement</span>
                <span className={`text-xl font-bold ${gdsRatio <= 39 ? 'text-green-600' : 'text-red-600'}`}>
                  {gdsRatio.toFixed(1)}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${gdsRatio <= 39 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((gdsRatio / 39) * 100, 100)}%` }}
                  />
                </div>
                <div className="absolute right-0 top-5 text-xs text-gray-500">
                  Max: 39%
                </div>
              </div>
            </div>

            {/* TDS Ratio */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Ratio ATD (TDS) - Total</span>
                <span className={`text-xl font-bold ${tdsRatio <= 44 ? 'text-green-600' : 'text-red-600'}`}>
                  {tdsRatio.toFixed(1)}%
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${tdsRatio <= 44 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min((tdsRatio / 44) * 100, 100)}%` }}
                  />
                </div>
                <div className="absolute right-0 top-5 text-xs text-gray-500">
                  Max: 44%
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {gdsRatio <= 39 && tdsRatio <= 44 ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-semibold">
                  ✅ Excellent ! Vos ratios respectent les normes bancaires.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-semibold">
                  ⚠️ Attention : Vos ratios dépassent les limites recommandées.
                </p>
              </div>
            )}
          </div>

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Revenu mensuel</span>
                <span className="font-semibold text-gray-900">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Paiement max (GDS 39%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(gdsLimit)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Paiement max (TDS 44%)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(tdsLimit)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Dettes mensuelles</span>
                <span className="font-semibold text-red-600">{formatCurrency(debts)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Dépenses (taxes, chauffage)</span>
                <span className="font-semibold text-orange-600">{formatCurrency(expenses)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-violet-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Hypothèque maximum</span>
                <span className="font-bold text-violet-600 text-xl">{formatCurrency(maxMortgage)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-indigo-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Prix maximum</span>
                <span className="font-bold text-indigo-600 text-2xl">{formatCurrency(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="mortgage" />

          {/* Info Card */}
          <div className="bg-violet-50 border-l-4 border-violet-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ce calcul utilise le test de résistance ({(rate + 2).toFixed(1)}%) et un amortissement de 25 ans. Les banques peuvent avoir des critères additionnels. Consultez un courtier hypothécaire pour une évaluation précise.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
