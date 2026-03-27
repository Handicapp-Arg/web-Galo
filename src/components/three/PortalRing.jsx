import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Anillo portal de energía sci-fi que enmarca cada slide.
 * Múltiples anillos concéntricos que rotan y pulsan con glow.
 */
export default function PortalRing({ position, cameraZRef }) {
  const groupRef = useRef();
  const innerRingRef = useRef();
  const outerRingRef = useRef();
  const runesRef = useRef();
  const pulseRef = useRef();
  const sparksRef = useRef();

  // Partículas orbitales alrededor del portal
  const sparks = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 5.5 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = 0;
    }
    return { positions: pos, count };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const camZ = cameraZRef.current || 0;
    const dist = Math.abs(camZ - position[2]);

    // Activación gradual: empieza a encenderse desde lejos (40 unidades)
    const activation = Math.max(0, 1 - dist / 40);
    // Curva cuadrática para que el encendido sea suave
    const smoothActivation = activation * activation;
    const glow = 0.05 + smoothActivation * 0.95;

    // Rotación de anillos
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.8;
      innerRingRef.current.material.opacity = glow * 0.7;
      innerRingRef.current.material.emissiveIntensity = activation * 3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.4;
      outerRingRef.current.material.opacity = glow * 0.5;
      outerRingRef.current.material.emissiveIntensity = activation * 2;
    }
    if (runesRef.current) {
      runesRef.current.rotation.z = t * 0.2;
      runesRef.current.material.opacity = glow * 0.4;
    }

    // Pulso de energía
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.15 * activation;
      pulseRef.current.scale.set(pulse, pulse, 1);
      pulseRef.current.material.opacity = activation * 0.3;
    }

    // Partículas orbitales
    if (sparksRef.current) {
      const arr = sparksRef.current.geometry.attributes.position.array;
      for (let i = 0; i < sparks.count; i++) {
        const baseAngle = (i / sparks.count) * Math.PI * 2;
        const angle = baseAngle + t * 1.5;
        const r = 5.2 + Math.sin(t * 4 + i) * 0.4;
        arr[i * 3] = Math.cos(angle) * r;
        arr[i * 3 + 1] = Math.sin(angle) * r;
        arr[i * 3 + 2] = Math.sin(t * 2 + i * 0.5) * 0.3;
      }
      sparksRef.current.geometry.attributes.position.needsUpdate = true;
      sparksRef.current.material.opacity = activation * 0.9;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Anillo interior — giro rápido */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[4.5, 0.06, 8, 64]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Anillo exterior — giro lento invertido */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[5.5, 0.04, 8, 80]} />
        <meshStandardMaterial
          color="#4ade80"
          emissive="#4ade80"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Anillo de "runas" — segmentos discontinuos */}
      <mesh ref={runesRef}>
        <torusGeometry args={[5.0, 0.02, 4, 24]} />
        <meshBasicMaterial
          color="#86efac"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Disco de pulso */}
      <mesh ref={pulseRef}>
        <ringGeometry args={[4.0, 6.0, 64]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Partículas orbitales */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={sparks.positions}
            count={sparks.count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4ade80"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Rayos de luz desde el centro del portal */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 4.8, Math.sin(angle) * 4.8, 0]} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.6, 0.02]} />
            <meshBasicMaterial
              color="#22c55e"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}
