'use client'

import { useState } from 'react'
import { TrendingUp, Calculator, DollarSign } from 'lucide-react'

interface SalaryStatsSwiperProps {
  netIncome: number
  totalDeductions: number
  grossIncome: number
  marginalRate: string
  effectiveRate: string
}

export default function SalaryStatsSwiper({
  netIncome,
  totalDeductions,
  grossIncome,
  marginalRate,
  effectiveRate,
}: SalaryStatsSwiperProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const monthlyNet = Math.round(netIncome / 12)

  const indicatorCards = [
    {
      key: 'marginal',
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Taux Marginal',
      value: `${marginalRate}%`,
      detail: 'Sur chaque $ additionnel',
      color: 'red',
    },
    {
      key: 'effective',
      icon: <Calculator className="w-6 h-6" />,
      label: 'Taux Moyen',
      value: `${effectiveRate}%`,
      detail: 'Votre impôt réel',
      color: 'amber',
    },
    {
      key: 'monthly-indicator',
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Revenu Mensuel',
      value: `~${monthlyNet.toLocaleString('fr-CA')} $`,
      detail: 'Dans votre poche',
      color: 'emerald',
    },
  ]

  return (
    <div
      className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      onScroll={(e) => {
        const scrollLeft = e.currentTarget.scrollLeft
        const cardWidth = 220 + 16 // width + gap
        const index = Math.round(scrollLeft / cardWidth)
        setActiveCardIndex(index)
      }}
    >
      <div className="flex gap-4 px-4 pb-2">
        {indicatorCards.map((card, idx) => (
          <div
            key={card.key}
            className={`flex-shrink-0 snap-center w-[220px] p-5 rounded-xl transition-all ${
              activeCardIndex === idx
                ? card.color === 'red'
                  ? 'bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-xl scale-105'
                  : card.color === 'amber'
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl scale-105'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl scale-105'
                : 'bg-white border-2 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={activeCardIndex === idx ? 'text-white' : card.color === 'red' ? 'text-red-600' : card.color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}>
                {card.icon}
              </div>
              {activeCardIndex === idx && (
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">ACTIF</span>
              )}
            </div>
            <div className={`text-xs font-semibold mb-1 ${activeCardIndex === idx ? 'text-white/90' : 'text-slate-600'}`}>
              {card.label}
            </div>
            <div className={`text-3xl font-bold mb-1 ${activeCardIndex === idx ? 'text-white' : 'text-slate-900'}`}>
              {card.value}
            </div>
            <div className={`text-xs ${activeCardIndex === idx ? 'text-white/80' : 'text-slate-500'}`}>
              {card.detail}
            </div>
          </div>
        ))}
      </div>
      
      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {indicatorCards.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeCardIndex === idx ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
