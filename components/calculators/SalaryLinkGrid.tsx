import Link from 'next/link'

export default function SalaryLinkGrid() {
  // Generate links: 30k to 150k steps of 5k
  const salaries = []
  for (let i = 30000; i <= 150000; i += 5000) {
    salaries.push(i)
  }

  return (
    <div className="mt-16 pt-8 border-t border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-6">
        Recherches populaires au Québec (2026)
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {salaries.map((amount) => (
          <Link
            key={amount}
            href={`/salaire-net-quebec/${amount}`}
            className="px-3 py-2 text-xs font-semibold text-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {amount.toLocaleString('fr-CA')} $
          </Link>
        ))}
        
        {/* Special 'See More' Link */}
        <Link 
          href="/salaire-net-quebec/100000" 
          className="col-span-3 sm:col-span-2 md:col-span-6 mt-2 text-center text-xs text-slate-400 hover:text-emerald-600 underline"
        >
          Voir tous les calculs 2026 →
        </Link>
      </div>
    </div>
  )
}
