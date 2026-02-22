// LightBeams - Subtle volumetric light rays for atmosphere

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export function LightBeams() {
  const beamsRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware beam colors and opacity
  const beamData = useMemo(() => {
    // Light mode: more saturated colors for visibility
    // Dark mode: vibrant cyberpunk colors
    const color1 = isDark ? '#00D2D3' : '#0984E3';
    const color2 = isDark ? '#A29BFE' : '#6C5CE7';
    return [
      { position: [-6, 8, -8] as [number, number, number], color: color1, rotation: [0.3, 0.2, 0] as [number, number, number] },
      { position: [6, 8, -12] as [number, number, number], color: color2, rotation: [0.3, -0.2, 0] as [number, number, number] },
      { position: [0, 8, -18] as [number, number, number], color: color1, rotation: [0.4, 0, 0] as [number, number, number] },
      { position: [-6, 8, -22] as [number, number, number], color: color2, rotation: [0.3, 0.1, 0] as [number, number, number] },
      { position: [6, 8, -26] as [number, number, number], color: color1, rotation: [0.3, -0.1, 0] as [number, number, number] },
    ];
  }, [isDark]);

  useFrame((state) => {
    if (beamsRef.current) {
      const time = state.clock.elapsedTime;
      beamsRef.current.children.forEach((beam, i) => {
        // Subtle swaying motion
        beam.rotation.z = beamData[i].rotation[2] + Math.sin(time * 0.3 + i) * 0.05;
      });
    }
  });

  return (
    <group ref={beamsRef}>
      {beamData.map((beam, i) => (
        <mesh
          key={i}
          position={beam.position}
          rotation={beam.rotation}
        >
          <coneGeometry args={[0.5, 15, 8, 1, true]} />
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={isDark ? 0.12 : 0.25}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
