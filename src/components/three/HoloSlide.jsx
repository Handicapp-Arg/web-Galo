import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * Slide holográfico posicionado dentro de la escena 3D.
 * Responsive: en mobile apila texto arriba e imagen abajo.
 * En desktop alterna texto/imagen izquierda-derecha.
 */

function useBreakpoint() {
  const get = () => (typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [w, setW] = useState(get);
  useEffect(() => {
    const onResize = () => setW(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

export default function HoloSlide({ slide, position, index, cameraZRef }) {
  const groupRef = useRef();
  const vw = useBreakpoint();

  // Breakpoints
  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;

  // ── Posiciones adaptativas ────────────────────────────────────────────────
  const isEven = index % 2 === 0;

  let textPos, imgPos, contentWidth, imgWidth, distFactor, titleSize, descSize, subSize;

  if (isMobile) {
    // Mobile: apilado vertical, centrado
    textPos = [0, 2.2, 0];
    imgPos = [0, -1.8, 0];
    contentWidth = '300px';
    imgWidth = '280px';
    distFactor = 12;
    titleSize = 'clamp(1.4rem, 7vw, 2.2rem)';
    descSize = '13px';
    subSize = '10px';
  } else if (isTablet) {
    // Tablet: lado a lado pero más cerca
    textPos = isEven ? [-3.5, 0.3, 0] : [3.5, 0.3, 0];
    imgPos = isEven ? [3.5, 0, 0] : [-3.5, 0, 0];
    contentWidth = '320px';
    imgWidth = '300px';
    distFactor = 10;
    titleSize = 'clamp(1.5rem, 4vw, 2.8rem)';
    descSize = '14px';
    subSize = '11px';
  } else {
    // Desktop: separado
    textPos = isEven ? [-5.5, 0.3, 0] : [5.5, 0.3, 0];
    imgPos = isEven ? [5.0, 0, 0] : [-5.0, 0, 0];
    contentWidth = '420px';
    imgWidth = '420px';
    distFactor = 10;
    titleSize = 'clamp(1.8rem, 4vw, 3.8rem)';
    descSize = '15px';
    subSize = '12px';
  }

  useFrame(() => {
    if (!groupRef.current) return;
    const camZ = cameraZRef.current || 0;
    const dist = camZ - position[2];
    const absDist = Math.abs(dist);

    const visible = absDist < 40;
    groupRef.current.visible = visible;
    if (!visible) return;

    // Opacidad
    let opacity = 1;
    if (dist < -3) {
      const t = Math.max(0, Math.min(1, (absDist - 3) / 22));
      opacity = Math.pow(1 - t, 4);
    } else if (dist > 3) {
      opacity = Math.max(0, 1 - (dist - 3) / 5);
    }

    // Escala
    let scale = 1;
    if (dist < -3) {
      const t = Math.max(0, Math.min(1, (absDist - 3) / 22));
      scale = 0.5 + Math.pow(1 - t, 3) * 0.5;
    } else if (dist > 2) {
      scale = 1 + dist * 0.06;
    }

    groupRef.current.scale.set(scale, scale, scale);

    const allDivs = document.querySelectorAll(`[data-holo-idx="${index}"]`);
    allDivs.forEach(el => {
      el.style.opacity = opacity;
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Texto */}
      <Html
        center
        position={textPos}
        distanceFactor={distFactor}
        transform
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          data-holo-idx={index}
          className="holo-content"
          style={{
            width: contentWidth,
            textAlign: isMobile ? 'center' : isEven ? 'left' : 'right',
            opacity: 0,
          }}
        >
          <div className="holo-scanlines" />

          {slide.subtitle && (
            <p style={{
              color: '#eab308',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontSize: subSize,
              marginBottom: isMobile ? '8px' : '14px',
              textShadow: '0 0 20px rgba(234,179,8,0.6), 0 0 40px rgba(234,179,8,0.3)',
            }}>
              {slide.subtitle}
            </p>
          )}

          <h1
            className="holo-title"
            style={{
              fontSize: titleSize,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: isMobile ? '10px' : '18px',
              textShadow: '0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.2), 0 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '-0.02em',
            }}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {slide.desc && (
            <p style={{
              fontSize: descSize,
              color: 'rgba(200,220,200,0.85)',
              fontWeight: 300,
              maxWidth: isMobile ? '280px' : '360px',
              marginLeft: isMobile ? 'auto' : isEven ? '0' : 'auto',
              marginRight: isMobile ? 'auto' : isEven ? 'auto' : '0',
              textShadow: '0 0 10px rgba(34,197,94,0.2)',
              lineHeight: 1.6,
            }}>
              {slide.desc}
            </p>
          )}

          <div style={{
            width: isMobile ? '50px' : '80px',
            height: '2px',
            background: 'linear-gradient(90deg, #22c55e, transparent)',
            marginTop: isMobile ? '12px' : '20px',
            boxShadow: '0 0 15px rgba(34,197,94,0.5)',
            marginLeft: isMobile ? 'auto' : isEven ? '0' : 'auto',
            marginRight: isMobile ? 'auto' : isEven ? 'auto' : '0',
          }} />
        </div>
      </Html>

      {/* Imagen */}
      <Html
        center
        position={imgPos}
        distanceFactor={distFactor}
        transform
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          data-holo-idx={index}
          className="holo-content holo-image-wrap"
          style={{
            width: imgWidth,
            opacity: 0,
          }}
        >
          <div className="holo-scanlines" />
          <img
            src={slide.img}
            alt="Galo"
            style={{
              width: '100%',
              maxHeight: isMobile ? '35vh' : '55vh',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 40px rgba(34,197,94,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '4px',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.4), transparent)',
            filter: 'blur(3px)',
          }} />
        </div>
      </Html>
    </group>
  );
}
