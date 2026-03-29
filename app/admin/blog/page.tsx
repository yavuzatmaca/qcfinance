'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Search, Tag, Calendar, ArrowLeft, LogOut } from 'lucide-react'
import AdminAuthGuard from '@/components/AdminAuthGuard'
import { logout } from '@/lib/auth'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  author: string
  featured: boolean
  tags: string[]
  calculatorLink?: string
}

function AdminBlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (slug: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article?')) return

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug))
        alert('Article supprimé avec succès!')
      }
    } catch (error) {
      alert('Erreur lors de la suppression')
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Retour au site</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black mb-2">Gestion du Blog</h1>
              <p className="text-white/90">Créez et gérez vos articles de blog</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
              <Link
                href="/admin/blog/new"
                className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Nouvel Article</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl font-black text-emerald-600 mb-1">{posts.length}</div>
            <div className="text-sm text-slate-600">Total Articles</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl font-black text-blue-600 mb-1">
              {posts.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-slate-600">Articles Vedettes</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl font-black text-purple-600 mb-1">
              {categories.length - 1}
            </div>
            <div className="text-sm text-slate-600">Catégories</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-3xl font-black text-amber-600 mb-1">
              {posts.filter(p => p.calculatorLink).length}
            </div>
            <div className="text-sm text-slate-600">Avec Calculateur</div>
          </div>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600">Aucun article trouvé</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                          ⭐ VEDETTE
                        </span>
                      )}
                      {post.calculatorLink && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                          🔗 Calculateur
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('fr-CA')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-4 h-4" />
                        <span>{post.tags?.length || 0} tags</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                      title="Voir l'article"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => deletePost(post.slug)}
                      className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminBlogPage() {
  return (
    <AdminAuthGuard>
      <AdminBlogContent />
    </AdminAuthGuard>
  )
}
