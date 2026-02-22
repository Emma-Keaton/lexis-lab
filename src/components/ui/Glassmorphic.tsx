// Glassmorphic - Reusable glass panel component

'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const intensities = {
  light: 'bg-[rgba(255,255,255,0.03)] dark:bg-[rgba(26,26,46,0.5)] backdrop-blur-sm',
  medium: 'bg-[rgba(255,255,255,0.05)] dark:bg-[rgba(26,26,46,0.7)] backdrop-blur-md',
  heavy: 'bg-[rgba(255,255,255,0.08)] dark:bg-[rgba(26,26,46,0.85)] backdrop-blur-xl',
};

const roundedSizes = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export function Glassmorphic({
  children,
  className,
  intensity = 'medium',
  border = true,
  rounded = 'xl',
}: GlassmorphicProps) {
  return (
    <div
      className={cn(
        // Base styles
        'relative overflow-hidden',
        // Intensity styles
        intensities[intensity],
        // Border
        border && 'border border-[var(--glass-border)]',
        // Rounded
        roundedSizes[rounded],
        className
      )}
    >
      {/* Gradient overlay for extra depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Card variant with hover effects
export function GlassmorphicCard({
  children,
  className,
  intensity = 'medium',
  border = true,
  rounded = 'xl',
}: GlassmorphicProps) {
  return (
    <Glassmorphic
      intensity={intensity}
      border={border}
      rounded={rounded}
      className={cn(
        'transition-all duration-300',
        'hover:scale-[1.02] hover:border-[var(--accent-cyan)]',
        'hover:shadow-[0_0_30px_rgba(0,210,211,0.15)]',
        className
      )}
    >
      {children}
    </Glassmorphic>
  );
}
