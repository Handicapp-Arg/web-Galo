import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Av+Carlos+Culmey+43+Puerto+Rico+Misiones+Argentina&output=embed';

export default function HomeContact() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Fondo verde difuso */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="reveal text-4xl md:text-6xl font-black tracking-tighter text-white">
            DONDE <span className="text-[#22c55e]">ENCONTRARNOS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Columna izquierda: info + mapa */}
          <div>
            <div className="reveal mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                Trabajemos<br /><span className="text-[#22c55e]">juntos</span>
              </h3>
            </div>

            <div className="reveal delay-100 space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mt-0.5">
                  <MapPin className="text-[#22c55e] w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-0.5">Dirección</p>
                  <p className="text-white font-medium">Av. Carlos Culmey N° 43. Puerto Rico, Misiones.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mt-0.5">
                  <Phone className="text-[#22c55e] w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-0.5">Teléfono</p>
                  <p className="text-white font-medium">+54 9 3764 39-7618</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mt-0.5">
                  <Mail className="text-[#22c55e] w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-0.5">Email</p>
                  <p className="text-white font-medium">info@galomarketing.com.ar</p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="reveal delay-200 rounded-2xl overflow-hidden border border-white/10 h-56">
              <iframe
                title="Ubicación Galo Marketing"
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="reveal-right delay-100">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl">
              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/8 blur-[80px] pointer-events-none rounded-full" />

              <h4 className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-2 relative">CONTACTANOS</h4>
              <h3 className="text-2xl font-black text-white mb-8 relative">Formulario de consultas</h3>

              <form className="relative space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm"
                />

                <textarea
                  rows={3}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors text-sm resize-none"
                />

                <button
                  type="button"
                  className="mt-8 w-full bg-[#22c55e] hover:bg-green-400 text-black font-black py-4 rounded-xl text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
