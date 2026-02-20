import { Metadata } from 'next'
import DeclarationSimplifieeClient from './DeclarationSimplifieeClient'
import { FileText, Receipt, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock, Building2 } from 'lucide-react'
import DataSource from '@/components/ui/DataSource'
import DarkPageHeader from '@/components/DarkPageHeader'

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

      <DeclarationSimplifieeClient />
      
      {/* Educational Content Sections */}
      <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          
          {/* Section 1: Document Checklist */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
              📋 Checklist des Documents
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Rassemblez ces documents avant de commencer votre déclaration
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">T4 (Fédéral)</h3>
                <p className="text-sm text-slate-600">
                  Feuillet de revenu d'emploi fourni par votre employeur. Case 14 = revenu brut.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Relevé 1 (Québec)</h3>
                <p className="text-sm text-slate-600">
                  Équivalent provincial du T4. Case A = revenu d'emploi, Case E = impôt retenu.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Reçus REER</h3>
                <p className="text-sm text-slate-600">
                  Cotisations à votre régime d'épargne-retraite. Déduction puissante !
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Frais médicaux</h3>
                <p className="text-sm text-slate-600">
                  Médicaments, dentiste, lunettes. Crédit d'impôt si &gt; 3% du revenu.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Receipt className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Reçus de dons</h3>
                <p className="text-sm text-slate-600">
                  Dons de charité. Crédit d'impôt de 15% (fédéral) + 20% (Québec).
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Frais de garde</h3>
                <p className="text-sm text-slate-600">
                  Reçus de garderie ou camp de jour. Déduction jusqu'à 8,000$/enfant.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Important Dates */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              📅 Dates Importantes 2026
            </h2>
            
            <div className="space-y-4">
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900 text-lg mb-2">
                      30 Avril 2026 - Date limite générale
                    </h3>
                    <p className="text-amber-800 text-sm">
                      Si vous êtes un employé salarié, vous devez produire votre déclaration de revenus 
                      avant le <strong>30 avril 2026 à 23h59</strong>. Tout retard entraîne des pénalités de 5% 
                      du solde dû, plus 1% par mois de retard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-blue-900 text-lg mb-2">
                      15 Juin 2026 - Travailleurs autonomes
                    </h3>
                    <p className="text-blue-800 text-sm">
                      Si vous ou votre conjoint êtes travailleur autonome, vous avez jusqu'au 
                      <strong> 15 juin 2026</strong> pour produire. Attention : tout solde dû doit quand même 
                      être payé avant le 30 avril pour éviter les intérêts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-emerald-900 text-lg mb-2">
                      1er Mars 2026 - Réception des feuillets
                    </h3>
                    <p className="text-emerald-800 text-sm">
                      Les employeurs doivent vous remettre vos T4 et Relevé 1 avant le 
                      <strong> 28 février 2026</strong>. Si vous ne les recevez pas, contactez votre employeur 
                      ou l'ARC/Revenu Québec.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: How to File */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
              🎯 Comment faire sa déclaration ?
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Suivez ces 5 étapes simples pour produire votre déclaration de revenus
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border-l-4 border-blue-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Rassembler ses feuillets</h3>
                    <p className="text-sm text-slate-600">
                      Collectez tous vos T4, Relevé 1, reçus REER, frais médicaux, et autres documents fiscaux. 
                      Vérifiez que les montants correspondent à vos paies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-indigo-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Calculer le revenu total</h3>
                    <p className="text-sm text-slate-600">
                      Additionnez tous vos revenus d'emploi (case 14 du T4), revenus d'intérêts, 
                      dividendes, et autres sources de revenus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-purple-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Appliquer les déductions</h3>
                    <p className="text-sm text-slate-600">
                      Soustrayez vos cotisations REER, cotisations syndicales, frais de garde d'enfants, 
                      et autres déductions admissibles pour réduire votre revenu imposable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-emerald-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Calculer les crédits d'impôt</h3>
                    <p className="text-sm text-slate-600">
                      Appliquez vos crédits non-remboursables (montant personnel de base, frais médicaux, 
                      dons de charité) pour réduire l'impôt à payer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border-l-4 border-orange-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Envoyer via un logiciel certifié</h3>
                    <p className="text-sm text-slate-600">
                      Utilisez un logiciel homologué comme <strong>Wealthsimple Tax</strong> (gratuit), 
                      <strong>TurboTax</strong>, ou <strong>ImpôtExpert</strong>. Transmission électronique 
                      via ImpôtNet pour un remboursement rapide (8-14 jours).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Comprehensive FAQ */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center">
              ❓ Questions Fréquentes
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur votre déclaration de revenus
            </p>
            
            <div className="space-y-3">
              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Quel est le montant personnel de base en 2026 ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-2">
                    Le <strong>montant personnel de base fédéral</strong> pour 2026 est d'environ <strong>15,705$</strong>. 
                    Cela signifie que les premiers 15,705$ de votre revenu ne sont pas imposés au niveau fédéral.
                  </p>
                  <p>
                    Au <strong>Québec</strong>, le montant personnel de base provincial est d'environ <strong>18,056$</strong>. 
                    Ces montants sont automatiquement appliqués dans votre déclaration.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Comment réduire mes impôts rapidement ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-3">Les stratégies les plus efficaces :</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Cotiser à un REER</strong> : Chaque dollar cotisé réduit votre revenu imposable. 
                      Économie d'impôt immédiate de ~40% (selon votre taux marginal).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Utiliser un CELI</strong> : Les gains sont à l'abri de l'impôt à vie. 
                      Plafond 2026 : 7,000$ + droits inutilisés.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Frais de garde</strong> : Déductibles jusqu'à 8,000$/enfant &lt; 7 ans.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span><strong>Dons de charité</strong> : Crédit d'impôt de 35% (combiné) sur les dons &gt; 200$.</span>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Puis-je déduire mes frais de télétravail ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-2">
                    <strong>Oui, si vous avez travaillé de la maison plus de 50% du temps pendant au moins 4 semaines consécutives.</strong>
                  </p>
                  <p className="mb-3">Deux méthodes :</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">1.</span>
                      <span><strong>Méthode à taux fixe temporaire</strong> : 2$ par jour de télétravail (max 500$). 
                      Simple, pas de reçus nécessaires.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <span><strong>Méthode détaillée</strong> : Déduisez une portion de votre loyer, électricité, 
                      internet selon la superficie de votre bureau. Nécessite le formulaire T2200 signé par l'employeur.</span>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Quelle est la pénalité pour retard ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-3">
                    Si vous produisez votre déclaration en retard <strong>ET</strong> que vous avez un solde à payer :
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Pénalité de base</strong> : 5% du solde dû</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Pénalité mensuelle</strong> : 1% du solde dû par mois de retard (max 12 mois)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Intérêts composés</strong> : Taux prescrit (~10% annuel) sur le solde impayé</span>
                    </li>
                  </ul>
                  <p className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <strong>💡 Bon à savoir :</strong> Si vous avez droit à un remboursement, il n'y a aucune pénalité 
                    pour produire en retard. Mais vous ne recevrez pas votre argent tant que vous n'aurez pas produit !
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Combien de temps pour recevoir mon remboursement ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-3">Les délais varient selon la méthode de transmission :</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">⚡</span>
                      <span><strong>Transmission électronique + dépôt direct</strong> : 8 à 14 jours (le plus rapide)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">📧</span>
                      <span><strong>Transmission électronique + chèque postal</strong> : 4 à 6 semaines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">📮</span>
                      <span><strong>Déclaration papier</strong> : 8 à 12 semaines</span>
                    </li>
                  </ul>
                  <p className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <strong>💡 Astuce :</strong> Inscrivez-vous au dépôt direct dans Mon dossier (ARC) et 
                    Mon dossier pour les citoyens (Revenu Québec) pour recevoir vos remboursements plus rapidement.
                  </p>
                </div>
              </details>

              <details className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 group">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  <span>Dois-je produire une déclaration si je n'ai pas travaillé ?</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <p className="mb-3">
                    <strong>Oui, c'est fortement recommandé !</strong> Même sans revenu, produire une déclaration vous permet de :
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Recevoir le <strong>crédit TPS/TVH</strong> (jusqu'à 496$ par adulte)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Recevoir le <strong>crédit de solidarité du Québec</strong> (jusqu'à 1,000$+)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Accumuler des <strong>droits de cotisation REER</strong> pour les années futures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Maintenir votre <strong>admissibilité aux prestations</strong> (allocations familiales, etc.)</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </section>

          {/* Section 5: Legal Disclaimer */}
          <section className="bg-slate-100 border border-slate-300 rounded-xl p-8">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-slate-600" />
              Avertissement légal
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cet outil est un <strong>estimateur à des fins pédagogiques uniquement</strong>. 
              Les calculs fournis sont des approximations basées sur les taux d'imposition de 2026 
              et ne tiennent pas compte de toutes les situations fiscales complexes (revenus multiples, 
              crédits d'impôt provinciaux spécifiques, etc.). 
              <strong> Il ne remplace pas un logiciel certifié par l'ARC/Revenu Québec ou les services d'un comptable professionnel.</strong> 
              Pour produire votre déclaration officielle, utilisez un logiciel homologué ou consultez un fiscaliste. 
              QCFinance.ca ne peut être tenu responsable des décisions fiscales prises sur la base de ces estimations.
            </p>
          </section>

          {/* Data Source */}
          <div className="mt-8">
            <DataSource 
              label="Revenu Québec - Déclaration de revenus" 
              url="https://www.revenuquebec.ca/fr/citoyens/declaration-de-revenus/" 
              lastUpdate="Période 2025-2026" 
            />
          </div>

        </div>
      </div>
    </>
  )
}

