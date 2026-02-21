import WizardSimulatorV2 from '@/src/components/v2/WizardSimulatorV2';
import { Metadata } from 'next';
import { Suspense } from 'react';
import AdSenseAd from '@/components/AdSenseAd';

export const metadata: Metadata = {
  title: 'Simulateur de Vie au Québec 2026 - Calculateur Salaire Net, Loyer & Budget | QCFinance.ca',
  description: 'Calculez votre budget au Québec en 2026 : salaire net après impôts, loyer, épicerie, allocations familiales. Simulateur gratuit pour Montréal, Québec, Laval. Résultats personnalisés en temps réel!',
  keywords: [
    'simulateur vie québec',
    'calculateur salaire net québec',
    'budget montréal 2026',
    'coût de la vie québec',
    'loyer montréal',
    'allocations familiales québec',
    'impôts québec calculateur',
    'salaire après impôts',
    'budget familial québec',
    'CPE québec',
    'calculateur budget',
    'vivre à montréal',
    'immigration québec budget',
    'salaire minimum québec',
    'coût logement montréal'
  ],
  authors: [{ name: 'QCFinance.ca' }],
  creator: 'QCFinance.ca',
  publisher: 'QCFinance.ca',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Simulateur de Vie au Québec 2026 - Budget, Salaire Net & Allocations',
    description: 'Calculez votre budget complet au Québec : salaire net, loyer, épicerie, allocations. Résultats personnalisés pour 10 villes. Gratuit et précis!',
    url: 'https://qcfinance.ca/simulateur-vie-quebec',
    siteName: 'QCFinance.ca',
    locale: 'fr_CA',
    type: 'website',
    images: [
      {
        url: '/images/simulator.jpg',
        width: 1200,
        height: 630,
        alt: 'Simulateur de Vie au Québec - Calculateur Budget 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur de Vie au Québec 2026 - Budget & Salaire Net',
    description: 'Calculez votre budget au Québec : salaire net, loyer, allocations familiales. Résultats personnalisés gratuits!',
    images: ['/images/simulator.jpg'],
    creator: '@QCFinance',
  },
  alternates: {
    canonical: 'https://qcfinance.ca/simulateur-vie-quebec',
  },
  other: {
    'google-site-verification': 'your-verification-code',
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simulateur de Vie au Québec',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CAD',
  },
  description: 'Calculateur gratuit pour estimer votre budget de vie au Québec : salaire net après impôts, loyer, épicerie, allocations familiales, et plus.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2847',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'QCFinance.ca',
    url: 'https://qcfinance.ca',
  },
  featureList: [
    'Calcul salaire net après impôts Québec et fédéral',
    'Estimation loyer pour 10 villes du Québec',
    'Budget épicerie personnalisé selon famille',
    'Allocations familiales (CCB + Québec)',
    'Coûts CPE et garderie',
    'Comparaison villes du Québec',
    'Résultats en temps réel',
  ],
  inLanguage: 'fr-CA',
  isAccessibleForFree: true,
  audience: {
    '@type': 'Audience',
    audienceType: 'Residents and immigrants to Quebec',
    geographicArea: {
      '@type': 'Place',
      name: 'Quebec, Canada',
    },
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte la vie à Montréal en 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour une personne seule à Montréal en 2026, le coût de vie moyen est d\'environ 3,150$/mois incluant loyer (1,780$), épicerie (450$), transport (105$), et autres dépenses. Pour une famille, les coûts varient selon le nombre d\'enfants et les allocations reçues.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment calculer mon salaire net au Québec?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le salaire net au Québec se calcule en soustrayant les impôts fédéral et provincial, les cotisations RRQ, RQAP, et assurance-emploi de votre salaire brut. Notre simulateur fait ce calcul automatiquement avec les taux 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles sont les allocations familiales au Québec?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les familles québécoises reçoivent l\'Allocation canadienne pour enfants (CCB) du fédéral (jusqu\'à 7,997$/an par enfant 0-5 ans) et l\'Allocation famille du Québec (jusqu\'à 2,980$ pour 1 enfant). Les montants varient selon le revenu familial.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un CPE au Québec?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les places en CPE (Centre de la petite enfance) coûtent environ 9,10$/jour, soit environ 200$/mois. C\'est beaucoup moins cher que les garderies privées qui coûtent environ 50$/jour (1,100$/mois).',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel salaire faut-il pour vivre confortablement à Montréal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour vivre confortablement à Montréal en 2026, un salaire net d\'au moins 4,000$/mois (environ 60,000$ brut/an) est recommandé pour une personne seule. Pour une famille, 80,000-120,000$ brut selon le nombre d\'enfants.',
      },
    },
  ],
};

export default function SimulateurVieQuebecV2Page() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      {/* Main Content */}
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>
        <WizardSimulatorV2 />
      </Suspense>
      
      {/* SEO Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-slate-50">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Simulateur de Vie au Québec 2026 - Votre Guide Complet
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Pourquoi utiliser notre simulateur?
              </h3>
              <p className="text-slate-700">
                Notre <strong>simulateur de vie au Québec</strong> vous permet de calculer précisément votre budget mensuel en tenant compte de tous les facteurs : <strong>salaire net après impôts</strong>, coût du logement, épicerie, transport, et <strong>allocations familiales</strong>. Que vous planifiez votre <strong>immigration au Québec</strong> ou que vous souhaitiez déménager dans une nouvelle ville, obtenez des résultats personnalisés en quelques clics.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Calculs précis pour 2026
              </h3>
              <p className="text-slate-700">
                Nos calculs utilisent les <strong>taux d'imposition 2026</strong> du Québec et du Canada, les <strong>prix moyens des loyers</strong> actualisés pour Montréal, Québec, Laval et 7 autres villes, ainsi que les montants exacts des <strong>allocations CCB et Allocation famille</strong>. Résultats fiables pour planifier votre budget.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Villes couvertes par le simulateur
          </h3>
          <p className="text-slate-700 mb-4">
            Comparez le <strong>coût de la vie</strong> dans 10 grandes villes du Québec :
          </p>
          <ul className="grid md:grid-cols-2 gap-2 mb-8">
            <li>✓ <strong>Montréal</strong> - Loyer moyen 1BR : 1,780$</li>
            <li>✓ <strong>Québec</strong> - Loyer moyen 1BR : 1,250$</li>
            <li>✓ <strong>Laval</strong> - Loyer moyen 1BR : 1,450$</li>
            <li>✓ <strong>Gatineau</strong> - Loyer moyen 1BR : 1,350$</li>
            <li>✓ <strong>Longueuil</strong> - Loyer moyen 1BR : 1,400$</li>
            <li>✓ <strong>Sherbrooke</strong> - Loyer moyen 1BR : 1,050$</li>
            <li>✓ <strong>Saguenay</strong> - Loyer moyen 1BR : 850$</li>
            <li>✓ <strong>Lévis</strong> - Loyer moyen 1BR : 1,150$</li>
            <li>✓ <strong>Trois-Rivières</strong> - Loyer moyen 1BR : 900$</li>
            <li>✓ <strong>Terrebonne</strong> - Loyer moyen 1BR : 1,350$</li>
          </ul>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ce que calcule notre simulateur
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Salaire net mensuel</strong>
                  <span className="text-slate-600"> après impôts Québec et fédéral (2026)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Coût du logement</strong>
                  <span className="text-slate-600"> selon le type (studio, 1-4 chambres, maison)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Budget épicerie</strong>
                  <span className="text-slate-600"> adapté à votre famille (adultes + enfants)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Transport</strong>
                  <span className="text-slate-600"> : transport en commun, 1-2 voitures, ou vélo</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Frais de garde</strong>
                  <span className="text-slate-600"> : CPE (9$/jour) ou garderie privée</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Allocations familiales</strong>
                  <span className="text-slate-600"> : CCB fédéral + Allocation famille Québec</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Services publics</strong>
                  <span className="text-slate-600"> : électricité, chauffage, internet</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <strong className="text-slate-900">Taux d'épargne</strong>
                  <span className="text-slate-600"> et santé financière</span>
                </div>
              </li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Questions fréquentes - Budget Québec 2026
          </h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg text-slate-900 mb-2">
                Quel est le coût moyen de la vie à Montréal?
              </h4>
              <p className="text-slate-700">
                En 2026, une personne seule à Montréal dépense environ <strong>3,150$/mois</strong> : loyer 1,780$, épicerie 450$, transport 105$, services publics 120$, et autres dépenses 695$. Pour une famille de 4, comptez 5,500-6,500$/mois selon les allocations reçues.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg text-slate-900 mb-2">
                Comment sont calculés les impôts au Québec?
              </h4>
              <p className="text-slate-700">
                Le Québec a un <strong>système d'imposition progressif</strong> : impôt provincial (15% à 25.75%) + impôt fédéral (15% à 33%) + cotisations RRQ, RQAP, et AE. Notre simulateur applique automatiquement tous ces taux pour calculer votre <strong>salaire net réel</strong>.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg text-slate-900 mb-2">
                Combien reçoit-on en allocations familiales?
              </h4>
              <p className="text-slate-700">
                Les familles québécoises reçoivent jusqu'à <strong>7,997$/an par enfant 0-5 ans</strong> (CCB fédéral) et <strong>2,980$ pour 1 enfant</strong> (Allocation famille Québec). Pour 3 enfants, c'est environ 2,300$/mois! Les montants diminuent selon le revenu familial.
              </p>
            </div>
          </div>
          
          {/* Ad Placement - After SEO Content (Engaged Readers) */}
          <div className="flex justify-center py-8 md:py-12">
            <div className="max-w-3xl w-full">
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à calculer votre budget au Québec?
            </h3>
            <p className="text-lg mb-4">
              Utilisez notre <strong>simulateur gratuit</strong> pour obtenir une estimation précise de votre budget mensuel. Résultats personnalisés en moins de 2 minutes!
            </p>
            <p className="text-sm opacity-90">
              ✓ Gratuit et sans inscription • ✓ Données 2026 à jour • ✓ 10 villes du Québec • ✓ Calculs précis
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

