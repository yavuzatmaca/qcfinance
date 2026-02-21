'use client'

import { Home, Car } from 'lucide-react'

interface PurchasePowerCardProps {
  netIncome: number
  grossIncome: number
}

export default function PurchasePowerCard({ netIncome, grossIncome }: PurchasePowerCardProps) {
  // Calculate purchase power metrics
  const monthlyNet = netIncome / 12
  const maxRent = monthlyNet * 0.30 // 30% rule
  const mortgageCapacity = grossIncome * 4.5 // 4.5x gross income
  const carBudget = monthlyNet * 0.15 // 15% of net for car

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Votre Pouvoir d'Achat</h3>
          <p className="text-sm text-slate-500">Que pouvez-vous vous permettre?</p>
        </div>
      </div>

      {/* Grid - Mobile & Desktop */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Rent Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-slate-600 mb-1">Loyer Max Conseillé</div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {Math.round(maxRent).toLocaleString('fr-CA')} $
          </div>
          <div className="text-xs text-slate-500">par mois (30% du net)</div>
        </div>

        {/* Mortgage Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-slate-600 mb-1">Capacité d'Emprunt</div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            ~{Math.round(mortgageCapacity / 1000)}k $
          </div>
          <div className="text-xs text-slate-500">hypothèque approx.</div>
        </div>

        {/* Car Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium text-slate-600 mb-1">Budget Auto</div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {Math.round(carBudget).toLocaleString('fr-CA')} $
          </div>
          <div className="text-xs text-slate-500">par mois (15% du net)</div>
        </div>
      </div>
    </div>
  )
}
