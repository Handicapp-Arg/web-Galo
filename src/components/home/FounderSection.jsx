import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FOUNDER_PHOTO_URL = 'https://res.cloudinary.com/dh2m9ychv/image/upload/v1774279458/NEnrique_kksn1x.png';
const BG_URL = 'https://res.cloudinary.com/dh2m9ychv/image/upload/v1774279421/Fondo_2_z1f9md.png';

export default function FounderSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Fondo triángulo verde */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_URL})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Título centrado */}
        <h2 className="reveal text-4xl md:text-5xl font-black tracking-tight text-white text-center mb-12">
          Acerca de <span className="text-[#22c55e]">GALO</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">

          {/* Foto grande */}
          <div className="reveal-left flex-shrink-0">
            <img
              src={FOUNDER_PHOTO_URL}
              alt="Nicolás Enrique"
              className="w-64 md:w-[380px] h-auto object-contain"
            />
          </div>

          {/* Bio */}
          <div className="reveal-right flex-1">
            <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-2">FUNDADOR</p>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Nicolás Enrique</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed text-justify">
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
                importante empresa industrial de Misiones, un desafío que consolidó mi expertise
                en gestión y comunicación.
              </p>
              <p>
                Hoy, como fundador de "Galo Marketing", fusiono creatividad, visión estratégica y
                pasión por ayudar a las marcas a alcanzar su máximo potencial. Soy un soñador
                comprometido con la excelencia, siempre buscando soluciones que marquen la diferencia.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
