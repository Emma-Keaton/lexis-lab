// useScrollProgress - Track scroll position for animations and 3D

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ScrollProgress } from '@/types';

export function useScrollProgress(): ScrollProgress {
  const [scrollState, setScrollState] = useState<ScrollProgress>({
    progress: 0,
    direction: null,
    scrollY: 0,
  });

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      const direction = scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : null;

      setScrollState({
        progress,
        direction,
        scrollY,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Set initial state
    updateScrollState();

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}

// Get progress within a specific section
export function useSectionProgress(sectionId: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when section enters viewport, 1 when it leaves
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Progress calculation
      const start = windowHeight; // Section starts entering
      const end = -sectionHeight; // Section has completely left
      
      const currentProgress = 1 - (sectionTop - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  return progress;
}

// Check if element is in viewport
export function useInViewport(elementId: string, threshold: number = 0.5): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementId, threshold]);

  return isInViewport;
}
