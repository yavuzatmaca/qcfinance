'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, TrendingUp, BookOpen, DollarSign, Home, Users, PiggyBank, CreditCard, Car } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  categoryColor: string
  featured?: boolean
}

interface Category {
  name: string
  slug: string
  count: number
  icon: any
}

const categories: Category[] = [
  { name: 'Tous', slug: 'tous', count: 0, icon: BookOpen },
  { name: 'Impôts & Revenus', slug: 'impots-revenus', count: 0, icon: DollarSign },
  { name: 'Immobilier', slug: 'immobilier', count: 0, icon: Home },
  { name: 'Épargne & Retraite', slug: 'epargne-retraite', count: 0, icon: PiggyBank },
  { name: 'Famille', slug: 'famille', count: 0, icon: Users },
  { name: 'Dettes & Crédit', slug: 'dettes-credit', count: 0, icon: CreditCard },
  { name: 'Transport', slug: 'transport', count: 0, icon: Car },
  { name: 'Emploi', slug: 'emploi', count: 0, icon: TrendingUp },
  { name: 'Finance', slug: 'finance', count: 0, icon: DollarSign },
]

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

export function BlogCategories({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('tous')

  // Calculate category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.slug === 'tous' 
      ? posts.length 
      : posts.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length
  })).filter(cat => cat.count > 0)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categoriesWithCounts.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.slug
            return (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{category.name} <span className="hidden sm:inline">({category.count})</span></span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('tous')

  // Calculate category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.slug === 'tous' 
      ? posts.length 
      : posts.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length
  })).filter(cat => cat.count > 0)

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'tous' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === categoriesWithCounts.find(c => c.slug === activeCategory)?.name.toLowerCase())

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <>
      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categoriesWithCounts.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.slug
              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{category.name} <span className="hidden sm:inline">({category.count})</span></span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Articles Populaires</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => {
                const colors = getCategoryColor(post.categoryColor)
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100 to-transparent opacity-50 rounded-bl-full"></div>
                    
                    <div className="relative p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border ${colors.border}`}>
                          {post.category}
                        </span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                          ⭐ POPULAIRE
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all">
                          <span>Lire l'article</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              {activeCategory === 'tous' ? 'Tous les Articles' : `Articles ${categoriesWithCounts.find(c => c.slug === activeCategory)?.name}`}
            </h2>
            <span className="ml-auto text-sm text-slate-500 font-semibold">{filteredPosts.length} articles</span>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => {
              const colors = getCategoryColor(post.categoryColor)
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border ${colors.border} mb-4`}>
                      {post.category}
                    </span>
                    
                    <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(post.date).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
