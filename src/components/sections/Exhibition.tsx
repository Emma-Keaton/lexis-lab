'use client';

import { useState, useCallback, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Environment, ContactShadows, Image as DreiImage, Text, Billboard } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { GridFloor } from '@/components/three/GridFloor';
import { LightBeams } from '@/components/three/LightBeams';
import { FloatingShapes } from '@/components/three/FloatingShapes';
import { ParticleField } from '@/components/three/ParticleField';

type Category = 'all' | 'logo' | 'business-card' | 'business-flier';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'logo', label: 'Logos' },
  { value: 'business-card', label: 'Business Cards' },
  { value: 'business-flier', label: 'Fliers' },
];

const categoryColors: Record<string, string> = {
  logo: '#8B5CF6',
  'business-card': '#06B6D4',
  'business-flier': '#F59E0B',
};

const categoryLabels: Record<string, string> = {
  logo: 'Logo',
  'business-card': 'Business Card',
  'business-flier': 'Flier',
};

// Calculate card positions for the hallway
function calculateCardPositions(projectCount: number) {
  const positions: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
  const startX = 3.5;
  const startY = 2;
  const startZ = -5;
  const gapZ = 4;
  const gapY = 1.5;

  for (let i = 0; i < projectCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const row = Math.floor(i / 2);
    positions.push({
      position: [
        side * startX + (side * 0.3 * Math.sin(row * 0.5)),
        startY - (row * gapY) + (0.5 * Math.cos(row * 0.3)),
        startZ - (row * gapZ),
      ] as [number, number, number],
      rotation: [
        0,
        side * 0.15,
        side * 0.05,
      ] as [number, number, number],
    });
  }
  return positions;
}

// Individual project card component
interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  onClick: (project: Project) => void;
}

function ProjectCard3D({ project, position, rotation, index, onClick }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      
      // Smooth hover scale
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
      
      // Subtle rotation towards camera when hovered
      const targetRotY = rotation[1] + (hovered ? 0.1 : 0);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 5);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Card frame */}
      <mesh>
        <boxGeometry args={[2.8, 3.5, 0.1]} />
        <meshStandardMaterial
          color={hovered ? '#00D2D3' : '#1A1A2E'}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? '#00D2D3' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Project image */}
      <DreiImage
        url={project.image}
        position={[0, 0, 0.06]}
        scale={[2.7, 3.4]}
        transparent
        opacity={0.95}
      />

      {/* Category badge */}
      <group position={[-1.2, -1.5, 0.1]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
          <meshStandardMaterial color={categoryColors[project.category]} emissive={categoryColors[project.category]} emissiveIntensity={0.5} />
        </mesh>
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {categoryLabels[project.category]}
        </Text>
      </group>

      {/* Glow effect on hover */}
      {hovered && (
        <pointLight position={[0, 0, 2]} intensity={2} color="#00D2D3" distance={5} />
      )}
    </group>
  );
}

// Mobile Floating Carousel Component
interface CarouselCardProps {
  project: Project;
  angle: number;
  radius: number;
  index: number;
  onClick: (project: Project) => void;
  isDark: boolean;
}

function CarouselCard({ project, angle, radius, index, onClick, isDark }: CarouselCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Calculate position on circle
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  // Theme-aware colors
  const cardColor = isDark ? '#1A1A2E' : '#FFFFFF';
  const hoverColor = isDark ? '#00D2D3' : '#0984E3';
  const textColor = isDark ? 'white' : '#2D3436';

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle floating animation - centered vertically for better visibility
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.15;
      
      // Smooth hover scale
      const targetScale = hovered ? 1.08 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    }
  });

  return (
    <group
      ref={meshRef}
      position={[x, 0, z]}
      rotation={[0, -angle, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => onClick(project)}
    >
      <Billboard follow={true} lockX={false} lockY={true} lockZ={false}>
        {/* Card frame */}
        <mesh>
          <boxGeometry args={[1.8, 2.2, 0.08]} />
          <meshStandardMaterial
            color={hovered ? hoverColor : cardColor}
            metalness={0.8}
            roughness={0.2}
            emissive={hovered ? hoverColor : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>

        {/* Project image */}
        <DreiImage
          url={project.image}
          position={[0, 0, 0.05]}
          scale={[1.7, 2.1]}
          transparent
          opacity={0.95}
        />

        {/* Category badge */}
        <group position={[-0.9, -1.3, 0.06]}>
          <mesh rotation={[0, 0, 0]}>
            <capsuleGeometry args={[0.2, 0.7, 4, 8]} />
            <meshStandardMaterial 
              color={categoryColors[project.category]} 
              emissive={categoryColors[project.category]} 
              emissiveIntensity={0.5} 
            />
          </mesh>
          <Text
            position={[0, 0, 0.05]}
            fontSize={0.12}
            color={textColor}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {categoryLabels[project.category]}
          </Text>
        </group>

        {/* Glow effect on hover */}
        {hovered && (
          <pointLight position={[0, 0, 1.5]} intensity={2} color={hoverColor} distance={4} />
        )}
      </Billboard>
    </group>
  );
}

// Floating Carousel Scene
interface FloatingCarouselSceneProps {
  projects: Project[];
  rotation: number;
  onProjectClick: (project: Project) => void;
  isDark: boolean;
}

function FloatingCarouselScene({ projects, rotation, onProjectClick, isDark }: FloatingCarouselSceneProps) {
  const radius = 4.5;
  const anglePerCard = (Math.PI * 2) / Math.max(projects.length, 1);

  return (
    <group position={[0, 2, 0]}>
      {projects.map((project, index) => {
        const angle = index * anglePerCard + rotation;
        return (
          <CarouselCard
            key={project.id}
            project={project}
            angle={angle}
            radius={radius}
            index={index}
            onClick={onProjectClick}
            isDark={isDark}
          />
        );
      })}
    </group>
  );
}

// Camera rig for carousel
function CarouselCameraRig() {
  useFrame((state) => {
    // Position camera to view carousel from front - zoomed in close
    state.camera.position.set(0, 2, 10);
    state.camera.lookAt(0, 2, 0);
  });
  return null;
}

// Camera rig that follows scroll
function CameraRig({ projectCount }: { projectCount: number }) {
  const scroll = useScroll();

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset;
    const totalDistance = (Math.floor(projectCount / 2) + 1) * 4;
    
    // Smooth camera movement through the hallway
    const targetZ = -scrollOffset * totalDistance;
    const targetY = -scrollOffset * (projectCount / 2) * 1.5;
    
    if (state.camera) {
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 3);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 3);
    }
  });

  return null;
}

// 3D Scene content
function ExhibitionScene({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (p: Project) => void }) {
  const cardPositions = calculateCardPositions(projects.length);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware colors
  const bgColor = isDark ? '#0F0F12' : '#F8F9FA';
  const particleColor = isDark ? '#00D2D3' : '#2D3436';
  const shadowColor = isDark ? '#000000' : '#2D3436';

  return (
    <>
      <CameraRig projectCount={projects.length} />

      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.5 : 0.8} />
      <pointLight position={[-5, -5, -5]} intensity={isDark ? 0.3 : 0.4} color="#A29BFE" />

      {/* Background elements */}
      <GridFloor />
      <LightBeams />
      <FloatingShapes />
      
      {/* Subtle particle field */}
      <ParticleField count={150} color={particleColor} />
      
      {/* Project cards */}
      {projects.map((project, index) => (
        cardPositions[index] && (
          <ProjectCard3D
            key={project.id}
            project={project}
            position={cardPositions[index].position}
            rotation={cardPositions[index].rotation}
            index={index}
            onClick={onProjectClick}
          />
        )
      ))}
      
      {/* Environment */}
      <Environment preset={isDark ? 'night' : 'city'} />
      <ContactShadows position={[0, -10, 0]} opacity={0.4} scale={20} blur={3} far={15} color={shadowColor} />
    </>
  );
}

// Lightbox for viewing selected project
interface LightboxProps {
  project: Project | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalProjects: number;
}

function Lightbox({ project, onClose, onPrevious, onNext, currentIndex, totalProjects }: LightboxProps) {
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    (e.target as Element).setAttribute('data-touch-start-x', e.touches[0].clientX.toString());
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchStart = parseFloat((e.target as Element).getAttribute('data-touch-start-x') || '0');
    const deltaX = e.changedTouches[0].clientX - touchStart;
    
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) onPrevious();
      else onNext();
    }
  }, [onPrevious, onNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-4 md:right-0 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons - Desktop */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image - Centered */}
        <div className="relative mx-auto rounded-2xl overflow-hidden flex items-center justify-center" style={{ maxWidth: '100%', maxHeight: '85vh' }}>
          <div className="relative flex items-center justify-center" style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '85vh' }}>
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={800}
              className="object-contain"
              priority
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '85vh' }}
            />
          </div>
        </div>

        {/* Counter */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-white/60 text-sm">
          {currentIndex + 1} / {totalProjects}
        </div>
      </motion.div>

      {/* Pagination dots - Mobile */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden">
        {Array.from({ length: totalProjects }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              i === currentIndex ? 'bg-[var(--accent-cyan)] w-6' : 'bg-white/30'
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Main Exhibition component
export function Exhibition() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [carouselRotation, setCarouselRotation] = useState(0);
  const targetRotationRef = useRef(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const touchStartX = useRef(0);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handlePrevious = useCallback(() => {
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    setSelectedProject(filteredProjects[prevIndex]);
  }, [filteredProjects, selectedProject]);

  const handleNext = useCallback(() => {
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject?.id);
    const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedProject(filteredProjects[nextIndex]);
  }, [filteredProjects, selectedProject]);

  // Simple carousel touch handlers for discrete rotation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const swipeThreshold = 100; // Increased threshold for less sensitivity
    
    if (Math.abs(deltaX) > swipeThreshold) {
      // Set target rotation for smooth animation
      const anglePerCard = (Math.PI * 2) / Math.max(filteredProjects.length, 1);
      if (deltaX > 0) {
        // Swipe right - rotate clockwise (previous card)
        targetRotationRef.current += anglePerCard;
      } else {
        // Swipe left - rotate counter-clockwise (next card)
        targetRotationRef.current -= anglePerCard;
      }
    }
  }, [filteredProjects.length]);

  // Smooth rotation animation
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setCarouselRotation(prev => {
        const diff = targetRotationRef.current - prev;
        if (Math.abs(diff) < 0.001) {
          return targetRotationRef.current;
        }
        return prev + diff * 0.15; // Smooth easing (higher = faster)
      });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="exhibition" className="relative min-h-screen py-24 px-4 bg-[var(--background)] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--accent-violet)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-mono text-[var(--accent-cyan)] mb-4">
            Exhibition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Design <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore a curated collection of visual artistry and creative expression.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                'backdrop-blur-md border border-[var(--glass-border)]',
                activeCategory === cat.value
                  ? 'bg-[var(--accent-cyan)] text-[var(--background)] border-transparent shadow-[0_0_20px_rgba(0,210,211,0.3)]'
                  : 'bg-[var(--glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)]/50'
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* 3D Canvas - Desktop */}
        {!isMobile && filteredProjects.length > 0 && (
          <div className="relative h-[80vh] w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-[var(--glass-border)] bg-[#F8F9FA] dark:bg-[#0F0F12] scroll-controls-container">
            <Canvas
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
              camera={{ position: [0, 0, 0], fov: 60 }}
            >
              <color attach="background" args={[isDark ? '#0F0F12' : '#F8F9FA']} />
              <Suspense fallback={null}>
                <ScrollControls pages={Math.ceil(filteredProjects.length / 2) + 1} damping={0.3}>
                  <ExhibitionScene
                    projects={filteredProjects}
                    onProjectClick={handleProjectClick}
                  />
                </ScrollControls>
              </Suspense>
            </Canvas>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm text-gray-700 dark:text-white/60 text-sm flex items-center gap-2 shadow-sm">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll to explore
            </div>
          </div>
        )}

        {/* Mobile - Floating Carousel */}
        {isMobile && filteredProjects.length > 0 && (
          <div 
            className="relative h-[70vh] w-full rounded-2xl overflow-hidden bg-[#F8F9FA] dark:bg-[#0F0F12]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Canvas
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 2, 35], fov: 50 }}
              onCreated={({ gl }) => {
                gl.setClearColor(isDark ? 0x0F0F12 : 0xF8F9FA, 1);
              }}
            >
              <ambientLight intensity={isDark ? 0.5 : 0.8} />
              <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.2} />
              <pointLight position={[-5, -5, -5]} intensity={isDark ? 0.3 : 0.5} color="#A29BFE" />

              <FloatingCarouselScene
                projects={filteredProjects}
                rotation={carouselRotation}
                onProjectClick={handleProjectClick}
                isDark={isDark}
              />
              <CarouselCameraRig />

              <Environment preset={isDark ? 'night' : 'city'} />
            </Canvas>

            {/* Swipe gesture area */}
            <div 
              className="absolute bottom-4 left-4 right-4 z-20"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="glass rounded-2xl px-6 py-4 backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/10 dark:border-white/5 shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600 dark:text-white/70">
                    Swipe here to explore
                  </span>
                  <svg className="w-5 h-5 text-gray-500 dark:text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={handleCloseLightbox}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentIndex={filteredProjects.findIndex(p => p.id === selectedProject.id)}
            totalProjects={filteredProjects.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
