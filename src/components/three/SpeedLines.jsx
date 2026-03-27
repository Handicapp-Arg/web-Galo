import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Líneas de velocidad estilo hiperespacio.
 * Se estiran según la velocidad de scroll para dar sensación de aceleración.
 */
export default function SpeedLines({ count = 300, scrollRef }) {
  const meshRef = useRef();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 6); // 2 verts por línea
    const vel = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 12;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -Math.random() * 200;

      // Start point
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;
      // End point (slightly behind)
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = z - 0.5;

      vel[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array;

    const scrollSpeed = scrollRef.current || 0;
    const baseSpeed = 15;
    const speed = baseSpeed + scrollSpeed * 60;
    // Estiramiento dinámico: más scroll = líneas más largas
    const stretch = 0.3 + scrollSpeed * 3;

    for (let i = 0; i < count; i++) {
      const v = velocities[i];
      const dz = speed * v * delta;

      arr[i * 6 + 2] += dz;
      arr[i * 6 + 5] = arr[i * 6 + 2] - stretch * v;

      if (arr[i * 6 + 2] > 10) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.5 + Math.random() * 12;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        arr[i * 6] = x;
        arr[i * 6 + 1] = y;
        arr[i * 6 + 2] = -200;
        arr[i * 6 + 3] = x;
        arr[i * 6 + 4] = y;
        arr[i * 6 + 5] = -200 - stretch * v;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count * 2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4ade80"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
