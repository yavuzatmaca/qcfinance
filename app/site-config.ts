/**
 * SITE CONFIGURATION - Stateless Architecture
 * 
 * This file acts as the central "database" for the application.
 * All site settings, ads configuration, alerts, and mock analytics data are stored here.
 * 
 * To update configuration:
 * 1. Edit this file directly
 * 2. Commit changes to version control
 * 3. Deploy to Vercel (automatic rebuild)
 */

export interface AdSlotConfig {
  enabled: boolean;
  type: 'adsense' | 'affiliate' | 'custom';
  adId?: string;
  html?: string;
  size?: string;
  description?: string;
}

export interface SiteConfig {
  // Global Ads Configuration
  ads: {
    isEnabled: boolean;
    googleAdSenseId: string;
    slots: {
      header: AdSlotConfig;
      sidebar: AdSlotConfig;
      inArticle: AdSlotConfig;
      footer: AdSlotConfig;
      affiliate1: AdSlotConfig;
      affiliate2: AdSlotConfig;
    };
  };

  // Global Alert Banner
  alert: {
    isActive: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
  };
}

/**
 * MAIN SITE CONFIGURATION
 * Edit values below to update site behavior
 */
export const siteConfig: SiteConfig = {
  // ==========================================
  // ADS CONFIGURATION - GOOGLE ADSENSE
  // ==========================================
  ads: {
    isEnabled: true, // Master toggle for all ads
    googleAdSenseId: 'ca-pub-2733523563879283',

    slots: {
      // Header Banner - Top of page
      header: {
        enabled: false,
        type: 'adsense',
        adId: '7290777867',
        description: 'Top banner ad - above fold'
      },

      // Sidebar Ad - Desktop only
      sidebar: {
        enabled: false,
        type: 'adsense',
        adId: '7290777867',
        description: 'Sidebar ad - sticky'
      },

      // In-Article Ad - Middle of content
      inArticle: {
        enabled: false,
        type: 'adsense',
        adId: '7290777867',
        description: 'Mid-content ad'
      },

      // Footer Banner - Bottom of page
      footer: {
        enabled: false,
        type: 'adsense',
        adId: '7290777867',
        description: 'Bottom banner ad'
      },

      // Affiliate Slot 1 (Custom HTML)
      affiliate1: {
        enabled: false,
        type: 'affiliate',
        html: '<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg"><p class="text-sm">Affiliate content here</p></div>',
        description: 'Custom affiliate promotion'
      },

      // Affiliate Slot 2 (Custom HTML)
      affiliate2: {
        enabled: false,
        type: 'custom',
        html: '<div class="p-4 bg-green-50 border border-green-200 rounded-lg"><p class="text-sm">Custom content here</p></div>',
        description: 'Custom promotional content'
      }
    }
  },

  // ==========================================
  // ALERT BANNER CONFIGURATION
  // ==========================================
  alert: {
    isActive: false, // Toggle alert banner on/off
    type: 'info', // 'info' | 'warning' | 'error' | 'success'
    message: 'Maintenance: Nous mettons à jour nos calculateurs pour 2026.'
  }
};

/**
 * Helper function to get ad configuration for a specific slot
 */
export function getAdSlotConfig(position: keyof SiteConfig['ads']['slots']): AdSlotConfig | null {
  if (!siteConfig.ads.isEnabled) {
    return null;
  }

  const slot = siteConfig.ads.slots[position];
  if (!slot || !slot.enabled) {
    return null;
  }

  return slot;
}

/**
 * Helper function to check if ads are globally enabled
 */
export function areAdsEnabled(): boolean {
  return siteConfig.ads.isEnabled;
}

/**
 * Helper function to get alert configuration
 */
export function getAlertConfig() {
  return siteConfig.alert;
}



