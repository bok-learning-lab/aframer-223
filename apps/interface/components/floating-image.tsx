"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface FloatingImageProps {
  src: string;
  position: readonly [number, number, number];
}

export function FloatingImage({ src, position }: FloatingImageProps) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null!);

  const img = texture.image as HTMLImageElement | undefined;
  const aspect = img ? img.width / img.height : 4 / 3;

  const planeHeight = 2;
  const planeWidth = planeHeight * aspect;

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], position[2]]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}
