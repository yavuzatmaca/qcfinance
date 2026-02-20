'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, TrendingUp } from 'lucide-react';

export default function StatsLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/stats/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/stats');
        router.refresh();
      } else {
        setError('Yanlış şifre');
      }
    } catch (error) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-blue-200 text-center mb-8">
            Giriş yapmak için şifrenizi girin
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-blue-300 text-sm mt-6">
            QCFinance.ca Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
