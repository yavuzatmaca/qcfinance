import Link from 'next/link';
import { ArrowRight, TrendingUp, Home, Wallet, Car, GraduationCap, PiggyBank, TrendingDown } from 'lucide-react';

type CardVariant = 'tax' | 'mortgage' | 'general' | 'auto' | 'education' | 'investment' | 'savings' | 'debt';

interface AffiliateCardProps {
  variant?: CardVariant;
}

export function AffiliateCard({ variant = 'general' }: AffiliateCardProps) {
  // CONFIGURATION DICTIONARY
  const content = {
    tax: {
      theme: "bg-slate-900 ring-yellow-400/20",
      icon: TrendingUp,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
      badge: "Réduisez vos impôts",
      title: "Payez moins d'impôt l'an prochain",
      text: "Le REER est votre meilleur allié. Ouvrez un compte Wealthsimple et recevez un bonus.",
      buttonColor: "bg-yellow-400 text-slate-900 hover:bg-yellow-300",
      decor: "bg-yellow-400/10"
    },
    mortgage: {
      theme: "bg-indigo-950 ring-indigo-400/20",
      icon: Home,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-400/10",
      badge: "Acheter sa première maison",
      title: "Mise de fonds (CELIAPP)",
      text: "Utilisez le CELIAPP pour acheter votre maison plus vite (déductible d'impôt !).",
      buttonColor: "bg-indigo-500 text-white hover:bg-indigo-400",
      decor: "bg-indigo-500/10"
    },
    auto: {
      theme: "bg-slate-900 ring-blue-400/20",
      icon: Car,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
      badge: "Financement Auto",
      title: "Économisez sur votre prêt auto",
      text: "Investissez la différence entre votre budget et votre paiement. Faites fructifier votre argent au lieu de payer plus d'intérêts.",
      buttonColor: "bg-blue-500 text-white hover:bg-blue-400",
      decor: "bg-blue-500/10"
    },
    education: {
      theme: "bg-purple-950 ring-purple-400/20",
      icon: GraduationCap,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-400/10",
      badge: "Avenir de vos enfants",
      title: "REEE : Subventions gouvernementales gratuites",
      text: "Obtenez jusqu'à 30% en subventions (SCEE + IQEE). Investissez pour l'éducation de vos enfants avec Wealthsimple.",
      buttonColor: "bg-purple-500 text-white hover:bg-purple-400",
      decor: "bg-purple-500/10"
    },
    investment: {
      theme: "bg-teal-950 ring-teal-400/20",
      icon: TrendingUp,
      iconColor: "text-teal-400",
      iconBg: "bg-teal-400/10",
      badge: "Investissement intelligent",
      title: "Faites travailler votre argent",
      text: "Investissez automatiquement avec Wealthsimple. Portefeuilles diversifiés, frais réduits, et croissance à l'abri de l'impôt dans un CELI.",
      buttonColor: "bg-teal-500 text-white hover:bg-teal-400",
      decor: "bg-teal-500/10"
    },
    savings: {
      theme: "bg-green-950 ring-green-400/20",
      icon: PiggyBank,
      iconColor: "text-green-400",
      iconBg: "bg-green-400/10",
      badge: "Maximisez vos économies",
      title: "Investissez vos économies",
      text: "Transformez vos économies en richesse. Investissez automatiquement dans un CELI avec Wealthsimple et obtenez un bonus.",
      buttonColor: "bg-green-500 text-white hover:bg-green-400",
      decor: "bg-green-500/10"
    },
    debt: {
      theme: "bg-red-950 ring-red-400/20",
      icon: TrendingDown,
      iconColor: "text-red-400",
      iconBg: "bg-red-400/10",
      badge: "Sortez de l'endettement",
      title: "Remboursez vos dettes plus vite",
      text: "Une fois vos dettes remboursées, investissez ce que vous payiez en intérêts. Commencez petit avec Wealthsimple.",
      buttonColor: "bg-red-500 text-white hover:bg-red-400",
      decor: "bg-red-500/10"
    },
    general: {
      theme: "bg-emerald-950 ring-emerald-400/20",
      icon: Wallet,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
      badge: "Offre Exclusive",
      title: "Faites fructifier votre argent",
      text: "Obtenez un taux d'intérêt élevé sur votre encaisse avec Wealthsimple Cash.",
      buttonColor: "bg-emerald-500 text-white hover:bg-emerald-400",
      decor: "bg-emerald-500/10"
    }
  };

  const activeContent = content[variant];
  const Icon = activeContent.icon;
  const referralLink = "https://www.wealthsimple.com/invite/JMOTCV";

  return (
    <div className={`mt-8 overflow-hidden rounded-2xl shadow-xl ring-1 relative group ${activeContent.theme}`}>
      {/* Dynamic Background Decoration */}
      <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full blur-2xl transition-all ${activeContent.decor}`}></div>
      
      <div className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold shadow-lg ${activeContent.iconBg} ${activeContent.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${activeContent.iconColor}`}>
            {activeContent.badge}
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white mb-2">
          {activeContent.title}
        </h2>
        
        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
          {activeContent.text}
        </p>

        <Link
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full rounded-xl px-6 py-3 text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${activeContent.buttonColor}`}
        >
          Voir l'offre <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-gray-400">
            * En cliquant, vous soutenez QCFinance.ca (Lien affilié).
          </p>
        </div>
      </div>
    </div>
  );
}
