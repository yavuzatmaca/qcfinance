import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Termes et Conditions d'Utilisation - QCFinance.ca",
  description: "Conditions d'utilisation du site QCFinance.ca et de ses outils de calcul financier.",
}

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Termes et Conditions d'Utilisation</h1>
          <p className="text-lg text-gray-600">QCFinance.ca</p>
          <p className="text-sm text-gray-500 mt-2">Dernière mise à jour : Janvier 2026</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              Les présents Termes et conditions (« Conditions ») régissent l'accès et l'utilisation du site web QCFinance.ca 
              (le « Site »), exploité depuis le Québec, Canada.
            </p>
            <p className="text-gray-800 mt-4 font-semibold">
              En accédant au Site ou en l'utilisant, vous acceptez d'être lié par les présentes Conditions.
              Si vous n'acceptez pas ces Conditions, vous devez cesser immédiatement d'utiliser le Site.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
              1. Nature du site et absence de conseils professionnels
            </h2>
            <p className="text-gray-700 mb-4">
              QCFinance.ca met à disposition des outils de calcul financier à titre informatif et éducatif uniquement.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-lg mb-4">
              <p className="text-gray-800 font-semibold mb-3 flex items-start">
                <span className="text-2xl mr-2">⚠️</span>
                <span>Aucun contenu du Site ne constitue :</span>
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-8">
                <li>un conseil financier,</li>
                <li>un conseil fiscal,</li>
                <li>un conseil juridique,</li>
                <li>une recommandation d'investissement,</li>
                <li>une offre de produits ou services financiers.</li>
              </ul>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>Les résultats fournis par les calculateurs sont des estimations et peuvent contenir des écarts par rapport à la réalité.</p>
              <p className="font-semibold">Vous êtes seul responsable de l'utilisation que vous faites des informations et résultats affichés.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">2. Admissibilité</h2>
            <p className="text-gray-700 mb-3">Le Site est destiné aux personnes :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>âgées d'au moins 18 ans, ou</li>
              <li>disposant de la capacité juridique requise selon les lois applicables.</li>
            </ul>
            <p className="text-gray-700 mt-4 font-medium">
              L'utilisation du Site est interdite dans toute juridiction où son contenu serait illégal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">3. Utilisation permise</h2>
            <p className="text-gray-700 mb-3">Vous vous engagez à utiliser QCFinance.ca :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>de manière légale et conforme aux lois applicables,</li>
              <li>sans nuire au fonctionnement du Site,</li>
              <li>sans tenter d'accéder aux systèmes, serveurs ou données de façon non autorisée.</li>
            </ul>
            
            <div className="mt-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="text-gray-800 font-semibold mb-3">Il est strictement interdit :</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>d'utiliser le Site à des fins frauduleuses ou abusives,</li>
                <li>de copier, modifier ou redistribuer le contenu sans autorisation,</li>
                <li>d'introduire des virus, scripts ou logiciels malveillants.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">4. Propriété intellectuelle</h2>
            <p className="text-gray-700 mb-3">Tous les éléments du Site, incluant notamment :</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>textes,</li>
              <li>calculateurs,</li>
              <li>algorithmes,</li>
              <li>graphiques,</li>
              <li>logos,</li>
              <li>structure et présentation,</li>
            </ul>
            <p className="text-gray-700 mt-4">
              sont protégés par les lois sur la propriété intellectuelle et demeurent la propriété exclusive de QCFinance.ca 
              ou de ses concédants.
            </p>
            <p className="text-gray-700 mt-3 font-semibold">
              Toute reproduction, totale ou partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">5. Exactitude des informations</h2>
            <p className="text-gray-700 mb-3">Bien que nous fassions des efforts raisonnables pour assurer l'exactitude des informations :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>QCFinance.ca ne garantit pas l'exactitude, l'exhaustivité ou l'actualité des contenus,</li>
              <li>les taux, règles fiscales et paramètres financiers peuvent changer sans préavis.</li>
            </ul>
            <p className="text-gray-700 mt-3">Le Site peut contenir des erreurs ou des omissions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">6. Limitation de responsabilité</h2>
            <p className="text-gray-700 mb-4">Dans toute la mesure permise par la loi :</p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-5 rounded-r-lg">
              <p className="text-gray-800 font-semibold mb-3">
                QCFinance.ca, ses administrateurs, partenaires et fournisseurs ne peuvent être tenus responsables de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>pertes financières,</li>
                <li>décisions prises sur la base des calculs,</li>
                <li>dommages directs ou indirects,</li>
                <li>perte de données,</li>
                <li>interruption de service.</li>
              </ul>
              <p className="text-gray-800 font-semibold mt-4">L'utilisation du Site se fait à vos propres risques.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">7. Disponibilité du site</h2>
            <p className="text-gray-700 mb-3">QCFinance.ca ne garantit pas :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>l'accès continu ou ininterrompu au Site,</li>
              <li>l'absence d'erreurs techniques,</li>
              <li>la compatibilité avec tous les appareils ou navigateurs.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nous nous réservons le droit de suspendre, modifier ou retirer le Site à tout moment, sans préavis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">8. Liens vers des sites tiers</h2>
            <p className="text-gray-700 mb-3">Le Site peut contenir des liens vers des sites externes.</p>
            <p className="text-gray-700 mb-2">QCFinance.ca :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>n'exerce aucun contrôle sur ces sites,</li>
              <li>n'est pas responsable de leur contenu, politiques ou pratiques.</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">L'accès à ces sites se fait à vos propres risques.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
              9. Protection des renseignements personnels
            </h2>
            <p className="text-gray-700">
              La collecte et l'utilisation des renseignements personnels sont régies par notre{' '}
              <Link href="/confidentialite" className="text-blue-600 hover:text-blue-700 underline font-medium">
                Politique de confidentialité
              </Link>
              , laquelle fait partie intégrante des présentes Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">10. Modifications des conditions</h2>
            <p className="text-gray-700 mb-2">
              QCFinance.ca se réserve le droit de modifier les présentes Conditions en tout temps.
              Les modifications prennent effet dès leur publication sur le Site.
            </p>
            <p className="text-gray-700 mt-3 font-medium">Il vous incombe de consulter régulièrement cette page.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">11. Droit applicable et juridiction</h2>
            <p className="text-gray-700 mb-3">Les présentes Conditions sont régies et interprétées conformément :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>aux lois de la province de Québec,</li>
              <li>aux lois fédérales du Canada applicables.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Tout litige sera soumis aux tribunaux compétents du district judiciaire du Québec.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">12. Contact</h2>
            <p className="text-gray-700 mb-4">Pour toute question concernant les présentes Conditions :</p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong>Courriel :</strong>{' '}
                <a href="mailto:contact@qcfinance.ca" className="text-blue-600 hover:text-blue-700 underline">
                  contact@qcfinance.ca
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Objet :</strong> Termes et conditions
              </p>
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
