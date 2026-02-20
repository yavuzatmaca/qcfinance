import { MetadataRoute } from 'next'

/**
 * Dynamic Sitemap Generator for QC Finance
 * Generates 500+ URLs efficiently for programmatic SEO
 * - Static pages: Main tools and content pages
 * - Dynamic salary pages: 30k-200k with 500$ increments (341 pages)
 * - Total: ~370 URLs
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qcfinance.ca'
  const currentDate = new Date('2026-02-04') // Current date for fresh content
  
  // ============================================================================
  // 1. STATIC PAGES - Main Tools & Content (Priority-based organization)
  // ============================================================================
  
  const staticRoutes: MetadataRoute.Sitemap = [
    // ========== TIER 1: Homepage (Priority 1.0) ==========
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // ========== TIER 2: Core Calculators (Priority 0.9-1.0) ==========
    // Tax & Income Tools - Most visited
    {
      url: `${baseUrl}/salaire-net-quebec`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/simulateur-vie-quebec`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/declaration-simplifiee`,
      lastModified: new Date('2026-01-20'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/assurance-emploi`,
      lastModified: new Date('2026-01-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Real Estate Tools - High value
    {
      url: `${baseUrl}/calcul-hypotheque`,
      lastModified: new Date('2026-01-27'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/capacite-emprunt`,
      lastModified: new Date('2026-01-20'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/louer-ou-acheter`,
      lastModified: new Date('2026-01-25'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/taxe-de-bienvenue`,
      lastModified: new Date('2026-01-15'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/augmentation-loyer-2026`,
      lastModified: new Date('2026-01-05'),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    
    // Family & Benefits - High priority
    {
      url: `${baseUrl}/allocations-familiales`,
      lastModified: new Date('2026-01-27'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/frais-de-garde`,
      lastModified: new Date('2026-01-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Investment & Savings
    {
      url: `${baseUrl}/interets-composes`,
      lastModified: new Date('2026-01-22'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/epargne-retraite`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // ========== TIER 3: Secondary Tools (Priority 0.8) ==========
    {
      url: `${baseUrl}/taux-horaire`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/paie-vacances`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tps-tvq-quebec`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auto-electrique-vs-essence`,
      lastModified: new Date('2026-01-20'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pret-auto`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pret-etudiant`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dettes-credit`,
      lastModified: new Date('2026-01-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // ========== TIER 4: Content Pages (Priority 0.3-0.5) ==========
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date('2025-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date('2025-12-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/avis-legal`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
  
  // ============================================================================
  // 2. DYNAMIC SALARY PAGES - Programmatic SEO (341 pages)
  // ============================================================================
  // Strategy: 500$ increments for better long-tail SEO coverage
  // Range: 30,000$ to 200,000$ (covers 95% of Quebec salaries)
  // Priority: 0.8 (high value for specific salary searches)
  // ============================================================================
  
  const salaryRoutes: MetadataRoute.Sitemap = []
  const salaryLastModified = currentDate
  
  // Generate salary pages with 500$ increments
  // This creates more entry points for Google (341 vs 171 pages)
  for (let salary = 30000; salary <= 200000; salary += 500) {
    salaryRoutes.push({
      url: `${baseUrl}/salaire-net-quebec/${salary}`,
      lastModified: salaryLastModified,
      changeFrequency: 'monthly',
      priority: 0.8, // High priority for programmatic SEO pages
    })
  }
  
  // ============================================================================
  // 3. COMBINE & RETURN
  // ============================================================================
  // Total URLs: ~370 (29 static + 341 dynamic salary pages)
  // Build time: <1 second (efficient generation)
  // SEO Impact: Maximum coverage for salary-related searches
  // ============================================================================
  
  return [...staticRoutes, ...salaryRoutes]
}

