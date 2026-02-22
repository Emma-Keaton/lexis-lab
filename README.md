# Lexi's Lab | Where Creativity Meets Code

A digital studio bridging aesthetic brilliance and technical excellence. Lexi's Lab specializes in **Brand Design**, **Web Development**, and **Automation** solutions.

![Lexi's Lab](https://raw.githubusercontent.com/Emma-Keaton/lexis-lab/main/public/images/logo1.png)

## Features

- 🎨 **Exhibition Gallery** – Explore a curated collection of visual artistry and creative expression
- 🌐 **Responsive Design** – Seamless experience across desktop and mobile devices
- 🌓 **Dark/Light Mode** – Adaptive theming with smooth transitions
- ⚡ **3D Experiences** – Immersive 3D scenes on desktop (Three.js + React Three Fiber)
- 📱 **Touch-Optimized** – Built for mobile-first interactions
- ♿ **Accessible** – WCAG-compliant design patterns

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animations** | Framer Motion, GSAP |
| **Smooth Scroll** | Lenis |
| **Theming** | next-themes |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Emma-Keaton/lexis-lab.git
cd lexis-lab

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
lexis-lab/
├── src/
│   ├── app/              # Next.js App Router pages & layout
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Navigation, Footer
│   │   ├── sections/     # Page sections (Hero, Exhibition, etc.)
│   │   └── ui/           # Base UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities & constants
│   ├── types/            # TypeScript type definitions
│   └── data/             # Static data (projects, etc.)
├── public/               # Static assets
├── assets/               # Source assets (images, models)
└── docs/                 # Documentation
```

## Configuration

### SEO Settings

Edit `src/lib/constants.ts` to update:

- Site title & description
- Open Graph metadata
- Social media links

### Theme Colors

Customize the color palette in `src/app/globals.css`:

```css
:root {
  --background: #F8F9FA;
  --accent-cyan: #00D2D3;
  --accent-violet: #A29BFE;
  /* ... */
}
```

## Deployment

### Vercel (Recommended)

The app is deployed at [https://lexis-lab-pi.vercel.app](https://lexis-lab-pi.vercel.app)

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`

### Manual Hosting

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT © 2026 Lexi's Lab

---

**Built with** ❤️ **by Lexi's Lab**
