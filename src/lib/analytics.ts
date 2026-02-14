import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { siteConfig } from '@/lib/siteConfig';

// Application Insights configuration
let appInsights: ApplicationInsights | null = null;
let reactPlugin: ReactPlugin | null = null;

export const initializeAppInsights = () => {
  if (typeof window !== 'undefined' && !appInsights) {
    const connectionString = siteConfig.analytics.appInsightsConnectionString;

    if (connectionString) {
      console.log("Application Insights connection string found.");
      try {
        reactPlugin = new ReactPlugin();
        appInsights = new ApplicationInsights({
          config: {
            connectionString: connectionString,
            extensions: [reactPlugin],
            extensionConfig: {
              [reactPlugin.identifier]: {
                history: window.history,
              },
            },
            enableAutoRouteTracking: false, // We'll handle route tracking manually
            enableCorsCorrelation: true,
            enableRequestHeaderTracking: true,
            enableResponseHeaderTracking: true,
            disableFetchTracking: false,
            disableAjaxTracking: false,
            autoTrackPageVisitTime: true,
            enableUnhandledPromiseRejectionTracking: true,
          },
        });
        
        appInsights.loadAppInsights();
        
        // Add a small delay to ensure the SDK is fully loaded
        setTimeout(() => {
          // Track initial page view with full details
          const pageName = window.location.pathname;
          const pageTitle = document.title || pageName;
          
          // First track as standard pageView for dashboard compatibility
          appInsights!.trackPageView({
            name: pageTitle, 
            uri: window.location.href
          });
          
          // Also track as a custom event for better analytics
          appInsights!.trackEvent({
            name: "PageView",
            properties: {
              title: pageTitle,
              path: pageName,
              url: window.location.href,
              timestamp: new Date().toISOString(),
              host: window.location.hostname,
              referrer: document.referrer || "direct",
              userAgent: navigator.userAgent,
              isStaticWebApp: true
            }
          });
          
          console.log("Application Insights initialized and initial page view tracked for Static Web App:", pageName);
        }, 100); // Small delay for static web apps
        
        // Make appInsights available globally for route tracking
        window.appInsights = appInsights;
        
      } catch (error) {
        console.error('Failed to initialize Application Insights:', error);
      }
    } else {
      console.warn("Application Insights connection string not found. Analytics will not be initialized.");
      console.warn("Please ensure NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING is set in your environment variables.");
    }
  } else {
    if (appInsights) {
      console.log("Application Insights already initialized.");
    }
    if (typeof window === 'undefined') {
      console.log("Cannot initialize Application Insights on the server (Static Web App).");
    }
  }
  
  return { appInsights, reactPlugin };
};

// Google Analytics configuration
export const GA_TRACKING_ID = siteConfig.analytics.gaTrackingId;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    appInsights: ApplicationInsights;
  }
}

// Google Analytics helper functions
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom analytics events for blog
export const trackArticleView = (articleTitle: string, articleCategory?: string) => {
  if (typeof window === 'undefined') return;

  // Track in Application Insights
  try {
    // First try to use the global instance
    if (window.appInsights) {
      window.appInsights.trackEvent({
        name: 'ArticleView',
        properties: {
          title: articleTitle,
          category: articleCategory,
          timestamp: new Date().toISOString(),
        },
      });
    } 
    // Fall back to the module instance
    else if (appInsights) {
      appInsights.trackEvent({
        name: 'ArticleView',
        properties: {
          title: articleTitle,
          category: articleCategory,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      console.warn('No Application Insights instance available for tracking article view');
    }
  } catch (error) {
    console.error('Failed to track article view in Application Insights:', error);
  }

  // Track in Google Analytics
  event({
    action: 'view',
    category: 'Article',
    label: articleTitle,
  });
};

export const trackArticleEngagement = (
  articleTitle: string,
  engagementType: 'scroll_depth' | 'time_on_page' | 'social_share',
  value?: number
) => {
  if (typeof window === 'undefined') return;

  // Track in Application Insights
  try {
    // First try to use the global instance
    if (window.appInsights) {
      window.appInsights.trackEvent({
        name: 'ArticleEngagement',
        properties: {
          title: articleTitle,
          engagementType,
          value,
          timestamp: new Date().toISOString(),
        },
      });
    } 
    // Fall back to the module instance
    else if (appInsights) {
      appInsights.trackEvent({
        name: 'ArticleEngagement',
        properties: {
          title: articleTitle,
          engagementType,
          value,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      console.warn('No Application Insights instance available for tracking article engagement');
    }
  } catch (error) {
    console.error('Failed to track article engagement in Application Insights:', error);
  }

  // Track in Google Analytics
  event({
    action: engagementType,
    category: 'Engagement',
    label: articleTitle,
    value,
  });
};

export const trackSearchEvent = (searchTerm: string, resultsCount: number) => {
  // Track in Application Insights
  try {
    // First try to use the global instance
    if (window.appInsights) {
      window.appInsights.trackEvent({
        name: 'SearchPerformed',
        properties: {
          searchTerm,
          resultsCount,
          timestamp: new Date().toISOString(),
        },
      });
    } 
    // Fall back to the module instance
    else if (appInsights) {
      appInsights.trackEvent({
        name: 'SearchPerformed',
        properties: {
          searchTerm,
          resultsCount,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      console.warn('No Application Insights instance available for tracking search event');
    }
  } catch (error) {
    console.error('Failed to track search event in Application Insights:', error);
  }

  // Track in Google Analytics
  event({
    action: 'search',
    category: 'Site',
    label: searchTerm,
    value: resultsCount,
  });
};

export { appInsights, reactPlugin };
