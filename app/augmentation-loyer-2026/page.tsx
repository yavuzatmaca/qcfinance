import { Metadata } from 'next'
import RentIncreaseClient from './RentIncreaseClient'
import { Scale, FileText, TrendingUp } from 'lucide-react'
import { ToolCrossLink } from '@/components/ToolCrossLink'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

export const metadata: Metadata = {
  title: 'Calculateur Augmentation de Loyer Québec 2026 - TAL (Tribunal Logement)',
  description: 'Calculez l\'augmentation de loyer permise selon le TAL. Outil officiel basé sur les règles du Tribunal administratif du logement du Québec. Gratuit et précis.',
  keywords: [
    'augmentation loyer québec 2026',
    'tal québec',
    'tribunal logement',
    'calculateur loyer',
    'régie logement',
    'droits locataires',
    'augmentation loyer permise',
  ],
  alternates: {
    canonical: '/augmentation-loyer-2026',
  },
  openGraph: {
    title: "Calculateur Augmentation Loyer Québec 2026 - TAL",
    description: "Calculez l'augmentation permise selon le TAL. Vérifiez si votre augmentation est juste.",
    url: '/augmentation-loyer-2026',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calculateur Augmentation Loyer Québec 2026",
    description: "Vérifiez si votre augmentation est juste",
  },
}

export default function RentIncreasePage() {
  return (
    <>
      <DarkPageHeader
        badge="Droits des Locataires"
        badgeIcon="Scale"
        title="Votre Augmentation de Loyer"
        titleAccent="Est-Elle Juste?"
        description="Calculez l'augmentation permise selon le TAL et découvrez si vous payez trop cher"
        accentColor="emerald"
        breadcrumbLabel="Augmentation Loyer 2026"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        {/* GOLD STANDARD SPLIT-SCREEN CALCULATOR */}
        <RentIncreaseClient />

        {/* Smart Cross-Link */}
        <ToolCrossLink variant="to-affordability" />

        {/* Educational Section - V2 Gold Standard */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Comment fonctionne le calcul ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Indice de base (4%)</h3>
              <p className="text-sm text-gray-600">
                Le TAL publie un <strong>indice de base annuel</strong> (environ 4% en 2026) qui reflète l'inflation. 
                C'est le point de départ pour toute augmentation de loyer au Québec.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Scale className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Rôle du TAL (Tribunal)</h3>
              <p className="text-sm text-gray-600">
                Le <strong>Tribunal administratif du logement</strong> (anciennement Régie du logement) fixe les règles d'augmentation. 
                Si vous contestez, le TAL peut réviser l'augmentation proposée par le propriétaire.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dépenses justifiées</h3>
              <p className="text-sm text-gray-600">
                Le propriétaire peut ajouter des augmentations pour <strong>taxes, assurances, travaux majeurs</strong>. 
                Mais il doit fournir des preuves (factures, relevés) si vous contestez.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips Section - V2 Gold Standard */}
        <section className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Conseils pour gérer une augmentation de loyer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Gardez vos factures de rénovations
              </h3>
              <p className="text-sm text-gray-600">
                Si le propriétaire justifie l'augmentation par des travaux, demandez les <strong>factures détaillées</strong>. 
                Vous avez le droit de contester si les montants semblent exagérés ou si les travaux n'ont pas été faits.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Vous avez 21 jours pour refuser
              </h3>
              <p className="text-sm text-gray-600">
                Après avoir reçu l'avis d'augmentation, vous avez <strong>21 jours</strong> pour refuser par écrit. 
                Si vous ne répondez pas, l'augmentation est automatiquement acceptée.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Utilisez le formulaire officiel du TAL
              </h3>
              <p className="text-sm text-gray-600">
                Pour contester, remplissez le <strong>formulaire de refus du TAL</strong> et envoyez-le au propriétaire ET au Tribunal. 
                Téléchargez-le gratuitement sur le site du TAL.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-green-600">💡</span>
                Négociez avant d'aller au TAL
              </h3>
              <p className="text-sm text-gray-600">
                Discutez avec votre propriétaire avant de contester officiellement. 
                Souvent, un <strong>compromis</strong> peut être trouvé sans passer par le Tribunal, ce qui économise du temps et de l'argent.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source */}
        <div className="mt-8">
          <DataSource 
            label="TAL - Tribunal administratif du logement" 
            url="https://www.tal.gouv.qc.ca/fr/calcul-pour-l-augmentation-des-loyers/" 
            lastUpdate="Taux d'ajustement 2026" 
          />
        </div>
      </div>
    </main>
    </>
  )
}

