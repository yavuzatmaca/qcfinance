import Link from 'next/link'
import { Calculator, TrendingUp, Home, DollarSign, PiggyBank, CreditCard } from 'lucide-react'

interface RelatedCalculator {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  color: string
}

interface RelatedCalculatorsProps {
  exclude?: string[]
  category?: 'salary' | 'mortgage' | 'savings' | 'debt' | 'all'
  limit?: number
}

const allCalculators: RelatedCalculator[] = [
  {
    title: 'Salaire Net Québec',
    description: 'Calculez votre salaire après impôts',
    href: '/salaire-net-quebec',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'emerald',
  },
  {
    title: 'Simulateur Vie Québec',
    description: 'Simulez votre budget complet',
    href: '/simulateur-vie-quebec',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'blue',
  },
  {
    title: 'Calcul Hypothèque',
    description: 'Calculez vos paiements hypothécaires',
    href: '/calcul-hypotheque',
    icon: <Home className="w-5 h-5" />,
    color: 'purple',
  },
  {
    title: 'Capacité d\'Emprunt',
    description: 'Combien pouvez-vous emprunter?',
    href: '/capacite-emprunt',
    icon: <Home className="w-5 h-5" />,
    color: 'purple',
  },
  {
    title: 'Louer ou Acheter',
    description: 'Quelle option est la meilleure?',
    href: '/louer-ou-acheter',
    icon: <Home className="w-5 h-5" />,
    color: 'purple',
  },
  {
    title: 'Épargne Retraite',
    description: 'Planifiez votre retraite (REER, CELI)',
    href: '/epargne-retraite',
    icon: <PiggyBank className="w-5 h-5" />,
    color: 'green',
  },
  {
    title: 'Intérêts Composés',
    description: 'Calculez la croissance de vos investissements',
    href: '/interets-composes',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'green',
  },
  {
    title: 'Dettes & Crédit',
    description: 'Planifiez le remboursement de vos dettes',
    href: '/dettes-credit',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'red',
  },
  {
    title: 'Allocations Familiales',
    description: 'Calculez vos prestations familiales',
    href: '/allocations-familiales',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'amber',
  },
  {
    title: 'Déclaration Simplifiée',
    description: 'Estimez votre remboursement d\'impôt',
    href: '/declaration-simplifiee',
    icon: <Calculator className="w-5 h-5" />,
    color: 'slate',
  },
]

const categoryMap = {
  salary: ['/salaire-net-quebec', '/simulateur-vie-quebec', '/taux-horaire', '/declaration-simplifiee'],
  mortgage: ['/calcul-hypotheque', '/capacite-emprunt', '/louer-ou-acheter', '/taxe-de-bienvenue'],
  savings: ['/epargne-retraite', '/interets-composes', '/allocations-familiales'],
  debt: ['/dettes-credit', '/pret-auto', '/pret-etudiant'],
  all: allCalculators.map(c => c.href),
}

export default function RelatedCalculators({ 
  exclude = [], 
  category = 'all',
  limit = 3 
}: RelatedCalculatorsProps) {
  // Filter calculators based on category and exclusions
  const relevantHrefs = categoryMap[category]
  const filtered = allCalculators
    .filter(calc => relevantHrefs.includes(calc.href))
    .filter(calc => !exclude.includes(calc.href))
    .slice(0, limit)

  if (filtered.length === 0) return null

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', hover: 'hover:bg-emerald-100' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', hover: 'hover:bg-purple-100' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', hover: 'hover:bg-green-100' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', hover: 'hover:bg-amber-100' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', hover: 'hover:bg-red-100' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', hover: 'hover:bg-slate-100' },
    }
    return colors[color] || colors.emerald
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
      <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-emerald-600" />
        Calculateurs Recommandés
      </h3>
      <div className="space-y-3">
        {filtered.map((calc) => {
          const colors = getColorClasses(calc.color)
          return (
            <Link
              key={calc.href}
              href={calc.href}
              className={`block p-4 ${colors.bg} rounded-xl border ${colors.border} ${colors.hover} transition-all group`}
            >
              <div className="flex items-start gap-3">
                <div className={`${colors.text} mt-0.5`}>
                  {calc.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold ${colors.text} mb-1 group-hover:underline`}>
                    {calc.title}
                  </p>
                  <p className="text-sm text-slate-600">
                    {calc.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
