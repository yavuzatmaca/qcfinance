import Link from 'next/link';
import { Calculator, Home, ArrowRight, TrendingUp, DollarSign, PiggyBank, CreditCard, Baby, Car } from 'lucide-react';

interface ToolCrossLinkProps {
  variant: 
    | 'to-mortgage' 
    | 'to-salary' 
    | 'to-affordability'
    | 'to-debt'
    | 'to-retirement'
    | 'to-daycare'
    | 'to-auto-loan'
    | 'mortgage-to-affordability'
    | 'debt-to-salary'
    | 'to-compound-interest'
    | 'to-student-loan'
    | 'to-transfer-tax'
    | 'to-ev-savings';
}

export function ToolCrossLink({ variant }: ToolCrossLinkProps) {
  const configs = {
    'to-mortgage': {
      icon: Home,
      title: "Combien pouvez-vous emprunter ?",
      text: "Maintenant que vous connaissez votre salaire net, découvrez votre capacité d'emprunt pour une maison.",
      button: "Calculer mon hypothèque",
      href: "/calcul-hypotheque",
      color: "bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border-indigo-200"
    },
    'to-salary': {
      icon: Calculator,
      title: "Validez votre budget mensuel",
      text: "Avant d'acheter, assurez-vous de connaître votre salaire net réel après tous les impôts.",
      button: "Calculer mon salaire net",
      href: "/salaire-net-quebec",
      color: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border-emerald-200"
    },
    'to-affordability': {
      icon: TrendingUp,
      title: "Quelle maison pouvez-vous vous permettre ?",
      text: "Découvrez le prix maximum que vous pouvez payer selon votre revenu et vos dettes.",
      button: "Calculer ma capacité",
      href: "/capacite-emprunt",
      color: "bg-purple-50 text-purple-900 hover:bg-purple-100 border-purple-200"
    },
    'to-debt': {
      icon: CreditCard,
      title: "Éliminez vos dettes plus rapidement",
      text: "Créez un plan de remboursement stratégique et voyez combien vous économiserez en intérêts.",
      button: "Planifier mes remboursements",
      href: "/dettes-credit",
      color: "bg-red-50 text-red-900 hover:bg-red-100 border-red-200"
    },
    'to-retirement': {
      icon: PiggyBank,
      title: "Planifiez votre retraite dès maintenant",
      text: "Découvrez combien épargner chaque mois pour atteindre vos objectifs de retraite.",
      button: "Calculer mon épargne retraite",
      href: "/epargne-retraite",
      color: "bg-amber-50 text-amber-900 hover:bg-amber-100 border-amber-200"
    },
    'to-daycare': {
      icon: Baby,
      title: "Calculez vos frais de garde nets",
      text: "Découvrez le coût réel après crédits d'impôt et subventions gouvernementales.",
      button: "Calculer mes frais de garde",
      href: "/frais-de-garde",
      color: "bg-pink-50 text-pink-900 hover:bg-pink-100 border-pink-200"
    },
    'to-auto-loan': {
      icon: Car,
      title: "Financez votre prochain véhicule",
      text: "Calculez vos paiements mensuels et comparez les options de financement automobile.",
      button: "Calculer mon prêt auto",
      href: "/pret-auto",
      color: "bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-200"
    },
    'mortgage-to-affordability': {
      icon: TrendingUp,
      title: "Combien pouvez-vous vraiment emprunter ?",
      text: "Utilisez notre calculateur de capacité d'emprunt pour connaître le montant maximal selon votre situation.",
      button: "Calculer ma capacité",
      href: "/capacite-emprunt",
      color: "bg-purple-50 text-purple-900 hover:bg-purple-100 border-purple-200"
    },
    'debt-to-salary': {
      icon: Calculator,
      title: "Connaissez votre revenu disponible",
      text: "Calculez votre salaire net pour mieux planifier vos remboursements de dettes.",
      button: "Calculer mon salaire net",
      href: "/salaire-net-quebec",
      color: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border-emerald-200"
    },
    'to-compound-interest': {
      icon: TrendingUp,
      title: "Voyez la magie des intérêts composés",
      text: "Découvrez comment vos investissements peuvent croître exponentiellement avec le temps.",
      button: "Calculer mes intérêts",
      href: "/interets-composes",
      color: "bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-200"
    },
    'to-student-loan': {
      icon: CreditCard,
      title: "Planifiez votre prêt étudiant",
      text: "Calculez vos paiements mensuels et découvrez quand vous serez libre de dettes.",
      button: "Calculer mon prêt étudiant",
      href: "/pret-etudiant",
      color: "bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border-indigo-200"
    },
    'to-transfer-tax': {
      icon: Home,
      title: "Calculez votre taxe de bienvenue",
      text: "Découvrez combien vous devrez payer en droits de mutation lors de votre achat.",
      button: "Calculer ma taxe",
      href: "/taxe-de-bienvenue",
      color: "bg-orange-50 text-orange-900 hover:bg-orange-100 border-orange-200"
    },
    'to-ev-savings': {
      icon: Car,
      title: "Électrique vs Essence : Faites le calcul",
      text: "Comparez les coûts réels sur 5 ans et découvrez si l'électrique est rentable pour vous.",
      button: "Comparer les options",
      href: "/auto-electrique-vs-essence",
      color: "bg-green-50 text-green-900 hover:bg-green-100 border-green-200"
    }
  };

  const content = configs[variant];
  const Icon = content.icon;

  return (
    <div className={`mt-12 p-8 rounded-3xl border ${content.color} transition-all`}>
      <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="p-4 bg-white rounded-2xl shadow-sm shrink-0">
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{content.title}</h3>
          <p className="text-sm opacity-80 mb-4 sm:mb-0">{content.text}</p>
        </div>
        <Link 
          href={content.href}
          className="px-6 py-3 bg-white font-bold rounded-xl shadow-sm hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
        >
          {content.button} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
