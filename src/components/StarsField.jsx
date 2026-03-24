import React from 'react';

/**
 * Campo de partículas del hiperespacio.
 * Renderiza los puntos y la esfera de resplandor ambiental.
 * Los elementos son registrados en starsRef para que use3DScrollEngine
 * los mueva directamente sin pasar por el estado de React.
 */
export default function StarsField({ stars, starsRef }) {
  return (
    <>
      {stars.map((_, i) => (
        <div
          key={`star-${i}`}
          ref={(el) => { starsRef.current[i] = el; }}
          className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
          style={{ transformStyle: 'preserve-3d' }}
        />
      ))}

      {/* Resplandor ambiental verde ubicado al fondo del túnel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-green-500/10 rounded-full blur-[150px] preserve-3d"
        style={{ transform: 'translateZ(-2000px)' }}
      />
    </>
  );
}
