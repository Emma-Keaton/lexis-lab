// Lexi's Lab - Portfolio Projects Data

import type { Project } from '@/types';

export const projects: Project[] = [
  // Logos (img1 - img10)
  { id: 'logo-1', title: 'Logo Design', description: '', category: 'logo', image: '/images/img1.jpg', tags: [] },
  { id: 'logo-2', title: 'Logo Design', description: '', category: 'logo', image: '/images/img2.jpg', tags: [] },
  { id: 'logo-3', title: 'Logo Design', description: '', category: 'logo', image: '/images/img3.jpg', tags: [] },
  { id: 'logo-4', title: 'Logo Design', description: '', category: 'logo', image: '/images/img4.jpg', tags: [] },
  { id: 'logo-5', title: 'Logo Design', description: '', category: 'logo', image: '/images/img5.jpg', tags: [] },
  { id: 'logo-6', title: 'Logo Design', description: '', category: 'logo', image: '/images/img6.jpg', tags: [] },
  { id: 'logo-7', title: 'Logo Design', description: '', category: 'logo', image: '/images/img7.jpg', tags: [] },
  { id: 'logo-8', title: 'Logo Design', description: '', category: 'logo', image: '/images/img8.jpg', tags: [] },
  { id: 'logo-9', title: 'Logo Design', description: '', category: 'logo', image: '/images/img9.jpg', tags: [] },
  { id: 'logo-10', title: 'Logo Design', description: '', category: 'logo', image: '/images/img10.jpg', tags: [] },
  // Business Cards (img11 - img13)
  { id: 'card-1', title: 'Business Card', description: '', category: 'business-card', image: '/images/img11.jpg', tags: [] },
  { id: 'card-2', title: 'Business Card', description: '', category: 'business-card', image: '/images/img12.jpg', tags: [] },
  { id: 'card-3', title: 'Business Card', description: '', category: 'business-card', image: '/images/img13.jpg', tags: [] },
  // Business Fliers (img14 - img16)
  { id: 'flier-1', title: 'Business Flier', description: '', category: 'business-flier', image: '/images/img14.jpg', tags: [] },
  { id: 'flier-2', title: 'Business Flier', description: '', category: 'business-flier', image: '/images/img15.jpg', tags: [] },
  { id: 'flier-3', title: 'Business Flier', description: '', category: 'business-flier', image: '/images/img16.jpg', tags: [] },
];

export const featuredProjects = projects;

export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter((p) => p.category === category);

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);
