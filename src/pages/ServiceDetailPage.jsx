import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SERVICES_DETAIL_DATA } from '../data/servicesDetailData';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DETAIL_DATA.find((s) => s.slug === slug);
  const sectionRef = useScrollReveal();

  if (!service) return <Navigate to="/#servicios" replace />;

  return (
    <Layout>
      <div className="min-h-screen px-6 md:px-16 py-16" ref={sectionRef}>
        <div className="max-w-[1200px] mx-auto">

          {/* Volver */}
          <Link
            to="/#servicios"
            className="reveal inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          {/* Contenido en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Columna izquierda: texto */}
            <div>
              <h1 className="reveal text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {service.pageTitle}
              </h1>
              <p className="reveal delay-100 text-gray-400 text-base leading-relaxed mb-8">
                {service.pageDesc}
              </p>

              {service.intro && (
                <p className="reveal delay-200 text-white font-bold text-base mb-6">
                  {service.intro}
                </p>
              )}

              <ul className="space-y-5">
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

            {/* Columna derecha: imagen */}
            <div className="reveal-right delay-100 flex justify-center items-center">
              {service.imgUrl && (
                <img
                  src={service.imgUrl}
                  alt={service.pageTitle}
                  className="w-full max-w-[480px] h-auto object-contain"
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
