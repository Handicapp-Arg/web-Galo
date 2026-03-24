import React from 'react';

/**
 * Renderiza el cursor personalizado (punto + anillo seguidor).
 * La lógica de animación vive en useCustomCursor — este componente
 * es puro presentacional: solo recibe refs y las adjunta al DOM.
 */
export default function CustomCursor({ cursorRef, cursorFollowerRef }) {
  return (
    <>
      {/* Punto central — sigue al mouse de forma instantánea */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-green-400 rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1 -mt-1 hidden md:block"
      />
      {/* Anillo seguidor — sigue con retraso LERP */}
      <div
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-green-500 rounded-full pointer-events-none z-[9998] mix-blend-difference -ml-4 -mt-4 transition-transform duration-200 ease-out hidden md:block"
      />
    </>
  );
}
