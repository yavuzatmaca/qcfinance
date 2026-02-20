'use client'

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
  const savingsTarget = monthlyNet * 0.20 // 20% savings rate

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
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

      <div className="grid md:grid-cols-3 gap-4">
        {/* Rent Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div className="text-sm font-medium text-slate-600 mb-1">Budget Auto</div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {Math.round(carBudget).toLocaleString('fr-CA')} $
          </div>
          <div className="text-xs text-slate-500">par mois (15% du net)</div>
        </div>
      </div>

      {/* Savings Recommendation */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 mb-1">Objectif d'Épargne</h4>
            <p className="text-sm text-slate-700 mb-2">
              Visez à épargner <span className="font-bold text-amber-700">{Math.round(savingsTarget).toLocaleString('fr-CA')} $/mois</span> (20% de votre revenu net) 
              pour bâtir un fonds d'urgence et investir pour l'avenir.
            </p>
            <div className="text-xs text-slate-600">
              💡 Automatisez vos épargnes dès la réception de votre paie
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
