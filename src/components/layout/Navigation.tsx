'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ui';
import { navLinks } from '@/lib/constants';
import { cn } from '@/lib/utils';

const SWIPE_THRESHOLD = 50;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const menuTouchStartRef = useRef<{ y: number } | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    menuTouchStartRef.current = { y: touch.clientY };
  }, []);

  const handleMenuTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!menuTouchStartRef.current || !mobileMenuRef.current) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - menuTouchStartRef.current.y;

      if (deltaY > SWIPE_THRESHOLD) {
        setIsMobileMenuOpen(false);
        menuTouchStartRef.current = null;
      }
    },
    []
  );

  const handleMenuTouchEnd = useCallback(() => {
    menuTouchStartRef.current = null;
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' 
    ? '/images/logo 2.svg' 
    : '/images/logo 1.svg';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'px-4 md:px-6 py-4',
          'transition-all duration-300'
        )}
      >
        <nav
          className={cn(
            'max-w-7xl mx-auto',
            'flex items-center justify-between',
            'px-4 md:px-6 py-3',
            'rounded-2xl',
            'transition-all duration-300',
            isScrolled
              ? 'glass shadow-lg'
              : 'bg-transparent'
          )}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2 group touch-target"
          >
            <div className="relative w-8 h-8">
              {mounted && (
                <Image
                  src={logoSrc}
                  alt="Lexi's Lab"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span className="hidden sm:block font-mono text-sm font-medium text-[var(--text-primary)]">
              Lexi's Lab
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    'relative px-4 py-2 rounded-lg',
                    'text-sm font-medium',
                    'transition-colors duration-200',
                    'hover:text-[var(--accent-cyan)]',
                    'touch-target',
                    activeSection === link.href.replace('#', '')
                      ? 'text-[var(--accent-cyan)]'
                      : 'text-[var(--text-secondary)]'
                  )}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[var(--glass-bg)] border border-[var(--accent-cyan)]/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'w-12 h-12 rounded-lg',
                  'flex flex-col items-center justify-center gap-1.5',
                  'bg-[var(--surface)] border border-[var(--border)]',
                  'transition-colors duration-200',
                  'hover:border-[var(--accent-cyan)]',
                  'touch-target'
                )}
                aria-label="Toggle menu"
              >
              <span
                className={cn(
                  'w-5 h-0.5 bg-[var(--text-primary)] rounded-full',
                  'transition-all duration-300',
                  'md:hidden',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-[var(--text-primary)] rounded-full',
                  'transition-all duration-300',
                  'md:hidden',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-[var(--text-primary)] rounded-full',
                  'transition-all duration-300',
                  'md:hidden',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed top-24 left-4 right-4 z-40',
              'p-4 rounded-2xl',
              'glass shadow-xl',
              'md:hidden',
              'overflow-y-auto max-h-[70vh]'
            )}
            onTouchStart={handleMenuTouchStart}
            onTouchMove={handleMenuTouchMove}
            onTouchEnd={handleMenuTouchEnd}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      'block px-4 py-3 rounded-lg',
                      'text-sm font-medium',
                      'transition-colors duration-200',
                      'hover:bg-[var(--glass-bg)]',
                      'touch-target',
                      activeSection === link.href.replace('#', '')
                        ? 'text-[var(--accent-cyan)] bg-[var(--glass-bg)]'
                        : 'text-[var(--text-primary)]'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
