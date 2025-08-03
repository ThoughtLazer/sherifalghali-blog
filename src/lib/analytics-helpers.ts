'use client';

import { useEffect, useState } from 'react';
import { appInsights } from '@/lib/analytics';

interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  popularArticles: Array<{
    title: string;
    views: number;
  }>;
  topReferrers: Array<{
    source: string;
    visits: number;
  }>;
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!appInsights) {
        setLoading(false);
        return;
      }

      try {
        // This is a simplified example - in a real implementation,
        // you would query Application Insights REST API or use Azure Monitor
        // For now, we'll just create a placeholder structure
        const mockData: AnalyticsData = {
          pageViews: 0,
          uniqueUsers: 0,
          popularArticles: [],
          topReferrers: [],
        };

        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return { data, loading };
}

// Helper function to manually track custom events
export const trackCustomEvent = (eventName: string, properties: Record<string, string | number | boolean>) => {
  if (appInsights) {
    appInsights.trackEvent({
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  }
};

// Helper function to track performance metrics
export const trackPerformance = (metricName: string, value: number) => {
  if (appInsights) {
    appInsights.trackMetric({
      name: metricName,
      average: value,
    });
  }
};

// Helper function to track errors
export const trackError = (error: Error, severityLevel?: number) => {
  if (appInsights) {
    appInsights.trackException({
      exception: error,
      severityLevel: severityLevel || 2, // Error level
    });
  }
};
