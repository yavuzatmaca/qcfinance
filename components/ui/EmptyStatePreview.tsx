'use client'

export default function EmptyStatePreview() {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Empty State Card */}
      <div className="bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3">
            Commencez à Calculer
          </h3>

          {/* Description */}
          <p className="text-white/80 text-sm mb-6">
            Entrez votre salaire brut dans le calculateur pour voir votre revenu net, vos déductions et votre pouvoir d'achat.
          </p>

          {/* Animated Arrow */}
          <div className="flex justify-center">
            <svg className="w-8 h-8 text-white/60 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4">Pourquoi utiliser ce calculateur?</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Calcul instantané avec les taux 2026</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Toutes les déductions incluses (RRQ, RQAP, AE)</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Visualisation interactive de votre revenu</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Analyse de votre pouvoir d'achat</span>
          </div>
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
