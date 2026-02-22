// Button - Reusable button with glow effects

'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: 'cyan' | 'violet' | 'blue' | 'none';
  loading?: boolean;
  children: ReactNode;
}

const variants = {
  primary: 'bg-[var(--accent-cyan)] text-[var(--text-offwhite)] hover:bg-[var(--accent-blue)]',
  secondary: 'bg-[var(--surface)] text-[var(--text-offwhite)] border border-[var(--border)] hover:border-[var(--accent-cyan)]',
  ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--glass-bg)]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const glows = {
  cyan: 'shadow-[0_0_20px_var(--glow-cyan)] hover:shadow-[0_0_30px_var(--glow-cyan)]',
  violet: 'shadow-[0_0_20px_var(--glow-violet)] hover:shadow-[0_0_30px_var(--glow-violet)]',
  blue: 'shadow-[0_0_20px_var(--glow-blue)] hover:shadow-[0_0_30px_var(--glow-blue)]',
  none: '',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      glow = 'none',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:ring-offset-2 focus:ring-offset-[var(--background)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variant styles
          variants[variant],
          sizes[size],
          glows[glow],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        <span className={loading ? 'invisible' : 'visible'}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
