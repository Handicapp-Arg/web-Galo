import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import TunnelParticles from './TunnelParticles';
import TunnelTube from './TunnelTube';
import SpeedLines from './SpeedLines';
import Nebulas from './Nebulas';
import PortalRing from './PortalRing';
import HoloSlide from './HoloSlide';
import EnergyBeams from './EnergyBeams';

// Posiciones Z de cada slide dentro del túnel
const SLIDE_POSITIONS = [
  [0, 0, -20],
  [0, 0, -48],
  [0, 0, -76],
];

/**
 * Escena 3D inmersiva sci-fi.
 * Cámara viaja por un túnel con portales de energía, slides holográficos,
 * partículas de hiperespacio y rayos de energía helicoidales.
 */
export default function ImmersiveScene({ scrollProgressRef, slides }) {
  const { camera } = useThree();
  const scrollVelocityRef = useRef(0);
  const prevProgress = useRef(0);
  const smoothCam = useRef({ z: 0 });
  const cameraZRef = useRef(0);

  const baseFov = 75;

  useFrame((state, delta) => {
    const progress = scrollProgressRef.current || 0;

    // Velocidad de scroll
    const velocity = Math.abs(progress - prevProgress.current) / Math.max(delta, 0.001);
    scrollVelocityRef.current += (velocity - scrollVelocityRef.current) * 0.1;
    prevProgress.current = progress;

    // Viaje de cámara: 0 → -90 en Z (recorre los 3 portales)
    const targetZ = -progress * 90;
    smoothCam.current.z += (targetZ - smoothCam.current.z) * 0.06;

    const t = state.clock.elapsedTime;

    // Breathing orgánico
    camera.position.z = smoothCam.current.z;
    camera.position.x = Math.sin(t * 0.15) * 0.25;
    camera.position.y = Math.cos(t * 0.12) * 0.15;
    camera.rotation.x = Math.sin(t * 0.25) * 0.015;
    camera.rotation.y = Math.cos(t * 0.18) * 0.01;

    // Actualizar ref de posición de cámara para otros componentes
    cameraZRef.current = smoothCam.current.z;

    // FOV warp dinámico
    const targetFov = baseFov + Math.min(scrollVelocityRef.current * 25, 30);
    camera.fov += (targetFov - camera.fov) * 0.05;
    camera.updateProjectionMatrix();
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 30, 150]} />

      <ambientLight intensity={0.08} color="#4ade80" />

      {/* Luces en cada portal */}
      {SLIDE_POSITIONS.map((pos, i) => (
        <pointLight
          key={`light-${i}`}
          position={[0, 0, pos[2]]}
          intensity={3}
          color="#22c55e"
          distance={30}
        />
      ))}

      {/* Luz frontal lejana */}
      <pointLight position={[0, 0, -100]} intensity={1.5} color="#15803d" distance={60} />

      {/* Túnel wireframe */}
      <TunnelTube scrollRef={scrollVelocityRef} />

      {/* Rayos de energía helicoidales (ADN) */}
      <EnergyBeams scrollRef={scrollVelocityRef} />

      {/* Partículas del hiperespacio */}
      <TunnelParticles count={1800} scrollRef={scrollVelocityRef} />

      {/* Líneas de velocidad */}
      <SpeedLines count={300} scrollRef={scrollVelocityRef} />

      {/* Nebulosas */}
      <Nebulas scrollRef={scrollVelocityRef} />

      {/* ── Portales y slides holográficos ─────────────────────────────────────── */}
      {slides.map((slide, i) => (
        <React.Fragment key={i}>
          {/* Anillo portal de energía */}
          <PortalRing position={SLIDE_POSITIONS[i]} cameraZRef={cameraZRef} />

          {/* Contenido holográfico */}
          <HoloSlide
            slide={slide}
            position={SLIDE_POSITIONS[i]}
            index={i}
            cameraZRef={cameraZRef}
          />
        </React.Fragment>
      ))}
    </>
  );
}
