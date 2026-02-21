'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

interface ComparisonJob {
  id: number
  name: string
  amount: number
  frequency: 'hourly' | 'annual'
  hoursPerWeek: number
}

export default function ComparisonMode() {
  const [isOpen, setIsOpen] = useState(false)
  const [jobs, setJobs] = useState<ComparisonJob[]>([
    { id: 1, name: 'Offre A', amount: 25, frequency: 'hourly', hoursPerWeek: 40 },
    { id: 2, name: 'Offre B', amount: 55000, frequency: 'annual', hoursPerWeek: 37.5 },
  ])

  const calculateAnnual = (job: ComparisonJob) => {
    if (job.frequency === 'annual') return job.amount
    return job.amount * job.hoursPerWeek * 52
  }

  const calculateHourly = (job: ComparisonJob) => {
    if (job.frequency === 'hourly') return job.amount
    return job.amount / (job.hoursPerWeek * 52)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const addJob = () => {
    const newJob: ComparisonJob = {
      id: Date.now(),
      name: `Offre ${String.fromCharCode(65 + jobs.length)}`,
      amount: 25,
      frequency: 'hourly',
      hoursPerWeek: 40
    }
    setJobs([...jobs, newJob])
  }

  const removeJob = (id: number) => {
    if (jobs.length > 2) {
      setJobs(jobs.filter(j => j.id !== id))
    }
  }

  const updateJob = (id: number, updates: Partial<ComparisonJob>) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, ...updates } : j))
  }

  const bestJob = jobs.reduce((best, current) => 
    calculateAnnual(current) > calculateAnnual(best) ? current : best
  )

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-40 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2 font-bold text-sm touch-manipulation"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Comparer 2 offres</span>
        <span className="sm:hidden">Comparer</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4 animate-fade-in">
      <div className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-5 lg:p-6 rounded-t-3xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">Mode Comparaison</h2>
            <p className="text-sm text-white/90 mt-1">Comparez jusqu'à 4 offres d'emploi</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all touch-manipulation"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6 space-y-4">
          {/* Jobs Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            {jobs.map((job, idx) => (
              <div
                key={job.id}
                className={`relative bg-gradient-to-br p-5 rounded-2xl border-2 transition-all ${
                  job.id === bestJob.id
                    ? 'from-emerald-50 to-green-50 border-emerald-400 shadow-lg'
                    : 'from-slate-50 to-slate-100 border-slate-200'
                }`}
              >
                {job.id === bestJob.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    MEILLEURE OFFRE
                  </div>
                )}

                {jobs.length > 2 && (
                  <button
                    onClick={() => removeJob(job.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all touch-manipulation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <input
                  type="text"
                  value={job.name}
                  onChange={(e) => updateJob(job.id, { name: e.target.value })}
                  className="w-full mb-3 px-3 py-2 bg-white border-2 border-slate-200 rounded-lg font-bold text-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={job.amount}
                      onChange={(e) => updateJob(job.id, { amount: Number(e.target.value) })}
                      className="flex-1 px-3 py-2 bg-white border-2 border-slate-200 rounded-lg font-bold text-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <select
                      value={job.frequency}
                      onChange={(e) => updateJob(job.id, { frequency: e.target.value as any })}
                      className="px-3 py-2 bg-white border-2 border-slate-200 rounded-lg font-semibold text-sm focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="hourly">$/h</option>
                      <option value="annual">$/an</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">
                      Heures/semaine: {job.hoursPerWeek}h
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="50"
                      step="2.5"
                      value={job.hoursPerWeek}
                      onChange={(e) => updateJob(job.id, { hoursPerWeek: Number(e.target.value) })}
                      className="w-full accent-purple-600"
                    />
                  </div>

                  <div className="pt-3 border-t-2 border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600 font-semibold">Taux horaire:</span>
                      <span className="text-lg font-bold text-purple-900">{formatCurrency(calculateHourly(job))}/h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600 font-semibold">Salaire annuel:</span>
                      <span className="text-lg font-bold text-purple-900">{formatCurrency(calculateAnnual(job))}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Job Button */}
          {jobs.length < 4 && (
            <button
              onClick={addJob}
              className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-600 font-bold hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 touch-manipulation"
            >
              <Plus className="w-5 h-5" />
              Ajouter une offre
            </button>
          )}

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Résumé de la comparaison
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-700">Meilleure offre:</span>
                <span className="font-bold text-emerald-600">{bestJob.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Différence max:</span>
                <span className="font-bold text-purple-900">
                  {formatCurrency(
                    Math.max(...jobs.map(calculateAnnual)) - Math.min(...jobs.map(calculateAnnual))
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
