import { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Shield, TrendingUp, Users, Target, Award, Code, RefreshCw, Mail, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: "À Propos - QCFinance.ca | Outils Financiers Développés au Québec",
  description: "Découvrez l'histoire de QCFinance.ca, un projet logiciel créé par un développeur québécois pour offrir des calculateurs financiers précis, gratuits et adaptés aux réalités du Québec.",
}

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">À Propos de QCFinance.ca</h1>
          <p className="text-lg text-gray-600">Un projet logiciel québécois au service de vos finances</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-10">
          
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Fournir aux résidents du Québec les outils financiers les plus <strong>précis</strong>, 
                les plus <strong>conviviaux</strong> et les plus <strong>transparents</strong> qui soient, 
                entièrement gratuits et sans compromis sur la confidentialité.
              </p>
              <p>
                QCFinance.ca est un projet logiciel conçu pour simplifier les calculs financiers complexes 
                propres au Québec. Nous croyons que chaque Québécois devrait pouvoir accéder à des outils 
                de qualité professionnelle pour planifier son budget, comprendre ses impôts et prendre des 
                décisions financières éclairées.
              </p>
              <p>
                Nos calculateurs tiennent compte des spécificités fiscales québécoises : double imposition 
                (provincial et fédéral), crédits d'impôt remboursables et non remboursables, programmes 
                sociaux comme l'allocation famille, les frais de garde subventionnés, et bien plus encore.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">L'Histoire derrière QCFinance.ca</h2>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900">
                Un projet né d'un besoin réel
              </p>
              <p>
                Bonjour, je suis <strong>développeur logiciel</strong> basé au Québec et fondateur de QCFinance.ca. 
                Ce projet est né d'une frustration personnelle que beaucoup de Québécois partagent probablement.
              </p>
              <p>
                En 2024, alors que je cherchais à calculer mon salaire net après impôts, à comparer des options 
                hypothécaires et à estimer mes allocations familiales, j'ai réalisé quelque chose de troublant : 
                <strong> les outils disponibles en ligne étaient soit incomplets, soit imprécis, soit conçus pour 
                d'autres provinces canadiennes</strong>.
              </p>
              <p>
                Les calculateurs génériques ne tenaient pas compte des particularités du Québec. Les sites 
                gouvernementaux, bien qu'officiels, étaient souvent complexes et difficiles à naviguer. 
                Et les rares outils spécialisés demandaient des inscriptions ou cachaient des frais.
              </p>
              <p>
                En tant que développeur, j'ai décidé d'utiliser mes compétences en programmation pour créer 
                la solution que je cherchais : <strong>des calculateurs précis, rapides, gratuits et 100% 
                adaptés aux réalités fiscales et financières du Québec</strong>.
              </p>
              <p>
                QCFinance.ca n'est pas une firme de conseil financier. C'est un <strong>projet logiciel</strong> 
                construit avec soin pour automatiser des calculs complexes et les rendre accessibles à tous. 
                Chaque algorithme est testé, chaque formule est vérifiée contre les sources officielles de 
                Revenu Québec et de l'Agence du revenu du Canada.
              </p>
              <p className="text-gray-900 font-medium pt-2">
                Mon objectif est simple : si cet outil m'aide dans ma planification financière, il peut 
                certainement aider d'autres Québécois aussi.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Notre Engagement envers la Précision</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Mises à jour régulières</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Les lois fiscales et les programmes sociaux évoluent chaque année. Nos algorithmes sont 
                  <strong> mis à jour régulièrement</strong> pour refléter les dernières règles de 
                  <strong> Revenu Québec</strong> et de l'<strong>Agence du revenu du Canada (ARC)</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pour l'année 2026, tous nos calculateurs intègrent les taux d'imposition actuels, 
                  les tranches de revenus, les crédits d'impôt remboursables et non remboursables, 
                  ainsi que les montants des programmes sociaux québécois.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Sources officielles</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Chaque formule de calcul est basée sur les publications officielles des gouvernements 
                  du Québec et du Canada. Nous consultons régulièrement :
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Les guides fiscaux de Revenu Québec</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Les bulletins d'information de l'ARC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Les barèmes de cotisations (RRQ, RQAP, assurance-emploi)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span>Les grilles tarifaires des programmes sociaux</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Transparence et limites</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Nous sommes transparents sur ce que nos outils peuvent et ne peuvent pas faire. 
                  Les calculateurs fournissent des <strong>estimations basées sur des scénarios généraux</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Votre situation personnelle peut comporter des particularités (crédits d'impôt spécifiques, 
                  déductions professionnelles, revenus multiples, etc.) qui nécessitent l'expertise d'un 
                  comptable ou d'un planificateur financier qualifié.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Confidentialité et Sécurité</h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-gray-900">
                Vos données financières vous appartiennent
              </p>
              <p>
                <strong>Tous les calculs sont effectués localement dans votre navigateur.</strong> Aucune 
                information financière personnelle (salaire, dettes, économies, etc.) n'est transmise à 
                nos serveurs ou à des tiers.
              </p>
              <p>
                Nous ne demandons jamais d'inscription, de numéro d'assurance sociale, de coordonnées 
                bancaires ou toute autre information sensible. Vous pouvez utiliser nos outils en toute 
                confidentialité, autant de fois que vous le souhaitez.
              </p>
              <p className="text-sm text-gray-600 italic">
                Note : Comme la plupart des sites web, nous utilisons Google Analytics pour comprendre 
                l'utilisation générale du site (pages visitées, durée de session), mais jamais les données 
                que vous entrez dans les calculateurs.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Pour Qui?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Particuliers</h3>
                <p className="text-gray-700 text-sm">
                  Planifiez votre budget, calculez vos impôts, évaluez vos prêts et prenez des décisions 
                  financières éclairées pour votre famille.
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Travailleurs Autonomes</h3>
                <p className="text-gray-700 text-sm">
                  Estimez vos revenus nets, planifiez vos impôts et gérez votre trésorerie avec nos outils 
                  adaptés aux réalités du travail autonome.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Futurs Propriétaires</h3>
                <p className="text-gray-700 text-sm">
                  Calculez votre capacité d'emprunt, comparez louer vs acheter, et planifiez votre achat 
                  immobilier avec confiance.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h3 className="font-bold text-gray-900 mb-2">Étudiants</h3>
                <p className="text-gray-700 text-sm">
                  Évaluez vos prêts étudiants, planifiez votre budget et comprenez l'impact fiscal de vos 
                  revenus d'été ou de stage.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Outils</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                QCFinance.ca offre une suite complète de calculateurs financiers adaptés au Québec :
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Calculateur d'impôt et salaire net</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Calculateur hypothécaire et capacité d'emprunt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Prêt auto et prêt étudiant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Allocations familiales et frais de garde</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Louer ou acheter - comparateur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Épargne retraite et intérêts composés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>TPS/TVQ et taxe de bienvenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Et bien plus encore...</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Avertissement Important</h2>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-600 p-8 rounded-r-xl space-y-4">
              <p className="text-gray-900 font-bold text-lg">
                QCFinance.ca est un outil logiciel, pas un service de conseil financier
              </p>
              <p className="text-gray-700 leading-relaxed">
                Les calculs fournis par ce site sont <strong>à titre informatif et éducatif seulement</strong>. 
                Ils sont conçus pour vous aider à comprendre et à estimer différents scénarios financiers, 
                mais ne constituent en aucun cas des conseils financiers, fiscaux ou juridiques personnalisés.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bien que nous mettions tout en œuvre pour maintenir l'exactitude de nos algorithmes et 
                utiliser les données officielles les plus récentes, les résultats demeurent des 
                <strong> estimations générales</strong>. Votre situation personnelle peut comporter des 
                particularités qui influencent les calculs réels.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Pour des décisions financières importantes</strong> (achat immobilier, planification 
                fiscale complexe, investissements majeurs, etc.), nous vous recommandons fortement de consulter 
                un professionnel qualifié :
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Comptable agréé (CPA) pour les questions fiscales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Planificateur financier pour la gestion de patrimoine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Courtier hypothécaire pour les prêts immobiliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Avocat pour les questions juridiques</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed pt-2">
                En utilisant QCFinance.ca, vous reconnaissez que les résultats sont des estimations et 
                que vous êtes responsable de vos décisions financières.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Contact et Commentaires</h2>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl space-y-4">
              <p className="text-gray-700 leading-relaxed">
                QCFinance.ca est en constante amélioration. Vos commentaires sont essentiels pour nous 
                aider à créer les meilleurs outils possibles pour les Québécois.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">Vous avez trouvé un bug?</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Si vous remarquez une erreur de calcul, un problème d'affichage ou tout autre 
                    dysfonctionnement, merci de nous le signaler. Incluez si possible les données 
                    utilisées et le résultat obtenu.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">Une idée de nouveau calculateur?</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Vous aimeriez voir un outil spécifique ajouté au site? Partagez votre suggestion! 
                    Nous priorisons les calculateurs qui répondent aux besoins réels des Québécois.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Nous Contacter
                </Link>
                <Link 
                  href="/faq" 
                  className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors border-2 border-gray-300 text-center"
                >
                  Consulter la FAQ
                </Link>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

