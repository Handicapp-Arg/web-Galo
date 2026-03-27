import React from 'react';
import { Canvas } from '@react-three/fiber';

import ImmersiveScene from './ImmersiveScene';

/**
 * Canvas 3D React Three Fiber — experiencia inmersiva sci-fi del túnel.
 * Fixed a pantalla completa, controlado por scroll progress.
 */
export default function TunnelCanvas({ scrollProgressRef, slides, opacity = 1 }) {
  return (
    <div
      className="fixed inset-0 w-full h-full z-10"
      style={{ opacity, transition: 'opacity 0.5s ease' }}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: '#020202' }}
      >
        <ImmersiveScene scrollProgressRef={scrollProgressRef} slides={slides} />
      </Canvas>
    </div>
  );
}
