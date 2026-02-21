/**
 * Editable Expense Field Component
 * Shows value with edit icon, becomes editable on click
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check, X } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  defaultValue: number;
  icon: React.ReactNode;
  color: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  suffix?: string;
}

export function EditableExpenseField({
  label,
  value,
  defaultValue,
  icon,
  color,
  onChange,
  disabled = false,
  suffix = ''
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());
  const isCustom = value !== defaultValue;

  const handleSave = () => {
    const newValue = parseFloat(tempValue) || 0;
    onChange(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 group">
      <span className="flex items-center gap-2 text-slate-300">
        <span className={color}>
          {icon}
        </span>
        {label}
        {isCustom && !isEditing && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded"
          >
            Personnalisé
          </motion.span>
        )}
        {suffix && (
          <span className="text-xs text-slate-500">{suffix}</span>
        )}
      </span>

      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-24 px-2 py-1 bg-white/10 border border-blue-400/50 rounded text-white text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="w-8 h-8 bg-green-500/20 hover:bg-green-500/30 rounded text-green-400 flex items-center justify-center"
              >
                <Check className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="font-semibold text-white">
                {value.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD', 
                  maximumFractionDigits: 0 
                })}
              </span>
              {!disabled && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(true)}
                  className="w-7 h-7 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/5 hover:bg-white/10 rounded flex items-center justify-center"
                  title="Modifier"
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-400" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
