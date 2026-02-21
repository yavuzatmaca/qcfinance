import { Metadata } from 'next'
import WageConverterClient from './WageConverterClient'
import RelatedTools from '@/components/RelatedTools'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import { Clock } from 'lucide-react'
import AdSenseAd from '@/components/AdSenseAd'
import ComparisonMode from '@/components/ComparisonMode'

export const metadata: Metadata = {
  title: "Convertisseur Taux Horaire Québec - Salaire Annuel, Hebdo",
  description: "Convertissez instantanément votre salaire horaire en hebdomadaire, bimensuel et annuel. Calculateur gratuit pour comparer les offres d'emploi au Québec.",
  keywords: [
    'taux horaire québec',
    'convertisseur salaire',
    'salaire annuel horaire',
    'calculateur salaire hebdomadaire',
    'conversion taux horaire',
    'salaire bimensuel',
  ],
  alternates: {
    canonical: '/taux-horaire',
  },
  openGraph: {
    title: "Convertisseur Taux Horaire Québec - Salaire Annuel",
    description: "Convertissez votre salaire horaire en annuel, hebdo, bimensuel. Comparez les offres d'emploi facilement.",
    url: '/taux-horaire',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Convertisseur Taux Horaire Québec",
    description: "Convertissez votre salaire instantanément",
  },
}

export default function WageConverterPage() {
  return (
    <>
      <DarkPageHeader
        badge="Comparaison Salariale"
        badgeIcon="Clock"
        title="Convertissez Votre Salaire"
        titleAccent="Instantanément"
        description="Comparez facilement les offres d'emploi en convertissant entre taux horaire, hebdomadaire et annuel"
        accentColor="cyan"
        breadcrumbLabel="Convertisseur Taux Horaire"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

          <div className="mb-8 lg:mb-12">
            <WageConverterClient />
          </div>

          {/* Info Section - MOBILE OPTIMIZED */}
          <section className="mt-8 lg:mt-12 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
              Pourquoi utiliser ce convertisseur ?
            </h2>
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-3 lg:mb-4 shadow-lg">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Comparez les offres</h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Comparez facilement les offres d'emploi qui affichent des salaires différents (horaire vs annuel)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 lg:mb-4 shadow-lg">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Planifiez votre budget</h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Voyez exactement combien vous gagnerez par semaine, par mois et par année
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 lg:mb-4 shadow-lg">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Négociez mieux</h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Comprenez votre valeur et négociez votre salaire avec confiance
                </p>
              </div>
            </div>
          </section>

          {/* Native In-Feed Ad - Mobile */}
          <div className="flex justify-center py-5 lg:hidden">
            <div className="w-full">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" adFormat="fluid" />
            </div>
          </div>

          {/* Desktop Ad */}
          <div className="hidden lg:flex justify-center py-6 lg:py-8">
            <div className="w-full max-w-3xl">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Tips Section - MOBILE OPTIMIZED */}
          <section className="mt-8 lg:mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6 text-center">
              Conseils pour évaluer une offre d'emploi
            </h2>
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Considérez les avantages
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Un salaire plus bas peut être compensé par de bons avantages : assurances, REER, vacances supplémentaires, télétravail.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Calculez le salaire net
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  N'oubliez pas que le salaire brut n'est pas ce que vous recevrez. Utilisez notre calculateur d'impôt pour voir le net.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Temps partiel vs temps plein
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Ajustez les heures par semaine selon votre situation. 37.5h ou 40h sont standards pour le temps plein.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm lg:text-base">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Heures supplémentaires
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
                  Si vous faites souvent des heures sup, votre revenu réel sera plus élevé (temps et demi après 40h).
                </p>
              </div>
            </div>
          </section>

          {/* Ad After Tips - Mobile */}
          <div className="flex justify-center py-5 lg:hidden">
            <div className="w-full">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" adFormat="fluid" />
            </div>
          </div>

          {/* Ad After Tips - Desktop */}
          <div className="hidden lg:flex justify-center py-6 lg:py-8">
            <div className="w-full max-w-3xl">
              <div className="text-[10px] text-slate-500 text-center mb-2">Publicité</div>
              <AdSenseAd adSlot="7290777867" />
            </div>
          </div>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="CNESST - Salaire minimum" 
              url="https://www.cnesst.gouv.qc.ca/fr/conditions-travail/salaire-paye/salaire" 
              lastUpdate="Mai 2026" 
            />
          </div>

          {/* Related Tools */}
          <RelatedTools currentTool="/taux-horaire" currentCategory="tax" />
        </div>

        {/* Comparison Mode - Floating Button */}
        <ComparisonMode />
      </main>
    </>
  )
}

