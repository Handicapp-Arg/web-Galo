import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CLIENTS_DATA } from '../../data/clientsData';

function ClientCard({ name, imgUrl }) {
  return (
    <div className="flex-shrink-0 w-32 h-20 mx-6 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl px-4 hover:bg-white/10 transition-colors duration-300">
      {imgUrl ? (
        <img src={imgUrl} alt={name} className="max-h-10 max-w-full object-contain filter brightness-50 hover:brightness-100 transition-all duration-300" />
      ) : (
        <span className="text-gray-500 font-bold text-sm tracking-wider uppercase text-center leading-tight">
          {name}
        </span>
      )}
    </div>
  );
}

export default function ClientsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden border-y border-white/5">
      <div className="mb-8 text-center">
        <h2 className="reveal text-2xl md:text-3xl font-black tracking-tight text-white">
          Cartera de <span className="text-[#22c55e]">clientes</span>
        </h2>
      </div>

      {/* Marquee doble (original + copia) para loop infinito */}
      <div className="flex overflow-hidden">
        <div className="marquee-track flex items-center" style={{ width: 'max-content' }}>
          {[...CLIENTS_DATA, ...CLIENTS_DATA].map((client, i) => (
            <ClientCard key={i} name={client.name} imgUrl={client.imgUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
