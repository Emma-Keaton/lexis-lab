// Contact Section (Screen 4: Transmission)

'use client';

import { motion } from 'framer-motion';
import { Button, Glassmorphic } from '@/components/ui';
import { socialLinks } from '@/lib/constants';
import Image from 'next/image';

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-[var(--accent-cyan)] mb-6">
              Transmission
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>

            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg">
              Ready to transform your digital presence? Let&apos;s discuss how we can
              help your business grow. Reach out through your preferred channel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                glow="cyan"
                onClick={() => window.open(socialLinks.whatsapp, '_blank')}
              >
                <Image
                  src="/images/icons8-whatsapp-500.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="mr-2 icon-offwhite"
                />
                <span className="button-text">WhatsApp Me</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open(socialLinks.instagram, '_blank')}
              >
                <Image
                  src="/images/icons8-instagram-500.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="mr-2 icon-offwhite"
                />
                <span className="button-text">Instagram</span>
              </Button>
            </div>
          </motion.div>

          {/* Right: Info Card - Glassmorphic container matching other cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Glassmorphic intensity="medium" rounded="2xl" className="p-8">
              <h3 className="text-xl font-bold text-black mb-6">
                Quick Links
              </h3>

              {/* Social Links */}
              <div className="space-y-4">
                <SocialLink
                  icon="whatsapp"
                  label="WhatsApp"
                  href={socialLinks.whatsapp}
                />
                <SocialLink
                  icon="instagram"
                  label="Instagram"
                  href={socialLinks.instagram}
                />
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-[var(--glass-border)]" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-3xl font-bold gradient-text">50+</span>
                  <p className="text-sm text-[var(--text-offwhite)]">Projects Delivered</p>
                </div>
                <div>
                  <span className="text-3xl font-bold gradient-text">100%</span>
                  <p className="text-sm text-[var(--text-offwhite)]">Client Satisfaction</p>
                </div>
              </div>
            </Glassmorphic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Social Link Component
interface SocialLinkProps {
  icon: 'whatsapp' | 'instagram';
  label: string;
  href: string;
}

function SocialLink({ icon, label, href }: SocialLinkProps) {
  const iconSrc = icon === 'whatsapp'
    ? '/images/icons8-whatsapp-500.svg'
    : '/images/icons8-instagram-500.svg';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-[var(--accent-cyan)]/10 group"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--glass-border)] group-hover:bg-[var(--accent-cyan)]/20 transition-all flex items-center justify-center">
        <Image
          src={iconSrc}
          alt={icon}
          width={20}
          height={20}
          className="w-5 h-5 object-contain opacity-80 dark:opacity-100 quick-links-icon"
        />
      </div>
      <span className="text-[var(--text-offwhite)] group-hover:text-[var(--accent-cyan)] transition-colors">
        {label}
      </span>
      <svg className="w-4 h-4 ml-auto text-[var(--text-offwhite)] group-hover:translate-x-1 group-hover:text-[var(--accent-cyan)] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
