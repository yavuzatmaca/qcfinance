'use client'

import { useState } from 'react'
import { Baby, Users, Minus, Plus, TrendingUp, Sparkles } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'

// 2026 Federal CCB (ACE) Constants
const FEDERAL_MAX_UNDER_6 = 7787 // per year
const FEDERAL_MAX_6_TO_17 = 6570 // per year
const FEDERAL_INCOME_THRESHOLD = 36502
const FEDERAL_REDUCTION_RATE = 0.07

// 2026 Quebec Soutien aux enfants Constants
const QUEBEC_MAX_PER_CHILD = 2925 // per year
const QUEBEC_INCOME_THRESHOLD = 57020
const QUEBEC_REDUCTION_RATE = 0.04

export default function FamilyBenefitsClient() {
  const [income, setIncome] = useState(65000)
  const [childrenUnder6, setChildrenUnder6] = useState(1)
  const [children6to17, setChildren6to17] = useState(0)
  const [custody, setCustody] = useState<'full' | 'shared'>('full')

  // Calculations
  const custodyMultiplier = custody === 'shared' ? 0.5 : 1.0
  const totalChildren = childrenUnder6 + children6to17

  // Federal CCB (ACE) Calculation
  let federalUnder6Yearly = FEDERAL_MAX_UNDER_6 * childrenUnder6
  let federal6to17Yearly = FEDERAL_MAX_6_TO_17 * children6to17

  if (income > FEDERAL_INCOME_THRESHOLD) {
    const excessIncome = income - FEDERAL_INCOME_THRESHOLD
    const yearlyReduction = excessIncome * FEDERAL_REDUCTION_RATE
    const reductionPerChild = yearlyReduction / totalChildren || 0
    
    federalUnder6Yearly = Math.max(0, federalUnder6Yearly - (reductionPerChild * childrenUnder6))
    federal6to17Yearly = Math.max(0, federal6to17Yearly - (reductionPerChild * children6to17))
  }

  const federalYearly = (federalUnder6Yearly + federal6to17Yearly) * custodyMultiplier
  const federalMonthly = federalYearly / 12

  // Quebec Soutien Calculation
  let quebecYearly = QUEBEC_MAX_PER_CHILD * totalChildren

  if (income > QUEBEC_INCOME_THRESHOLD) {
    const excessIncome = income - QUEBEC_INCOME_THRESHOLD
    const yearlyReduction = excessIncome * QUEBEC_REDUCTION_RATE
    quebecYearly = Math.max(0, quebecYearly - yearlyReduction)
  }

  quebecYearly = quebecYearly * custodyMultiplier
  const quebecMonthly = quebecYearly / 12

  // Totals
  const totalMonthly = federalMonthly + quebecMonthly
  const totalYearly = totalMonthly * 12

  // Visual bar percentages
  const federalPercent = totalYearly > 0 ? (federalYearly / totalYearly) * 100 : 50
  const quebecPercent = totalYearly > 0 ? (quebecYearly / totalYearly) * 100 : 50

  // Future value calculation (simple 5% growth over 18 years for RESP messaging)
  const futureValue = totalYearly * 18 * 1.3 // 30% government grants + modest growth

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Situation Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Votre Situation
          </h2>
          
          {/* Income */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenu familial net annuel
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mt-3 accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0$</span>
              <span>200 000$</span>
            </div>
          </div>

          {/* Custody Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type de garde
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCustody('full')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  custody === 'full'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Complète (100%)
              </button>
              <button
                onClick={() => setCustody('shared')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  custody === 'shared'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Partagée (50%)
              </button>
            </div>
          </div>
        </div>

        {/* Children Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Baby className="w-6 h-6 text-pink-600" />
            Vos Enfants
          </h2>
          
          {/* Under 6 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enfants de moins de 6 ans
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setChildrenUnder6(Math.max(0, childrenUnder6 - 1))}
                disabled={childrenUnder6 === 0}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-4xl font-bold text-blue-600 w-16 text-center">
                {childrenUnder6}
              </span>
              <button
                onClick={() => setChildrenUnder6(childrenUnder6 + 1)}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 6 to 17 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Enfants de 6 à 17 ans
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setChildren6to17(Math.max(0, children6to17 - 1))}
                disabled={children6to17 === 0}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-4xl font-bold text-indigo-600 w-16 text-center">
                {children6to17}
              </span>
              <button
                onClick={() => setChildren6to17(children6to17 + 1)}
                className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Monthly Benefit */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Vos allocations familiales</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(totalMonthly)}
            </p>
            <p className="text-emerald-100 text-lg">
              par mois ({formatCurrency(totalYearly)} / an)
            </p>
          </div>

          {/* THE "GAIN" BADGE */}
          {totalYearly > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <Sparkles className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Argent non-imposable !</p>
                  <p className="text-green-50">
                    Vous recevez <span className="font-bold text-2xl">{formatCurrency(totalYearly)}</span> par an libre d'impôt !
                  </p>
                  <p className="text-sm text-green-100 mt-2">
                    💡 Cet argent n'affecte pas votre déclaration de revenus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* THE "OPPORTUNITY" CALL-TO-ACTION */}
          {totalYearly > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">Transformez cet argent en richesse</p>
                  <p className="text-indigo-50">
                    Investissez dans un REEE et obtenez <span className="font-bold">30% de subventions gratuites</span>.
                  </p>
                  <p className="text-sm text-indigo-100 mt-2">
                    🎓 Valeur potentielle pour leurs études : <span className="font-bold text-xl">{formatCurrency(futureValue)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détails des allocations</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">🇨🇦 Canada (ACE)</span>
                <span className="font-semibold text-red-600">{formatCurrency(federalMonthly)}/mois</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">⚜️ Québec (Soutien)</span>
                <span className="font-semibold text-blue-600">{formatCurrency(quebecMonthly)}/mois</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
                <span className="font-bold text-gray-900">Total mensuel</span>
                <span className="font-bold text-green-600 text-xl">{formatCurrency(totalMonthly)}</span>
              </div>
            </div>

            {/* VISUAL BAR - Federal vs Quebec */}
            {totalYearly > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Répartition annuelle</p>
                <div className="flex h-8 rounded-lg overflow-hidden shadow-inner">
                  <div 
                    className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${federalPercent}%` }}
                  >
                    {federalPercent > 20 && 'Fédéral'}
                  </div>
                  <div 
                    className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${quebecPercent}%` }}
                  >
                    {quebecPercent > 20 && 'Québec'}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>🇨🇦 Fédéral: {federalPercent.toFixed(0)}%</span>
                  <span>⚜️ Québec: {quebecPercent.toFixed(0)}%</span>
                </div>
              </div>
            )}
          </div>

          {/* AFFILIATE CARD - RESP Focus */}
          <AffiliateCard variant="education" />

          {/* Info Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ces montants sont des estimations basées sur les taux 2026. Les montants réels peuvent varier selon votre situation familiale complète.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
