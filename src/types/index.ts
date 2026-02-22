// Lexi's Lab - TypeScript Type Definitions

// ===== PROJECT TYPES =====
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'logo' | 'business-card' | 'business-flier';
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

// ===== SERVICE TYPES =====
export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: 'palette' | 'code' | 'zap';
  color: 'cyan' | 'violet' | 'amber' | 'blue';
}

// ===== NAV LINK TYPES =====
export interface NavLink {
  label: string;
  href: string;
}

// ===== SOCIAL LINK TYPES =====
export interface SocialLinks {
  whatsapp: string;
  instagram: string;
}

// ===== THEME TYPES =====
export type Theme = 'light' | 'dark' | 'system';

// ===== 3D TYPES =====
export interface Vector3Tuple extends Array<number> {
  0: number;
  1: number;
  2: number;
  length: 3;
}

export interface CameraConfig {
  position: Vector3Tuple;
  fov: number;
}

export interface ParticleConfig {
  count: number;
  size: number;
}

// ===== ANIMATION TYPES =====
export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  ease: {
    default: number[];
    spring: { type: string; stiffness: number; damping: number };
  };
}

// ===== SCROLL PROGRESS =====
export interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down' | null;
  scrollY: number;
}

// ===== MOUSE POSITION =====
export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

// ===== MEDIA QUERY HOOK RETURN =====
export interface MediaQueryReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isTouch: boolean;
  width: number;
  height: number;
}
