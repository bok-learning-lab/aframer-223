"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingImageProps {
  src: string;
  position: readonly [number, number, number];
}

export function FloatingImage({ src, position }: FloatingImageProps) {
  const texture = useLoader(THREE.TextureLoader, src);
  const meshRef = useRef<THREE.Mesh>(null);
  const [aspect, setAspect] = useState(4 / 3);

  useEffect(() => {
    if (texture.image) {
      const img = texture.image as HTMLImageElement;
      if (img.width && img.height) {
        setAspect(img.width / img.height);
      }
    }
  }, [texture]);

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
