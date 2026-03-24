import React from 'react';

/**
 * Renderiza las 3 portadas que el usuario "atraviesa" durante el scroll 3D.
 * Cada slide, su texto e imagen son registrados en los refs correspondientes
 * para que use3DScrollEngine los anime directamente (sin re-renders).
 */
export default function HeroSlides({ slides, slidesRef, textsRef, imgsRef }) {
  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={`slide-${index}`}
          ref={(el) => { slidesRef.current[index] = el; }}
          className="absolute inset-0 flex items-center justify-center preserve-3d will-change-transform"
        >
          <div className="w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center preserve-3d mt-10">

            {/* Bloque de texto — vuela hacia la izquierda al ser atravesado */}
            <div
              ref={(el) => { textsRef.current[index] = el; }}
              className="text-center lg:text-left preserve-3d will-change-transform"
            >
              {slide.subtitle && (
                <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 drop-shadow-md">
                  {slide.subtitle}
                </p>
              )}
              <h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.05] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              {slide.desc && (
                <p className="text-lg md:text-xl text-gray-300 font-light max-w-md mx-auto lg:mx-0 mb-8">
                  {slide.desc}
                </p>
              )}
            </div>

            {/* Imagen 3D — vuela hacia la derecha al ser atravesada */}
            <div
              ref={(el) => { imgsRef.current[index] = el; }}
              className="flex justify-center preserve-3d will-change-transform"
            >
              <img
                src={slide.img}
                alt="Galo 3D"
                className="w-full max-w-[650px] h-auto max-h-[70vh] object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.2)] animate-[float_5s_ease-in-out_infinite]"
              />
            </div>

          </div>
        </div>
      ))}
    </>
  );
}
