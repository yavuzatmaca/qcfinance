'use client'

import { useState, useEffect } from 'react'
import { AffiliateCard } from '@/components/AffiliateCard'
import { Share2, Bookmark, X } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

type Frequency = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'

export default function WageConverterClient() {
  const [amount, setAmount] = useState<number>(25)
  const [frequency, setFrequency] = useState<Frequency>('hourly')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)
  const [showStickyAd, setShowStickyAd] = useState(true)
  const [animateNumbers, setAnimateNumbers] = useState(false)
  const [savedCalculations, setSavedCalculations] = useState<any[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isQuickCalcExpanded, setIsQuickCalcExpanded] = useState(false)

  const WEEKS_PER_YEAR = 52
  const DAYS_PER_WEEK = 5

  // Trigger animation on value change
  useEffect(() => {
    setAnimateNumbers(true)
    const timer = setTimeout(() => setAnimateNumbers(false), 300)
    return () => clearTimeout(timer)
  }, [amount, frequency, hoursPerWeek])

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

  // Save calculation
  const handleSave = () => {
    const calculation = {
      id: Date.now(),
      amount,
      frequency,
      hoursPerWeek,
      hourlyRate,
      annualRate,
      timestamp: new Date().toISOString()
    }
    setSavedCalculations(prev => [calculation, ...prev].slice(0, 3))
    
    // Visual feedback
    const btn = document.getElementById('save-btn')
    if (btn) {
      btn.classList.add('scale-110', 'bg-green-500')
      setTimeout(() => {
        btn.classList.remove('scale-110', 'bg-green-500')
      }, 500)
    }
  }

  // Share functionality
  const handleShare = async () => {
    const text = `💰 Conversion Salaire:\n${formatCurrency(hourlyRate)}/h = ${formatCurrency(annualRate)}/an\n(${hoursPerWeek}h/semaine)\n\nCalculé sur QCFinance.ca`
    
    if (navigator.share) {
      try {
        await navigator.share({ text, url: window.location.href })
      } catch (err) {
        copyToClipboard(text)
      }
    } else {
      copyToClipboard(text)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('✅ Copié dans le presse-papier!')
  }

  const conversionCards = [
    { 
      key: 'hourly', 
      label: 'Taux horaire', 
      value: hourlyRate, 
      detail: `${hoursPerWeek}h/semaine`, 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    { 
      key: 'daily', 
      label: 'Taux journalier', 
      value: dailyRate, 
      detail: `${(hoursPerWeek / DAYS_PER_WEEK).toFixed(1)}h/jour`, 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      key: 'weekly', 
      label: 'Salaire hebdomadaire', 
      value: weeklyRate, 
      detail: `${WEEKS_PER_YEAR} semaines/an`, 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    { 
      key: 'biweekly', 
      label: 'Salaire bi-hebdo', 
      value: biweeklyRate, 
      detail: '26 paies/an', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    },
    { 
      key: 'monthly', 
      label: 'Salaire mensuel', 
      value: monthlyRate, 
      detail: '12 mois/an', 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    { 
      key: 'annual', 
      label: 'Salaire annuel', 
      value: annualRate, 
      detail: `${hoursPerWeek * WEEKS_PER_YEAR}h/an`, 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
  ]

  return (
    <>
      {/* MOBILE ONLY: Minimal Sticky Bar with Expand */}
      <div className="lg:hidden sticky top-16 z-40 bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg">
        {!isQuickCalcExpanded ? (
          /* COLLAPSED STATE - Minimal */
          <button
            onClick={() => setIsQuickCalcExpanded(true)}
            className="w-full p-4 flex items-center justify-between touch-manipulation active:bg-cyan-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white text-xl font-bold leading-tight">
                  {formatCurrency(hourlyRate)}/h
                </div>
                <div className="text-white/70 text-xs">
                  {formatCurrency(annualRate)}/an • {hoursPerWeek}h/sem
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
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Convertisseur Salaire</h3>
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-xs font-semibold mb-1">Taux horaire</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(hourlyRate)}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs font-semibold mb-1">Salaire annuel</div>
                  <div className="text-white text-2xl font-bold">{formatCurrency(annualRate)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Amount + Frequency */}
              <div>
                <div className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm font-semibold">$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-base font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 touch-manipulation"
                    />
                  </div>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as Frequency)}
                    className="px-3 py-2 text-xs font-bold bg-white/20 border border-white/30 rounded-lg text-white touch-manipulation"
                  >
                    {frequencies.map((freq) => (
                      <option key={freq.value} value={freq.value} className="text-gray-900">
                        /{freq.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2">
                  {frequency === 'hourly' && [15, 20, 25, 30].map((quickRate) => (
                    <button
                      key={quickRate}
                      onClick={() => setAmount(quickRate)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        amount === quickRate
                          ? 'bg-white text-cyan-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quickRate}$
                    </button>
                  ))}
                  {frequency === 'annual' && [40000, 50000, 60000, 75000].map((quickRate) => (
                    <button
                      key={quickRate}
                      onClick={() => setAmount(quickRate)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        amount === quickRate
                          ? 'bg-white text-cyan-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quickRate / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">Heures/semaine</span>
                  <span className="text-sm font-bold text-white">{hoursPerWeek}h</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="2.5"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg accent-white touch-manipulation"
                />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[35, 37.5, 40].map((quickHours) => (
                    <button
                      key={quickHours}
                      onClick={() => setHoursPerWeek(quickHours)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all touch-manipulation active:scale-95 min-h-[44px] ${
                        hoursPerWeek === quickHours
                          ? 'bg-white text-cyan-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {quickHours}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleSave}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column - Inputs (Desktop Full, Mobile Collapsed) */}
        <div className="lg:col-span-5 space-y-4 lg:space-y-6 order-2 lg:order-1">

          {/* Desktop: Full Input Form */}
          <div className="hidden lg:block bg-white rounded-2xl lg:rounded-3xl shadow-lg border-2 border-cyan-200 p-5 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-cyan-900 mb-4 lg:mb-6 flex items-center gap-2">
              <svg className="w-7 h-7 lg:w-8 lg:h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="leading-tight">Entrez votre salaire</span>
            </h2>

            {/* Amount Input with Frequency Selector - MOBILE OPTIMIZED */}
            <div className="mb-5 lg:mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Montant
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg lg:text-xl font-semibold pointer-events-none">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-4 lg:py-3 text-xl lg:text-2xl font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all touch-manipulation"
                    step="0.5"
                    aria-label="Montant du salaire"
                  />
                </div>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as Frequency)}
                  className="px-3 lg:px-4 py-4 lg:py-3 text-sm font-bold border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white transition-all touch-manipulation min-w-[100px]"
                  aria-label="Fréquence de paiement"
                >
                  {frequencies.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      / {freq.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Quick Amount Buttons - LARGER TOUCH TARGETS */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {frequency === 'hourly' && [15, 20, 25, 30].map((quickRate) => (
                  <button
                    key={quickRate}
                    onClick={() => setAmount(quickRate)}
                    className="py-3 px-2 bg-cyan-100 hover:bg-cyan-200 active:bg-cyan-300 text-cyan-900 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95"
                    aria-label={`Définir à ${quickRate} dollars`}
                  >
                    {quickRate}$
                  </button>
                ))}
                {frequency === 'annual' && [40000, 50000, 60000, 75000].map((quickRate) => (
                  <button
                    key={quickRate}
                    onClick={() => setAmount(quickRate)}
                    className="py-3 px-2 bg-cyan-100 hover:bg-cyan-200 active:bg-cyan-300 text-cyan-900 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95"
                    aria-label={`Définir à ${quickRate} dollars`}
                  >
                    {quickRate / 1000}k
                  </button>
                ))}
                {!['hourly', 'annual'].includes(frequency) && [1, 2, 3, 4].map((multiplier) => {
                  const baseAmount = frequency === 'monthly' ? 3000 : frequency === 'weekly' ? 800 : 100
                  const quickAmount = baseAmount * multiplier
                  return (
                    <button
                      key={multiplier}
                      onClick={() => setAmount(quickAmount)}
                      className="py-3 px-2 bg-cyan-100 hover:bg-cyan-200 active:bg-cyan-300 text-cyan-900 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95"
                    >
                      {quickAmount}$
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hours Per Week Slider - MOBILE OPTIMIZED */}
            <div className="mb-5 lg:mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Heures par semaine : <span className="text-cyan-600 text-lg">{hoursPerWeek}h</span>
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="2.5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 touch-manipulation"
                style={{
                  WebkitAppearance: 'none',
                }}
                aria-label="Heures par semaine"
              />
              <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #0891b2;
                  cursor: pointer;
                  -webkit-appearance: none;
                  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.4);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #0891b2;
                  cursor: pointer;
                  border: none;
                  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.4);
                }
              `}</style>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>10h</span>
                <span className="text-slate-400">Temps partiel ← → Temps plein+</span>
                <span>60h</span>
              </div>
              
              {/* Quick Hours Buttons - LARGER */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[35, 37.5, 40].map((quickHours) => (
                  <button
                    key={quickHours}
                    onClick={() => setHoursPerWeek(quickHours)}
                    className="py-3 px-2 bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-900 rounded-lg text-sm font-bold transition-all touch-manipulation active:scale-95"
                    aria-label={`Définir à ${quickHours} heures`}
                  >
                    {quickHours}h
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons - MOBILE OPTIMIZED */}
            <div className="hidden lg:grid grid-cols-2 gap-3 mb-5">
              <button
                id="save-btn"
                onClick={handleSave}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 shadow-lg"
                aria-label="Sauvegarder le calcul"
              >
                <Bookmark className="w-5 h-5" />
                <span>Sauvegarder</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all touch-manipulation active:scale-95 shadow-lg"
                aria-label="Partager le résultat"
              >
                <Share2 className="w-5 h-5" />
                <span>Partager</span>
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-4">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-bold text-cyan-900 text-sm mb-1">
                    Conversion instantanée
                  </h3>
                  <p className="text-xs text-cyan-800 leading-relaxed">
                    Changez le montant ou la fréquence pour voir toutes les conversions en temps réel. 
                    Basé sur {WEEKS_PER_YEAR} semaines par année.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Calculations - DESKTOP ONLY */}
          {savedCalculations.length > 0 && (
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Calculs sauvegardés
              </h3>
              <div className="space-y-2">
                {savedCalculations.map((calc) => (
                  <div key={calc.id} className="bg-slate-50 rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">{formatCurrency(calc.hourlyRate)}/h</div>
                        <div className="text-slate-600">{formatCurrency(calc.annualRate)}/an</div>
                      </div>
                      <button
                        onClick={() => {
                          setAmount(calc.amount)
                          setFrequency(calc.frequency)
                          setHoursPerWeek(calc.hoursPerWeek)
                        }}
                        className="px-3 py-1.5 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all touch-manipulation"
                      >
                        Charger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Results (Mobile Optimized + Sticky on Desktop) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
            {/* Hero Conversion Card - MOBILE OPTIMIZED */}
            <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-700 rounded-2xl lg:rounded-3xl shadow-2xl p-6 lg:p-10 text-white relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="text-center relative z-10">
                <svg className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-base lg:text-lg font-medium opacity-90 mb-2">
                  {hero.label}
                </h2>
                <div className={`text-5xl lg:text-7xl font-extrabold mb-2 transition-all duration-300 ${animateNumbers ? 'scale-110' : 'scale-100'}`}>
                  {formatCurrency(hero.value)}
                </div>
                <p className="text-sm opacity-80">
                  Basé sur {hoursPerWeek}h/semaine
                </p>
              </div>
            </div>

            {/* Mobile: Swipeable Conversion Cards */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-slate-700">Toutes les conversions</h3>
                <span className="text-xs text-slate-500">Swipe →</span>
              </div>
              <div 
                className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft
                  const cardWidth = 280 + 12 // width + gap
                  const index = Math.round(scrollLeft / cardWidth)
                  setActiveCardIndex(index)
                }}
              >
                <div className="flex gap-3 pb-2">
                  {conversionCards.map((card) => (
                    <div
                      key={card.key}
                      className={`flex-shrink-0 snap-center w-[280px] p-4 rounded-xl transition-all ${
                        frequency === card.key 
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl scale-105' 
                          : 'bg-white border-2 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={frequency === card.key ? 'text-white' : 'text-cyan-600'}>{card.icon}</div>
                        {frequency === card.key && (
                          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">ACTIF</span>
                        )}
                      </div>
                      <div className={`text-xs font-semibold mb-1 ${frequency === card.key ? 'text-white/90' : 'text-slate-600'}`}>
                        {card.label}
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${frequency === card.key ? 'text-white' : 'text-cyan-900'}`}>
                        {formatCurrency(card.value)}
                      </div>
                      <div className={`text-xs ${frequency === card.key ? 'text-white/80' : 'text-slate-500'}`}>
                        {card.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {conversionCards.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? 'w-6 bg-cyan-500'
                        : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Full Conversion Grid */}
            <div className="hidden lg:block bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200 p-6 lg:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Toutes les conversions
              </h3>

              <div className="space-y-3 lg:space-y-4">
                {conversionCards.map((card) => (
                  <div
                    key={card.key}
                    className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                      frequency === card.key ? 'bg-cyan-100 border-2 border-cyan-400 shadow-md' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-cyan-600">{card.icon}</div>
                      <div>
                        <div className="text-xs text-slate-600 font-semibold">{card.label}</div>
                        <div className="text-sm text-slate-500">{card.detail}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-cyan-900">
                      {formatCurrency(card.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>



            {/* Quick Comparison - MOBILE OPTIMIZED */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-5 lg:p-6">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-sm lg:text-base">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Comparaison rapide
              </h4>
              
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-xs text-slate-600 font-semibold mb-1">Par heure</div>
                  <div className="text-lg lg:text-xl font-bold text-blue-900">{formatCurrency(hourlyRate)}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-xs text-slate-600 font-semibold mb-1">Par année</div>
                  <div className="text-lg lg:text-xl font-bold text-blue-900">{formatCurrency(annualRate)}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-blue-700 mt-4 text-center leading-relaxed">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Utilisez notre calculateur d'impôt pour voir votre salaire NET</span>
              </div>
            </div>

            {/* Affiliate Card - Lazy Loaded */}
            <div className="hidden lg:block">
              <AffiliateCard variant="general" />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Ad Bar - MOBILE ONLY */}
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
              <AdSenseAd 
                adSlot="7290777867"
                adFormat="auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Affiliate Card at Bottom */}
      <div className="lg:hidden mt-6">
        <AffiliateCard variant="general" />
      </div>
    </>
  )
}
