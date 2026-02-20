import Link from 'next/link';
import { Home, Calculator, TrendingUp, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const popularTools = [
    {
      icon: Calculator,
      title: "Calculateur Salaire Net",
      description: "Découvrez votre salaire après impôts",
      href: "/salaire-net-quebec",
      color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
    },
    {
      icon: Home,
      title: "Calculateur Hypothèque",
      description: "Planifiez votre achat immobilier",
      href: "/calcul-hypotheque",
      color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
    },
    {
      icon: TrendingUp,
      title: "Capacité d'Emprunt",
      description: "Combien pouvez-vous emprunter?",
      href: "/capacite-emprunt",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-gray-200 mb-4">404</h1>
          <div className="inline-block bg-red-100 text-red-800 px-6 py-2 rounded-full font-semibold">
            Page introuvable
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oups! Cette page n'existe pas
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          La page que vous cherchez a peut-être été déplacée ou n'existe plus. 
          Mais ne vous inquiétez pas, nous avons plein d'outils utiles pour vous!
        </p>

        {/* Popular Tools */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            Outils les plus populaires
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {popularTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`p-6 rounded-2xl border ${tool.color} transition-all hover:scale-105 hover:shadow-lg group`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{tool.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                      Essayer <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Besoin d'aide? <Link href="/contact" className="text-emerald-600 hover:underline font-semibold">Contactez-nous</Link>
        </p>
      </div>
    </div>
  );
}
