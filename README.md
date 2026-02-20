# QCFinance.ca 🇨🇦

Calculateurs financiers gratuits spécialisés pour le Québec. Outils précis et à jour pour gérer vos finances personnelles.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Portfolio](https://img.shields.io/badge/Status-Portfolio%20Project-orange)](https://github.com/yavuzatmaca/qcfinance)

> **⚠️ Note:** Ce repository est partagé à des fins de démonstration et portfolio. Le site en production est disponible sur [qcfinance.ca](https://qcfinance.ca)

## 🎯 À propos

QCFinance.ca est une plateforme web offrant 19+ calculateurs financiers gratuits adaptés aux réalités fiscales et économiques du Québec. Tous les calculs utilisent les données officielles 2026 de Revenu Québec et de l'Agence du revenu du Canada.

<img width="681" height="586" alt="image" src="https://github.com/user-attachments/assets/59076476-8a8f-484f-b953-10eab531cac7" />


**Site web:** [https://qcfinance.ca](https://qcfinance.ca)

## 🧮 Calculateurs disponibles

### Impôts et Salaire
- **Salaire Net Québec** - Calcul précis du salaire net après impôts
- **Taux Horaire** - Conversion salaire annuel ↔ taux horaire
- **Déclaration Simplifiée** - Estimation rapide de votre déclaration d'impôts

### Immobilier
- **Calcul Hypothèque** - Paiements mensuels et amortissement
- **Capacité d'Emprunt** - Montant maximal que vous pouvez emprunter
- **Louer ou Acheter** - Comparaison financière détaillée
- **Taxe de Bienvenue** - Calcul du droit de mutation
- **Augmentation Loyer 2026** - Calcul selon les règles du TAL

### Famille
- **Allocations Familiales** - Prestations fédérales et provinciales
- **Frais de Garde** - Coûts et crédits d'impôt

### Épargne et Investissement
- **Épargne Retraite** - Planification REER/CELI
- **Intérêts Composés** - Croissance de vos investissements

### Prêts et Dettes
- **Prêt Auto** - Financement automobile
- **Prêt Étudiant** - Remboursement et intérêts
- **Dettes et Crédit** - Stratégie de remboursement

### Autres Outils
- **Assurance-Emploi** - Calcul des prestations AE
- **Paie de Vacances** - Calcul selon la loi québécoise
- **TPS/TVQ Québec** - Calcul des taxes de vente
- **Auto Électrique vs Essence** - Comparaison des coûts
- **Simulateur Vie Québec** - Budget complet

## 🚀 Technologies

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 3.4
- **Charts:** Chart.js, Recharts
- **Animations:** Framer Motion
- **Analytics:** Google Analytics 4
- **Ads:** Ezoic
- **Deployment:** Vercel

## 📦 Installation

> **Note:** Ce projet est partagé à des fins de démonstration. Pour l'utiliser localement, vous devrez configurer vos propres clés API.

```bash
# Cloner le repository
git clone https://github.com/yavuzatmaca/qcfinance.git
cd qcfinance

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer vos clés API dans .env.local
# Voir la section "Variables d'environnement" ci-dessous

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npm run analyze      # Analyse du bundle
```

## 📁 Structure du projet

```
qcfinance/
├── app/                          # Next.js App Router
│   ├── salaire-net-quebec/      # Calculateur de salaire
│   ├── calcul-hypotheque/       # Calculateur hypothécaire
│   ├── allocations-familiales/  # Allocations familiales
│   └── ...                      # Autres calculateurs
├── components/                   # Composants réutilisables
│   ├── ui/                      # Composants UI de base
│   ├── calculators/             # Composants de calculateurs
│   └── ...
├── lib/                         # Utilitaires et configuration
│   ├── siteConfig.ts           # Configuration centralisée
│   ├── marketData.ts           # API Bank of Canada
│   └── analytics.ts            # Google Analytics
├── public/                      # Assets statiques
└── styles/                      # Styles globaux
```

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local`:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Stats Dashboard (optionnel)
STATS_USERNAME=admin
STATS_PASSWORD=your-secure-password
```

### Configuration centralisée

Toutes les dates, taux et paramètres sont gérés dans `lib/siteConfig.ts`:

```typescript
export const siteConfig = {
  lastUpdated: {
    date: 'Janvier 2026',
    year: 2026,
  },
  taxYear: {
    current: 2026,
    label: 'Taux 2026',
  },
  // ... autres configurations
}
```

Voir [lib/SITE_CONFIG_README.md](lib/SITE_CONFIG_README.md) pour plus de détails.

## 🔄 Mise à jour annuelle

Checklist pour mettre à jour les données fiscales chaque année:

1. Ouvrir `lib/siteConfig.ts`
2. Mettre à jour `lastUpdated.year` et `lastUpdated.date`
3. Mettre à jour `taxYear.current` et `taxYear.label`
4. Mettre à jour `taxConstants` (RRQ, RQAP, AE, etc.)
5. Vérifier les URLs des sources de données
6. Mettre à jour les taux dans chaque calculateur si nécessaire

## 📊 Données en temps réel

Le site intègre l'API Valet de la Banque du Canada pour afficher:
- Taux directeur (mis à jour quotidiennement)
- Taux hypothécaires
- Taux d'inflation
- Taux de chômage

## 🎨 SEO et Performance

- ✅ Schema.org markup (Organization, WebSite, FAQPage)
- ✅ Open Graph et Twitter Cards
- ✅ Sitemap XML dynamique
- ✅ Robots.txt optimisé
- ✅ Images optimisées avec Next.js Image
- ✅ Lazy loading des composants
- ✅ Performance monitoring intégré

## 🔒 Confidentialité

Tous les calculs sont effectués localement dans le navigateur. Aucune donnée financière personnelle n'est stockée ou transmise à nos serveurs.

## 📝 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## ⚠️ Note sur les Contributions

Ce repository est partagé à des fins de **démonstration et portfolio**. Le code est public pour montrer l'architecture et servir de référence, mais les contributions externes ne sont pas acceptées pour le moment.

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## �‍💻 Auteur

**Mehmet Yavuzatmaca**

- GitHub: [@yavuzatmaca](https://github.com/yavuzatmaca)
- Website: [qcfinance.ca](https://qcfinance.ca)
- Email: [myaweb@gmail.com](mailto:myaweb@gmail.com)

## 🙏 Remerciements

- Revenu Québec pour les tables d'imposition officielles
- Banque du Canada pour l'API Valet
- Statistique Canada pour les données économiques
- La communauté Next.js et React

---

Fait avec ❤️ au Québec
