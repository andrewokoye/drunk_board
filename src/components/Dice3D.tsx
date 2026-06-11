"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Dice3DProps {
  value: number | null;
}

export default function Dice3D({ value }: Dice3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const spinRef = useRef(0);

  useEffect(() => {
    if (value !== null) {
      spinRef.current = Math.PI * 4; // spin 2 full turns
    }
  }, [value]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (spinRef.current > 0) {
      const step = Math.min(spinRef.current, delta * 6);
      meshRef.current.rotation.x += step;
      meshRef.current.rotation.y += step * 0.7;
      spinRef.current -= step;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 3, 6]} castShadow>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
