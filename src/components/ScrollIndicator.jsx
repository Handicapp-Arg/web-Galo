import React from 'react';

/**
 * Indicador visual de "scroll para continuar".
 * Se desvanece automáticamente al primer movimiento de scroll.
 * La opacidad es controlada por use3DScrollEngine.
 */
export default function ScrollIndicator({ opacity }) {
  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 transition-opacity duration-300 pointer-events-none"
      style={{ opacity }}
    >
      <span className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-4">Adéntrate</span>
      <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-green-400 animate-[scroll-down_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
