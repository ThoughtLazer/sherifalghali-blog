'use client';

import { useEffect, useState, useRef } from 'react';
import { trackArticleView, trackArticleEngagement } from '@/lib/analytics';

interface ArticleTrackerProps {
  title: string;
  category?: string;
}

export function ArticleTracker({ title, category }: ArticleTrackerProps) {
  const [startTime] = useState(Date.now());
  const [scrollDepth, setScrollDepth] = useState(0);
  const scrollDepthReported = useRef(new Set<number>());
  const timeOnPageReported = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Track article view on mount
    trackArticleView(title, category);

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      setScrollDepth(scrollPercent);

      // Report scroll depth milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !scrollDepthReported.current.has(milestone)
        ) {
          trackArticleEngagement(title, 'scroll_depth', milestone);
          scrollDepthReported.current.add(milestone);
        }
      });
    };

    // Track time on page
    const timeOnPageInterval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      // Report time milestones (30s, 60s, 120s, 300s)
      const timeMilestones = [30, 60, 120, 300];
      timeMilestones.forEach((milestone) => {
        if (timeSpent >= milestone && !timeOnPageReported.current) {
          trackArticleEngagement(title, 'time_on_page', timeSpent);
          if (milestone === 60) {
            timeOnPageReported.current = true; // Only report once for meaningful engagement
          }
        }
      });
    }, 10000); // Check every 10 seconds

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeOnPageInterval);
      
      // Track final time on page when component unmounts
      const finalTimeSpent = Math.round((Date.now() - startTime) / 1000);
      if (finalTimeSpent > 10) { // Only track if user spent more than 10 seconds
        trackArticleEngagement(title, 'time_on_page', finalTimeSpent);
      }
    };
  }, [title, category, startTime]);

  return null; // This component doesn't render anything
}
