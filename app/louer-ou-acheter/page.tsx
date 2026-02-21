import { Metadata } from 'next'
import RentVsBuyClient from './RentVsBuyClient'
import StructuredData from '@/components/StructuredData'
import SEOContent from '@/components/SEOContent'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import { Home as HomeIcon } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'

export const metadata: Metadata = {
  title: "Louer ou Acheter Québec 2026 | Comparateur Gratuit",
  description: "Comparez achat vs location sur 5 ans. Analyse financière complète incluant tous les coûts. Gratuit.",
  keywords: [
    'louer ou acheter québec',
    'calculateur achat maison',
    'rent vs buy calculator',
    'immobilier québec',
    'acheter maison québec',
    'location vs achat',
    'comparateur immobilier',
  ],
  alternates: {
    canonical: '/louer-ou-acheter',
  },
  openGraph: {
    title: "Louer ou Acheter au Québec? Calculateur et Comparatif 2026",
    description: "Est-il mieux d'acheter une maison ou de rester locataire? Faites le calcul mathématique précis avec notre comparateur.",
    url: '/louer-ou-acheter',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Louer ou Acheter au Québec? Calculateur 2026",
    description: "Comparez financièrement l'achat vs la location sur 5 ans",
  },
}

export default function RentVsBuyPage() {
  return (
    <>
      <StructuredData
        name="Calculateur Louer ou Acheter Québec 2026"
        description="Calculateur gratuit pour comparer financièrement l'achat d'une maison vs la location au Québec. Analyse complète sur 5 ans incluant hypothèque, taxes, entretien, appréciation et rendements d'investissement."
        url="https://qcfinance.ca/louer-ou-acheter"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.6,
          ratingCount: 1230,
        }}
      />
      
      <DarkPageHeader
        badge="Décision Immobilière"
        badgeIcon="HomeIcon"
        title="Louer ou Acheter :"
        titleAccent="Faites le Bon Choix"
        description="Comparez mathématiquement l'achat vs la location et découvrez quelle option maximise votre richesse"
        accentColor="slate"
        breadcrumbLabel="Louer ou Acheter"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">

          {/* Calculator */}
          <div className="mb-12">
            <RentVsBuyClient />
          </div>

          {/* AdSense - Après calculator */}
          <div className="flex justify-center py-6 md:py-8">
            <div className="w-full max-w-3xl">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Smart Cross-Link */}
          <ToolCrossLink variant="mortgage-to-affordability" />

          {/* Info Section */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comment fonctionne ce calculateur?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Scénario Achat</h3>
                <p className="text-sm text-gray-600">
                  Calcule l'appréciation de la maison, le capital remboursé, moins tous les coûts (intérêts, taxes, entretien)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Scénario Location</h3>
                <p className="text-sm text-gray-600">
                  Investit votre mise de fonds et la différence mensuelle dans un portefeuille, moins les loyers payés
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Comparaison 5 ans</h3>
                <p className="text-sm text-gray-600">
                  Compare votre valeur nette après 5 ans dans chaque scénario pour vous aider à décider
                </p>
              </div>
            </div>
          </section>

          {/* AdSense - Après section info */}
          <div className="flex justify-center py-6 md:py-8">
            <div className="w-full max-w-3xl">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Assumptions Section */}
          <section className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Hypothèses du calculateur
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Coûts d'achat inclus
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Hypothèque à 5,5% (taux moyen 2026)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Taxes municipales: 1,2% de la valeur annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Taxe de bienvenue (droits de mutation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Entretien: 1% de la valeur annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Appréciation: 3% annuellement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Coûts de location inclus
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Augmentation de loyer: 2,5% annuellement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Mise de fonds investie dans un portefeuille</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Différence mensuelle investie (si loyer &lt; hypothèque)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Rendement des placements ajustable (2-10%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Aucun frais de déménagement inclus</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Factors to Consider */}
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Autres facteurs à considérer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Avantages d'acheter
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Accumulation de capital et patrimoine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Stabilité et contrôle de votre espace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Possibilité de rénovations et personnalisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Protection contre les hausses de loyer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-green-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Potentiel de revenu locatif (logement multiple)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-blue-600 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Avantages de louer
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Flexibilité et mobilité géographique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Pas de responsabilité d'entretien majeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Liquidité: votre capital reste disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Diversification des investissements possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-2 h-2 text-blue-600 mt-2" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3"/>
                    </svg>
                    <span>Pas de risque de baisse du marché immobilier</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* AdSense - Après autres facteurs */}
          <div className="flex justify-center py-6 md:py-8">
            <div className="w-full max-w-3xl">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Tips Section */}
          <section className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Conseils pour prendre votre décision
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Évaluez votre stabilité</h3>
                  <p className="text-sm text-gray-600">
                    Acheter est généralement plus avantageux si vous prévoyez rester au même endroit pendant au moins 5 ans. 
                    La mobilité professionnelle favorise la location.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Considérez le marché local</h3>
                  <p className="text-sm text-gray-600">
                    Dans certains quartiers de Montréal ou Québec, le ratio prix/loyer peut rendre la location plus avantageuse. 
                    Comparez les prix dans votre secteur spécifique.
                  </p>
                </div>
              </div>

              {/* Ad Placement 4 - Middle of Tips (Mobile Only) */}
              <div className="lg:hidden flex justify-center py-4">
                <div className="max-w-3xl w-full">
                  <AdSenseAd adSlot="7290777867" />
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Soyez réaliste sur les coûts</h3>
                  <p className="text-sm text-gray-600">
                    Les propriétaires sous-estiment souvent les coûts d'entretien. Prévoyez un fonds d'urgence de 1-2% de la valeur annuellement 
                    pour les réparations imprévues (toiture, plomberie, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg p-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">La discipline d'épargne est cruciale</h3>
                  <p className="text-sm text-gray-600">
                    Si vous louez, vous DEVEZ investir la différence pour que le scénario location soit avantageux. 
                    Sans discipline d'épargne, acheter force l'accumulation de capital.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Placement 5 - Before FAQ (Desktop Only) */}
          <div className="hidden lg:flex justify-center py-6 md:py-8">
            <div className="max-w-3xl w-full">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-8 container mx-auto px-4 max-w-7xl">
          <DataSource 
            label="Autorité des marchés financiers (AMF) - Immobilier" 
            url="https://lautorite.qc.ca/grand-public/immobilier" 
            lastUpdate="Simulations" 
          />
        </div>

        {/* SEO Content Section */}
        <SEOContent
          title="Louer ou acheter : faire le bon choix"
          intro="La décision entre louer et acheter est l'une des plus importantes de votre vie financière. Au Québec, le marché immobilier a connu une forte appréciation ces dernières années, mais cela ne signifie pas automatiquement qu'acheter est toujours la meilleure option. Notre calculateur vous aide à prendre une décision éclairée basée sur les mathématiques, pas sur l'émotion."
          faqs={[
            {
              question: "Quand est-il préférable d'acheter?",
              answer: "Acheter devient généralement plus avantageux si vous prévoyez rester au même endroit pendant au moins 5 ans. Les coûts de transaction (taxe de bienvenue, frais de notaire, déménagement) représentent environ 3-5% du prix d'achat, donc vous devez amortir ces coûts sur plusieurs années. Si vous avez une mise de fonds d'au moins 10-20%, un emploi stable, et que le ratio prix/loyer dans votre secteur est favorable (moins de 20), acheter peut être un excellent choix. L'achat force aussi l'épargne via le remboursement du capital hypothécaire."
            },
            {
              question: "Combien coûte vraiment l'achat d'une maison?",
              answer: "Le coût réel d'achat va bien au-delà du prix affiché. Pour une maison de 400 000$, prévoyez : taxe de bienvenue (5 000-7 000$), frais de notaire (1 500-2 000$), inspection (500-800$), déménagement (1 000-2 000$), et rénovations initiales (5 000-15 000$). Ensuite, les coûts annuels incluent : taxes municipales (4 000-6 000$), assurance habitation (1 000-1 500$), entretien (4 000-8 000$), et intérêts hypothécaires (15 000-20 000$ la première année). Au total, comptez environ 30 000-40 000$ de coûts la première année, puis 25 000-35 000$ annuellement."
            },
            {
              question: "Quels sont les avantages de la location?",
              answer: "La location offre une flexibilité maximale : vous pouvez déménager facilement pour un nouvel emploi ou un changement de vie. Votre capital reste liquide et peut être investi dans des placements diversifiés (actions, obligations, FNB) qui peuvent générer des rendements supérieurs à l'immobilier. Vous n'avez aucune responsabilité d'entretien majeur : toiture, fondation, plomberie sont aux frais du propriétaire. Au Québec, les lois protègent bien les locataires avec un contrôle des augmentations de loyer. Financièrement, si vous investissez rigoureusement la différence entre loyer et coûts d'achat, vous pouvez accumuler plus de richesse qu'en achetant."
            },
            {
              question: "Comment calculer le coût réel de l'achat?",
              answer: "Pour calculer le coût réel d'achat, additionnez : les intérêts hypothécaires (pas le capital, car c'est de l'épargne), les taxes municipales (1-1,5% de la valeur), l'entretien (1-2% de la valeur annuellement), l'assurance habitation, et les coûts de transaction initiaux amortis sur 5 ans. Soustrayez l'appréciation de la propriété (historiquement 3-4% au Québec). Par exemple, pour une maison de 400 000$ avec 80 000$ de mise de fonds : intérêts (17 600$) + taxes (5 000$) + entretien (4 000$) + assurance (1 200$) = 27 800$ par année, moins appréciation de 12 000$ = coût net de 15 800$ annuellement."
            },
            {
              question: "Qu'est-ce que la taxe de bienvenue?",
              answer: "La taxe de bienvenue (officiellement appelée droits de mutation) est une taxe unique payée lors de l'achat d'une propriété au Québec. Elle est calculée par paliers : 0,5% sur la première tranche de 58 900$, 1% sur la tranche de 58 900$ à 294 600$, et 1,5% sur le montant excédant 294 600$. Pour une maison de 400 000$, la taxe de bienvenue est d'environ 6 870$. Certaines villes comme Montréal ont des taux légèrement différents. Les premiers acheteurs peuvent bénéficier d'un crédit d'impôt remboursable pouvant aller jusqu'à 8 000$ pour compenser cette taxe."
            },
            {
              question: "Le marché immobilier va-t-il continuer de monter?",
              answer: "Personne ne peut prédire l'avenir du marché immobilier avec certitude. Historiquement au Québec, l'immobilier a apprécié d'environ 3-5% annuellement sur le long terme, mais avec des périodes de stagnation et même de baisse. Les facteurs qui influencent le marché incluent : les taux d'intérêt (des taux élevés freinent les prix), l'immigration (augmente la demande), la construction de nouveaux logements (augmente l'offre), et la situation économique. En 2026, avec des taux hypothécaires autour de 5-6%, le marché s'est stabilisé après les hausses rapides de 2020-2022. Ne basez jamais votre décision d'achat uniquement sur l'espoir d'une appréciation future."
            }
          ]}
        />
      </main>
    </>
  )
}

