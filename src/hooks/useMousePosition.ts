// useMousePosition - Track mouse position for 3D interactivity

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MousePosition } from '@/types';

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Normalize to -1 to 1 range
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const normalizedY = -(clientY / innerHeight) * 2 + 1;

    setMousePosition({
      x: clientX,
      y: clientY,
      normalizedX,
      normalizedY,
    });
  }, []);

  useEffect(() => {
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mousePosition;
}

// Throttled version for performance-sensitive operations
export function useMousePositionThrottled(delay: number = 16): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let lastUpdate = 0;
    let animationFrameId: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastUpdate >= delay) {
        lastUpdate = now;
        
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const normalizedX = (clientX / innerWidth) * 2 - 1;
        const normalizedY = -(clientY / innerHeight) * 2 + 1;

        setMousePosition({
          x: clientX,
          y: clientY,
          normalizedX,
          normalizedY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [delay]);

  return mousePosition;
}
