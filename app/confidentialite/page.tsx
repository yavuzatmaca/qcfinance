import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Politique de Confidentialité - QCFinance.ca",
  description: "Notre engagement envers la protection de vos renseignements personnels conformément à la Loi 25 du Québec.",
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
          <p className="text-lg text-gray-600">QCFinance.ca</p>
          <p className="text-sm text-gray-500 mt-2">Dernière mise à jour : Janvier 2026</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              QCFinance.ca (« QCFinance », « nous », « notre ») accorde une importance primordiale à la protection des renseignements personnels. 
              La présente Politique de confidentialité décrit la manière dont nous recueillons, utilisons, conservons, communiquons et protégeons 
              les renseignements personnels, conformément à la <strong>Loi sur la protection des renseignements personnels dans le secteur privé (Québec)</strong>, 
              telle que modifiée par la <strong>Loi 25</strong>.
            </p>
            <p className="text-gray-800 mt-4">
              En accédant au site QCFinance.ca, vous reconnaissez avoir pris connaissance de la présente politique et en accepter les conditions.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">1. Champ d'application</h2>
            <p className="text-gray-700 mb-3">La présente politique s'applique à :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Tous les utilisateurs et visiteurs du site QCFinance.ca</li>
              <li>Tous les renseignements personnels recueillis par l'entremise du site</li>
              <li>Toute activité de traitement effectuée au Québec ou concernant des résidents du Québec</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">QCFinance.ca est exploité depuis le Québec, Canada.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">2. Définition des renseignements personnels</h2>
            <p className="text-gray-700">
              Un renseignement personnel est tout renseignement concernant une personne physique et permettant de l'identifier, 
              directement ou indirectement, conformément à la législation québécoise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">3. Renseignements personnels recueillis</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Renseignements fournis volontairement</h3>
                <p className="text-gray-700 mb-2">Nous pouvons recueillir :</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Nom (si fourni)</li>
                  <li>Adresse courriel (si fournie)</li>
                  <li>Contenu des messages transmis via un formulaire de contact</li>
                  <li>Préférences d'utilisation (le cas échéant)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Renseignements recueillis automatiquement</h3>
                <p className="text-gray-700 mb-2">Lors de la navigation sur le site, nous pouvons recueillir :</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Adresse IP</li>
                  <li>Type d'appareil et de navigateur</li>
                  <li>Système d'exploitation</li>
                  <li>Date, heure et durée de la visite</li>
                  <li>Pages consultées et interactions avec les calculateurs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Données saisies dans les calculateurs financiers</h3>
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r">
                  <p className="text-gray-700 mb-2">
                    Les données financières saisies (revenus, taux d'intérêt, montants, etc.) sont traitées à des fins de calcul uniquement.
                  </p>
                  <p className="text-gray-700 font-semibold">
                    ✓ Aucune donnée financière identifiable n'est conservée, sauf indication contraire explicite.
                  </p>
                  <p className="text-gray-700">
                    QCFinance.ca ne constitue pas une base de données financières personnelles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">4. Finalités de la collecte</h2>
            <p className="text-gray-700 mb-3">Les renseignements personnels sont recueillis uniquement pour :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Fournir et exploiter les outils de calcul financier</li>
              <li>Répondre aux demandes et communications</li>
              <li>Assurer la sécurité du site et prévenir les abus</li>
              <li>Améliorer les fonctionnalités et l'expérience utilisateur</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              Aucune utilisation secondaire incompatible avec ces finalités n'est autorisée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">5. Consentement</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Consentement général</h3>
                <p className="text-gray-700">
                  L'utilisation de QCFinance.ca constitue un consentement à la collecte et à l'utilisation des renseignements personnels 
                  conformément à la présente politique.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Consentement exprès</h3>
                <p className="text-gray-700 mb-2">Un consentement exprès est requis lorsque la loi l'exige, notamment pour :</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Les témoins (cookies) non essentiels</li>
                  <li>Toute fonctionnalité optionnelle impliquant la collecte de renseignements</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Le consentement peut être retiré en tout temps, sous réserve des obligations légales applicables.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">6. Témoins (cookies)</h2>
            <p className="text-gray-700 mb-3">QCFinance.ca utilise :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Des témoins essentiels nécessaires au fonctionnement du site</li>
              <li>Des témoins analytiques (le cas échéant) pour améliorer le site</li>
            </ul>
            <p className="text-gray-700 mt-4 mb-2">Les témoins :</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Ne recueillent pas de renseignements sensibles</li>
              <li>Peuvent être désactivés via les paramètres du navigateur</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Un mécanisme de gestion du consentement est mis en place lorsque requis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">7. Fournisseurs de services tiers</h2>
            <p className="text-gray-700 mb-3">Nous pouvons faire appel à des fournisseurs pour :</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>L'hébergement du site</li>
              <li>Les services analytiques</li>
              <li>La sécurité informatique</li>
            </ul>
            <p className="text-gray-700 mt-4 mb-2">Tous les fournisseurs :</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Sont liés par des ententes de confidentialité</li>
              <li>N'utilisent les renseignements qu'aux fins prévues</li>
              <li>Offrent un niveau de protection équivalent à celui exigé par les lois du Québec</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">8. Communication hors Québec</h2>
            <p className="text-gray-700 mb-3">Lorsque des renseignements personnels sont communiqués à l'extérieur du Québec :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Une évaluation des facteurs relatifs à la vie privée (EFVP) est effectuée</li>
              <li>Des mesures contractuelles et techniques adéquates sont mises en place</li>
              <li>La communication respecte les exigences de la Loi 25</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">9. Mesures de sécurité</h2>
            <p className="text-gray-700 mb-3">
              QCFinance.ca applique des mesures de sécurité administratives, techniques et physiques raisonnables afin de protéger 
              les renseignements personnels contre :
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>L'accès non autorisé</li>
              <li>La perte</li>
              <li>Le vol</li>
              <li>La divulgation ou l'utilisation illicite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">10. Conservation des renseignements</h2>
            <p className="text-gray-700 mb-3">Les renseignements personnels sont conservés :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Uniquement pour la durée nécessaire aux fins prévues</li>
              <li>Conformément aux obligations légales applicables</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Une fois la finalité atteinte, les renseignements sont détruits ou anonymisés de façon sécuritaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">11. Droits des personnes concernées</h2>
            <p className="text-gray-700 mb-3">Conformément à la loi, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Droit d'accès à vos renseignements personnels</li>
              <li>Droit de rectification</li>
              <li>Droit au retrait du consentement</li>
              <li>Droit à la portabilité, lorsque applicable</li>
              <li>Droit de déposer une plainte auprès de la CAI</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">12. Responsable de la protection des renseignements personnels</h2>
            <p className="text-gray-700 mb-4">
              Conformément à la Loi 25, un responsable de la protection des renseignements personnels a été désigné.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong>Courriel :</strong> <a href="mailto:privacy@qcfinance.ca" className="text-blue-600 hover:text-blue-700 underline">privacy@qcfinance.ca</a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Objet :</strong> Protection des renseignements personnels
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">13. Modifications</h2>
            <p className="text-gray-700">
              QCFinance.ca se réserve le droit de modifier la présente politique en tout temps. 
              Toute modification sera publiée sur cette page avec une date de mise à jour.
            </p>
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
