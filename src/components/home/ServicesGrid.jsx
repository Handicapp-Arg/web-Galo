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
        className="block bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,197,94,0.08)]"
      >
        {/* Imagen / placeholder */}
        <div className="h-44 overflow-hidden relative">
          {service.imgUrl ? (
            <img
              src={service.imgUrl}
              alt={service.cardTitle}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0f2010] to-[#0a0a0a] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20" />
            </div>
          )}
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </div>

        {/* Contenido */}
        <div className="p-6 pt-4">
          <h3 className="text-[#22c55e] font-bold text-base leading-snug mb-3 group-hover:text-green-400 transition-colors">
            {service.cardTitle}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {service.cardDesc}
          </p>
          <span className="text-[#eab308] text-xs font-bold tracking-wider uppercase hover:text-yellow-300 transition-colors">
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
          <h2 className="reveal text-4xl md:text-5xl font-black tracking-tight text-white">
            Nuestros <span className="text-[#22c55e]">servicios</span>
          </h2>
        </div>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DETAIL_DATA.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
