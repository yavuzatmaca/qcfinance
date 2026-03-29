'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login')
    } else {
      setIsChecking(false)
    }
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600">Vérification...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
