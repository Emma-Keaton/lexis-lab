// FloatingShapes - Wireframe geometric sculptures for depth

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  rotationSpeed: number;
  geometry: 'icosahedron' | 'octahedron' | 'tetrahedron';
  color: string;
  scale: number;
}

function FloatingShape({ position, rotationSpeed, geometry, color, scale }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Very slow rotation (one full rotation every 30-60 seconds)
      meshRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.3;
      meshRef.current.rotation.y = time * rotationSpeed * 0.5;
      meshRef.current.rotation.z = Math.cos(time * rotationSpeed) * 0.2;
    }
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(scale, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(scale, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(scale, 0);
      default:
        return new THREE.IcosahedronGeometry(scale, 0);
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Theme-aware colors
  const color1 = isDark ? '#00D2D3' : '#2D3436';
  const color2 = isDark ? '#A29BFE' : '#636E72';
  const color3 = isDark ? '#0984E3' : '#636E72';
  
  // Floating shapes spread throughout the hallway
  // Original 8 shapes between the card rows
  const shapes = useMemo(() => [
    { position: [-8, 3, -10] as [number, number, number], rotationSpeed: 0.02, geometry: 'icosahedron' as const, color: color1, scale: 0.8 },
    { position: [8, -2, -15] as [number, number, number], rotationSpeed: 0.025, geometry: 'octahedron' as const, color: color2, scale: 1.0 },
    { position: [-8, -3, -20] as [number, number, number], rotationSpeed: 0.018, geometry: 'tetrahedron' as const, color: color1, scale: 0.6 },
    { position: [8, 4, -25] as [number, number, number], rotationSpeed: 0.022, geometry: 'icosahedron' as const, color: color2, scale: 0.9 },
    { position: [-8, 2, -30] as [number, number, number], rotationSpeed: 0.015, geometry: 'octahedron' as const, color: color1, scale: 0.7 },
    { position: [8, -4, -35] as [number, number, number], rotationSpeed: 0.02, geometry: 'tetrahedron' as const, color: color3, scale: 0.8 },
    { position: [-8, -5, -40] as [number, number, number], rotationSpeed: 0.017, geometry: 'icosahedron' as const, color: color2, scale: 0.9 },
    { position: [8, 3, -45] as [number, number, number], rotationSpeed: 0.023, geometry: 'octahedron' as const, color: color1, scale: 0.7 },
    // 6 new outer shapes - left side (beyond left card row at x: -3.5)
    { position: [-10, 1, -13] as [number, number, number], rotationSpeed: 0.019, geometry: 'octahedron' as const, color: color1, scale: 0.7 },
    { position: [-11, -2, -21] as [number, number, number], rotationSpeed: 0.021, geometry: 'tetrahedron' as const, color: color3, scale: 0.6 },
    { position: [-10, 4, -29] as [number, number, number], rotationSpeed: 0.016, geometry: 'icosahedron' as const, color: color2, scale: 0.8 },
    // 6 new outer shapes - right side (beyond right card row at x: 3.5)
    { position: [10, -3, -17] as [number, number, number], rotationSpeed: 0.024, geometry: 'tetrahedron' as const, color: color1, scale: 0.65 },
    { position: [11, 2, -26] as [number, number, number], rotationSpeed: 0.018, geometry: 'octahedron' as const, color: color3, scale: 0.75 },
    { position: [10, -5, -34] as [number, number, number], rotationSpeed: 0.02, geometry: 'icosahedron' as const, color: color2, scale: 0.85 },
  ], [color1, color2, color3]);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.position}
          rotationSpeed={shape.rotationSpeed}
          geometry={shape.geometry}
          color={shape.color}
          scale={shape.scale}
        />
      ))}
    </group>
  );
}
