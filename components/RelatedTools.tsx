import Link from 'next/link'
import {
  Calculator,
  Home,
  Baby,
  Car,
  GraduationCap,
  TrendingUp,
  Wallet,
  Receipt,
  Clock,
  Percent,
  Building2,
  DollarSign,
  PiggyBank,
  CreditCard,
} from 'lucide-react'

interface Tool {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  category: string
}

interface RelatedToolsProps {
  currentTool?: string
  currentCategory?: 'tax' | 'real-estate' | 'family' | 'auto' | 'debt' | 'investment'
}

// All available tools organized by category
const allTools: Tool[] = [
  // Tax & Income
  {
    title: 'Salaire Net Québec',
    description: 'Calculez votre revenu après impôts',
    href: '/salaire-net-quebec',
    icon: <Calculator className="w-6 h-6" />,
    category: 'tax',
  },
  {
    title: 'Déclaration Simplifiée',
    description: 'Estimez votre remboursement d\'impôt',
    href: '/declaration-simplifiee',
    icon: <Receipt className="w-6 h-6" />,
    category: 'tax',
  },
  {
    title: 'Assurance-Emploi',
    description: 'Calculez vos prestations AE',
    href: '/assurance-emploi',
    icon: <Wallet className="w-6 h-6" />,
    category: 'tax',
  },
  {
    title: 'Taux Horaire',
    description: 'Convertissez salaire annuel ↔ horaire',
    href: '/taux-horaire',
    icon: <Clock className="w-6 h-6" />,
    category: 'tax',
  },
  {
    title: 'TPS/TVQ Québec',
    description: 'Calculez les taxes de vente',
    href: '/tps-tvq-quebec',
    icon: <Percent className="w-6 h-6" />,
    category: 'tax',
  },

  // Real Estate
  {
    title: 'Louer ou Acheter',
    description: 'Comparez location vs achat',
    href: '/louer-ou-acheter',
    icon: <Home className="w-6 h-6" />,
    category: 'real-estate',
  },
  {
    title: 'Calculateur Hypothèque',
    description: 'Paiements mensuels et amortissement',
    href: '/calcul-hypotheque',
    icon: <Building2 className="w-6 h-6" />,
    category: 'real-estate',
  },
  {
    title: 'Capacité d\'Emprunt',
    description: 'Combien pouvez-vous emprunter?',
    href: '/capacite-emprunt',
    icon: <DollarSign className="w-6 h-6" />,
    category: 'real-estate',
  },
  {
    title: 'Taxe de Bienvenue',
    description: 'Droits de mutation immobilière',
    href: '/taxe-de-bienvenue',
    icon: <Home className="w-6 h-6" />,
    category: 'real-estate',
  },
  {
    title: 'Augmentation Loyer 2026',
    description: 'Hausse maximale permise',
    href: '/augmentation-loyer-2026',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'real-estate',
  },

  // Family & Daily
  {
    title: 'Allocations Familiales',
    description: 'ACE + Soutien aux enfants',
    href: '/allocations-familiales',
    icon: <Baby className="w-6 h-6" />,
    category: 'family',
  },
  {
    title: 'Frais de Garde',
    description: 'CPE et crédits d\'impôt',
    href: '/frais-de-garde',
    icon: <Baby className="w-6 h-6" />,
    category: 'family',
  },
  {
    title: 'Auto Électrique vs Essence',
    description: 'Économies et subventions VÉ',
    href: '/auto-electrique-vs-essence',
    icon: <Car className="w-6 h-6" />,
    category: 'auto',
  },
  {
    title: 'Prêt Auto',
    description: 'Financement automobile',
    href: '/pret-auto',
    icon: <Car className="w-6 h-6" />,
    category: 'auto',
  },
  {
    title: 'Prêt Étudiant',
    description: 'Remboursement AFE',
    href: '/pret-etudiant',
    icon: <GraduationCap className="w-6 h-6" />,
    category: 'family',
  },

  // Debt & Planning
  {
    title: 'Dettes & Crédit',
    description: 'Stratégie de remboursement',
    href: '/dettes-credit',
    icon: <CreditCard className="w-6 h-6" />,
    category: 'debt',
  },
  {
    title: 'Épargne Retraite',
    description: 'REER et planification',
    href: '/epargne-retraite',
    icon: <PiggyBank className="w-6 h-6" />,
    category: 'investment',
  },

  // Investment
  {
    title: 'Intérêts Composés',
    description: 'Croissance de vos placements',
    href: '/interets-composes',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'investment',
  },
]

// Smart recommendation logic based on current tool and category
function getRecommendedTools(currentTool?: string, currentCategory?: string): Tool[] {
  // Remove current tool from recommendations
  const availableTools = allTools.filter(tool => tool.href !== currentTool)

  // Define recommendation rules
  const recommendations: { [key: string]: string[] } = {
    // Tax & Income tools
    '/salaire-net-quebec': ['/allocations-familiales', '/declaration-simplifiee', '/taux-horaire'],
    '/declaration-simplifiee': ['/salaire-net-quebec', '/allocations-familiales', '/frais-de-garde'],
    '/assurance-emploi': ['/salaire-net-quebec', '/declaration-simplifiee', '/taux-horaire'],
    '/taux-horaire': ['/salaire-net-quebec', '/declaration-simplifiee', '/assurance-emploi'],
    '/tps-tvq-quebec': ['/salaire-net-quebec', '/declaration-simplifiee', '/calcul-hypotheque'],

    // Real Estate tools
    '/louer-ou-acheter': ['/calcul-hypotheque', '/capacite-emprunt', '/taxe-de-bienvenue'],
    '/calcul-hypotheque': ['/capacite-emprunt', '/louer-ou-acheter', '/taxe-de-bienvenue'],
    '/capacite-emprunt': ['/calcul-hypotheque', '/louer-ou-acheter', '/salaire-net-quebec'],
    '/taxe-de-bienvenue': ['/calcul-hypotheque', '/louer-ou-acheter', '/capacite-emprunt'],
    '/augmentation-loyer-2026': ['/louer-ou-acheter', '/calcul-hypotheque', '/salaire-net-quebec'],

    // Family & Daily tools
    '/allocations-familiales': ['/frais-de-garde', '/salaire-net-quebec', '/declaration-simplifiee'],
    '/frais-de-garde': ['/allocations-familiales', '/declaration-simplifiee', '/salaire-net-quebec'],
    '/auto-electrique-vs-essence': ['/pret-auto', '/salaire-net-quebec', '/interes-composes'],
    '/pret-auto': ['/auto-electrique-vs-essence', '/salaire-net-quebec', '/dettes-credit'],
    '/pret-etudiant': ['/salaire-net-quebec', '/dettes-credit', '/epargne-retraite'],

    // Debt & Investment tools
    '/dettes-credit': ['/salaire-net-quebec', '/pret-auto', '/interes-composes'],
    '/epargne-retraite': ['/interes-composes', '/salaire-net-quebec', '/declaration-simplifiee'],
    '/interets-composes': ['/epargne-retraite', '/salaire-net-quebec', '/allocations-familiales'],
  }

  // Get specific recommendations for current tool
  if (currentTool && recommendations[currentTool]) {
    const recommendedHrefs = recommendations[currentTool]
    const recommended = recommendedHrefs
      .map(href => availableTools.find(tool => tool.href === href))
      .filter((tool): tool is Tool => tool !== undefined)
    
    if (recommended.length >= 3) {
      return recommended.slice(0, 3)
    }
  }

  // Fallback: recommend tools from same category
  if (currentCategory) {
    const sameCategoryTools = availableTools.filter(tool => tool.category === currentCategory)
    if (sameCategoryTools.length >= 3) {
      return sameCategoryTools.slice(0, 3)
    }
  }

  // Final fallback: most popular tools
  const popularTools = [
    '/salaire-net-quebec',
    '/calcul-hypotheque',
    '/allocations-familiales',
    '/louer-ou-acheter',
    '/interes-composes',
  ]

  return popularTools
    .map(href => availableTools.find(tool => tool.href === href))
    .filter((tool): tool is Tool => tool !== undefined)
    .slice(0, 3)
}

export default function RelatedTools({ currentTool, currentCategory }: RelatedToolsProps) {
  const recommendedTools = getRecommendedTools(currentTool, currentCategory)

  if (recommendedTools.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg p-8 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Outils connexes
          </h2>
          <p className="text-gray-600">
            Continuez votre planification financière avec ces calculateurs
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {recommendedTools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {tool.description}
              </p>

              {/* CTA */}
              <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                <span>Essayer</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <span>Voir tous les calculateurs</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

