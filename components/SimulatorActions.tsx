'use client';

import { useState } from 'react';
import { Download, Share2, Save, BarChart3, Check, Copy } from 'lucide-react';
import { exportToPDF } from '@/utils/pdfExport';
import { shareViaEmail, shareViaWhatsApp, shareViaFacebook, copyLinkToClipboard } from '@/utils/shareResults';
import { saveScenario } from '@/utils/scenarioStorage';
import type { SimulatorResult } from '@/src/hooks/useSimulator';

interface SimulatorActionsProps {
  result: SimulatorResult;
  grossSalary: number;
  hasPartner: boolean;
  hasCar: boolean;
  onCompareClick: () => void;
  onScenarioSaved?: () => void;
}

export default function SimulatorActions({ result, grossSalary, hasPartner, hasCar, onCompareClick, onScenarioSaved }: SimulatorActionsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePDFExport = async () => {
    await exportToPDF({ result, grossSalary, hasPartner, hasCar });
  };

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return;
    
    saveScenario({
      name: scenarioName,
      grossSalary,
      cityId: result.city.id,
      cityName: result.city.name,
      hasPartner,
      hasCar,
      disposableIncome: result.disposableIncome,
      savingsRate: result.savingsRate,
      monthlyExpenses: result.monthlyExpenses,
    });
    
    setSaved(true);
    if (onScenarioSaved) onScenarioSaved();
    setTimeout(() => {
      setShowSaveDialog(false);
      setSaved(false);
      setScenarioName('');
    }, 1500);
  };

  const handleCopyLink = async () => {
    const success = await copyLinkToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
        <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* PDF Export */}
          <button
            onClick={handlePDFExport}
            className="flex flex-col items-center gap-2 p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 rounded-xl transition-all group"
          >
            <Download className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">PDF</span>
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex flex-col items-center gap-2 p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-400/30 rounded-xl transition-all group relative"
          >
            <Share2 className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">Partager</span>
          </button>

          {/* Save Scenario */}
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 rounded-xl transition-all group"
          >
            <Save className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">Sauvegarder</span>
          </button>

          {/* Compare */}
          <button
            onClick={onCompareClick}
            className="flex flex-col items-center gap-2 p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 rounded-xl transition-all group"
          >
            <BarChart3 className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold text-white">Comparer</span>
          </button>
        </div>
      </div>

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowShareMenu(false)}>
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Partager les Résultats</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => { shareViaEmail({ result, grossSalary }); setShowShareMenu(false); }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <span className="text-white font-semibold">Email</span>
              </button>

              <button
                onClick={() => { shareViaWhatsApp({ result, grossSalary }); setShowShareMenu(false); }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <span className="text-white font-semibold">WhatsApp</span>
              </button>

              <button
                onClick={() => { shareViaFacebook(); setShowShareMenu(false); }}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📘</span>
                </div>
                <span className="text-white font-semibold">Facebook</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-purple-400" />}
                </div>
                <span className="text-white font-semibold">{copied ? 'Copié!' : 'Copier le lien'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Dialog Modal */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSaveDialog(false)}>
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Sauvegarder le Scénario</h3>
            
            {saved ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-semibold">Scénario sauvegardé!</p>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="Ex: Célibataire Montréal"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all mb-4"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveDialog(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-semibold transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveScenario}
                    disabled={!scenarioName.trim()}
                    className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all"
                  >
                    Sauvegarder
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
