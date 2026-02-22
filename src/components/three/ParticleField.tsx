// ParticleField - Animated background particles

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneConfig } from '@/lib/constants';

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

export function ParticleField({ 
  count = sceneConfig.particles.count,
  color = '#00D2D3' 
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  // Animation
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.02;
    points.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={sceneConfig.particles.size}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
