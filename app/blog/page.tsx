import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { BlogPosts } from './BlogClient'
import ResponsiveAd from '@/components/ResponsiveAd'

export const metadata: Metadata = {
  title: 'Blog Finance Québec 2026 | Guides & Conseils',
  description: 'Guides financiers, conseils pratiques et actualités pour mieux gérer vos finances au Québec. Impôts, épargne, immobilier et plus.',
  openGraph: {
    title: 'Blog Finance Québec 2026 | Guides & Conseils',
    description: 'Guides financiers, conseils pratiques et actualités pour mieux gérer vos finances au Québec.',
    type: 'website',
  },
}

export default function BlogPage() {
  const blogPosts = getAllPosts()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{blogPosts.length} Articles</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 leading-tight">
              Guides Financiers
              <span className="block text-emerald-200">Québec</span>
            </h1>
            
            <p className="text-sm sm:text-base text-white/90 leading-relaxed px-4">
              Conseils d'experts pour optimiser vos finances
            </p>
          </div>
        </div>

        {/* Wave Divider - Smaller */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L60 46.7C120 43.3 240 36.7 360 33.3C480 30 600 30 720 31.7C840 33.3 960 36.7 1080 38.3C1200 40 1320 40 1380 40L1440 40V50H1380C1320 50 1200 50 1080 50C960 50 840 50 720 50C600 50 480 50 360 50C240 50 120 50 60 50H0Z" fill="rgb(248 250 252)"/>
          </svg>
        </div>
      </section>

      {/* Categories and Posts - Client Component */}
      <BlogPosts posts={blogPosts} />

      {/* Responsive Ad - After Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResponsiveAd adSlot="6737944215" label="Publicité" />
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <section className="py-16">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Prêt à Optimiser Vos Finances?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Utilisez nos 19 calculateurs gratuits pour prendre des décisions financières éclairées
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-black rounded-xl hover:shadow-2xl transition-all hover:scale-105">
                <span>Voir tous les calculateurs</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
