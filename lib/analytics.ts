/**
 * Google Analytics 4 Integration
 * Gerçek veriler GA4'ten çekilir
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Clean environment variables from newlines
const propertyId = process.env.GA4_PROPERTY_ID?.trim().replace(/[\r\n]/g, '') || '522075851';

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

if (process.env.GA4_CREDENTIALS) {
  try {
    // Decode base64 if needed and clean
    let credentialsStr = process.env.GA4_CREDENTIALS.trim().replace(/[\r\n]/g, '');
    if (!credentialsStr.startsWith('{')) {
      // It's base64 encoded
      credentialsStr = Buffer.from(credentialsStr, 'base64').toString('utf-8');
    }
    const credentials = JSON.parse(credentialsStr);
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials
    });
  } catch (error) {
    // Silent fail
  }
}

export async function getAnalytics() {
  if (!analyticsDataClient || !propertyId) {
    return getMockData();
  }

  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Real-time active users (son 30 dakika)
    let activeNow = 0;
    try {
      const [realtimeData] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }],
      });
      activeNow = parseInt(realtimeData.rows?.[0]?.metricValues?.[0]?.value || '0');
    } catch (error) {
      // Silent fail
    }

    // Bugün ve dün
    const [todayData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        { startDate: today, endDate: today },
        { startDate: yesterdayStr, endDate: yesterdayStr },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
    });

    // Bu hafta
    const [weekData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Bu ay
    const [monthData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Bu yıl
    const [yearData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '365daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Tüm zamanlar (son 2 yıl)
    const [allTimeData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '730daysAgo', endDate: 'today' }],
      metrics: [{ name: 'totalUsers' }],
    });

    // Son 30 gün detaylı
    const [last30DaysData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    // Top sayfalar
    const [topPagesData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 15,
    });

    // Ülkeler
    const [countriesData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 15,
    });

    // Cihazlar
    const [devicesData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Returning visitors
    const [returningData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'newVsReturning' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // Trafik kaynakları
    const [trafficSourcesData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    });

    // Engagement metrikleri (ortalama süre ve bounce rate)
    const [engagementData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'engagementRate' },
      ],
    });

    // Parse data
    const visitorsToday = parseInt(todayData.rows?.[0]?.metricValues?.[0]?.value || '0');
    const viewsToday = parseInt(todayData.rows?.[0]?.metricValues?.[1]?.value || '0');
    const visitorsYesterday = parseInt(todayData.rows?.[1]?.metricValues?.[0]?.value || '0');
    const viewsYesterday = parseInt(todayData.rows?.[1]?.metricValues?.[1]?.value || '0');

    const visitorsThisWeek = parseInt(weekData.rows?.[0]?.metricValues?.[0]?.value || '0');
    const visitorsThisMonth = parseInt(monthData.rows?.[0]?.metricValues?.[0]?.value || '0');
    const visitorsThisYear = parseInt(yearData.rows?.[0]?.metricValues?.[0]?.value || '0');
    const visitorsAllTime = parseInt(allTimeData.rows?.[0]?.metricValues?.[0]?.value || '0');

    // Last 30 days chart
    const last30Days = (last30DaysData.rows || []).map(row => ({
      date: row.dimensionValues?.[0]?.value || '',
      visitors: parseInt(row.metricValues?.[0]?.value || '0'),
      views: parseInt(row.metricValues?.[1]?.value || '0'),
    }));

    // Top pages
    const topPages = (topPagesData.rows || []).map(row => ({
      path: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0'),
    }));

    // Countries
    const topCountries = (countriesData.rows || []).map(row => ({
      country: row.dimensionValues?.[0]?.value || '',
      count: parseInt(row.metricValues?.[0]?.value || '0'),
    }));

    // Devices
    const deviceMap: Record<string, number> = {};
    (devicesData.rows || []).forEach(row => {
      const device = row.dimensionValues?.[0]?.value?.toLowerCase() || '';
      const count = parseInt(row.metricValues?.[0]?.value || '0');
      deviceMap[device] = count;
    });

    const deviceStats = {
      mobile: deviceMap['mobile'] || 0,
      desktop: deviceMap['desktop'] || 0,
      tablet: deviceMap['tablet'] || 0,
    };

    // Returning rate
    let returningVisitors = 0;
    let newVisitors = 0;
    (returningData.rows || []).forEach(row => {
      const type = row.dimensionValues?.[0]?.value || '';
      const count = parseInt(row.metricValues?.[0]?.value || '0');
      if (type === 'returning') returningVisitors = count;
      if (type === 'new') newVisitors = count;
    });

    const totalVisitors = returningVisitors + newVisitors;
    const returningRate = totalVisitors > 0 
      ? ((returningVisitors / totalVisitors) * 100).toFixed(1)
      : '0';

    // Avg pages per visitor
    const totalViews = topPages.reduce((sum, page) => sum + page.count, 0);
    const avgPagesPerVisitor = visitorsThisMonth > 0
      ? (totalViews / visitorsThisMonth).toFixed(1)
      : '0';

    // Engagement metrikleri parse
    const avgSessionDuration = parseFloat(engagementData.rows?.[0]?.metricValues?.[0]?.value || '0');
    const bounceRate = parseFloat(engagementData.rows?.[0]?.metricValues?.[1]?.value || '0') * 100; // GA4 returns as decimal
    const engagementRate = parseFloat(engagementData.rows?.[0]?.metricValues?.[2]?.value || '0') * 100;

    // Format average session duration to MM:SS
    const minutes = Math.floor(avgSessionDuration / 60);
    const seconds = Math.floor(avgSessionDuration % 60);
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Trafik kaynakları parse
    const trafficSources: Record<string, number> = {};
    let totalTraffic = 0;
    (trafficSourcesData.rows || []).forEach(row => {
      const source = row.dimensionValues?.[0]?.value || '';
      const count = parseInt(row.metricValues?.[0]?.value || '0');
      trafficSources[source] = count;
      totalTraffic += count;
    });

    // GA4 channel gruplarını kategorize et
    const organicSources = ['Organic Search', 'Organic Social'];
    const directSources = ['Direct'];
    const socialSources = ['Social', 'Paid Social'];
    const referralSources = ['Referral'];
    const emailSources = ['Email'];

    const organic = organicSources.reduce((sum, key) => sum + (trafficSources[key] || 0), 0);
    const direct = directSources.reduce((sum, key) => sum + (trafficSources[key] || 0), 0);
    const social = socialSources.reduce((sum, key) => sum + (trafficSources[key] || 0), 0);
    const referral = referralSources.reduce((sum, key) => sum + (trafficSources[key] || 0), 0);
    const email = emailSources.reduce((sum, key) => sum + (trafficSources[key] || 0), 0);
    const other = totalTraffic - (organic + direct + social + referral + email);

    const trafficSourceStats = {
      organic,
      direct,
      social,
      referral,
      email,
      other: other > 0 ? other : 0,
      total: totalTraffic,
    };

    return {
      visitors: {
        today: visitorsToday,
        yesterday: visitorsYesterday,
        thisWeek: visitorsThisWeek,
        thisMonth: visitorsThisMonth,
        thisYear: visitorsThisYear,
        allTime: visitorsAllTime,
        returning: returningVisitors,
        returningRate: parseFloat(returningRate),
      },
      views: {
        today: viewsToday,
        yesterday: viewsYesterday,
        allTime: totalViews,
      },
      activeNow, // Şu an online olan kullanıcılar
      avgPagesPerVisitor: parseFloat(avgPagesPerVisitor),
      avgSessionDuration: formattedDuration,
      bounceRate: bounceRate.toFixed(1),
      engagementRate: engagementRate.toFixed(1),
      topPages,
      last30Days,
      topCountries,
      deviceStats,
      trafficSourceStats,
    };
  } catch (error) {
    return getMockData();
  }
}

function getMockData() {
  return {
    visitors: {
      today: 0,
      yesterday: 0,
      thisWeek: 0,
      thisMonth: 0,
      thisYear: 0,
      allTime: 0,
      returning: 0,
      returningRate: 0,
    },
    views: {
      today: 0,
      yesterday: 0,
      allTime: 0,
    },
    activeNow: 0,
    avgPagesPerVisitor: 0,
    avgSessionDuration: '0:00',
    bounceRate: '0',
    engagementRate: '0',
    topPages: [],
    last30Days: [],
    topCountries: [],
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
    trafficSourceStats: {
      organic: 0,
      direct: 0,
      social: 0,
      referral: 0,
      email: 0,
      other: 0,
      total: 0,
    },
  };
}

