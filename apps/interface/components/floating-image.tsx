"use client";

import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface WallImageProps {
  src: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  height?: number;
}

export function WallImage({
  src,
  position,
  rotation = [0, 0, 0],
  height = 1.8,
}: WallImageProps) {
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

  const planeWidth = height * aspect;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[planeWidth, height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
