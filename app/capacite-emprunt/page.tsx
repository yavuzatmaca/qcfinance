import { Metadata } from 'next'
import AffordabilityClient from './AffordabilityClient'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import { DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: "Capacité d'Emprunt Hypothécaire Québec 2026 | Calculateur",
  description: "Calculez combien vous pouvez emprunter pour votre maison. Ratios GDS et TDS. Gratuit.",
  keywords: [
    'capacité emprunt québec',
    'calculateur hypothèque',
    'ratio gds tds',
    'combien emprunter',
    'achat maison québec',
    'capacité achat 2026',
  ],
  alternates: {
    canonical: '/capacite-emprunt',
  },
  openGraph: {
    title: "Capacité d'Emprunt Hypothécaire Québec 2026",
    description: "Calculez combien vous pouvez emprunter. Ratios GDS et TDS. Résultat instantané.",
    url: '/capacite-emprunt',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Capacité d'Emprunt Hypothécaire Québec",
    description: "Découvrez votre budget maison réel",
  },
}

export default function AffordabilityPage() {
  return (
    <>
      <DarkPageHeader
        badge="Pouvoir d'Achat"
        badgeIcon="DollarSign"
        title="Découvrez Votre Budget"
        titleAccent="Maison Réel"
        description="Calculez le prix maximum que vous pouvez vous permettre selon les critères bancaires GDS et TDS"
        accentColor="violet"
        breadcrumbLabel="Capacité d'Emprunt"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
          <AffordabilityClient />

          {/* Smart Cross-Link */}
          <ToolCrossLink variant="to-salary" />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne le calcul ?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Ratio ABD (GDS)</h3>
                <p className="text-sm text-gray-600">
                  Maximum 39% de votre revenu brut pour les coûts de logement (hypothèque, taxes, chauffage)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Ratio ATD (TDS)</h3>
                <p className="text-sm text-gray-600">
                  Maximum 44% de votre revenu brut pour tous les paiements (logement + dettes)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Normes bancaires</h3>
                <p className="text-sm text-gray-600">
                  Calculs basés sur les critères d'admissibilité des institutions financières canadiennes
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour maximiser votre capacité d'emprunt
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-purple-600">💡</span>
                  Réduisez vos dettes
                </h3>
                <p className="text-sm text-gray-600">
                  Remboursez vos cartes de crédit et prêts auto avant de faire une demande hypothécaire. Chaque dollar de dette réduit votre capacité d'emprunt.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-purple-600">💡</span>
                  Augmentez votre mise de fonds
                </h3>
                <p className="text-sm text-gray-600">
                  Plus votre mise de fonds est élevée, moins vous devez emprunter. Visez au moins 20% pour éviter l'assurance prêt hypothécaire.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-purple-600">💡</span>
                  Améliorez votre cote de crédit
                </h3>
                <p className="text-sm text-gray-600">
                  Une bonne cote de crédit (700+) vous donne accès aux meilleurs taux d'intérêt, ce qui augmente votre pouvoir d'achat.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-purple-600">💡</span>
                  Considérez un co-emprunteur
                </h3>
                <p className="text-sm text-gray-600">
                  Acheter avec un partenaire ou conjoint combine vos revenus et augmente significativement votre capacité d'emprunt.
                </p>
              </div>
            </div>
          </section>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="SCHL - Règles hypothécaires" 
              url="https://www.cmhc-schl.gc.ca/consommateurs" 
              lastUpdate="Test de stress (B-20)" 
            />
          </div>
        </div>
      </main>
    </>
  )
}

