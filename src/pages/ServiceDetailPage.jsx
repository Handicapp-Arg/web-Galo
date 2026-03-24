import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
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
      <div className="min-h-screen px-6 md:px-12 py-12" ref={sectionRef}>
        <div className="max-w-[1400px] mx-auto">

          {/* Breadcrumb */}
          <Link
            to="/#servicios"
            className="reveal inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Contenido en dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Columna izquierda: texto */}
            <div>
              <p className="reveal text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-4">
                SERVICIOS
              </p>
              <h1 className="reveal delay-100 text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                {service.pageTitle}
              </h1>
              <p className="reveal delay-200 text-gray-300 text-lg leading-relaxed mb-8">
                {service.pageDesc}
              </p>

              {service.intro && (
                <p className="reveal delay-300 text-white font-bold mb-5">
                  {service.intro}
                </p>
              )}

              <ul className="space-y-4">
                {service.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className={`reveal delay-${(i + 4) * 100} flex items-center gap-4`}
                  >
                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <span className="text-gray-200 text-base font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="reveal delay-700 mt-12">
                <Link
                  to="/#contacto"
                  className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-green-400 text-black font-black px-8 py-4 rounded-xl text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                >
                  Consultanos ahora
                </Link>
              </div>
            </div>

            {/* Columna derecha: imagen */}
            <div className="reveal-right delay-200 flex justify-center">
              <div className="relative">
                {/* Glow detrás */}
                <div className="absolute inset-0 bg-green-500/15 rounded-3xl blur-3xl scale-110 pointer-events-none" />
                {service.imgUrl ? (
                  <img
                    src={service.imgUrl}
                    alt={service.pageTitle}
                    className="relative w-full max-w-[500px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.2)] animate-[float_6s_ease-in-out_infinite]"
                  />
                ) : (
                  <div className="relative w-80 h-80 bg-gradient-to-br from-[#0f2010] to-[#0a0a0a] rounded-3xl border border-white/10 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/30" />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
