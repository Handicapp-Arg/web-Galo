import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Rayos de energía helicoidales que conectan los portales a lo largo del túnel.
 * Crean un efecto de ADN/datos viajando entre estaciones.
 */
export default function EnergyBeams({ scrollRef }) {
  const helixRef1 = useRef();
  const helixRef2 = useRef();

  const helixGeo = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 16;
      const r = 6.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = -t * 200;
    }
    return { positions: pos, count };
  }, []);

  const helixGeo2 = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 16 + Math.PI;
      const r = 6.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = -t * 200;
    }
    return { positions: pos, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    [helixRef1, helixRef2].forEach((ref, hi) => {
      if (!ref.current) return;
      const arr = ref.current.geometry.attributes.position.array;
      const count = 600;
      for (let i = 0; i < count; i++) {
        const tt = i / count;
        const angle = tt * Math.PI * 16 + t * 2 + (hi * Math.PI);
        const r = 6.2 + Math.sin(t * 3 + i * 0.05) * 0.4;
        arr[i * 3] = Math.cos(angle) * r;
        arr[i * 3 + 1] = Math.sin(angle) * r;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      <points ref={helixRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={helixGeo.positions}
            count={helixGeo.count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#22c55e"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={helixRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={helixGeo2.positions}
            count={helixGeo2.count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4ade80"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
