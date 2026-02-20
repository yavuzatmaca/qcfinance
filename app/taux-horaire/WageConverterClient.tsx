'use client'

import { useState } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'

type Frequency = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'

export default function WageConverterClient() {
  const [amount, setAmount] = useState<number>(25)
  const [frequency, setFrequency] = useState<Frequency>('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)

  const WEEKS_PER_YEAR = 52
  const DAYS_PER_WEEK = 5

  // Calculate base hourly rate from any input
  const getHourlyRate = (): number => {
    switch (frequency) {
      case 'hourly':
        return amount
      case 'daily':
        return amount / (hoursPerWeek / DAYS_PER_WEEK)
      case 'weekly':
        return amount / hoursPerWeek
      case 'biweekly':
        return amount / (hoursPerWeek * 2)
      case 'monthly':
        return amount / (hoursPerWeek * WEEKS_PER_YEAR / 12)
      case 'annual':
        return amount / (hoursPerWeek * WEEKS_PER_YEAR)
      default:
        return amount
    }
  }

  const hourlyRate = getHourlyRate()

  // Calculate all other frequencies from hourly rate
  const dailyRate = hourlyRate * (hoursPerWeek / DAYS_PER_WEEK)
  const weeklyRate = hourlyRate * hoursPerWeek
  const biweeklyRate = hourlyRate * hoursPerWeek * 2
  const monthlyRate = hourlyRate * hoursPerWeek * WEEKS_PER_YEAR / 12
  const annualRate = hourlyRate * hoursPerWeek * WEEKS_PER_YEAR

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const frequencies: { value: Frequency; label: string }[] = [
    { value: 'hourly', label: 'Heure' },
    { value: 'daily', label: 'Jour' },
    { value: 'weekly', label: 'Semaine' },
    { value: 'biweekly', label: 'Bi-hebdo' },
    { value: 'monthly', label: 'Mois' },
    { value: 'annual', label: 'Année' },
  ]

  // Determine hero display (opposite of input)
  const getHeroValue = () => {
    if (frequency === 'annual') {
      return { value: hourlyRate, label: 'Taux horaire' }
    } else {
      return { value: annualRate, label: 'Salaire annuel' }
    }
  }

  const hero = getHeroValue()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Inputs */}
      <div className="lg:col-span-5 space-y-6 order-2 lg:order-none">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-cyan-200 p-8">
          <h2 className="text-2xl font-bold text-cyan-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">⏰</span>
            Entrez votre salaire
          </h2>

          {/* Amount Input with Frequency Selector */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Montant
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-semibold">$</span>
                <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 text-xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  step="0.5"
                />
              </div>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="px-4 py-3 text-sm font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
              >
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    / {freq.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 flex gap-2">
              {frequency === 'hourly' && [15, 20, 25, 30].map((quickRate) => (
                <button
                  key={quickRate}
                  onClick={() => setAmount(quickRate)}
                  className="flex-1 py-1 px-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickRate}$
                </button>
              ))}
              {frequency === 'annual' && [40000, 50000, 60000, 75000].map((quickRate) => (
                <button
                  key={quickRate}
                  onClick={() => setAmount(quickRate)}
                  className="flex-1 py-1 px-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickRate / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Hours Per Week Slider */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Heures par semaine : {hoursPerWeek}h
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="2.5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>10h</span>
              <span>60h</span>
            </div>
            <div className="mt-2 flex gap-2">
              {[35, 37.5, 40].map((quickHours) => (
                <button
                  key={quickHours}
                  onClick={() => setHoursPerWeek(quickHours)}
                  className="flex-1 py-1 px-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded text-xs font-semibold transition-colors"
                >
                  {quickHours}h
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div>
                <h3 className="font-bold text-cyan-900 text-sm mb-1">
                  Conversion instantanée
                </h3>
                <p className="text-xs text-cyan-800">
                  Changez le montant ou la fréquence pour voir toutes les conversions en temps réel. 
                  Basé sur {WEEKS_PER_YEAR} semaines par année.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results (Sticky) */}
      <div className="lg:col-span-7 order-1 lg:order-none">
        <div className="lg:sticky lg:top-24 space-y-6">
          {/* Hero Conversion Card */}
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-2xl p-8 lg:p-10 text-white">
            <div className="text-center">
              <div className="text-5xl mb-3">💰</div>
              <h2 className="text-lg font-medium opacity-90 mb-2">
                {hero.label}
              </h2>
              <div className="text-6xl lg:text-7xl font-extrabold mb-2">
                {formatCurrency(hero.value)}
              </div>
              <p className="text-sm opacity-80">
                Basé sur {hoursPerWeek}h/semaine
              </p>
            </div>
          </div>

          {/* Conversion Grid */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Toutes les conversions
            </h3>

            <div className="space-y-4">
              {/* Hourly */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'hourly' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Taux horaire</div>
                  <div className="text-sm text-slate-500">{hoursPerWeek}h/semaine</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(hourlyRate)}
                </div>
              </div>

              {/* Daily */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'daily' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Taux journalier</div>
                  <div className="text-sm text-slate-500">{(hoursPerWeek / DAYS_PER_WEEK).toFixed(1)}h/jour</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(dailyRate)}
                </div>
              </div>

              {/* Weekly */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'weekly' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Salaire hebdomadaire</div>
                  <div className="text-sm text-slate-500">{WEEKS_PER_YEAR} semaines/an</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(weeklyRate)}
                </div>
              </div>

              {/* Biweekly */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'biweekly' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Salaire bi-hebdomadaire</div>
                  <div className="text-sm text-slate-500">26 paies/an</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(biweeklyRate)}
                </div>
              </div>

              {/* Monthly */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'monthly' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Salaire mensuel</div>
                  <div className="text-sm text-slate-500">12 mois/an</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(monthlyRate)}
                </div>
              </div>

              {/* Annual */}
              <div className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                frequency === 'annual' ? 'bg-cyan-100 border-2 border-cyan-400' : 'bg-slate-50'
              }`}>
                <div>
                  <div className="text-xs text-slate-600 font-semibold">Salaire annuel</div>
                  <div className="text-sm text-slate-500">{hoursPerWeek * WEEKS_PER_YEAR}h/an</div>
                </div>
                <div className="text-2xl font-bold text-cyan-900">
                  {formatCurrency(annualRate)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Comparison */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Comparaison rapide
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-xs text-slate-600 font-semibold mb-1">Par heure</div>
                <div className="text-xl font-bold text-blue-900">{formatCurrency(hourlyRate)}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-xs text-slate-600 font-semibold mb-1">Par année</div>
                <div className="text-xl font-bold text-blue-900">{formatCurrency(annualRate)}</div>
              </div>
            </div>

            <p className="text-xs text-blue-700 mt-4 text-center">
              💡 Utilisez notre calculateur d'impôt pour voir votre salaire NET
            </p>
          </div>

          {/* Affiliate Card */}
          <AffiliateCard variant="general" />
        </div>
      </div>
    </div>
  )
}
