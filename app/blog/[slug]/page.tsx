import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus, Calculator, BookOpen, TrendingUp } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import { NewsletterSidebar } from './BlogDetailClient'
import ResponsiveAd from '@/components/ResponsiveAd'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: `${post.title} | Blog QCFinance`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.content) {
    notFound()
  }

  // Structured Data for Google Rich Results
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `https://qcfinance.ca/og-image.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://qcfinance.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QCFinance',
      logo: {
        '@type': 'ImageObject',
        url: 'https://qcfinance.ca/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://qcfinance.ca/blog/${params.slug}`,
    },
    articleSection: post.category,
    keywords: post.excerpt,
    inLanguage: 'fr-CA',
  }

  const getCategoryColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    }
    return colors[color] || colors.emerald
  }

  const colors = getCategoryColor(post.categoryColor)
  const components = useMDXComponents({})
  
  // Get related posts (same category, excluding current post)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      {/* JSON-LD Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-slate-50">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm leading-none">
            <Link href="/" className="text-slate-600 hover:text-emerald-600 font-semibold transition-colors">
              Accueil
            </Link>
            <span className="text-slate-400 leading-none">•</span>
            <Link href="/blog" className="text-slate-600 hover:text-emerald-600 font-semibold transition-colors">
              Blog
            </Link>
            <span className="text-slate-400 leading-none">•</span>
            <span className="text-slate-900 font-bold">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Header - Compact */}
      <header className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border ${colors.border}`}>
              {post.category}
            </span>
            <span className="text-white/60 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-white/90">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(post.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <span className="text-white/60 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-white/90">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border border-slate-200">
              <article className="prose prose-lg max-w-none">
                <MDXRemote source={post.content} components={components} />
              </article>

              {/* Responsive Ad - After Article Content */}
              <div className="my-8">
                <ResponsiveAd adSlot="6737944215" label="Publicité" />
              </div>

              {/* Share Buttons */}
              <div className="border-t border-slate-200 pt-8 mt-10">
                <p className="text-sm font-bold text-slate-900 mb-4">Partager cet article</p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Facebook</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Twitter</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    <span>Copier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-4 space-y-6">
              
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Table des Matières
                </h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-sm text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                    Introduction
                  </a>
                  <a href="#" className="block text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                    Points Principaux
                  </a>
                  <a href="#" className="block text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                    Stratégies Recommandées
                  </a>
                  <a href="#" className="block text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                    Conclusion
                  </a>
                </nav>
              </div>
              
              {/* Related Tools */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Outils Recommandés
                </h3>
                <div className="space-y-3">
                  <Link href="/salaire-net-quebec" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all group">
                    <p className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Calculateur Salaire Net</p>
                    <p className="text-sm text-white/70">Calculez votre salaire après impôts</p>
                  </Link>
                  <Link href="/epargne-retraite" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all group">
                    <p className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Planificateur REER</p>
                    <p className="text-sm text-white/70">Optimisez vos cotisations</p>
                  </Link>
                  <Link href="/declaration-simplifiee" className="block p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all group">
                    <p className="font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">Déclaration Simplifiée</p>
                    <p className="text-sm text-white/70">Estimez votre remboursement</p>
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <NewsletterSidebar />
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Articles Similaires</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedColors = getCategoryColor(relatedPost.categoryColor)
                return (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <span className={`inline-block px-3 py-1 ${relatedColors.bg} ${relatedColors.text} text-xs font-bold rounded-full border ${relatedColors.border} mb-3`}>
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{new Date(relatedPost.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' })}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Final CTA */}
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
                Utilisez nos calculateurs gratuits pour prendre des décisions financières éclairées
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-black rounded-xl hover:shadow-2xl transition-all hover:scale-105">
                <span>Voir tous les calculateurs</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
    </>
  )
}
