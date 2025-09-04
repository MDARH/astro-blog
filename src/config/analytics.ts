/**
 * Analytics Configuration
 * Configure your analytics tracking IDs here
 */

export const ANALYTICS_CONFIG = {
  // Google Analytics GA4 Measurement ID
  // Replace 'G-XXXXXXX' with your actual GA4 Measurement ID
  // Get this from: https://analytics.google.com/analytics/web/
  GOOGLE_ANALYTICS_ID: 'G-5QJ0G5Z0B5',
  
  // Enable/disable analytics in development
  ENABLE_IN_DEV: false,
  
  // Custom dimensions for enhanced tracking
  CUSTOM_DIMENSIONS: {
    PAGE_CATEGORY: 'dimension1',
    USER_TYPE: 'dimension2',
    CONTENT_GROUP: 'dimension3'
  }
};

/**
 * Check if analytics should be enabled
 * @returns boolean
 */
export function isAnalyticsEnabled(): boolean {
  const isDev = import.meta.env.DEV;
  return !isDev || ANALYTICS_CONFIG.ENABLE_IN_DEV;
}

/**
 * Get the Google Analytics ID
 * @returns string
 */
export function getGoogleAnalyticsId(): string {
  return ANALYTICS_CONFIG.GOOGLE_ANALYTICS_ID;
}