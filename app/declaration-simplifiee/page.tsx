import { Metadata } from 'next'
import DeclarationSimplifieeClient from './DeclarationSimplifieeClient'
import { FileText, Receipt, Calendar, DollarSign, AlertTriangle, CheckCircle, Building2 } from 'lucide-react'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'
import StructuredData from '@/components/StructuredData'
import ResponsiveAd from '@/components/ResponsiveAd'

export const metadata: Metadata = {
  title: "Déclaration Impôt Québec 2026 | Estimateur Gratuit PDF",
  description: "Estimez votre remboursement d'impôt rapidement. Téléchargez votre rapport PDF. Simple et confidentiel.",
  keywords: [
    'déclaration impôt québec',
    'remboursement impôt 2026',
    'calculateur impôt pdf',
    'estimateur impôt gratuit',
    'rapport impôt québec',
    'déclaration revenus',
  ],
  alternates: {
    canonical: '/declaration-simplifiee',
  },
  openGraph: {
    title: "Déclaration Impôt Québec 2026 - Estimateur Gratuit PDF",
    description: "Estimez votre remboursement d'impôt en 2 minutes. Téléchargez votre rapport PDF détaillé. Gratuit et confidentiel.",
    url: '/declaration-simplifiee',
    type: 'website',
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Déclaration Impôt Québec 2026",
    description: "Estimez votre remboursement d'impôt rapidement",
  },
}

export default function DeclarationSimplifiee() {
  return (
    <>
      <StructuredData
        name="Calculateur Déclaration Simplifiée Québec 2026"
        description="Calculez si vous êtes éligible à la déclaration simplifiée au Québec. Vérifiez vos critères d'admissibilité rapidement."
        url="/declaration-simplifiee"
        category="FinanceApplication"
        aggregateRating={{
          ratingValue: 4.1,
          ratingCount: 220,
        }}
      />
      <DarkPageHeader
        badge="Déclaration de Revenus 2026"
        badgeIcon="FileText"
        title="Estimateur d'Impôt"
        titleAccent="Simplifié"
        description="Estimez votre remboursement d'impôt en 2 minutes. Téléchargez votre rapport PDF détaillé. Gratuit et confidentiel."
        accentColor="emerald"
        breadcrumbLabel="Déclaration Simplifiée"
        showLastUpdated={true}
      />

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <DeclarationSimplifieeClient />

          {/* Responsive Ad 1 - After Calculator */}
          <ResponsiveAd />
          
          {/* Educational Content Sections */}
          <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              📅 Dates Importantes 2026
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur votre déclaration de revenus
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-emerald-50 rounded-xl p-6 text-center">
                <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">30 avril 2026</h3>
                <p className="text-sm text-slate-600">Date limite pour produire votre déclaration</p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">30 avril 2026</h3>
                <p className="text-sm text-slate-600">Date limite pour payer vos impôts</p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <Receipt className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">Février 2026</h3>
                <p className="text-sm text-slate-600">Réception des feuillets T4, T5, etc.</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">8-10 semaines</h3>
                <p className="text-sm text-slate-600">Délai pour recevoir votre remboursement</p>
              </div>
            </div>
          </section>

          <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              💡 Conseils pour Maximiser Votre Remboursement
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Building2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Frais de bureau à domicile</h3>
                    <p className="text-slate-600 text-sm">Déduisez une partie de vos frais de logement si vous travaillez de la maison</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Frais de formation</h3>
                    <p className="text-slate-600 text-sm">Les cours liés à votre emploi peuvent être déductibles</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <DollarSign className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">REER et CELI</h3>
                    <p className="text-slate-600 text-sm">Maximisez vos cotisations pour réduire vos impôts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Receipt className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Frais médicaux</h3>
                    <p className="text-slate-600 text-sm">Conservez tous vos reçus de frais médicaux et dentaires</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsive Ad 2 - After Tips Section */}
          <ResponsiveAd />

          <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              💰 Déductions et Crédits Populaires
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Bureau à domicile
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Déduisez jusqu'à <strong>$1,000</strong> pour vos frais de bureau à domicile si vous travaillez plus de 50% du temps de la maison.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Électricité et chauffage</li>
                  <li>• Internet et téléphone</li>
                  <li>• Fournitures de bureau</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  Frais médicaux
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Réclamez les frais médicaux dépassant <strong>3% de votre revenu</strong> ou $2,635 (le moins élevé).
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Médicaments sur ordonnance</li>
                  <li>• Soins dentaires</li>
                  <li>• Lunettes et lentilles</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  REER et CELI
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Cotisez jusqu'à <strong>18% de votre revenu</strong> dans un REER pour réduire vos impôts.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Maximum 2026: $31,560</li>
                  <li>• Report des droits inutilisés</li>
                  <li>• CELI: $7,000 en 2026</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              ❓ Questions Fréquentes - Déclaration 2026
            </h2>
            
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    Quand dois-je produire ma déclaration de revenus 2026?
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    La date limite pour produire votre déclaration de revenus 2026 est le <strong>30 avril 2027</strong>. 
                    Si vous ou votre conjoint exploitez une entreprise, vous avez jusqu'au <strong>15 juin 2027</strong>. 
                    Cependant, si vous devez de l'impôt, vous devez le payer avant le 30 avril pour éviter les intérêts.
                  </p>
                </div>
              </details>

              <details className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    Combien de temps pour recevoir mon remboursement d'impôt?
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Si vous produisez votre déclaration par voie électronique et choisissez le dépôt direct, vous recevrez votre remboursement dans 
                    <strong> 8 jours ouvrables</strong>. Par la poste, comptez <strong>8 semaines</strong>. Pour une déclaration papier, 
                    le délai est de <strong>8 à 16 semaines</strong> selon la complexité.
                  </p>
                </div>
              </details>

              <details className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    Puis-je modifier ma déclaration après l'avoir envoyée?
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Oui, vous pouvez demander une correction en ligne via <strong>Mon dossier</strong> sur le site de l'ARC, 
                    ou en envoyant le formulaire T1-ADJ. Vous avez généralement <strong>3 ans</strong> après la date limite 
                    de production pour modifier votre déclaration. Les corrections peuvent augmenter ou diminuer votre remboursement.
                  </p>
                </div>
              </details>

              <details className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    Quels documents dois-je conserver après ma déclaration?
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Conservez tous vos documents justificatifs pendant <strong>6 ans</strong> après l'année d'imposition :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Feuillets T4, T5, relevés 1 et 3</li>
                    <li>Reçus de dons de charité</li>
                    <li>Reçus de frais médicaux et de garde d'enfants</li>
                    <li>Relevés REER et CELI</li>
                    <li>Factures de frais de bureau à domicile</li>
                  </ul>
                </div>
              </details>

              <details className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer list-none p-6 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    Que faire si je reçois mes feuillets T4 en retard?
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Les employeurs ont jusqu'au <strong>dernier jour de février</strong> pour vous remettre vos feuillets T4. 
                    Si vous ne les recevez pas à temps, vous pouvez estimer vos revenus avec votre dernier talon de paie et 
                    produire votre déclaration. Vous pourrez la modifier une fois les vrais feuillets reçus.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Responsive Ad 3 - After FAQ Section */}
          <ResponsiveAd />

          <section className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              📋 Nouveautés Fiscales 2026
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Augmentations des montants
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• <strong>Montant personnel de base:</strong> $15,705 (fédéral)</li>
                  <li>• <strong>Montant personnel de base:</strong> $18,056 (Québec)</li>
                  <li>• <strong>Maximum REER:</strong> $31,560</li>
                  <li>• <strong>Cotisation CELI:</strong> $7,000</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Changements importants
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li>• <strong>Crédit d'impôt numérique:</strong> Nouveau crédit de $500</li>
                  <li>• <strong>Frais de bureau:</strong> Déduction simplifiée maintenue</li>
                  <li>• <strong>Crédit pour soignants:</strong> Montant augmenté</li>
                  <li>• <strong>Fractionnement du revenu:</strong> Règles assouplies</li>
                </ul>
              </div>
            </div>
          </section>

          <DataSource 
            label="Revenu Québec - Déclaration de revenus" 
            url="https://www.revenuquebec.ca/fr/citoyens/declaration-de-revenus/" 
            lastUpdate="Version 2026" 
          />
        </div>
      </main>
    </>
  )
}