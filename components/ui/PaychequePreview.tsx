'use client'

interface PaychequePreviewProps {
  grossIncome: number
  netIncome: number
  federalTax: number
  provincialTax: number
  qpp: number
  qpip: number
  ei: number
  marginalRate: string
  effectiveRate: string
}

export default function PaychequePreview({
  grossIncome,
  netIncome,
  federalTax,
  provincialTax,
  qpp,
  qpip,
  ei,
  marginalRate,
  effectiveRate
}: PaychequePreviewProps) {
  const biweeklyNet = Math.round(netIncome / 26)
  const monthlyNet = Math.round(netIncome / 12)

  // Determine income percentile
  const getPercentile = (income: number) => {
    if (income >= 150000) return { text: 'Top 5%', color: 'from-purple-500 to-pink-500' }
    if (income >= 100000) return { text: 'Top 10%', color: 'from-emerald-500 to-teal-500' }
    if (income >= 75000) return { text: 'Top 25%', color: 'from-blue-500 to-indigo-500' }
    if (income >= 55000) return { text: 'Moyenne', color: 'from-slate-500 to-slate-600' }
    return { text: 'En Croissance', color: 'from-amber-500 to-orange-500' }
  }

  const percentile = getPercentile(grossIncome)

  return (
    <div className="sticky top-8 space-y-6">
      {/* Main Paycheque Card */}
      <div className={`bg-gradient-to-br ${percentile.color} text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group`}>
        {/* Decorative Elements */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {percentile.text} au Québec
          </div>

          {/* Title */}
          <div className="text-white/90 text-sm font-medium mb-2">
            Votre Paie Nette (aux 2 semaines)
          </div>

          {/* Big Number */}
          <div className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {biweeklyNet.toLocaleString('fr-CA')} $
          </div>

          {/* Divider */}
          <div className="h-px bg-white/20 my-6" />

          {/* Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Mensuel</span>
              <span className="font-bold">{monthlyNet.toLocaleString('fr-CA')} $</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/80">Annuel Net</span>
              <span className="font-bold">{Math.round(netIncome).toLocaleString('fr-CA')} $</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/20 my-6" />

          {/* Deductions Summary */}
          <div className="space-y-2 text-xs text-white/70">
            <div className="flex justify-between">
              <span>Impôt QC</span>
              <span className="font-semibold">-{Math.round(provincialTax).toLocaleString('fr-CA')} $</span>
            </div>
            <div className="flex justify-between">
              <span>Impôt Fédéral</span>
              <span className="font-semibold">-{Math.round(federalTax).toLocaleString('fr-CA')} $</span>
            </div>
            <div className="flex justify-between">
              <span>RRQ + RQAP + AE</span>
              <span className="font-semibold">-{Math.round(qpp + qpip + ei).toLocaleString('fr-CA')} $</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Rates Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Vos Taux d'Imposition
        </h3>
        
        <div className="space-y-4">
          {/* Marginal Rate */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="text-xs text-red-600 font-semibold mb-1">TAUX MARGINAL</div>
            <div className="text-3xl font-bold text-red-700">{marginalRate}%</div>
            <div className="text-xs text-slate-600 mt-1">Sur chaque $ additionnel</div>
          </div>

          {/* Effective Rate */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="text-xs text-emerald-600 font-semibold mb-1">TAUX EFFECTIF</div>
            <div className="text-3xl font-bold text-emerald-700">{effectiveRate}%</div>
            <div className="text-xs text-slate-600 mt-1">Votre impôt réel moyen</div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-900">
            💡 <span className="font-semibold">Astuce:</span> Cotisez à un REER pour réduire votre taux marginal et économiser {marginalRate}% en impôts.
          </p>
        </div>
      </div>

      {/* Quick Links Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4">Outils Connexes</h3>
        <div className="space-y-2">
          <a
            href="/calcul-hypotheque"
            className="block p-3 bg-slate-50 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                Calculateur Hypothécaire
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="/epargne-retraite"
            className="block p-3 bg-slate-50 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                Planificateur Retraite
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
          <a
            href="/dettes-credit"
            className="block p-3 bg-slate-50 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700">
                Gestion de Dettes
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
