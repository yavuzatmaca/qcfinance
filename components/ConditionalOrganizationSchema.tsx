'use client'

import { usePathname } from 'next/navigation'
import OrganizationSchema from './OrganizationSchema'

export default function ConditionalOrganizationSchema() {
  const pathname = usePathname()
  
  // Don't render OrganizationSchema on pages that have their own aggregateRating
  const pagesWithOwnRating = [
    '/salaire-net-quebec',
    '/simulateur-vie-quebec',
    '/tps-tvq-quebec',
    '/taxe-de-bienvenue',
    '/pret-auto',
    '/louer-ou-acheter',
    '/allocations-familiales',
    '/frais-de-garde',
    '/calcul-hypotheque',
    '/capacite-emprunt',
    '/declaration-simplifiee',
    '/dettes-credit',
    '/epargne-retraite',
    '/interets-composes',
    '/paie-vacances',
    '/pret-etudiant',
    '/taux-horaire',
    '/assurance-emploi',
    '/augmentation-loyer-2026',
    '/auto-electrique-vs-essence'
  ]
  
  // Also exclude dynamic salary pages
  const isDynamicSalaryPage = /^\/salaire-net-quebec\/\d+$/.test(pathname)
  
  if (isDynamicSalaryPage || pagesWithOwnRating.includes(pathname)) {
    return null
  }
  
  return <OrganizationSchema />
}
