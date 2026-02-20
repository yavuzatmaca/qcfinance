'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { formatCurrency } from '@/utils/taxLogic'

interface InteractiveDonutChartProps {
  netIncome: number
  federalTax: number
  provincialTax: number
  qpp: number
  qpip: number
  ei: number
}

export default function InteractiveDonutChart({
  netIncome,
  federalTax,
  provincialTax,
  qpp,
  qpip,
  ei
}: InteractiveDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const data = [
    { name: 'Revenu Net', value: netIncome, color: '#10B981', emoji: '💰' },
    { name: 'Impôt Provincial', value: provincialTax, color: '#3B82F6', emoji: '🏛️' },
    { name: 'Impôt Fédéral', value: federalTax, color: '#6366F1', emoji: '🇨🇦' },
    { name: 'RRQ', value: qpp, color: '#F59E0B', emoji: '👴' },
    { name: 'RQAP', value: qpip, color: '#EC4899', emoji: '👶' },
    { name: 'AE', value: ei, color: '#8B5CF6', emoji: '🛡️' },
  ]

  const totalIncome = data.reduce((sum, item) => sum + item.value, 0)

  // Custom active shape for hover effect
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <div className="relative">
      <div style={{ width: '100%', height: '350px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="cursor-pointer transition-all hover:opacity-90"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label - Perfectly Centered */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            textAlign: 'center'
          }}
        >
          {activeIndex !== null ? (
            <div>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{data[activeIndex].emoji}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                {data[activeIndex].name}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                {formatCurrency(data[activeIndex].value)}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {((data[activeIndex].value / totalIncome) * 100).toFixed(1)}% du total
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', marginBottom: '4px' }}>
                Revenu Brut
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                {formatCurrency(totalIncome)}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Survolez pour détails
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer ${
              activeIndex === index ? 'bg-slate-100 scale-105' : 'hover:bg-slate-50'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-700 truncate">{entry.name}</div>
              <div className="text-xs text-slate-500">
                {((entry.value / totalIncome) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
