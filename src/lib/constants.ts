// Lexi's Lab - Constants & Configuration

// ===== COLORS =====
export const colors = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F3F4',
    textPrimary: '#2D3436',
    textSecondary: '#636E72',
  },
  dark: {
    background: '#0F0F12',
    surface: '#1A1A2E',
    surfaceAlt: '#16161A',
    textPrimary: '#E8EEF0',
    textSecondary: '#B2BEC3',
  },
  accent: {
    blue: '#0984E3',
    cyan: '#00D2D3',
    violet: '#A29BFE',
    amber: '#FAB1A0',
  },
  glow: {
    cyan: 'rgba(0, 210, 211, 0.5)',
    violet: 'rgba(162, 155, 254, 0.5)',
    blue: 'rgba(9, 132, 227, 0.5)',
  },
} as const;

// ===== BREAKPOINTS =====
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ===== NAVIGATION =====
export const navLinks = [
  { label: 'Lab', href: '#hero' },
  { label: 'Exhibition', href: '#exhibition' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
] as const;

// ===== SOCIAL LINKS =====
export const socialLinks = {
  whatsapp: 'https://wa.me/2349159111891',
  instagram: 'https://www.instagram.com/lexis_designlab/',
} as const;

// ===== 3D SCENE CONFIG =====
export const sceneConfig = {
  camera: {
    position: [0, 0, 5] as [number, number, number],
    fov: 75,
  },
  particles: {
    count: 800,
    size: 0.02,
  },
} as const;

// ===== ANIMATION =====
export const animation = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
  },
} as const;

// ===== SEO =====
export const seoConfig = {
  title: "Lexi's Lab | Where Creativity Meets Code",
  description: 'A digital studio bridging aesthetic brilliance and technical excellence. Brand Design, Web Development, and Automation solutions.',
  keywords: ['web development', 'brand design', 'automation', 'digital studio', 'react', 'typescript'],
  url: 'https://lexis-lab.vercel.app',
  ogImage: '/images/logo1.png',
};
