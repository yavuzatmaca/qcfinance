'use client'

import { useState } from 'react'
import { Clock, DollarSign, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react'
import { AffiliateCard } from '@/components/AffiliateCard'

// 2026 EI Constants
const MAX_INSURABLE_EARNINGS = 63200
const EI_RATE = 0.55 // 55%
const MAX_WEEKLY_BENEFIT = 668
const ESTIMATED_TAX_RATE = 0.10

// Simplified duration table based on hours worked and regional unemployment
const getDuration = (weeksWorked: number, unemploymentRate: number): number => {
  // Simplified: More weeks worked + higher unemployment = longer benefits
  const baseWeeks = Math.floor(weeksWorked * 0.6)
  const regionalBonus = unemploymentRate > 8 ? 8 : unemploymentRate > 6 ? 5 : 2
  return Math.min(45, Math.max(14, baseWeeks + regionalBonus))
}

export default function EICalculatorClient() {
  const [salary, setSalary] = useState(50000)
  const [weeksWorked, setWeeksWorked] = useState(40)
  const [unemploymentRate, setUnemploymentRate] = useState(6)

  // Calculations
  const insurableEarnings = Math.min(salary, MAX_INSURABLE_EARNINGS)
  const averageWeeklyEarnings = insurableEarnings / 52
  let weeklyBenefit = averageWeeklyEarnings * EI_RATE
  const isAtMaximum = weeklyBenefit >= MAX_WEEKLY_BENEFIT
  weeklyBenefit = Math.min(weeklyBenefit, MAX_WEEKLY_BENEFIT)

  const taxWithholding = weeklyBenefit * ESTIMATED_TAX_RATE
  const weeklyBenefitAfterTax = weeklyBenefit - taxWithholding
  const monthlyBenefit = weeklyBenefit * 4.33

  const duration = getDuration(weeksWorked, unemploymentRate)
  const totalBenefit = weeklyBenefit * duration

  // Gap calculation for visual
  const replacementRate = (weeklyBenefit / (salary / 52)) * 100
  const gapPercent = 100 - replacementRate

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRegionLabel = (rate: number) => {
    if (rate <= 5) return 'Faible (Montréal, Laval)'
    if (rate <= 7) return 'Moyen (Québec, Sherbrooke)'
    return 'Élevé (Gaspésie, Côte-Nord)'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      
      {/* LEFT COLUMN - INPUTS (Mobile: Order 2) */}
      <div className="lg:col-span-5 order-2 lg:order-none space-y-6">
        
        {/* Salary Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            Votre Salaire
          </h2>
          
          {/* Salary Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salaire annuel brut
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="1000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full mt-3 accent-blue-600"
            />
            {salary > MAX_INSURABLE_EARNINGS && (
              <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Plafonné à {formatCurrency(MAX_INSURABLE_EARNINGS)} (maximum assurable)
              </p>
            )}
          </div>
        </div>

        {/* Work History Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-slate-600" />
            Historique de Travail
          </h2>
          
          {/* Weeks Worked */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Semaines travaillées (dernière année)
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min="14"
                max="52"
                step="1"
                value={weeksWorked}
                onChange={(e) => setWeeksWorked(Number(e.target.value))}
                className="flex-1 accent-blue-600"
              />
              <span className="text-2xl font-bold text-blue-600 w-16 text-right">
                {weeksWorked}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>14 sem.</span>
              <span>52 sem.</span>
            </div>
          </div>

          {/* Regional Unemployment Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Taux de chômage régional
            </label>
            <select
              value={unemploymentRate}
              onChange={(e) => setUnemploymentRate(Number(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value={4}>4% - Faible (Montréal, Laval)</option>
              <option value={6}>6% - Moyen (Québec, Sherbrooke)</option>
              <option value={9}>9% - Élevé (Gaspésie, Côte-Nord)</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Le taux de chômage de votre région influence la durée des prestations
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - STICKY RESULTS (Mobile: Order 1) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          
          {/* HERO NUMBER - Weekly Benefit */}
          <div className="bg-gradient-to-br from-blue-600 to-slate-700 rounded-2xl shadow-2xl p-8 text-white">
            <p className="text-lg opacity-90 mb-2">Votre prestation hebdomadaire</p>
            <p className="text-6xl md:text-7xl font-bold mb-4">
              {formatCurrency(weeklyBenefit)}
            </p>
            <p className="text-blue-100 text-lg mb-2">
              ≈ {formatCurrency(monthlyBenefit)} / mois
            </p>
            <p className="text-sm text-blue-200">
              (Avant retenue d'impôt de ~10%)
            </p>
          </div>

          {/* TRUST BADGE - Maximum Reached */}
          {isAtMaximum && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg mb-1">✅ Maximum atteint</p>
                  <p className="text-green-50">
                    Vous recevez le montant maximum de <span className="font-bold">{formatCurrency(MAX_WEEKLY_BENEFIT)}/semaine</span>
                  </p>
                  <p className="text-sm text-green-100 mt-2">
                    Votre salaire dépasse le plafond des gains assurables.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* VISUAL BAR - Salary vs Benefit Gap */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Remplacement du revenu</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Salaire hebdomadaire</span>
                <span className="font-semibold">{formatCurrency(salary / 52)}</span>
              </div>
              <div className="flex h-10 rounded-lg overflow-hidden shadow-inner">
                <div 
                  className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${replacementRate}%` }}
                >
                  {replacementRate > 20 && `${replacementRate.toFixed(0)}% Couvert`}
                </div>
                <div 
                  className="bg-red-400 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${gapPercent}%` }}
                >
                  {gapPercent > 20 && `${gapPercent.toFixed(0)}% Écart`}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>💙 Prestation AE: {formatCurrency(weeklyBenefit)}</span>
                <span>❤️ Écart: {formatCurrency((salary / 52) - weeklyBenefit)}</span>
              </div>
            </div>

            {/* After Tax */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Après retenue d'impôt (~10%)</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Net estimé par semaine:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(weeklyBenefitAfterTax)}</span>
              </div>
            </div>
          </div>

          {/* TIMELINE - Duration */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Durée des prestations</h3>
            
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-indigo-600 mb-2">{duration}</p>
              <p className="text-lg text-gray-700">semaines de couverture</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">Total des prestations</span>
                <span className="text-2xl font-bold text-indigo-600">{formatCurrency(totalBenefit)}</span>
              </div>
              <p className="text-xs text-gray-600">
                Basé sur {duration} semaines à {formatCurrency(weeklyBenefit)}/semaine
              </p>
            </div>

            {/* Timeline Visual */}
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${(duration / 45) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>14 sem.</span>
                <span className="font-semibold text-indigo-600">{duration} sem.</span>
                <span>45 sem. (max)</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-4">
              💡 La durée dépend de vos heures travaillées et du taux de chômage régional
            </p>
          </div>

          {/* Breakdown Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Détails du calcul</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Salaire annuel</span>
                <span className="font-semibold text-gray-900">{formatCurrency(salary)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Gains assurables</span>
                <span className="font-semibold text-gray-900">{formatCurrency(insurableEarnings)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Taux de prestation</span>
                <span className="font-semibold text-gray-900">55%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Semaines travaillées</span>
                <span className="font-semibold text-gray-900">{weeksWorked} semaines</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Région</span>
                <span className="font-semibold text-gray-900">{getRegionLabel(unemploymentRate)}</span>
              </div>
            </div>
          </div>

          {/* AFFILIATE CARD */}
          <AffiliateCard variant="savings" />

          {/* Info Note */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Ceci est une estimation. Service Canada calculera votre prestation exacte basée sur vos relevés d'emploi (RE) des 52 dernières semaines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
