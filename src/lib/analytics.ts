import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

// Application Insights configuration
let appInsights: ApplicationInsights | null = null;
let reactPlugin: ReactPlugin | null = null;

export const initializeAppInsights = () => {
  if (typeof window !== 'undefined' && !appInsights) {
    const connectionString = process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING;
    
    if (connectionString) {
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
            enableAutoRouteTracking: true,
            enableCorsCorrelation: true,
            enableRequestHeaderTracking: true,
            enableResponseHeaderTracking: true,
            disableFetchTracking: false,
            disableAjaxTracking: false,
          },
        });
        
        appInsights.loadAppInsights();
        appInsights.trackPageView();
      } catch (error) {
        console.error('Failed to initialize Application Insights:', error);
      }
    }
  }
  
  return { appInsights, reactPlugin };
};

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
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
  if (appInsights) {
    try {
      appInsights.trackEvent({
        name: 'ArticleView',
        properties: {
          title: articleTitle,
          category: articleCategory,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Failed to track article view in Application Insights:', error);
    }
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
  if (appInsights) {
    try {
      appInsights.trackEvent({
        name: 'ArticleEngagement',
        properties: {
          title: articleTitle,
          engagementType,
          value,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Failed to track article engagement in Application Insights:', error);
    }
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
  if (appInsights) {
    appInsights.trackEvent({
      name: 'SearchPerformed',
      properties: {
        searchTerm,
        resultsCount,
        timestamp: new Date().toISOString(),
      },
    });
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
