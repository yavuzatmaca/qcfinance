import { getMarketData } from '@/lib/marketData';
import HomeClient from './HomeClient';

export default async function Home() {
  // Fetch real-time market data from Bank of Canada
  const marketRates = await getMarketData();
  // Schema Markup for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QCFinance.ca",
    "url": "https://qcfinance.ca",
    "logo": "https://qcfinance.ca/images/logo.png",
    "description": "Calculateurs financiers gratuits spécialisés pour le Québec. Salaire net, hypothèque, impôts, et plus.",
    "areaServed": "QC",
    "sameAs": [
      "https://twitter.com/qcfinance",
      "https://linkedin.com/company/qcfinance",
      "https://www.facebook.com/qcfinance",
      "https://www.youtube.com/@qcfinance",
      "https://www.instagram.com/qcfinance"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QCFinance.ca",
    "url": "https://qcfinance.ca",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://qcfinance.ca/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Les calculateurs sont-ils vraiment gratuits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, tous nos calculateurs sont 100% gratuits et le resteront toujours. Aucune inscription n'est requise et il n'y a aucune limite d'utilisation. Nous sommes financés par des liens affiliés discrets qui nous permettent de maintenir ce service gratuit."
        }
      },
      {
        "@type": "Question",
        "name": "Comment sont calculés les impôts au Québec?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos calculateurs utilisent les tables d'imposition officielles 2026 de Revenu Québec et de l'Agence du revenu du Canada. Nous intégrons l'impôt provincial progressif, l'impôt fédéral, les cotisations RRQ, RQAP, assurance-emploi, ainsi que tous les crédits d'impôt applicables au Québec."
        }
      },
      {
        "@type": "Question",
        "name": "Les données sont-elles à jour pour 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument! Tous nos calculateurs sont mis à jour dès la publication des budgets provincial et fédéral. Nous suivons les annonces de Revenu Québec et de l'ARC pour intégrer immédiatement les nouveaux taux d'imposition, seuils de revenus, et crédits d'impôt."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je faire confiance aux résultats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos calculateurs sont précis au dollar près pour la grande majorité des situations. Cependant, certains cas complexes peuvent nécessiter l'avis d'un comptable professionnel. Nos outils sont parfaits pour des estimations fiables et rapides."
        }
      },
      {
        "@type": "Question",
        "name": "Mes données personnelles sont-elles protégées?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui! Tous les calculs sont effectués localement dans votre navigateur. Nous ne stockons aucune donnée personnelle, aucun revenu, aucune information financière. Vos calculs restent 100% privés et anonymes."
        }
      }
    ]
  };

  return (
    <>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <HomeClient marketRates={marketRates} />
    </>
  );
}
