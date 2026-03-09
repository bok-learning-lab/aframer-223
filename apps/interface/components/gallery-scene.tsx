"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FloatingImage } from "./floating-image";

const images = [
  { src: "/photos/Unknown.jpeg", position: [-4, 2, -3] as const },
  { src: "/photos/Unknown-1.jpeg", position: [3, 1, -5] as const },
  { src: "/photos/Unknown-2.jpeg", position: [-2, -1, -7] as const },
  { src: "/photos/Unknown-3.jpeg", position: [5, 3, -2] as const },
  { src: "/photos/Unknown-4.jpeg", position: [-6, 0, -4] as const },
  { src: "/photos/Unknown-5.jpeg", position: [1, -2, -6] as const },
  { src: "/photos/Unknown-6.jpeg", position: [-3, 3, -8] as const },
  { src: "/photos/Unknown-7.jpeg", position: [4, -1, -3] as const },
  { src: "/photos/Unknown-8.jpeg", position: [-1, 2, -5] as const },
  { src: "/photos/Unknown-9.jpeg", position: [6, 0, -7] as const },
  { src: "/photos/Unknown-10.jpeg", position: [-5, -2, -2] as const },
  { src: "/photos/Unknown-11.jpeg", position: [2, 3, -9] as const },
  { src: "/photos/Unknown-12.jpeg", position: [-4, 1, -6] as const },
  { src: "/photos/Unknown-13.jpeg", position: [3, -3, -4] as const },
  { src: "/photos/Unknown-14.jpeg", position: [0, 0, -10] as const },
];

export function GalleryScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={20}
      />

      <Suspense fallback={null}>
        {images.map((img, i) => (
          <FloatingImage key={i} src={img.src} position={img.position} />
        ))}
      </Suspense>
    </Canvas>
  );
}
