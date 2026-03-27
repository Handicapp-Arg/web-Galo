import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Tubo semitransparente que forma las paredes del túnel.
 * Se mueve con un efecto de "wireframe" luminoso para dar sensación de velocidad.
 */
export default function TunnelTube({ scrollRef }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const geometry = useMemo(() => {
    // Crear una curva que va hacia adelante en Z
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      // Leves ondulaciones para que el túnel no sea perfectamente recto
      const x = Math.sin(t * Math.PI * 4) * 0.8;
      const y = Math.cos(t * Math.PI * 3) * 0.5;
      const z = -t * 200;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 200, 8, 16, false);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      // Animar el offset de la textura para dar sensación de movimiento
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScroll.value = scrollRef.current || 0;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uColor: { value: new THREE.Color('#22c55e') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDistance;
        void main() {
          vUv = uv;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vDistance = -mvPos.z;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec3 uColor;
        varying vec2 vUv;
        varying float vDistance;

        void main() {
          // Grid lines que se mueven
          float gridX = abs(sin(vUv.x * 32.0)) ;
          float gridY = abs(sin((vUv.y * 200.0) + uTime * 2.0 + uScroll * 10.0));
          float grid = max(
            smoothstep(0.95, 1.0, gridX),
            smoothstep(0.96, 1.0, gridY)
          );

          // Fade out con la distancia
          float distanceFade = 1.0 - smoothstep(0.0, 150.0, vDistance);

          // Glow en los bordes
          float edgeGlow = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);

          float alpha = grid * distanceFade * 0.25 * edgeGlow;
          vec3 color = uColor * (1.0 + grid * 0.5);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} material={shaderMaterial}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}
