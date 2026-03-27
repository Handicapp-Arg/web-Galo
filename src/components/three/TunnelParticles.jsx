import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Campo de partículas que rodean el túnel.
 * Se mueven continuamente hacia la cámara para crear sensación de velocidad.
 */
export default function TunnelParticles({ count = 2000, scrollRef }) {
  const meshRef = useRef();

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const green = new THREE.Color('#4ade80');
    const white = new THREE.Color('#ffffff');
    const dimGreen = new THREE.Color('#166534');

    for (let i = 0; i < count; i++) {
      // Distribuir en un cilindro largo
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 15;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -Math.random() * 200;

      sz[i] = 0.5 + Math.random() * 2.0;

      // Mezcla de colores: mayoritariamente verde, algunas blancas
      const c = Math.random() > 0.8
        ? white
        : Math.random() > 0.5 ? green : dimGreen;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, sizes: sz, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array;

    // Velocidad base de las partículas + boost por scroll
    const speed = 8 + (scrollRef.current || 0) * 40;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += speed * delta;
      // Reciclar partículas que pasan la cámara
      if (arr[i * 3 + 2] > 10) {
        arr[i * 3 + 2] = -200;
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 15;
        arr[i * 3] = Math.cos(angle) * radius;
        arr[i * 3 + 1] = Math.sin(angle) * radius;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
