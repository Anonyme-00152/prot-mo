/**
 * Analytics Integration
 * Privacy-friendly analytics tracking
 */

// Analytics configuration from environment variables
const config = {
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  // Enable analytics if VITE_ENABLE_ANALYTICS is true AND in production
  // Or if explicitly enabled via environment variable
  enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && import.meta.env.PROD,
}

/**
 * Initialize analytics (if configured)
 * This is automatically called when the module is imported
 */
export function initAnalytics() {
  if (!config.enabled) {
    console.log('📊 Analytics: Disabled in development')
    return
  }

  // Check if Plausible is loaded
  if (typeof window.plausible !== 'undefined') {
    console.log('📊 Analytics: Plausible loaded')
  }

  // Check if Google Analytics is loaded
  if (typeof window.gtag !== 'undefined') {
    console.log('📊 Analytics: Google Analytics loaded')
  }
}

/**
 * Track a custom event
 * Works with both Plausible and Google Analytics
 *
 * @param {string} eventName - Name of the event
 * @param {object} properties - Event properties
 */
export function trackEvent(eventName, properties = {}) {
  if (!config.enabled) return

  // Plausible Analytics
  if (typeof window.plausible !== 'undefined') {
    window.plausible(eventName, { props: properties })
  }

  // Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties)
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log('📊 Track Event:', eventName, properties)
  }
}

/**
 * Track page view
 * Usually handled automatically by analytics scripts
 */
export function trackPageView(path) {
  if (!config.enabled) return

  // Plausible automatically tracks page views
  // Google Analytics needs manual tracking for SPAs
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', config.gaMeasurementId, {
      page_path: path || window.location.pathname,
    })
  }
}

/**
 * Predefined event trackers
 */
export const analytics = {
  // Navigation events
  clickNavigation: (section) => trackEvent('Navigation', { section }),

  // CV Download
  downloadCV: (language) => trackEvent('Download CV', { language }),

  // Contact Form
  submitContactForm: (success) =>
    trackEvent('Contact Form', {
      action: success ? 'submit_success' : 'submit_error',
    }),

  // Social Links
  clickSocialLink: (platform) => trackEvent('Social Link', { platform }),

  // Language Change
  changeLanguage: (language) => trackEvent('Language Change', { language }),

  // Theme Toggle
  toggleTheme: (theme) => trackEvent('Theme Toggle', { theme }),

  // Project Links
  clickProjectLink: (projectName, linkType) =>
    trackEvent('Project Link', { project: projectName, type: linkType }),

  // Testimonials
  viewTestimonials: () => trackEvent('View Testimonials'),

  // Stats Section
  viewStats: () => trackEvent('View Stats'),
}

// Initialize on module load
initAnalytics()
