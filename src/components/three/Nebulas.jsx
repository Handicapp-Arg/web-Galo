import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nubes de gas/nebulosa que flotan dentro del túnel.
 * Crean profundidad atmosférica y sensación de estar viajando a través del espacio.
 */
export default function Nebulas({ scrollRef }) {
  const groupRef = useRef();

  const nebulas = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 6;
      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -10 - i * 16,
        ],
        scale: 3 + Math.random() * 5,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.06,
        color: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#4ade80' : '#15803d',
      });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const speed = 5 + (scrollRef.current || 0) * 30;

    groupRef.current.children.forEach((child, i) => {
      const neb = nebulas[i];
      child.position.z += speed * delta;
      child.rotation.z += neb.speed * delta * 0.3;

      // Reciclar
      if (child.position.z > 10) {
        child.position.z = -200;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nebulas.map((neb, i) => (
        <mesh key={i} position={neb.position}>
          <planeGeometry args={[neb.scale, neb.scale]} />
          <meshBasicMaterial
            color={neb.color}
            transparent
            opacity={neb.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
