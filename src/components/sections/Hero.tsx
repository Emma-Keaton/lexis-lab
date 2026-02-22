'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
      
      <div className="absolute inset-0 z-0" id="hero-canvas" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-[var(--accent-cyan)]">
            Welcome to the Lab
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-[var(--text-primary)]">Where </span>
          <span className="gradient-text">Creativity</span>
          <br />
          <span className="text-[var(--text-primary)]">Meets </span>
          <span className="gradient-text">Code</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto"
        >
          A digital studio bridging aesthetic brilliance and technical excellence.
          We build the engines that drive business growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            glow="cyan"
            onClick={onExplore}
            className="min-w-[200px] min-h-[48px] touch-target"
          >
Start Exploration
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const contact = document.getElementById('contact');
              contact?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="min-w-[200px] min-h-[48px] touch-target"
          >
            <span className="button-text">Get in Touch</span>
          </Button>
        </motion.div>


      </div>
    </section>
  );
}
