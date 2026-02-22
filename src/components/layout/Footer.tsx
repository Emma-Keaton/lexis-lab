// Footer - Minimalist footer with social links

'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/constants';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 px-4 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-mono text-sm text-[var(--text-primary)]">
              Lexi&apos;s Lab
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-[var(--text-secondary)] font-mono"
          >
            Where Creativity Meets Code
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--surface-alt)] hover:bg-[var(--accent-cyan)]/10 transition-colors"
              aria-label="Contact on WhatsApp"
            >
              <Image
                src="/images/icons8-whatsapp-500.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="opacity-60 dark:opacity-100 icon-offwhite"
              />
            </a>

            {/* Instagram */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--surface-alt)] hover:bg-[var(--accent-cyan)]/10 transition-colors"
              aria-label="Instagram"
            >
              <Image
                src="/images/icons8-instagram-500.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="opacity-80 dark:opacity-100 icon-offwhite"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
