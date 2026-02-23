// Scene - Main R3F Canvas wrapper

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { FloatingLogo } from './FloatingLogo';
import { ParticleField } from './ParticleField';
import { useMediaQuery } from '@/hooks/useMediaQuery';

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#00D2D3" wireframe />
    </mesh>
  );
}

function SceneContent() {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#A29BFE" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#00D2D3" />

      <FloatingLogo
        scale={isMobile ? 0.8 : 1}
        position={[0, 0, 0]}
      />

      <ParticleField count={isMobile ? 300 : 800} />

      <Environment preset="city" />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={<Loader />}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
