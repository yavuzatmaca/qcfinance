import { Metadata } from 'next'
import RetirementClient from './RetirementClient'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

export const metadata: Metadata = {
  title: 'Calculateur Épargne Retraite Québec 2026 - REER et Intérêts Composés',
  description: 'Calculez votre épargne-retraite avec les intérêts composés. Planifiez votre REER, CELI et découvrez combien vous accumulerez pour la retraite. Gratuit.',
  keywords: [
    'épargne retraite québec',
    'calculateur reer',
    'calculateur celi',
    'intérêts composés',
    'planification retraite',
    'épargne retraite 2026',
  ],
  alternates: {
    canonical: '/epargne-retraite',
  },
  openGraph: {
    title: "Calculateur Épargne Retraite Québec 2026 - REER et CELI",
    description: "Calculez votre épargne-retraite avec les intérêts composés. Planifiez votre REER et CELI.",
    url: '/epargne-retraite',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Épargne Retraite Québec",
    description: "Planifiez votre retraite de rêve",
  },
}

export default function RetirementPage() {
  return (
    <><main className="min-h-screen bg-white">
        <DarkPageHeader
          badge="Liberté Financière"
          badgeIcon="Palmtree"
          title="Bâtissez Votre Retraite de"
          titleAccent="Rêve"
          description="Découvrez la puissance des intérêts composés et planifiez une retraite confortable"
          accentColor="amber"
          breadcrumbLabel="Épargne Retraite"
          showLastUpdated={true}
        />
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        <div className="mb-16">
          <RetirementClient />
        </div>

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-salary" />

        {/* REER vs CELI Comparison */}
        <section className="mt-16 bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            REER vs CELI : Lequel choisir ?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-700">Critère</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-blue-700">REER</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-emerald-700">CELI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-700">Déduction fiscale</td>
                  <td className="py-3 px-4 text-slate-600">✅ Oui (réduit votre revenu imposable)</td>
                  <td className="py-3 px-4 text-slate-600">❌ Non</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-700">Impôt au retrait</td>
                  <td className="py-3 px-4 text-slate-600">❌ Oui (imposé comme revenu)</td>
                  <td className="py-3 px-4 text-slate-600">✅ Non (retraits libres d'impôt)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-700">Plafond 2026</td>
                  <td className="py-3 px-4 text-slate-600">18% du revenu (max ~31,560$)</td>
                  <td className="py-3 px-4 text-slate-600">7,000$ + droits inutilisés</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-700">Meilleur pour</td>
                  <td className="py-3 px-4 text-slate-600">Revenu élevé maintenant, faible à la retraite</td>
                  <td className="py-3 px-4 text-slate-600">Flexibilité, urgences, achats importants</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">Retrait avant retraite</td>
                  <td className="py-3 px-4 text-slate-600">❌ Pénalités (sauf RAP/REEP)</td>
                  <td className="py-3 px-4 text-slate-600">✅ Aucune pénalité</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>💡 Conseil :</strong> Si votre taux d'imposition est élevé (&gt;40%), priorisez le REER. 
              Si vous êtes jeune avec un revenu modeste, le CELI est souvent meilleur. Idéalement, utilisez les deux !
            </p>
          </div>
        </section>

        {/* Impact of Starting Early */}
        <section className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg border-2 border-red-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            ⚠️ L'impact de commencer tôt (ou tard)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-emerald-700 mb-2">Commence à 25 ans</h3>
              <p className="text-sm text-slate-600 mb-3">
                Investit 500$/mois pendant 40 ans à 6%
              </p>
              <div className="text-3xl font-extrabold text-emerald-900 mb-1">
                1,0 M$
              </div>
              <p className="text-xs text-slate-500">Total investi : 240k$</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-amber-700 mb-2">Commence à 35 ans</h3>
              <p className="text-sm text-slate-600 mb-3">
                Investit 500$/mois pendant 30 ans à 6%
              </p>
              <div className="text-3xl font-extrabold text-amber-900 mb-1">
                502k$
              </div>
              <p className="text-xs text-slate-500">Total investi : 180k$</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">😰</div>
              <h3 className="font-bold text-red-700 mb-2">Commence à 45 ans</h3>
              <p className="text-sm text-slate-600 mb-3">
                Investit 500$/mois pendant 20 ans à 6%
              </p>
              <div className="text-3xl font-extrabold text-red-900 mb-1">
                232k$
              </div>
              <p className="text-xs text-slate-500">Total investi : 120k$</p>
            </div>
          </div>

          <div className="mt-6 bg-red-100 border-2 border-red-300 rounded-lg p-6 text-center">
            <p className="text-lg font-bold text-red-900 mb-2">
              🚨 Attendre 10 ans vous coûte 500,000$ !
            </p>
            <p className="text-sm text-red-800">
              Le temps est votre plus grand allié. Chaque année compte. Commencez MAINTENANT, même avec 50$/mois.
            </p>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Conseils pour maximiser votre épargne-retraite
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-emerald-600">💡</span>
                Automatisez vos cotisations
              </h3>
              <p className="text-sm text-slate-600">
                Configurez un virement automatique le jour de votre paie. Vous ne verrez même pas l'argent partir, 
                et votre épargne croîtra sans effort.
              </p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-emerald-600">💡</span>
                Profitez du REER collectif
              </h3>
              <p className="text-sm text-slate-600">
                Si votre employeur offre un REER collectif avec cotisation équivalente, c'est de l'argent GRATUIT. 
                Cotisez au moins le minimum pour obtenir le match complet.
              </p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-emerald-600">💡</span>
                Diversifiez vos placements
              </h3>
              <p className="text-sm text-slate-600">
                Ne mettez pas tous vos œufs dans le même panier. Un portefeuille diversifié (actions, obligations, FNB) 
                réduit le risque tout en maintenant de bons rendements.
              </p>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="text-emerald-600">💡</span>
                Augmentez vos cotisations annuellement
              </h3>
              <p className="text-sm text-slate-600">
                Chaque fois que vous recevez une augmentation de salaire, augmentez vos cotisations de 1-2%. 
                Vous ne sentirez pas la différence, mais votre retraite sera beaucoup plus confortable.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source */}
        <div className="mt-8">
          <DataSource 
            label="Retraite Québec - RRQ et Placements" 
            url="https://www.retraitequebec.gouv.qc.ca/" 
            lastUpdate="Taux RRQ 2026" 
          />
        </div>
      </div>
    </main>
    </>
  )
}

