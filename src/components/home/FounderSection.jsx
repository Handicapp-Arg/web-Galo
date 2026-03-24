import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// TODO: Reemplazar con la URL real de Cloudinary de la foto del fundador
const FOUNDER_PHOTO_URL = null;

export default function FounderSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Fondo con resplandor verde */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-14">
          <h2 className="reveal text-4xl md:text-5xl font-black tracking-tight text-white">
            Acerca de <span className="text-[#22c55e]">GALO</span>
          </h2>
        </div>

        {/* Contenido: foto + bio */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Foto */}
          <div className="reveal-left flex-shrink-0">
            <div className="relative w-64 h-72 md:w-80 md:h-96">
              {/* Glow detrás */}
              <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-2xl scale-110" />
              {FOUNDER_PHOTO_URL ? (
                <img
                  src={FOUNDER_PHOTO_URL}
                  alt="Nicolás Enrique"
                  className="relative w-full h-full object-cover rounded-3xl border border-white/10"
                />
              ) : (
                <div className="relative w-full h-full bg-gradient-to-b from-[#0f2010] to-[#0a0a0a] rounded-3xl border border-white/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="reveal-right flex-1 max-w-2xl">
            <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-2">FUNDADOR</p>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Nicolás Enrique</h3>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <p>
                Licenciado en Comercialización con 8 años de experiencia en el apasionante
                mundo del marketing.
              </p>
              <p>
                Mi recorrido profesional abarca desde los primeros pasos como pasante en una
                prestigiosa consultora de marketing de Posadas, hasta roles clave como
                ejecutivo de cuentas, donde adquirí una visión integral del sector.
              </p>
              <p>
                Tuve el honor de ser parte del equipo ganador del programa Naves 2017, lo que
                fortaleció mi capacidad para desarrollar proyectos innovadores y estratégicos.
                Además, fui responsable de establecer y liderar el área de marketing en una
                importante empresa industrial de Misiones.
              </p>
              <p>
                Hoy, como fundador de "Galo Marketing", fusiono creatividad, visión estratégica y
                pasión por ayudar a las marcas a alcanzar su máximo potencial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
