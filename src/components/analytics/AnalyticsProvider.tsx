'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { initializeAppInsights, pageview, GA_TRACKING_ID, appInsights } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const initializedRef = useRef(false);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize Application Insights only once on client side
    if (typeof window !== 'undefined') {
      console.log('Initializing Application Insights from AnalyticsProvider...');
      initializeAppInsights();
      initializedRef.current = true;
    }
  }, []); // Only run once on mount

  useEffect(() => {
    // Skip initial mount since we handle it in initializeAppInsights
    if (typeof window !== 'undefined' && prevPathnameRef.current !== null && pathname !== prevPathnameRef.current) {
      console.log('Route changed, tracking page view:', pathname);
      
      // Track in Application Insights - use the global instance
      if (window.appInsights) {
        const pageTitle = document.title || pathname;
        
        // Track as standard pageView for dashboard compatibility
        window.appInsights.trackPageView({
          name: pageTitle,
          uri: window.location.href
        });
        
        // Also track as a custom event for better analytics
        window.appInsights.trackEvent({
          name: "PageView",
          properties: {
            title: pageTitle,
            path: pathname,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            host: window.location.hostname,
            referrer: document.referrer || "direct"
          }
        });
        
        console.log('Application Insights page view tracked for:', pathname);
      } else if (appInsights) {
        // Fallback to imported instance if global one isn't available
        const pageTitle = document.title || pathname;
        
        // Track as standard pageView for dashboard compatibility
        appInsights.trackPageView({
          name: pageTitle,
          uri: window.location.href
        });
        
        // Also track as a custom event for better analytics
        appInsights.trackEvent({
          name: "PageView",
          properties: {
            title: pageTitle,
            path: pathname,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            host: window.location.hostname,
            referrer: document.referrer || "direct"
          }
        });
        console.log('Application Insights page view tracked using module instance for:', pathname);
      }
      
      // Track in Google Analytics
      if (GA_TRACKING_ID) {
        pageview(pathname);
        console.log('Google Analytics page view tracked for:', pathname);
      }
    }
    
    // Update previous pathname for future comparisons
    prevPathnameRef.current = pathname;
  }, [pathname]); // Run when pathname changes

  return (
    <>
      {/* Google Analytics */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      {children}
    </>
  );
}
