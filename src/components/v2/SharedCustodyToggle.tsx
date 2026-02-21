/**
 * Shared Custody Toggle Component
 * When enabled, multiplies family benefits by 0.5
 */

'use client';

import { motion } from 'framer-motion';
import { Users, Info } from 'lucide-react';

interface Props {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SharedCustodyToggle({ enabled, onChange }: Props) {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-semibold cursor-pointer" onClick={() => onChange(!enabled)}>
              Garde partagée
            </label>
            
            {/* Toggle Switch */}
            <button
              onClick={() => onChange(!enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-purple-500' : 'bg-white/20'
              }`}
            >
              <motion.span
                animate={{ x: enabled ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
              />
            </button>
          </div>
          
          <p className="text-xs text-slate-300 mb-2">
            Les allocations familiales seront divisées par 2 (50% chaque parent)
          </p>
          
          {enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-start gap-2 mt-2 p-2 bg-purple-500/10 rounded-lg"
            >
              <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-purple-200">
                Les allocations CCB et Allocation famille Québec seront calculées à 50% dans votre revenu mensuel
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
