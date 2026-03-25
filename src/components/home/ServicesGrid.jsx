import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SERVICES_DETAIL_DATA } from '../../data/servicesDetailData';

function ServiceCard({ service, index }) {
  const delay = `delay-${(index % 3) * 100 + 100}`;

  return (
    <div className={`reveal ${delay} group`}>
      <Link
        to={`/servicios/${service.slug}`}
        className="flex flex-col"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)',
          backgroundColor: '#d4d4d4',
          minHeight: '340px',
        }}
      >
        {/* Imagen */}
        <div className="h-28 flex items-center justify-center bg-gray-200 px-4 pt-2">
          {service.imgUrl ? (
            <img
              src={service.imgUrl}
              alt={service.cardTitle}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-green-500/20" />
          )}
        </div>

        {/* Contenido */}
        <div className="px-5 pt-3 pb-14 text-center flex-1 flex flex-col items-center justify-between">
          <h3 className="text-[#166534] font-black text-lg leading-snug mb-3">
            {service.cardTitle}
          </h3>
          <p className="text-gray-700 text-sm font-medium leading-relaxed mb-5">
            {service.cardDesc}
          </p>
          <span className="text-[#ca8a04] text-sm font-black tracking-widest">
            + info
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function ServicesGrid() {
  const sectionRef = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-20 px-6 md:px-12"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-14">
          <h2 className="reveal text-4xl md:text-6xl font-black tracking-tight text-white">
            Nuestros <span className="text-[#22c55e]">servicios</span>
          </h2>
        </div>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[900px] mx-auto">
          {SERVICES_DETAIL_DATA.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
