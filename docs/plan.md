# LEXI'S LAB - 3D GALLERY WEBSITE IMPLEMENTATION PLAN

## Project Overview

A minimalist, high-tech 3D gallery website featuring:
- **4 Sections**: Hero (Lab), Exhibition (3D Gallery), Capabilities (Services), Contact
- **Spatial UI** with immersive 3D experiences
- **Full responsiveness** across mobile, tablet, and desktop
- **Dark/Light modes** with "Muted Cyberpunk" color palette

---

## Phase 1: Project Foundation

### 1.1 Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 1.2 Install Dependencies

**Core Dependencies:**
- `three` - 3D engine
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (Float, Environment, ScrollControls, etc.)
- `@react-three/postprocessing` - Visual effects
- `framer-motion` - UI animations
- `gsap` - Complex camera animations
- `lenis` - Smooth scrolling

**Dev Dependencies:**
- TypeScript types, ESLint plugins

### 1.3 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with all sections
│   ├── globals.css         # Tailwind imports + custom styles
│   └── fonts/              # Local font files (Inter, Space Mono)
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Floating nav with theme toggle
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # Screen 1: 3D Lab
│   │   ├── Exhibition.tsx      # Screen 2: 3D Gallery
│   │   ├── Capabilities.tsx    # Screen 3: Bento Grid
│   │   └── Contact.tsx         # Screen 4: WhatsApp integration
│   ├── three/
│   │   ├── Scene.tsx           # Main R3F Canvas wrapper
│   │   ├── FloatingLogo.tsx    # Interactive "L" logo
│   │   ├── GalleryFrame.tsx    # 3D portfolio cards
│   │   ├── CameraRig.tsx       # Scroll-based camera
│   │   └── ParticleField.tsx   # Background particles
│   ├── ui/
│   │   ├── Button.tsx          # Glow effect button
│   │   ├── Glassmorphic.tsx    # Reusable glass panel
│   │   └── ThemeToggle.tsx
│   └── providers/
│       └── ThemeProvider.tsx   # Dark/Light mode context
├── hooks/
│   ├── useScrollProgress.ts    # Track scroll for 3D
│   ├── useMediaQuery.ts        # Responsive breakpoints
│   └── useMousePosition.ts     # 3D interactivity
├── lib/
│   ├── constants.ts            # Colors, breakpoints
│   └── utils.ts                # Helper functions
├── data/
│   ├── projects.ts             # Portfolio items
│   └── services.ts             # Services data
└── types/
    └── index.ts                # TypeScript definitions
public/
├── models/                     # .glb/.gltf 3D models
├── images/                     # Optimized .webp/.avif
└── textures/                   # 3D textures
```

---

## Phase 2: Design System & Styling

### 2.1 Color Palette Implementation

**CSS Variables (Tailwind config):**

```css
/* Light Mode */
--background: #F8F9FA;
--surface: #FFFFFF;
--text-primary: #2D3436;
--text-secondary: #636E72;
--accent-blue: #0984E3;
--accent-cyan: #00D2D3;
--accent-violet: #A29BFE;
--accent-amber: #FAB1A0;

/* Dark Mode */
--background: #0F0F12;
--surface: #1A1A2E;
--text-primary: #E8EEF0;
--text-secondary: #B2BEC3;
```

### 2.2 Typography

- **Primary Font**: Inter (body, readability)
- **Secondary Font**: Space Mono (headings, "lab" feel)
- **Variable fonts** for performance

### 2.3 Visual Effects

```css
/* Glow Effect */
.glow-cyan {
  filter: drop-shadow(0 0 8px rgba(0, 210, 211, 0.5));
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Phase 3: Screen Implementations

### Screen 1: Hero (The Lab)

**3D Elements:**
- Floating "L" logo (import logo SVG as 3D mesh)
- Glass sphere with refraction shader
- Particle field background
- Mouse-reactive rotation (useFrame hook)

**Features:**
- Tagline: "Where Creativity Meets Code"
- CTA: "Start Exploration" - smooth scroll to gallery
- Gradient overlay for text readability

### Screen 2: Exhibition (3D Gallery)

**Interaction Pattern: Option B - Floating Cloud**
- Floating glass cards in 3D space
- Scroll-controlled camera movement (ScrollControls from drei)
- Click to expand - fullscreen modal with project details
- Parallax depth on mouse movement

**Components:**
```
GalleryFrame.tsx:
- 3D plane with image texture
- Glass border effect
- Hover scale animation
- Click handler for modal
```

### Screen 3: Capabilities (Bento Grid)

**Layout:**
```
+---------------------+---------------+
|                     |               |
|    Brand Design     |               |
|                     |    Web Dev    |
+---------------------+               |
|                     |               |
|    Automation       |               |
|                     |               |
+---------------------+---------------+
```

**Features:**
- Animated counters
- Icon animations on hover
- Glassmorphic cards
- Staggered reveal on scroll

### Screen 4: Contact (Transmission)

**Minimalist Design:**
- Large "Let's Connect" headline
- WhatsApp button with glow effect
- Social links with hover animations
- Floating particles background

---

## Phase 4: 3D Implementation Details

### 4.1 Main Scene Setup

```tsx
// Scene.tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 75 }}
  dpr={[1, 2]} // Responsive pixel ratio
  gl={{ antialias: true, alpha: true }}
>
  <Suspense fallback={<Loader />}>
    <ScrollControls pages={4}>
      <SceneContent />
    </ScrollControls>
  </Suspense>
</Canvas>
```

### 4.2 Responsive 3D

- **Mobile**: Reduce particle count, simpler materials
- **Tablet**: Medium quality settings
- **Desktop**: Full effects, post-processing

### 4.3 Performance Optimizations

- `Preload` all textures and models
- `InstancedMesh` for particles
- `useLOD` for complex models
- Lazy load 3D scene (only when in viewport)
- Suspense boundaries with loading states

---

## Phase 5: Responsive Architecture

### Breakpoints

```ts
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Ultra-wide
};
```

### Mobile Adaptations

1. **Hero**: 3D object scales down, text stacks vertically
2. **Gallery**: Horizontal scroll instead of 3D navigation
3. **Services**: Single column Bento grid
4. **Contact**: Stacked buttons

### Touch Interactions

- Swipe gestures for gallery navigation
- Tap to expand project cards
- Pinch-to-zoom on 3D models

---

## Phase 6: Animation Strategy

### Framer Motion (UI)

```tsx
// Scroll-triggered animations
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
/>
```

### GSAP (3D Camera)

```ts
// Smooth camera transitions
gsap.to(camera.position, {
  x: targetX,
  duration: 1.5,
  ease: "power2.inOut"
});
```

---

## Phase 7: Development Checklist

### Setup Tasks
- [ ] Initialize Next.js with TypeScript + Tailwind
- [ ] Install all dependencies
- [ ] Configure Tailwind with custom colors/fonts
- [ ] Set up dark/light mode with next-themes
- [ ] Create component structure

### Asset Preparation
- [ ] Convert logo SVGs to 3D-friendly format
- [ ] Optimize images to WebP/AVIF
- [ ] Create or source 3D models (.glb)
- [ ] Prepare portfolio images (recommended: 3-5 art pieces, 3 top projects)

### Core Development
- [ ] Build Navigation with theme toggle
- [ ] Create 3D Scene wrapper
- [ ] Implement Hero with floating logo
- [ ] Build 3D Gallery with ScrollControls
- [ ] Create Bento Grid services section
- [ ] Build Contact with WhatsApp integration

### Polish & Optimization
- [ ] Add loading states/skeletons
- [ ] Implement responsive breakpoints
- [ ] Optimize 3D performance
- [ ] Add SEO metadata
- [ ] Test across devices/browsers
- [ ] Deploy to Vercel

---

## Tech Stack Summary

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D Engine | Three.js + React Three Fiber |
| 3D Helpers | @react-three/drei |
| Animations | Framer Motion + GSAP |
| Styling | Tailwind CSS |
| Theme | next-themes |
| Deployment | Vercel |

---

## Timeline Estimate

| Phase | Duration |
|-------|----------|
| Phase 1: Setup | 1 day |
| Phase 2: Design System | 1 day |
| Phase 3: Sections | 3-4 days |
| Phase 4: 3D Polish | 2 days |
| Phase 5: Responsive | 1 day |
| Phase 6: Testing & Deploy | 1 day |

**Total: 8-10 days** for a production-ready website.

---

## Company Profile (For About/SEO)

### Lexi's Lab: Where Creativity Meets Code

**Introduction**

In a digital-first world, a business is only as strong as its digital footprint. At Lexi's Lab, we bridge the gap between aesthetic brilliance and technical excellence. We don't just build tools; we build the engines that drive business growth.

**Our Philosophy**

We believe that small business owners and corporate leaders shouldn't be bogged down by repetitive, manual tasks. Our mission is to automate the mundane so you can focus on the monumental. We provide the "Market Edge" by replacing outdated manual processes with sleek, automated systems.

**What We Do**

- **Brand Design & Digital Art**: Creating visual identities that stick. From high-quality graphics to digital art that captures your brand's soul.
- **UI/UX & Web Design**: Beautiful, intuitive interfaces designed to convert visitors into loyal customers.
- **Web & Software Development**: High-performance websites and custom software built with a modern tech stack (React, TypeScript, Flutter) for speed and scalability.
- **Automation Tools**: Systems for customer acquisition, onboarding, and lead closing that work while you sleep.

**The Lexi's Lab Advantage**

- **Global Reach, Local Touch**: Based remotely, serving the world.
- **Agile & Iterative**: We don't just deliver and disappear. We iterate and adjust until the product is perfect.
- **Speed & Quality**: We offer the efficiency of a modern studio with the high-quality output of a major agency - without the bloated price tag.

---

## Resources & References

### Tutorials
- **Wawa Sensei** (YouTube) - React Three Fiber tutorials
- **Bruno Simon** (YouTube) - Three.js and 3D web development

### Tools
- **Spline** (spline.design) - 3D design tool for designers
- **Blender** - 3D modeling software
- **Poly Haven** - Free HDRIs and textures
- **Sketchfab** - 3D model marketplace

### Inspiration
- Apple product pages
- Linear.app
- Stripe.com
- Vercel.com
