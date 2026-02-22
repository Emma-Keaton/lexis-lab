// GridFloor - Subtle glowing grid for spatial reference

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware colors
  const gridColor = isDark ? '#00D2D3' : '#2D3436';
  const opacity = isDark ? 0.15 : 0.3;

  useFrame((state) => {
    if (gridRef.current) {
      // Subtle pulsing glow effect
      const time = state.clock.elapsedTime;
      const pulse = isDark ? 0.02 : 0.03;
      gridRef.current.material.opacity = opacity + Math.sin(time * 0.5) * pulse;
    }
  });

  return (
    <group position={[0, -12, -10]}>
      {/* Main grid */}
      <gridHelper
        ref={gridRef}
        args={[60, 60, gridColor, gridColor]}
        position={[0, 0.01, 0]}
      />
      
      {/* Glow plane below grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color={gridColor}
          transparent
          opacity={isDark ? 0.05 : 0.08}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
