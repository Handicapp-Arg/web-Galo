import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SERVICES_DETAIL_DATA } from '../data/servicesDetailData';

function ServiceRow({ service, index }) {
  const sectionRef = useScrollReveal();
  const imageRight = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-16 border-b border-white/5"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!imageRight ? 'lg:grid-flow-dense' : ''}`}>

          {/* Texto */}
          <div className={!imageRight ? 'lg:col-start-2' : ''}>
            <h2 className="reveal text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              {service.pageTitle}
            </h2>
            <p className="reveal delay-100 text-gray-400 text-base leading-relaxed mb-8">
              {service.pageDesc}
            </p>

            {service.intro && (
              <p className="reveal delay-200 text-white font-bold text-base mb-6">
                {service.intro}
              </p>
            )}

            <ul className="space-y-5 mb-10">
              {service.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className={`reveal delay-${(i + 3) * 100} flex items-center gap-4`}
                >
                  <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#eab308]/10 border border-[#eab308]/30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#eab308]" />
                  </div>
                  <span className="text-gray-200 text-base">{bullet}</span>
                </li>
              ))}
            </ul>

          </div>

          {/* Imagen */}
          <div className={`reveal-${imageRight ? 'right' : 'left'} delay-100 flex justify-center items-center ${!imageRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            {service.imgUrl && (
              <img
                src={service.imgUrl}
                alt={service.pageTitle}
                className="w-full max-w-[460px] h-auto object-contain"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
  return (
    <Layout>
      {/* Encabezado */}
      <div className="px-6 md:px-16 pt-8 pb-4 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
          Nuestros <span className="text-[#22c55e]">Servicios</span>
        </h1>
      </div>

      {/* Lista de servicios */}
      {SERVICES_DETAIL_DATA.map((service, index) => (
        <ServiceRow key={service.slug} service={service} index={index} />
      ))}
    </Layout>
  );
}
