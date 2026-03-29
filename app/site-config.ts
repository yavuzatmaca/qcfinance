/**
 * SITE CONFIGURATION - Stateless Architecture
 * 
 * This file acts as the central "database" for the application.
 * All site settings, alerts, and mock analytics data are stored here.
 * 
 * To update configuration:
 * 1. Edit this file directly
 * 2. Commit changes to version control
 * 3. Deploy to Vercel (automatic rebuild)
 */

export interface SiteConfig {
  // Global Alert Banner
  alert: {
    isActive: boolean;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
  };
  // Ads Configuration
  ads: {
    isEnabled: boolean;
    googleAdSenseId: string;
    slots: {
      [key: string]: string;
    };
  };
}

/**
 * MAIN SITE CONFIGURATION
 * Edit values below to update site behavior
 */
export const siteConfig: SiteConfig = {
  // ==========================================
  // ALERT BANNER CONFIGURATION
  // ==========================================
  alert: {
    isActive: false, // Toggle alert banner on/off
    type: 'info', // 'info' | 'warning' | 'error' | 'success'
    message: 'Maintenance: Nous mettons à jour nos calculateurs pour 2026.'
  },
  
  // ==========================================
  // ADS CONFIGURATION
  // ==========================================
  ads: {
    isEnabled: true, // Toggle ads on/off
    googleAdSenseId: 'ca-pub-2733523563879283', // Google AdSense ID
    slots: {
      // Define ad slots here
      'top-banner': '6737944215',
      'after-calculator': '6737944215', 
      'sidebar': '6737944215',
      'before-faq': '6737944215',
      'mobile-banner': '6737944215',
      'bottom': '6737944215'
    }
  }
};

/**
 * Helper function to get alert configuration
 */
export function getAlertConfig() {
  return siteConfig.alert;
}



