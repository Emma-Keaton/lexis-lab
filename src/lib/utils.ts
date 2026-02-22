// Lexi's Lab - Utility Functions

import { type ClassValue, clsx } from 'clsx';

// ===== CLASSNAME UTILITY =====
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// ===== CLAMP UTILITY =====
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ===== LERP (LINEAR INTERPOLATION) =====
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// ===== MAP RANGE =====
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// ===== SMOOTH STEP =====
export function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

// ===== DEBOUNCE =====
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// ===== THROTTLE =====
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== FORMAT PHONE NUMBER FOR WHATSAPP =====
export function formatWhatsAppNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  // Ensure it starts with country code
  return cleaned.startsWith('1') ? cleaned : `1${cleaned}`;
}

// ===== GENERATE WHATSAPP LINK =====
export function getWhatsAppLink(phone: string, message?: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

// ===== CHECK IF MOBILE =====
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// ===== CHECK IF TOUCH DEVICE =====
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===== GET SCROLL PROGRESS =====
export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}

// ===== SMOOTH SCROLL TO ELEMENT =====
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}

// ===== RANDOM IN RANGE =====
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// ===== RANDOM INTEGER =====
export function randomInt(min: number, max: number): number {
  return Math.floor(randomInRange(min, max + 1));
}

// ===== GENERATE UNIQUE ID =====
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
