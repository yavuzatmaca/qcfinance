'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, Eye, Users, Clock, Activity, LogOut, RefreshCw, 
  Smartphone, Monitor, Tablet, Repeat, FileText, Search, 
  ArrowRight, Share, Flame, Globe, Share2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Stats {
  visitors: {
    today: number;
    yesterday: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
    returning: number;
    returningRate: number;
  };
  views: {
    today: number;
    yesterday: number;
    allTime: number;
  };
  activeNow: number;
  avgPagesPerVisitor: number;
  avgSessionDuration: string;
  bounceRate: string;
  engagementRate: string;
  topPages: Array<{ path: string; count: number }>;
  last30Days: Array<{ date: string; visitors: number; views: number }>;
  topCountries: Array<{ country: string; count: number }>;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  trafficSourceStats: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
    email: number;
    other: number;
    total: number;
  };
}

type TimeRange = '7days' | '30days' | '90days';

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const router = useRouter();

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/stats/auth', { method: 'DELETE' });
    router.push('/stats/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-blue-400 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Veri yüklenemedi</div>
      </div>
    );
  }

  // Filter data based on time range
  const getFilteredData = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    return stats.last30Days.slice(-days);
  };

  const filteredData = getFilteredData();

  const todayGrowth = stats.visitors.yesterday > 0 
    ? (((stats.visitors.today - stats.visitors.yesterday) / stats.visitors.yesterday) * 100)
    : 0;

  const viewsGrowth = stats.views.yesterday > 0 
    ? (((stats.views.today - stats.views.yesterday) / stats.views.yesterday) * 100)
    : 0;

  const totalDevices = stats.deviceStats.mobile + stats.deviceStats.desktop + stats.deviceStats.tablet;
  const mobilePercent = totalDevices > 0 ? Math.round((stats.deviceStats.mobile / totalDevices) * 100) : 0;
  const desktopPercent = totalDevices > 0 ? Math.round((stats.deviceStats.desktop / totalDevices) * 100) : 0;
  const tabletPercent = totalDevices > 0 ? Math.round((stats.deviceStats.tablet / totalDevices) * 100) : 0;

  // Trafik kaynakları yüzdeleri
  const trafficTotal = stats.trafficSourceStats.total || 1;
  const organicPercent = Math.round((stats.trafficSourceStats.organic / trafficTotal) * 100);
  const directPercent = Math.round((stats.trafficSourceStats.direct / trafficTotal) * 100);
  const socialPercent = Math.round((stats.trafficSourceStats.social / trafficTotal) * 100);
  const referralPercent = Math.round((stats.trafficSourceStats.referral / trafficTotal) * 100);
  const emailPercent = Math.round((stats.trafficSourceStats.email / trafficTotal) * 100);
  const otherPercent = Math.round((stats.trafficSourceStats.other / trafficTotal) * 100);

  // Chart data
  const trendChartData = {
    labels: filteredData.map(d => new Date(d.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Ziyaretçiler',
        data: filteredData.map(d => d.visitors),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Görüntüleme',
        data: filteredData.map(d => d.views),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  const deviceChartData = {
    labels: ['Mobil', 'Masaüstü', 'Tablet'],
    datasets: [{
      data: [mobilePercent, desktopPercent, tabletPercent],
      backgroundColor: [
        'rgba(16, 185, 129, 0.9)',
        'rgba(59, 130, 246, 0.9)',
        'rgba(139, 92, 246, 0.9)'
      ],
      borderWidth: 4,
      borderColor: '#1e293b',
      hoverBorderColor: '#0f172a',
      hoverBorderWidth: 6
    }]
  };

  const sourceChartData = {
    labels: ['Organik', 'Direkt', 'Sosyal Medya', 'Referans', 'E-posta', 'Diğer'],
    datasets: [{
      data: [organicPercent, directPercent, socialPercent, referralPercent, emailPercent, otherPercent],
      backgroundColor: [
        'rgba(59, 130, 246, 0.9)',
        'rgba(139, 92, 246, 0.9)',
        'rgba(236, 72, 153, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(16, 185, 129, 0.9)',
        'rgba(100, 116, 139, 0.9)'
      ],
      borderWidth: 4,
      borderColor: '#1e293b',
      hoverBorderColor: '#0f172a',
      hoverBorderWidth: 6
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          color: '#cbd5e1',
          font: { size: 13, weight: 500 },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle' as const
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => context.dataset.label + ': ' + context.parsed.y.toLocaleString()
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#334155', drawBorder: false },
        ticks: {
          color: '#64748b',
          font: { size: 12 },
          callback: (value: any) => value.toLocaleString()
        }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b', font: { size: 12 } }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxWidth: 12,
        boxHeight: 12,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => context.label + ': ' + context.parsed + '%'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-[1800px] mx-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analitik Genel Bakış</h1>
            <p className="text-slate-400 text-sm">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-200 font-semibold text-sm">
                {stats.activeNow} çevrimiçi
              </span>
            </div>
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Yenile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Çıkış
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Bugün Ziyaretçi"
            value={stats.visitors.today.toLocaleString()}
            change={todayGrowth}
            subtitle="dün'e göre"
          />
          <StatCard
            icon={<Eye className="w-5 h-5" />}
            label="Sayfa Görüntüleme"
            value={stats.views.today.toLocaleString()}
            change={viewsGrowth}
            subtitle="dün'e göre"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Ortalama Süre"
            value={stats.avgSessionDuration}
            change={parseFloat(stats.engagementRate) - 50}
            subtitle="etkileşim oranı"
          />
          <StatCard
            icon={<Activity className="w-5 h-5" />}
            label="Hemen Çıkma Oranı"
            value={`${stats.bounceRate}%`}
            change={-(parseFloat(stats.bounceRate) - 40)}
            subtitle="hedef: %40 altı"
          />
          <StatCard
            icon={<Repeat className="w-5 h-5" />}
            label="Geri Dönen Ziyaretçi"
            value={`${stats.visitors.returningRate.toFixed(1)}%`}
            change={5.7}
            subtitle="geçen aya göre"
          />
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Sayfa/Ziyaret"
            value={stats.avgPagesPerVisitor.toFixed(1)}
            change={-1.2}
            subtitle="geçen haftaya göre"
          />
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <QuickStat label="Dün" value={stats.visitors.yesterday} />
          <QuickStat label="Bu Hafta" value={stats.visitors.thisWeek} />
          <QuickStat label="Bu Ay" value={stats.visitors.thisMonth} />
          <QuickStat label="Bu Yıl" value={stats.visitors.thisYear} />
          <QuickStat label="Ortalama/Gün" value={Math.round(stats.visitors.thisMonth / 30)} />
          <QuickStat label="Toplam" value={stats.visitors.allTime} />
        </div>

        {/* Main Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Ziyaretçi Trendi</h2>
            </div>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg">
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  timeRange === '7days'
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Gün
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  timeRange === '30days'
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Gün
              </button>
              <button
                onClick={() => setTimeRange('90days')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  timeRange === '90days'
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                90 Gün
              </button>
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <Line data={trendChartData} options={chartOptions} />
          </div>
        </div>

        {/* Grid 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Pages */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">En Popüler Sayfalar</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-sm font-medium text-slate-400">#</th>
                  <th className="text-left py-3 px-3 text-sm font-medium text-slate-400">Sayfa</th>
                  <th className="text-right py-3 px-3 text-sm font-medium text-slate-400">Görüntüleme</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.slice(0, 10).map((page, index) => {
                  const maxCount = stats.topPages[0]?.count || 1;
                  const percent = (page.count / maxCount * 100).toFixed(0);
                  const rankClass = index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                                   index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-500' : 
                                   index === 2 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 
                                   'bg-slate-700';
                  
                  return (
                    <tr key={page.path} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold text-white ${rankClass}`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-sm">{page.path}</div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-semibold">{page.count.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Countries */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">En Çok Ziyaret Eden Ülkeler</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-sm font-medium text-slate-400">Ülke</th>
                  <th className="text-right py-3 px-3 text-sm font-medium text-slate-400">Ziyaretçi</th>
                  <th className="text-right py-3 px-3 text-sm font-medium text-slate-400">%</th>
                </tr>
              </thead>
              <tbody>
                {stats.topCountries.slice(0, 10).map((country) => {
                  const totalCountries = stats.topCountries.reduce((sum, c) => sum + c.count, 0);
                  const percentage = totalCountries > 0 
                    ? ((country.count / totalCountries) * 100).toFixed(1)
                    : '0';
                  
                  return (
                    <tr key={country.country} className="border-b border-slate-800/50 hover:bg-slate-800/50">
                      <td className="py-3 px-3 font-medium">{country.country}</td>
                      <td className="py-3 px-3 text-right font-semibold">{country.count.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-slate-400">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device & Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Cihaz Dağılımı</h2>
            </div>
            <div style={{ height: '200px', marginBottom: '16px' }}>
              <Doughnut data={deviceChartData} options={doughnutOptions} />
            </div>
            <div className="flex justify-center flex-wrap gap-4 py-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-sm text-slate-300">Mobil</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-sm text-slate-300">Masaüstü</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="text-sm text-slate-300">Tablet</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.deviceStats.mobile.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Mobil</div>
              </div>
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.deviceStats.desktop.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Masaüstü</div>
              </div>
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Tablet className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.deviceStats.tablet.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Tablet</div>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Share2 className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Trafik Kaynakları</h2>
            </div>
            <div style={{ height: '200px', marginBottom: '16px' }}>
              <Doughnut data={sourceChartData} options={doughnutOptions} />
            </div>
            <div className="flex justify-center flex-wrap gap-4 py-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-sm text-slate-300">Organik</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-purple-500"></div>
                <span className="text-sm text-slate-300">Direkt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-pink-500"></div>
                <span className="text-sm text-slate-300">Sosyal Medya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-500"></div>
                <span className="text-sm text-slate-300">Referans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-sm text-slate-300">E-posta</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-500"></div>
                <span className="text-sm text-slate-300">Diğer</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.trafficSourceStats.organic.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Organik</div>
              </div>
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.trafficSourceStats.direct.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Direkt</div>
              </div>
              <div className="text-center p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Share className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-xl font-bold">{stats.trafficSourceStats.social.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Sosyal Medya</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, subtitle }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  subtitle: string;
}) {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-slate-400 font-medium">{label}</div>
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-slate-400">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="flex items-center gap-2 text-sm">
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold ${
          isPositive ? 'bg-green-500/10 text-green-400' : 
          isNegative ? 'bg-red-500/10 text-red-400' : 
          'bg-slate-700 text-slate-400'
        }`}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <Activity className="w-3 h-3" />}
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

function QuickStat({ label, value }: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-all">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
    </div>
  );
}
