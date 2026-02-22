// SplashScreen - Full-screen loading overlay with animated logo

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  isLoading: boolean;
}

export function SplashScreen({ isLoading }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = '/images/logo 1.svg';

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Dimmed overlay */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Splash screen content */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              'fixed inset-0 z-[100]',
              'flex flex-col items-center justify-center',
              'bg-[var(--bg-primary)]'
            )}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-32 h-32 md:w-40 md:h-40"
              >
                {mounted && (
                  <Image
                    src={logoSrc}
                    alt="Lexi's Lab"
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full',
                      'bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)]'
                    )}
                  />
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm font-mono text-[var(--text-secondary)]"
            >
              Loading experience...
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
