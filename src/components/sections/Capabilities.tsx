// Capabilities Section (Screen 3: Bento Grid Services)

'use client';

import { motion } from 'framer-motion';
import { Glassmorphic } from '@/components/ui';
import { services } from '@/data/services';
import { cn } from '@/lib/utils';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-[var(--accent-cyan)] mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Stuck with a brand that doesn't represent you? We solve that.
            From stunning visuals to powerful automation—we handle the tech,
            you handle the growth.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          {/* Brand Design - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 lg:row-span-1"
          >
            <ServiceCard service={services[0]} variant="large" />
          </motion.div>

          {/* Web Dev - Tall Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 lg:row-span-2"
          >
            <ServiceCard service={services[1]} variant="tall" />
          </motion.div>

          {/* Automation - Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <ServiceCard service={services[2]} variant="large" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
interface ServiceCardProps {
  service: typeof services[0];
  variant?: 'default' | 'large' | 'tall';
}

function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const iconMap = {
    palette: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    code: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    zap: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };

  const colorMap = {
    cyan: {
      bg: 'from-[var(--accent-cyan)]/10 to-transparent',
      text: 'text-[var(--accent-cyan)]',
      border: 'hover:border-[var(--accent-cyan)]/50',
      question: 'text-[var(--accent-cyan)]',
    },
    violet: {
      bg: 'from-[var(--accent-violet)]/10 to-transparent',
      text: 'text-[var(--accent-violet)]',
      border: 'hover:border-[var(--accent-violet)]/50',
      question: 'text-[var(--accent-violet)]',
    },
    amber: {
      bg: 'from-[var(--accent-amber)]/10 to-transparent',
      text: 'text-[var(--accent-amber)]',
      border: 'hover:border-[var(--accent-amber)]/50',
      question: 'text-[var(--accent-amber)]',
    },
    blue: {
      bg: 'from-[var(--accent-blue)]/10 to-transparent',
      text: 'text-[var(--accent-blue)]',
      border: 'hover:border-[var(--accent-blue)]/50',
      question: 'text-[var(--accent-blue)]',
    },
  };

  const colors = colorMap[service.color];

  // Extract question (text before first question mark) and rest of description
  const questionMatch = service.description.match(/^([^\?]+\?)/);
  const question = questionMatch ? questionMatch[1] : '';
  const restDescription = question ? service.description.slice(question.length).trim() : service.description;

  return (
    <Glassmorphic
      className={cn(
        'h-full group cursor-pointer',
        'transition-all duration-300',
        colors.border
      )}
    >
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit',
        colors.bg
      )} />
      
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
        {/* Icon */}
        <div className={cn('mb-4', colors.text)}>
          {iconMap[service.icon]}
        </div>

        {/* Title */}
        <h3 className={cn(
          'text-xl md:text-2xl font-bold mb-2 text-[var(--text-primary)]',
          variant === 'tall' && 'md:text-3xl'
        )}>
          {service.title}
        </h3>

        {/* Subtitle */}
        <p className={cn(
          'text-sm md:text-base font-mono mb-4',
          colors.text
        )}>
          {service.subtitle}
        </p>

        <p className="text-[var(--text-secondary)] dark:text-[var(--text-offwhite)] flex-grow">
          {question && (
            <span className={cn('font-semibold', colors.question)}>
              {question}{' '}
            </span>
          )}
          {restDescription}
        </p>

        <div
          onClick={() => {
            const contact = document.getElementById('contact');
            contact?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-6 flex items-center gap-2 text-[var(--text-secondary)] dark:text-[var(--text-offwhite)] group-hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <span className="text-sm font-medium">Learn more</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Glassmorphic>
  );
}
