"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface WallVideoProps {
  src: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  height?: number;
  maxWidth?: number;
  refDistance?: number;
  rolloffFactor?: number;
}

export function WallVideo({
  src,
  position,
  rotation = [0, 0, 0],
  height = 1.8,
  maxWidth,
  refDistance = 3,
  rolloffFactor = 1.5,
}: WallVideoProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const audioRef = useRef<THREE.PositionalAudio | null>(null);
  const sourceCreatedRef = useRef(false);
  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const { camera } = useThree();
  const [videoReady, setVideoReady] = useState(false);
  const [aspect, setAspect] = useState(16 / 9);

  const { video, texture } = useMemo(() => {
    const vid = document.createElement("video");
    vid.src = src;
    vid.crossOrigin = "anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";

    const tex = new THREE.VideoTexture(vid);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    return { video: vid, texture: tex };
  }, [src]);

  // Set up audio listener + positional audio
  useEffect(() => {
    let listener = camera.children.find(
      (c) => c instanceof THREE.AudioListener,
    ) as THREE.AudioListener | undefined;

    if (!listener) {
      listener = new THREE.AudioListener();
      camera.add(listener);
    }
    listenerRef.current = listener;

    let positionalAudio = audioRef.current;
    if (!positionalAudio) {
      positionalAudio = new THREE.PositionalAudio(listener);
      audioRef.current = positionalAudio;
    }

    if (!sourceCreatedRef.current) {
      positionalAudio.setMediaElementSource(video);
      sourceCreatedRef.current = true;
    }

    positionalAudio.setRefDistance(refDistance);
    positionalAudio.setRolloffFactor(rolloffFactor);
    positionalAudio.setDistanceModel("inverse");
    positionalAudio.setMaxDistance(50);
    positionalAudio.setVolume(3);

    if (meshRef.current && !meshRef.current.children.includes(positionalAudio)) {
      meshRef.current.add(positionalAudio);
    }

    return () => {
      if (meshRef.current && positionalAudio) {
        meshRef.current.remove(positionalAudio);
      }
    };
  }, [camera, video, refDistance, rolloffFactor]);

  // Unmute and resume AudioContext on user click
  useEffect(() => {
    const startAudio = () => {
      if (listenerRef.current) {
        listenerRef.current.context.resume();
      }
      video.muted = false;
      video.play().catch(() => {});
      setVideoReady(true);
    };

    video.play().then(() => {
      setVideoReady(true);
    }).catch(() => {});

    document.addEventListener("click", startAudio, { once: true });

    return () => {
      document.removeEventListener("click", startAudio);
      video.pause();
    };
  }, [video]);

  // Update aspect ratio
  useEffect(() => {
    const onMeta = () => {
      if (video.videoWidth && video.videoHeight) {
        setAspect(video.videoWidth / video.videoHeight);
      }
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.videoWidth) onMeta();
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [video]);

  // Drive spatial audio manually each frame:
  // Update both the panner (source) position AND the AudioContext listener
  // (ear) position from the camera, since Three.js skips these updates
  // when PositionalAudio.isPlaying is false.
  const _srcPos = useMemo(() => new THREE.Vector3(), []);
  const _camPos = useMemo(() => new THREE.Vector3(), []);
  const _fwd = useMemo(() => new THREE.Vector3(), []);
  const _up = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (videoReady && texture) {
      texture.needsUpdate = true;
    }

    const audio = audioRef.current;
    if (!audio?.panner || !meshRef.current) return;

    // Update sound source position (panner)
    meshRef.current.getWorldPosition(_srcPos);
    audio.panner.positionX.value = _srcPos.x;
    audio.panner.positionY.value = _srcPos.y;
    audio.panner.positionZ.value = _srcPos.z;

    // Update listener (ear) position + orientation from camera
    const ctx = audio.context;
    const listener = ctx.listener;
    camera.getWorldPosition(_camPos);
    camera.getWorldDirection(_fwd);
    camera.matrixWorld.extractBasis(new THREE.Vector3(), _up, new THREE.Vector3());

    if (listener.positionX) {
      listener.positionX.value = _camPos.x;
      listener.positionY.value = _camPos.y;
      listener.positionZ.value = _camPos.z;
      listener.forwardX.value = _fwd.x;
      listener.forwardY.value = _fwd.y;
      listener.forwardZ.value = _fwd.z;
      listener.upX.value = 0;
      listener.upY.value = 1;
      listener.upZ.value = 0;
    } else {
      listener.setPosition(_camPos.x, _camPos.y, _camPos.z);
      listener.setOrientation(_fwd.x, _fwd.y, _fwd.z, 0, 1, 0);
    }
  });

  let planeWidth = height * aspect;
  if (maxWidth && planeWidth > maxWidth) {
    planeWidth = maxWidth;
  }
  const planeHeight = planeWidth / aspect;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
