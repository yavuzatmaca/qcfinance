import { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: "FAQ - Questions Fréquentes | QCFinance.ca",
  description: "Trouvez des réponses aux questions fréquemment posées sur nos calculateurs financiers et outils pour le Québec.",
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Général",
      questions: [
        {
          q: "Qu'est-ce que QCFinance.ca?",
          a: "QCFinance.ca est une plateforme gratuite d'outils de calcul financier spécialement conçue pour les résidents du Québec. Nous offrons des calculateurs précis pour l'impôt, les prêts, l'épargne et bien plus encore."
        },
        {
          q: "Les outils sont-ils vraiment gratuits?",
          a: "Oui, absolument! Tous nos calculateurs sont 100% gratuits, sans frais cachés, sans inscription obligatoire et sans limite d'utilisation."
        },
        {
          q: "Dois-je créer un compte pour utiliser les calculateurs?",
          a: "Non. Aucune inscription n'est requise. Vous pouvez utiliser tous nos outils immédiatement, de manière anonyme."
        }
      ]
    },
    {
      category: "Confidentialité et Sécurité",
      questions: [
        {
          q: "Mes données financières sont-elles sécurisées?",
          a: "Absolument. Tous les calculs sont effectués localement dans votre navigateur. Aucune donnée financière n'est transmise à nos serveurs ou stockée quelque part. Vos informations restent 100% privées."
        },
        {
          q: "Conservez-vous mes informations personnelles?",
          a: "Non. Nous ne collectons, ne stockons et ne partageons aucune donnée financière personnelle. Consultez notre Politique de confidentialité pour plus de détails."
        },
        {
          q: "Puis-je utiliser les calculateurs en mode privé/incognito?",
          a: "Oui, nos calculateurs fonctionnent parfaitement en mode navigation privée."
        }
      ]
    },
    {
      category: "Précision des Calculs",
      questions: [
        {
          q: "Les calculs sont-ils précis?",
          a: "Nous utilisons les taux officiels 2026 de Revenu Québec et de l'Agence du revenu du Canada (ARC). Cependant, les résultats sont des estimations qui peuvent varier selon votre situation personnelle spécifique."
        },
        {
          q: "Les taux d'imposition sont-ils à jour?",
          a: "Oui, nos calculateurs utilisent les taux d'imposition provinciaux et fédéraux en vigueur pour l'année 2026. Nous mettons à jour nos algorithmes régulièrement."
        },
        {
          q: "Pourquoi mes résultats diffèrent-ils de ma déclaration d'impôt réelle?",
          a: "Nos calculateurs fournissent des estimations basées sur les informations que vous entrez. Votre situation fiscale réelle peut inclure des crédits, déductions ou circonstances particulières non pris en compte par le calculateur. Consultez un comptable pour une évaluation précise."
        },
        {
          q: "Puis-je me fier aux résultats pour prendre des décisions financières?",
          a: "Nos outils sont conçus pour vous donner une bonne estimation et vous aider à planifier. Cependant, pour des décisions financières importantes, nous recommandons de consulter un professionnel qualifié (comptable, planificateur financier, etc.)."
        }
      ]
    },
    {
      category: "Calculateur d'Impôt",
      questions: [
        {
          q: "Le calculateur d'impôt inclut-il les crédits d'impôt?",
          a: "Notre calculateur de base calcule l'impôt sur le revenu provincial et fédéral. Certains crédits d'impôt courants sont inclus, mais pas tous. Pour une analyse complète incluant tous vos crédits spécifiques, consultez un comptable."
        },
        {
          q: "Comment calculer mon salaire net à partir de mon salaire brut?",
          a: "Utilisez notre Calculateur d'Impôt en entrant votre salaire brut annuel. Le calculateur déduira automatiquement les impôts provinciaux, fédéraux, les cotisations RRQ, RQAP et assurance-emploi pour vous donner votre salaire net."
        },
        {
          q: "Le calculateur fonctionne-t-il pour les travailleurs autonomes?",
          a: "Oui, mais gardez en tête que les travailleurs autonomes ont des obligations fiscales différentes (cotisations RRQ doublées, pas d'assurance-emploi, etc.). Le calculateur vous donnera une estimation de base."
        }
      ]
    },
    {
      category: "Calculateur Hypothécaire",
      questions: [
        {
          q: "Comment fonctionne le calculateur hypothécaire?",
          a: "Entrez le prix de la propriété, votre mise de fonds, le taux d'intérêt et la période d'amortissement. Le calculateur vous montrera vos paiements mensuels, le coût total des intérêts et un tableau d'amortissement détaillé."
        },
        {
          q: "Le calculateur inclut-il la SCHL?",
          a: "Oui, si votre mise de fonds est inférieure à 20%, le calculateur ajoute automatiquement les frais d'assurance SCHL au montant de votre prêt."
        },
        {
          q: "Puis-je calculer ma capacité d'emprunt?",
          a: "Oui! Utilisez notre Calculateur de Capacité d'Emprunt en entrant votre revenu annuel et vos dettes mensuelles. L'outil calculera le montant maximum que vous pouvez emprunter selon les règles bancaires."
        }
      ]
    },
    {
      category: "Autres Calculateurs",
      questions: [
        {
          q: "Avez-vous un calculateur pour les allocations familiales?",
          a: "Oui! Notre calculateur d'allocations familiales estime le montant que vous pourriez recevoir du gouvernement fédéral et du Québec selon votre revenu familial et le nombre d'enfants."
        },
        {
          q: "Comment calculer si je devrais louer ou acheter?",
          a: "Utilisez notre calculateur Louer ou Acheter. Entrez le prix d'achat, le loyer mensuel, vos économies et d'autres paramètres. L'outil comparera les deux scénarios sur plusieurs années."
        },
        {
          q: "Puis-je calculer mes paiements de prêt auto?",
          a: "Oui, notre Calculateur de Prêt Auto vous permet d'entrer le prix du véhicule, le taux d'intérêt et la durée du prêt pour voir vos paiements mensuels et le coût total."
        }
      ]
    },
    {
      category: "Problèmes Techniques",
      questions: [
        {
          q: "Le calculateur ne fonctionne pas, que faire?",
          a: "Essayez de rafraîchir la page (F5) ou de vider le cache de votre navigateur. Si le problème persiste, contactez-nous avec les détails du problème."
        },
        {
          q: "Le site est-il compatible avec les appareils mobiles?",
          a: "Oui, tous nos calculateurs sont optimisés pour fonctionner sur ordinateurs, tablettes et téléphones mobiles."
        },
        {
          q: "Puis-je imprimer ou sauvegarder mes résultats?",
          a: "Oui, vous pouvez utiliser la fonction d'impression de votre navigateur (Ctrl+P ou Cmd+P) pour sauvegarder vos résultats en PDF."
        }
      ]
    },
    {
      category: "Contact et Support",
      questions: [
        {
          q: "Comment puis-je vous contacter?",
          a: "Vous pouvez nous contacter via notre page Contact ou par courriel à contact@qcfinance.ca. Nous répondons généralement sous 24-48 heures."
        },
        {
          q: "Puis-je suggérer un nouveau calculateur?",
          a: "Absolument! Nous sommes toujours à l'écoute de vos suggestions. Contactez-nous avec vos idées et nous ferons de notre mieux pour les implémenter."
        },
        {
          q: "Offrez-vous des conseils financiers personnalisés?",
          a: "Non, QCFinance.ca fournit uniquement des outils de calcul. Nous ne sommes pas des conseillers financiers. Pour des conseils personnalisés, consultez un professionnel qualifié."
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
            ← Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Questions Fréquentes</h1>
              <p className="text-lg text-gray-600 mt-2">Trouvez rapidement des réponses à vos questions</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, qIdx) => (
                  <details key={qIdx} className="group">
                    <summary className="flex items-start justify-between cursor-pointer list-none">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-open:text-blue-600 transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4 mt-1" />
                    </summary>
                    <div className="mt-4 pl-4 border-l-4 border-blue-200">
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse?</h2>
            <p className="mb-6 text-blue-50">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter!
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Nous Contacter
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
