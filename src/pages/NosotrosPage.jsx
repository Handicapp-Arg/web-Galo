import React from 'react';
import Layout from '../components/Layout';
import { useScrollReveal } from '../hooks/useScrollReveal';

const BG_TRIANGLE_URL =
  'https://res.cloudinary.com/dh2m9ychv/image/upload/v1774279421/Fondo_2_z1f9md.png';

const PILLARS = [
  {
    number: '1',
    title: 'Creatividad',
    desc: 'No es solo generar ideas originales; es encontrar soluciones innovadoras que conecten con el público y resalten la esencia de cada negocio.',
  },
  {
    number: '2',
    title: 'Planificación',
    desc: 'Creemos que las ideas más brillantes solo tienen éxito cuando están respaldadas por una sólida planificación. Desde la definición de objetivos hasta la ejecución detallada, nos aseguramos de que cada acción esté alineada con una visión clara y alcanzable.',
  },
  {
    number: '3',
    title: 'Estrategia',
    desc: 'Es el corazón de todo lo que hacemos. Analizamos datos, estudiamos el mercado y entendemos a tus clientes para crear planes que maximicen resultados.',
  },
];

export default function NosotrosPage() {
  const sectionRef = useScrollReveal();

  return (
    <Layout>

      {/* ── Una sola sección con fondo triángulo ──────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative px-6 md:px-16 pt-12 pb-24 overflow-hidden"
      >
        {/* Imagen de fondo: triángulo verde */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_TRIANGLE_URL})` }}
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-[1100px] mx-auto">

          {/* ── Nuestros Pilares ── */}
          <h1 className="reveal text-center text-5xl md:text-6xl font-black text-white mb-16 tracking-tight">
            Nuestros Pilares
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-28">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.title} className={`reveal delay-${i * 200 + 100}`}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[#eab308] font-black text-6xl leading-none">
                    {pillar.number}
                  </span>
                  <span className="text-white font-black text-2xl">{pillar.title}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-justify">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── GALO ── */}
          <div className="max-w-[900px] mx-auto text-center">

            <h2 className="reveal text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              GALO
            </h2>
            <p className="reveal delay-100 text-gray-400 text-base mb-14">
              Surge de la unión de dos conceptos inspiradores:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              {/* El Triángulo */}
              <div className="reveal delay-200 flex flex-col items-center">
                <div className="w-40 h-40 mb-6 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/dh2m9ychv/image/upload/v1774438389/TRIANGULO_pu0yul.svg"
                    alt="El Triángulo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-3 text-center">
                  EL TRÍANGULO
                </p>
                <p className="text-gray-400 text-sm leading-relaxed text-center">
                  Figura que representa los pilares de la consultora: la creatividad,
                  la planificación y la estrategia.
                </p>
              </div>

              {/* La Gaviota */}
              <div className="reveal delay-300 flex flex-col items-center">
                <div className="w-40 h-40 mb-6 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/dh2m9ychv/image/upload/v1774437552/GAVIOTA_ivmdyn.svg"
                    alt="La Gaviota"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-3 text-center">
                  LA GAVIOTA
                </p>
                <p className="text-gray-400 text-sm leading-relaxed text-center">
                  Inspirada en 'Juan Salvador Gaviota', que encarna la libertad y
                  la superación constante.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </Layout>
  );
}
