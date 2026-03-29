'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Sparkles } from 'lucide-react'
import AdminAuthGuard from '@/components/AdminAuthGuard'

// SEO-optimized tags for each calculator
const CALCULATOR_TAGS = {
  '/salaire-net-quebec': ['salaire net', 'impôt québec', 'calcul paie', 'revenu net', 'déductions'],
  '/calcul-hypotheque': ['hypothèque', 'prêt immobilier', 'taux hypothécaire', 'paiement mensuel', 'amortissement'],
  '/declaration-simplifiee': ['déclaration impôt', 'remboursement impôt', 'retour impôt', 'crédits impôt'],
  '/allocations-familiales': ['allocation famille', 'aide enfant', 'prestation enfant', 'ACE', 'allocation québec'],
  '/frais-de-garde': ['frais garde', 'CPE', 'garderie', 'crédit impôt garde', 'subvention garde'],
  '/assurance-emploi': ['assurance emploi', 'chômage', 'AE', 'prestation AE', 'calcul AE'],
  '/capacite-emprunt': ['capacité emprunt', 'prêt hypothécaire', 'qualification hypothèque', 'combien emprunter'],
  '/taxe-de-bienvenue': ['taxe bienvenue', 'taxe mutation', 'droits mutation', 'achat maison'],
  '/augmentation-loyer-2026': ['augmentation loyer', 'TAL', 'loyer 2026', 'locataire', 'bail'],
  '/louer-ou-acheter': ['louer acheter', 'location achat', 'propriétaire locataire', 'investissement immobilier'],
  '/taux-horaire': ['taux horaire', 'salaire horaire', 'conversion salaire', 'calcul horaire'],
  '/paie-vacances': ['paie vacances', 'vacances annuelles', '4%', 'calcul vacances'],
  '/tps-tvq-quebec': ['TPS TVQ', 'taxe vente', 'calcul taxes', 'taxes québec'],
  '/epargne-retraite': ['épargne retraite', 'REER', 'CELI', 'retraite québec', 'planification retraite'],
  '/dettes-credit': ['remboursement dette', 'consolidation dette', 'crédit', 'paiement dette'],
  '/pret-auto': ['prêt auto', 'financement auto', 'voiture', 'paiement auto'],
  '/pret-etudiant': ['prêt étudiant', 'AFR', 'aide financière', 'études', 'prêts bourses'],
  '/interets-composes': ['intérêts composés', 'investissement', 'épargne', 'rendement'],
  '/auto-electrique-vs-essence': ['auto électrique', 'voiture électrique', 'VÉ', 'économie carburant'],
}

const CATEGORIES = [
  { name: 'Impôts & Revenus', color: 'emerald', keywords: ['impôt', 'revenu', 'salaire', 'déclaration', 'crédit impôt'] },
  { name: 'Immobilier', color: 'blue', keywords: ['maison', 'hypothèque', 'loyer', 'propriété', 'achat'] },
  { name: 'Famille', color: 'purple', keywords: ['enfant', 'famille', 'allocation', 'garde', 'parent'] },
  { name: 'Épargne & Retraite', color: 'amber', keywords: ['épargne', 'retraite', 'REER', 'CELI', 'investissement'] },
  { name: 'Dettes & Crédit', color: 'red', keywords: ['dette', 'crédit', 'prêt', 'remboursement', 'financement'] },
  { name: 'Transport', color: 'green', keywords: ['auto', 'voiture', 'transport', 'véhicule'] },
  { name: 'Emploi', color: 'indigo', keywords: ['emploi', 'travail', 'chômage', 'AE', 'salaire'] },
]

function NewBlogPostContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Impôts & Revenus',
    categoryColor: 'emerald',
    author: 'Équipe QCFinance',
    featured: false,
    calculatorLink: '',
    tags: [] as string[],
    readTime: '5 min',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Article créé avec succès!')
        router.push('/admin/blog')
      } else {
        alert('Erreur lors de la création')
      }
    } catch (error) {
      alert('Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categoryName: string) => {
    const category = CATEGORIES.find(c => c.name === categoryName)
    if (category) {
      setFormData({
        ...formData,
        category: categoryName,
        categoryColor: category.color,
        tags: category.keywords,
      })
    }
  }

  const handleCalculatorChange = (link: string) => {
    const currentTags = formData.tags || []
    const calculatorTags = link ? (CALCULATOR_TAGS[link as keyof typeof CALCULATOR_TAGS] || []) : []
    setFormData({
      ...formData,
      calculatorLink: link,
      tags: link ? [...currentTags, ...calculatorTags] : currentTags,
    })
  }

  const addTag = (tag: string) => {
    const currentTags = formData.tags || []
    if (tag && !currentTags.includes(tag)) {
      setFormData({ ...formData, tags: [...currentTags, tag] })
    }
  }

  const removeTag = (tag: string) => {
    setFormData({ 
      ...formData, 
      tags: (formData.tags || []).filter(t => t !== tag) 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Retour à la liste</span>
          </Link>

          <h1 className="text-3xl font-black">Nouvel Article de Blog</h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Titre de l'article *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Guide Complet de l'Impôt au Québec 2026"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Résumé (Excerpt) *
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Courte description de l'article (150-200 caractères)"
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Category & Calculator */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Calculateur Lié
              </label>
              <select
                value={formData.calculatorLink}
                onChange={(e) => handleCalculatorChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              >
                <option value="">Aucun</option>
                {Object.keys(CALCULATOR_TAGS).map(link => (
                  <option key={link} value={link}>
                    {link.replace('/', '').replace(/-/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Tags SEO (générés automatiquement)
            </label>
            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border-2 border-slate-200 min-h-[60px]">
              {formData.tags && formData.tags.length > 0 ? (
                formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-emerald-900"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-sm">Sélectionnez une catégorie ou un calculateur pour générer des tags</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Contenu (Markdown/MDX) *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Écrivez votre article en Markdown..."
              rows={20}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none font-mono text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              Utilisez Markdown pour formater votre texte. Vous pouvez aussi utiliser les composants MDX comme &lt;CalculatorCTA /&gt; et &lt;InfoBox /&gt;
            </p>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Temps de lecture
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 min"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Auteur
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors w-full">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Article Vedette
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Enregistrement...' : 'Publier l\'article'}</span>
            </button>

            <Link
              href="/admin/blog"
              className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}


export default function NewBlogPostPage() {
  return (
    <AdminAuthGuard>
      <NewBlogPostContent />
    </AdminAuthGuard>
  )
}
