import React from 'react';
import { MapPin, Phone } from 'lucide-react';

/**
 * Sección de contacto / footer.
 * Se posiciona al final del recorrido horizontal, tras los servicios.
 */
export default function ContactSection({ footerRef }) {
  return (
    <div
      ref={footerRef}
      className="absolute inset-0 flex items-center justify-center preserve-3d will-change-transform"
    >
      <div className="w-full max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Columna izquierda: info de contacto */}
        <div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white drop-shadow-lg">
            Trabajemos <br />
            <span className="text-green-500">Juntos.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md font-light">
            Estamos listos para transformar tus ideas en acciones efectivas. Escríbenos.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                <MapPin className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-1 font-bold">Encontranos en</h4>
                <p className="font-medium text-lg text-white">Av. Carlos Culmey N° 45, Misiones</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                <Phone className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-1 font-bold">Llámanos</h4>
                <p className="font-medium text-lg text-white">+54 9 3764 39-7618</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/10 blur-[80px] pointer-events-none" />
          <form className="relative w-full bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto">
            <h3 className="text-2xl font-bold mb-8 text-white">Escríbenos</h3>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Tu Nombre"
                className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-lg"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-lg"
              />
              <textarea
                rows={3}
                placeholder="¿En qué te ayudamos?"
                className="w-full bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors text-lg resize-none"
              />
              <button
                type="button"
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-5 rounded-xl transition-all text-sm uppercase tracking-[0.2em] mt-4"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
