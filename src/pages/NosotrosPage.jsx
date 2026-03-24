import React from 'react';
import Layout from '../components/Layout';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

function PillarCard({ pillar, index }) {
  return (
    <div className={`reveal delay-${index * 200 + 100}`}>
      <div className="flex items-start gap-5">
        <span className="text-[#eab308] font-black text-6xl leading-none select-none">
          {pillar.number}
        </span>
        <div>
          <h3 className="text-white font-black text-2xl mb-3">{pillar.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function NosotrosPage() {
  const pillarsRef = useScrollReveal();
  const galoRef = useScrollReveal();

  return (
    <Layout>
      {/* ── Sección Pilares ─────────────────────────────────────────────────── */}
      <section ref={pillarsRef} className="min-h-screen px-6 md:px-12 py-12 relative overflow-hidden">
        {/* Triángulo decorativo de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <svg viewBox="0 0 600 500" className="w-[80vw] max-w-3xl" fill="none">
            <path d="M300 30L570 470H30L300 30Z" stroke="#22c55e" strokeWidth="2" />
            <path d="M300 130L470 470H130L300 130Z" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
            <path d="M300 230L370 470H230L300 230Z" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative">
          {/* Título */}
          <div className="text-center mb-20">
            <h1 className="reveal text-5xl md:text-7xl font-black tracking-tighter text-white">
              Nuestros <span className="text-[#22c55e]">Pilares</span>
            </h1>
          </div>

          {/* 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sección GALO ────────────────────────────────────────────────────── */}
      <section ref={galoRef} className="px-6 md:px-12 py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          {/* Título */}
          <div className="text-center mb-16">
            <h2 className="reveal text-4xl md:text-6xl font-black tracking-tighter text-white">
              GALO
            </h2>
            <p className="reveal delay-100 text-gray-400 text-lg mt-4">
              Surge de la unión de dos conceptos inspiradores:
            </p>
          </div>

          {/* Dos cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">

            {/* El Triángulo */}
            <div className="reveal delay-200 text-center">
              <div className="w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                <svg viewBox="0 0 120 100" className="w-full h-full" fill="none">
                  <path d="M60 5L115 95H5L60 5Z" stroke="white" strokeWidth="3" fill="transparent" />
                  <path d="M24 48L42 80L60 48L78 80L96 48" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-3">EL TRÍANGULO</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Figura que representa los pilares de la consultora: la creatividad, la planificación y la estrategia.
              </p>
            </div>

            {/* La Gaviota */}
            <div className="reveal delay-300 text-center">
              <div className="w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                {/* Gaviota estilizada SVG */}
                <svg viewBox="0 0 120 80" className="w-full h-full" fill="none">
                  <path d="M10 50 Q40 20 60 40 Q80 20 110 50" stroke="white" strokeWidth="3" fill="transparent" strokeLinecap="round" />
                  <path d="M60 40 Q65 55 60 65" stroke="white" strokeWidth="2" fill="transparent" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-3">LA GAVIOTA</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Inspirada en "Juan Salvador Gaviota", que encarna la libertad y la superación constante.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
