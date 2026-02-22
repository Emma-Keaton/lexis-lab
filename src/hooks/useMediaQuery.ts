// useMediaQuery - Responsive breakpoint detection hook

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MediaQueryReturn } from '@/types';
import { breakpoints } from '@/lib/constants';

export function useMediaQuery(): MediaQueryReturn {
  const [dimensions, setDimensions] = useState<MediaQueryReturn>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isTouch: false,
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    setDimensions({
      isMobile: width < parseInt(breakpoints.md),
      isTablet: width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg),
      isDesktop: width >= parseInt(breakpoints.lg) && width < parseInt(breakpoints.xl),
      isLargeDesktop: width >= parseInt(breakpoints.xl),
      isTouch,
      width,
      height,
    });
  }, []);

  useEffect(() => {
    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return dimensions;
}

// Export individual breakpoint hooks for convenience
export function useIsMobile(): boolean {
  const { isMobile } = useMediaQuery();
  return isMobile;
}

export function useIsTablet(): boolean {
  const { isTablet } = useMediaQuery();
  return isTablet;
}

export function useIsDesktop(): boolean {
  const { isDesktop, isLargeDesktop } = useMediaQuery();
  return isDesktop || isLargeDesktop;
}
