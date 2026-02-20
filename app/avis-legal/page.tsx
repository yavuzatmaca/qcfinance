import { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Scale, FileText, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: "Avis de Non-Responsabilité | QCFinance.ca",
  description: "Avertissements légaux et limitations de responsabilité concernant l'utilisation des calculateurs financiers de QCFinance.ca.",
}

export default function AvisLegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Avis de Non-Responsabilité</h1>
              <p className="text-lg text-gray-600 mt-2">Avertissements légaux importants</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          
          {/* Critical Warning */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">⚠️ Avertissement Critique</h2>
                <div className="space-y-2 text-gray-800">
                  <p className="font-semibold">
                    Les informations et calculs fournis par QCFinance.ca sont à titre informatif et éducatif UNIQUEMENT.
                  </p>
                  <p>
                    <strong>Ils ne constituent en aucun cas :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Des conseils financiers personnalisés</li>
                    <li>Des conseils fiscaux ou comptables</li>
                    <li>Des conseils juridiques</li>
                    <li>Des recommandations d'investissement</li>
                    <li>Une offre de produits ou services financiers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Nature des Calculateurs</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                QCFinance.ca met à disposition des <strong>outils de calcul automatisés</strong> basés sur des 
                formules mathématiques et des taux officiels publiés par les autorités gouvernementales.
              </p>
              <p>
                Ces calculateurs fournissent des <strong>estimations générales</strong> qui peuvent ne pas refléter 
                avec exactitude votre situation personnelle spécifique.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-2">Les résultats dépendent de :</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>L'exactitude des informations que vous entrez</li>
                  <li>Les hypothèses et paramètres utilisés par le calculateur</li>
                  <li>Les simplifications nécessaires pour rendre les calculs accessibles</li>
                  <li>Les limitations inhérentes à tout outil automatisé</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Limitations et Exclusions</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Exactitude des Calculs</h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Bien que nous nous efforcions de maintenir l'exactitude de nos calculateurs :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité des résultats</li>
                    <li>Les taux, règles fiscales et paramètres peuvent changer sans préavis</li>
                    <li>Des erreurs de calcul ou de programmation peuvent survenir</li>
                    <li>Certains crédits d'impôt, déductions ou situations particulières peuvent ne pas être pris en compte</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Situations Personnelles Complexes</h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Nos calculateurs ne peuvent pas tenir compte de toutes les situations personnelles, notamment :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Revenus multiples ou sources de revenus complexes</li>
                    <li>Situations familiales particulières (garde partagée, pension alimentaire, etc.)</li>
                    <li>Crédits d'impôt spécialisés ou déductions spécifiques</li>
                    <li>Investissements complexes ou revenus de placements</li>
                    <li>Situations d'immigration ou de résidence partielle</li>
                    <li>Entreprises, sociétés ou structures corporatives</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Changements Législatifs</h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700">
                    Les lois fiscales et financières changent régulièrement. Les budgets fédéraux et provinciaux 
                    peuvent modifier les taux d'imposition, les crédits disponibles et les règles de calcul. 
                    Nos calculateurs peuvent ne pas refléter immédiatement ces changements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Limitation de Responsabilité</h2>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <p className="text-gray-800 font-semibold mb-4">
                Dans toute la mesure permise par la loi applicable :
              </p>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>QCFinance.ca, ses propriétaires, administrateurs, employés, partenaires et fournisseurs 
                  ne peuvent être tenus responsables de :</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Toute perte financière résultant de l'utilisation de nos calculateurs</li>
                  <li>Décisions prises sur la base des résultats fournis</li>
                  <li>Erreurs, inexactitudes ou omissions dans les calculs</li>
                  <li>Dommages directs, indirects, accessoires ou consécutifs</li>
                  <li>Perte de revenus, profits ou opportunités</li>
                  <li>Pénalités fiscales ou intérêts résultant de calculs inexacts</li>
                  <li>Interruption de service ou indisponibilité des outils</li>
                </ul>
                <p className="font-semibold mt-4">
                  L'utilisation de QCFinance.ca se fait entièrement à vos propres risques.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommandations Importantes</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  À FAIRE
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Utilisez nos outils pour obtenir des estimations préliminaires</li>
                  <li>✓ Consultez un professionnel pour des décisions importantes</li>
                  <li>✓ Vérifiez les résultats avec plusieurs sources</li>
                  <li>✓ Tenez compte de votre situation personnelle complète</li>
                  <li>✓ Mettez à jour vos calculs si votre situation change</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✗</span>
                  À ÉVITER
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✗ Ne prenez pas de décisions financières majeures uniquement sur nos résultats</li>
                  <li>✗ Ne considérez pas nos calculs comme des conseils professionnels</li>
                  <li>✗ Ne vous fiez pas uniquement à nos estimations pour votre déclaration d'impôt</li>
                  <li>✗ N'ignorez pas les conseils de professionnels qualifiés</li>
                  <li>✗ Ne présumez pas que les résultats sont exacts à 100%</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quand Consulter un Professionnel?</h2>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4 font-semibold">
                Vous devriez consulter un professionnel qualifié dans les situations suivantes :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comptable ou Fiscaliste :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Déclaration d'impôt complexe</li>
                    <li>Planification fiscale</li>
                    <li>Travailleur autonome</li>
                    <li>Revenus de location ou d'investissement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Planificateur Financier :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Planification de retraite</li>
                    <li>Stratégie d'investissement</li>
                    <li>Gestion de patrimoine</li>
                    <li>Assurances et protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Conseiller Hypothécaire :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Achat immobilier</li>
                    <li>Refinancement</li>
                    <li>Capacité d'emprunt réelle</li>
                    <li>Meilleurs taux disponibles</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Avocat :</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    <li>Questions juridiques</li>
                    <li>Contrats financiers</li>
                    <li>Succession et testament</li>
                    <li>Litiges financiers</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptation des Conditions</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                En utilisant QCFinance.ca, vous reconnaissez avoir lu, compris et accepté le présent avis de 
                non-responsabilité ainsi que nos{' '}
                <Link href="/conditions" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Conditions d'Utilisation
                </Link>
                {' '}et notre{' '}
                <Link href="/confidentialite" className="text-blue-600 hover:text-blue-700 underline font-medium">
                  Politique de Confidentialité
                </Link>.
              </p>
              <p className="text-gray-700 mt-4">
                Si vous n'acceptez pas ces conditions, veuillez cesser immédiatement d'utiliser le site.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Des Questions?</h2>
            <p className="mb-6 text-blue-50">
              Si vous avez des questions concernant cet avis de non-responsabilité, n'hésitez pas à nous contacter.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Nous Contacter
            </Link>
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
