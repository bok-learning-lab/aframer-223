"use client";

import { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { WallImage } from "./floating-image";
import * as THREE from "three";

// ─── Layout constants ────────────────────────────────────────────
const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.15;
const CORRIDOR_WIDTH = 5;
const ALCOVE_DEPTH = 3;
const ALCOVE_WIDTH = 4;
const ALCOVE_GAP = 1.5; // gap between alcoves (openings)
const NUM_ALCOVES = 7;
const GALLERY_LENGTH =
  NUM_ALCOVES * ALCOVE_WIDTH + (NUM_ALCOVES + 1) * ALCOVE_GAP;
const HALF_CORRIDOR = CORRIDOR_WIDTH / 2;
const NORTH_Z = -HALF_CORRIDOR;
const SOUTH_Z = HALF_CORRIDOR;
const EYE_HEIGHT = 1.5;

const EDGE_COLOR = "#64748b";
const EDGE_OPACITY = 0.9;

// ─── Wall component ─────────────────────────────────────────────
function Wall({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(...size);
    return new THREE.EdgesGeometry(geo);
  }, [size]);

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={EDGE_OPACITY} depthTest={false} />
      </lineSegments>
    </group>
  );
}

// ─── Floor ───────────────────────────────────────────────────────
function Floor() {
  const floorW = GALLERY_LENGTH + 4;
  const floorD = CORRIDOR_WIDTH + ALCOVE_DEPTH * 2 + 4;
  const edges = useMemo(() => {
    const geo = new THREE.PlaneGeometry(floorW, floorD);
    return new THREE.EdgesGeometry(geo);
  }, [floorW, floorD]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[GALLERY_LENGTH / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[floorW, floorD]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={EDGE_OPACITY} depthTest={false} />
      </lineSegments>
    </group>
  );
}

// ─── Ceiling ─────────────────────────────────────────────────────
function Ceiling() {
  const ceilW = GALLERY_LENGTH + 4;
  const ceilD = CORRIDOR_WIDTH + ALCOVE_DEPTH * 2 + 4;
  const edges = useMemo(() => {
    const geo = new THREE.PlaneGeometry(ceilW, ceilD);
    return new THREE.EdgesGeometry(geo);
  }, [ceilW, ceilD]);

  return (
    <group rotation={[Math.PI / 2, 0, 0]} position={[GALLERY_LENGTH / 2, WALL_HEIGHT, 0]}>
      <mesh>
        <planeGeometry args={[ceilW, ceilD]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={EDGE_COLOR} transparent opacity={EDGE_OPACITY} depthTest={false} />
      </lineSegments>
    </group>
  );
}

// ─── Build the maze walls ────────────────────────────────────────
function MazeWalls() {
  const walls: { position: [number, number, number]; size: [number, number, number] }[] = [];
  const wallY = WALL_HEIGHT / 2;

  // West end wall (x = 0)
  walls.push({
    position: [0, wallY, 0],
    size: [WALL_THICKNESS, WALL_HEIGHT, CORRIDOR_WIDTH + ALCOVE_DEPTH * 2 + WALL_THICKNESS * 2],
  });

  // East end wall (x = GALLERY_LENGTH)
  walls.push({
    position: [GALLERY_LENGTH, wallY, 0],
    size: [WALL_THICKNESS, WALL_HEIGHT, CORRIDOR_WIDTH + ALCOVE_DEPTH * 2 + WALL_THICKNESS * 2],
  });

  // North and south outer walls (long walls running east-west)
  const outerNorthZ = -(HALF_CORRIDOR + ALCOVE_DEPTH);
  const outerSouthZ = HALF_CORRIDOR + ALCOVE_DEPTH;
  walls.push({
    position: [GALLERY_LENGTH / 2, wallY, outerNorthZ],
    size: [GALLERY_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
  });
  walls.push({
    position: [GALLERY_LENGTH / 2, wallY, outerSouthZ],
    size: [GALLERY_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
  });

  // Alcove divider walls (perpendicular walls creating alcoves)
  for (let i = 0; i <= NUM_ALCOVES; i++) {
    const x = ALCOVE_GAP / 2 + i * (ALCOVE_WIDTH + ALCOVE_GAP);

    // North side dividers
    walls.push({
      position: [x, wallY, -(HALF_CORRIDOR + ALCOVE_DEPTH / 2)],
      size: [WALL_THICKNESS, WALL_HEIGHT, ALCOVE_DEPTH],
    });

    // South side dividers
    walls.push({
      position: [x, wallY, HALF_CORRIDOR + ALCOVE_DEPTH / 2],
      size: [WALL_THICKNESS, WALL_HEIGHT, ALCOVE_DEPTH],
    });
  }

  // North corridor wall (with openings for alcoves)
  // South corridor wall (with openings for alcoves)
  for (let i = 0; i <= NUM_ALCOVES; i++) {
    // Segments between alcove openings
    const segStart = i === 0 ? 0 : ALCOVE_GAP / 2 + (i - 1) * (ALCOVE_WIDTH + ALCOVE_GAP) + ALCOVE_WIDTH;
    const segEnd = ALCOVE_GAP / 2 + i * (ALCOVE_WIDTH + ALCOVE_GAP);
    const segLength = segEnd - segStart;

    if (segLength > 0.1) {
      const segCenter = (segStart + segEnd) / 2;

      // North corridor wall segment
      walls.push({
        position: [segCenter, wallY, NORTH_Z],
        size: [segLength, WALL_HEIGHT, WALL_THICKNESS],
      });
      // South corridor wall segment
      walls.push({
        position: [segCenter, wallY, SOUTH_Z],
        size: [segLength, WALL_HEIGHT, WALL_THICKNESS],
      });
    }
  }

  // Final segment after last alcove
  {
    const segStart = ALCOVE_GAP / 2 + (NUM_ALCOVES - 1) * (ALCOVE_WIDTH + ALCOVE_GAP) + ALCOVE_WIDTH;
    const segEnd = GALLERY_LENGTH;
    const segLength = segEnd - segStart;
    if (segLength > 0.1) {
      const segCenter = (segStart + segEnd) / 2;
      walls.push({
        position: [segCenter, wallY, NORTH_Z],
        size: [segLength, WALL_HEIGHT, WALL_THICKNESS],
      });
      walls.push({
        position: [segCenter, wallY, SOUTH_Z],
        size: [segLength, WALL_HEIGHT, WALL_THICKNESS],
      });
    }
  }

  return (
    <>
      {walls.map((w, i) => (
        <Wall key={i} position={w.position} size={w.size} />
      ))}
    </>
  );
}

// ─── Image placements on alcove back walls ───────────────────────
const imageSources = [
  "/photos/Unknown.jpeg",
  "/photos/Unknown-1.jpeg",
  "/photos/Unknown-2.jpeg",
  "/photos/Unknown-3.jpeg",
  "/photos/Unknown-4.jpeg",
  "/photos/Unknown-5.jpeg",
  "/photos/Unknown-6.jpeg",
  "/photos/Unknown-7.jpeg",
  "/photos/Unknown-8.jpeg",
  "/photos/Unknown-9.jpeg",
  "/photos/Unknown-10.jpeg",
  "/photos/Unknown-11.jpeg",
  "/photos/Unknown-12.jpeg",
  "/photos/Unknown-13.jpeg",
  "/photos/Unknown-14.jpeg",
];

function GalleryImages() {
  const placements: {
    src: string;
    position: [number, number, number];
    rotation: [number, number, number];
  }[] = [];

  for (let i = 0; i < NUM_ALCOVES; i++) {
    const alcoveCenterX =
      ALCOVE_GAP / 2 + i * (ALCOVE_WIDTH + ALCOVE_GAP) + ALCOVE_WIDTH / 2;

    // North alcove — image on back wall, facing south (+Z)
    if (i < imageSources.length) {
      placements.push({
        src: imageSources[i],
        position: [
          alcoveCenterX,
          EYE_HEIGHT,
          -(HALF_CORRIDOR + ALCOVE_DEPTH) + WALL_THICKNESS + 0.02,
        ],
        rotation: [0, 0, 0], // facing +Z (south, into corridor)
      });
    }

    // South alcove — image on back wall, facing north (-Z)
    const southIdx = NUM_ALCOVES + i;
    if (southIdx < imageSources.length) {
      placements.push({
        src: imageSources[southIdx],
        position: [
          alcoveCenterX,
          EYE_HEIGHT,
          HALF_CORRIDOR + ALCOVE_DEPTH - WALL_THICKNESS - 0.02,
        ],
        rotation: [0, Math.PI, 0], // facing -Z (north, into corridor)
      });
    }
  }

  // 15th image on the far east end wall
  if (placements.length < imageSources.length) {
    placements.push({
      src: imageSources[imageSources.length - 1],
      position: [GALLERY_LENGTH - WALL_THICKNESS - 0.02, EYE_HEIGHT, 0],
      rotation: [0, -Math.PI / 2, 0], // facing -X (west, toward viewer)
    });
  }

  return (
    <>
      {placements.map((p, i) => (
        <WallImage
          key={i}
          src={p.src}
          position={p.position}
          rotation={p.rotation}
        />
      ))}
    </>
  );
}

// ─── Lighting ────────────────────────────────────────────────────
function GalleryLighting() {
  const lights: [number, number, number][] = [];
  // Point lights along the corridor
  for (let i = 0; i < NUM_ALCOVES; i++) {
    const x =
      ALCOVE_GAP / 2 + i * (ALCOVE_WIDTH + ALCOVE_GAP) + ALCOVE_WIDTH / 2;
    lights.push([x, WALL_HEIGHT - 0.3, 0]);
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      {lights.map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          intensity={2}
          distance={10}
          decay={2}
          color="#ffffff"
        />
      ))}
    </>
  );
}

// ─── First-person movement ───────────────────────────────────────
function PlayerControls() {
  const { camera } = useThree();
  const keysRef = useRef(new Set<string>());
  const speed = 5;

  useEffect(() => {
    camera.position.set(2, EYE_HEIGHT, 0);

    const onKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.code);
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [camera]);

  useFrame((_, delta) => {
    const keys = keysRef.current;
    if (keys.size === 0) return;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const move = new THREE.Vector3();

    if (keys.has("KeyW") || keys.has("ArrowUp")) move.add(forward);
    if (keys.has("KeyS") || keys.has("ArrowDown")) move.sub(forward);
    if (keys.has("KeyA") || keys.has("ArrowLeft")) move.sub(right);
    if (keys.has("KeyD") || keys.has("ArrowRight")) move.add(right);

    if (move.length() > 0) {
      move.normalize().multiplyScalar(speed * delta);
      camera.position.add(move);
      camera.position.y = EYE_HEIGHT; // lock to eye height
    }
  });

  return <PointerLockControls />;
}

// ─── Floor grid for orientation (mesh strips for visible thickness) ──
const GRID_STRIP_WIDTH = 0.03;
const GRID_STRIP_HEIGHT = 0.005;
const GRID_COLOR = "#475569";
const GRID_EMISSIVE = "#334155";

function FloorGrid() {
  const extentX = GALLERY_LENGTH + 2;
  const extentZ = HALF_CORRIDOR + ALCOVE_DEPTH + 1;
  const strips: { pos: [number, number, number]; size: [number, number, number] }[] = [];

  // Lines along X (east-west)
  for (let z = -extentZ; z <= extentZ; z += 2) {
    strips.push({
      pos: [extentX / 2 - 0.5, GRID_STRIP_HEIGHT / 2, z],
      size: [extentX + 1, GRID_STRIP_HEIGHT, GRID_STRIP_WIDTH],
    });
  }
  // Lines along Z (north-south)
  for (let x = -1; x <= extentX; x += 2) {
    strips.push({
      pos: [x, GRID_STRIP_HEIGHT / 2, 0],
      size: [GRID_STRIP_WIDTH, GRID_STRIP_HEIGHT, extentZ * 2],
    });
  }

  return (
    <>
      {strips.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <boxGeometry args={s.size} />
          <meshStandardMaterial
            color={GRID_COLOR}
            emissive={GRID_EMISSIVE}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Scene ───────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <GalleryLighting />
      <Floor />
      <FloorGrid />
      <Ceiling />
      <MazeWalls />
      <GalleryImages />
      <PlayerControls />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────
export function GalleryScene() {
  return (
    <Canvas
      camera={{ position: [2, EYE_HEIGHT, 0], fov: 70 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
