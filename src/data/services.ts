// Lexi's Lab - Services Data

import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'brand-design',
    title: 'Brand Design',
    subtitle: 'Visual Identities That Command Attention',
    description:
      'Does your visual identity command the room or just blend into the noise? We craft high-impact brand souls that bridge the gap between "just a business" and a household name. Transform your first impression into a lasting emotional connection.',
    icon: 'palette',
    color: 'violet',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'High-Speed Conversion Engines',
    description:
      'Is your website a digital dead-end or a high-speed conversion engine? We build lightning-fast, intuitive interfaces designed to do one thing: turn casual browsers into committed customers. High-performance tech meets seamless user experience.',
    icon: 'code',
    color: 'cyan',
  },
  {
    id: 'automation',
    title: 'Automation',
    subtitle: 'Systems That Work While You Sleep',
    description:
      'What would you do with the 40% of time you are currently losing to manual tasks? Stop managing the mundane and start leading the monumental. We build intelligent systems for lead gen and onboarding that work 24/7, so your business grows while you are offline.',
    icon: 'zap',
    color: 'amber',
  },
];

// Get service by ID
export const getServiceById = (id: string) =>
  services.find((s) => s.id === id);
