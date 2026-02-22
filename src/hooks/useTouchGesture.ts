'use client';

import { useState, useCallback, useRef } from 'react';

export interface TouchGestureHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export interface UseTouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  onDrag?: (deltaX: number, deltaY: number) => void;
}

export interface TouchGestureState {
  deltaX: number;
  deltaY: number;
  isDragging: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export function useTouchGesture(options: UseTouchGestureOptions): TouchGestureHandlers {
  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50, onDrag } = options;

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [state, setState] = useState<TouchGestureState>({
    deltaX: 0,
    deltaY: 0,
    isDragging: false,
    direction: null,
  });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setState({ deltaX: 0, deltaY: 0, isDragging: true, direction: null });
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      let direction: TouchGestureState['direction'] = null;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      setState({ deltaX, deltaY, isDragging: true, direction });

      if (onDrag) {
        onDrag(deltaX, deltaY);
      }

      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        e.preventDefault();
      }
    },
    [onDrag]
  );

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current) return;

    const { deltaX, deltaY } = state;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > threshold || absY > threshold) {
      if (absX > absY) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    touchStartRef.current = null;
    setState({ deltaX: 0, deltaY: 0, isDragging: false, direction: null });
  }, [state, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}

export function useTouchGestureState(): TouchGestureState {
  const [state, setState] = useState<TouchGestureState>({
    deltaX: 0,
    deltaY: 0,
    isDragging: false,
    direction: null,
  });

  return state;
}
