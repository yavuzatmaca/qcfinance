'use client';

import { ExternalLink, TrendingUp, CreditCard, Home, PiggyBank, Sparkles } from 'lucide-react';
import type { SimulatorV2Result } from '@/src/hooks/v2/useSimulatorV2';

interface AffiliateRecommendation {
  id: string;
  title: string;
  description: string;
  cta: string;
  url: string;
  icon: any;
  color: string;
  condition: (result: SimulatorV2Result) => boolean;
}

const affiliateRecommendations: AffiliateRecommendation[] = [
  {
    id: 'wealthsimple',
    title: 'Commencez à Investir avec Wealthsimple',
    description: 'Investissez votre épargne mensuelle et faites croître votre patrimoine automatiquement. Obtenez 25$ de bonus.',
    cta: 'Ouvrir un compte gratuit',
    url: 'https://www.wealthsimple.com/fr-ca?referral=JMOTCV',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    condition: (result) => result.monthlyBreakdown.disposable > 500
  },
  {
    id: 'wealthsimple-save',
    title: 'Compte Épargne à Haut Rendement - Wealthsimple',
    description: 'Gagnez jusqu\'à 4.5% d\'intérêt sur votre épargne. Obtenez 25$ de bonus à l\'ouverture.',
    cta: 'Obtenir 25$ de bonus',
    url: 'https://www.wealthsimple.com/fr-ca?referral=JMOTCV',
    icon: PiggyBank,
    color: 'from-orange-500 to-orange-600',
    condition: (result) => result.monthlyBreakdown.disposable > 200
  },
  {
    id: 'wealthsimple-card',
    title: 'Carte de Crédit Cashback - Wealthsimple',
    description: 'Récupérez 1% sur tous vos achats. Aucuns frais annuels. Obtenez 25$ de bonus.',
    cta: 'Obtenir la carte',
    url: 'https://www.wealthsimple.com/fr-ca?referral=JMOTCV',
    icon: CreditCard,
    color: 'from-blue-500 to-blue-600',
    condition: (result) => result.monthlyBreakdown.totalExpenses > 2000
  },
  {
    id: 'nesto',
    title: 'Prêt Hypothécaire - Nesto',
    description: 'Obtenez les meilleurs taux hypothécaires au Canada. Pré-approbation en 15 minutes.',
    cta: 'Obtenir une pré-approbation',
    url: 'https://www.nesto.ca/fr',
    icon: Home,
    color: 'from-purple-500 to-purple-600',
    condition: (result) => result.monthlyBreakdown.disposable > 1000 && result.combinedTax.netAnnual > 50000
  },
  {
    id: 'questrade',
    title: 'Investissement Auto-Géré - Questrade',
    description: 'Commissions les plus basses au Canada. Parfait pour les investisseurs actifs.',
    cta: 'Ouvrir un compte',
    url: 'https://www.questrade.com/self-directed-investing',
    icon: TrendingUp,
    color: 'from-indigo-500 to-indigo-600',
    condition: (result) => result.monthlyBreakdown.disposable > 1500
  },
  {
    id: 'tangerine',
    title: 'Compte Bancaire Sans Frais - Tangerine',
    description: 'Aucuns frais mensuels, transactions illimitées. Obtenez jusqu\'à 300$ de bonus.',
    cta: 'Ouvrir un compte',
    url: 'https://www.tangerine.ca/fr',
    icon: CreditCard,
    color: 'from-orange-500 to-red-600',
    condition: (result) => true // Always show as fallback
  }
];

export default function AffiliateRecommendationsV2({ result }: { result: SimulatorV2Result }) {
  // Get top 2 recommendations based on conditions
  const recommendations = affiliateRecommendations.filter(rec => rec.condition(result)).slice(0, 2);

  // If we don't have 2, ensure we always show at least 2 by adding fallback
  const finalRecommendations = recommendations.length >= 2 
    ? recommendations 
    : [...recommendations, ...affiliateRecommendations.filter(r => !recommendations.includes(r))].slice(0, 2);

  if (finalRecommendations.length === 0) return null;

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          Recommandations pour Vous
        </h3>
        <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">Partenaires</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {finalRecommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <a
              key={rec.id}
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {rec.title}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{rec.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                    {rec.cta}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
          );
        })}
      </div>
      
      <p className="text-xs text-slate-500 mt-4 text-center">
        Ces recommandations sont basées sur votre profil financier. Liens affiliés - nous pouvons recevoir une commission.
      </p>
    </div>
  );
}
