import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

/**
 * El "muro frontal" del túnel: aparece cuando la cámara llega a Z=12000.
 * Se desplaza horizontalmente durante la fase 2 del scroll.
 */
export default function ServicesSection({ servicesRef }) {
  return (
    <div
      ref={servicesRef}
      className="absolute inset-0 flex flex-col justify-center preserve-3d will-change-transform"
    >
      <div className="absolute top-24 left-6 md:left-24 z-20">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_5px_20px_rgba(0,0,0,1)]">
          Nuestros <br />
          <span className="text-green-500">Servicios.</span>
        </h2>
      </div>

      <div className="flex w-max gap-6 md:gap-10 px-6 md:px-24 items-center preserve-3d pt-24">
        {SERVICES_DATA.map((service, index) => {
          const { Icon, iconClassName, cardColor, textColor, title, desc } = service;
          return (
            <div
              key={index}
              className={`flex-shrink-0 w-[85vw] md:w-[450px] h-[450px] md:h-[480px] ${cardColor} ${textColor} rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden pointer-events-auto`}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-black/10 backdrop-blur-md relative z-10">
                <Icon className={iconClassName} />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4 leading-tight">{title}</h3>
                <p className="text-base opacity-90 font-medium leading-relaxed">{desc}</p>
              </div>

              <div className="flex justify-end relative z-10">
                <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
