'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

export default function VacationPayClient() {
  const [grossSalary, setGrossSalary] = useState<number>(50000)
  const [yearsOfService, setYearsOfService] = useState<number>(1)
  const [includeOvertime, setIncludeOvertime] = useState<boolean>(true)

  // Quebec Labour Standards: 4% for <3 years, 6% for >=3 years
  const vacationRate = yearsOfService >= 3 ? 0.06 : 0.04
  const vacationWeeks = yearsOfService >= 3 ? 3 : 2

  // Calculate vacation pay
  const vacationPay = grossSalary * vacationRate

  // Calculate daily vacation pay (assuming 5-day work week)
  const dailyVacationPay = vacationPay / (vacationWeeks * 5)

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const isEligibleForBonus = yearsOfService >= 3

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🏖️</span>
            Vos informations
          </h2>

          {/* Gross Salary */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Salaire brut annuel (année de référence)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
              <input
                type="number"
                value={grossSalary || ''}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                step="1000"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {[40000, 50000, 60000, 75000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setGrossSalary(quickAmount)}
                  className="flex-1 py-1 px-2 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickAmount / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Years of Service */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Années de service continu : {yearsOfService} {yearsOfService === 1 ? 'an' : 'ans'}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1 an</span>
              <span>10+ ans</span>
            </div>
            
            {/* Rate Display */}
            <div className={`mt-3 rounded-lg p-3 ${isEligibleForBonus ? 'bg-amber-50 border-2 border-amber-300' : 'bg-teal-50 border border-teal-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Taux applicable</span>
                <span className={`text-2xl font-bold ${isEligibleForBonus ? 'text-amber-600' : 'text-teal-600'}`}>
                  {(vacationRate * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {vacationWeeks} semaines de vacances
              </p>
            </div>
          </div>

          {/* Include Overtime Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOvertime}
                onChange={(e) => setIncludeOvertime(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
              />
              <div>
                <span className="text-sm font-bold text-slate-700">Inclure les heures supplémentaires</span>
                <p className="text-xs text-slate-500">
                  L'indemnité est calculée sur tous vos gains (salaire + heures sup + primes)
                </p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-teal-900 text-sm mb-1">
                  Année de référence
                </h3>
                <p className="text-xs text-teal-800">
                  L'indemnité est calculée sur votre salaire brut gagné du <strong>1er mai au 30 avril</strong>. 
                  Tous vos revenus de cette période comptent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Vacation Pay Card */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                Indemnité de vacances
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-4">
                {formatCurrency(vacationPay)}
              </div>
              <p className="text-xl opacity-90 mb-1">
                {(vacationRate * 100).toFixed(0)}% de votre salaire brut
              </p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-80">Vous avez droit à</span>
                <span className="text-2xl font-bold">{vacationWeeks} semaines</span>
              </div>
            </div>
          </div>

          {/* Bonus Badge for 3+ years */}
          {isEligibleForBonus && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold mb-2">
                Félicitations !
              </h3>
              <p className="text-sm opacity-90 mb-2">
                Avec {yearsOfService} ans de service, vous avez droit à
              </p>
              <div className="text-4xl font-extrabold mb-2">
                6% (3 semaines)
              </div>
              <p className="text-xs opacity-80">
                Au lieu de 4% (2 semaines) pour les employés de moins de 3 ans
              </p>
            </div>
          )}

          {/* Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Détails de votre indemnité
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Salaire brut annuel</span>
                <span className="font-bold text-slate-900">{formatCurrency(grossSalary)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Taux d'indemnité</span>
                <span className="font-bold text-teal-600">{(vacationRate * 100).toFixed(0)}%</span>
              </div>

              <div className="h-px bg-slate-300"></div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-slate-900">Indemnité totale</span>
                <span className="text-2xl font-extrabold text-teal-900">{formatCurrency(vacationPay)}</span>
              </div>

              <div className="h-px bg-slate-200"></div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Par semaine de vacances</span>
                <span className="font-bold text-slate-900">{formatCurrency(vacationPay / vacationWeeks)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700">Par jour de vacances</span>
                <span className="font-bold text-slate-900">{formatCurrency(dailyVacationPay)}</span>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Répartition annuelle
            </h3>

            <div className="mb-6">
              <div className="h-16 bg-slate-100 rounded-xl overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center text-white text-sm font-bold"
                  style={{ width: `${((grossSalary - vacationPay) / grossSalary) * 100}%` }}
                >
                  Salaire régulier
                </div>
                <div
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold"
                  style={{ width: `${(vacationPay / grossSalary) * 100}%` }}
                >
                  Vacances
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xs text-slate-600 mb-1">Salaire régulier</div>
                <div className="text-lg font-bold text-slate-900">{formatCurrency(grossSalary - vacationPay)}</div>
                <div className="text-xs text-slate-500">{(((grossSalary - vacationPay) / grossSalary) * 100).toFixed(0)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-600 mb-1">Indemnité vacances</div>
                <div className="text-lg font-bold text-teal-600">{formatCurrency(vacationPay)}</div>
                <div className="text-xs text-slate-500">{((vacationPay / grossSalary) * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {/* Vacation Planning Tip */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">✈️</span>
              Planifiez vos vacances
            </h4>
            <p className="text-sm text-amber-800 mb-3">
              Avec {formatCurrency(vacationPay)} d'indemnité, vous pouvez planifier de belles vacances ! 
              Réservez à l'avance pour obtenir les meilleurs prix et maximisez vos points de voyage.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-amber-700 font-semibold">Budget vacances disponible</span>
                <span className="text-lg font-bold text-amber-900">
                  {formatCurrency(vacationPay)}
                </span>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                Pour {vacationWeeks} semaines de repos bien mérité
              </p>
            </div>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="general" />
        </div>
      </div>
    </div>
  )
}
