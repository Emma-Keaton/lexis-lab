// FloatingLogo - Interactive 3D logo that reacts to mouse

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

interface FloatingLogoProps {
  position?: [number, number, number];
  scale?: number;
}

export function FloatingLogo({ position = [0, 0, 0], scale = 1 }: FloatingLogoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  // Create gradient material
  const gradientMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00D2D3',
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth mouse following
    const targetRotationY = normalizedX * 0.3;
    const targetRotationX = -normalizedY * 0.3;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY,
      delta * 2
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      delta * 2
    );
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group position={position} scale={scale}>
        {/* Main Logo Shape - Abstract "L" */}
        <mesh ref={meshRef} material={gradientMaterial}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
        </mesh>

        {/* Base of "L" */}
        <mesh position={[0.35, -0.45, 0]} material={gradientMaterial}>
          <boxGeometry args={[0.7, 0.3, 0.3]} />
        </mesh>

        {/* Glass Sphere Orb */}
        <mesh position={[0, 0, 0.5]} scale={0.4}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropicBlur={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            transmission={0.95}
            color="#00D2D3"
          />
        </mesh>

        {/* Glow ring */}
        <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00D2D3"
            emissive="#00D2D3"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}
