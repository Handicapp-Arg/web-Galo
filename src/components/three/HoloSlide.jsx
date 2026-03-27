import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * Slide holográfico posicionado dentro de la escena 3D.
 * Usa Html de drei para renderizar contenido HTML en el espacio 3D.
 * Incluye efectos de scan lines, glitch, chromatic aberration.
 */
export default function HoloSlide({ slide, position, index, cameraZRef }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const camZ = cameraZRef.current || 0;
    const dist = camZ - position[2]; // negativo = slide aún adelante, positivo = ya pasó

    // Rango de visibilidad amplio para que nunca aparezca de golpe
    const absDist = Math.abs(dist);
    const visible = absDist < 40;
    groupRef.current.visible = visible;
    if (!visible) return;

    // ── Opacidad: invisible de lejos, materializa solo al estar cerca ────────
    let opacity = 1;
    if (dist < -3) {
      // Acercándose: curva cúbica para que sea prácticamente invisible
      // hasta las últimas ~10 unidades de distancia
      const t = Math.max(0, Math.min(1, (absDist - 3) / 22));
      opacity = Math.pow(1 - t, 4); // potencia 4: casi nada hasta muy cerca
    } else if (dist > 3) {
      opacity = Math.max(0, 1 - (dist - 3) / 5);
    }

    // ── Escala: empieza pequeño, crece al final ─────────────────────────────
    let scale = 1;
    if (dist < -3) {
      const t = Math.max(0, Math.min(1, (absDist - 3) / 22));
      scale = 0.5 + Math.pow(1 - t, 3) * 0.5;
    } else if (dist > 2) {
      scale = 1 + dist * 0.06;
    }

    groupRef.current.scale.set(scale, scale, scale);

    // Actualizar opacidad de los elementos HTML
    const allDivs = document.querySelectorAll(`[data-holo-idx="${index}"]`);
    allDivs.forEach(el => {
      el.style.opacity = opacity;
    });
  });

  const isEven = index % 2 === 0;

  return (
    <group ref={groupRef} position={position}>
      {/* Texto */}
      <Html
        center
        position={isEven ? [-5.5, 0.3, 0] : [5.5, 0.3, 0]}
        distanceFactor={10}
        transform
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          data-holo-idx={index}
          className="holo-content"
          style={{
            width: '420px',
            textAlign: isEven ? 'left' : 'right',
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
              fontSize: '12px',
              marginBottom: '14px',
              textShadow: '0 0 20px rgba(234,179,8,0.6), 0 0 40px rgba(234,179,8,0.3)',
            }}>
              {slide.subtitle}
            </p>
          )}

          <h1
            className="holo-title"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.08,
              marginBottom: '18px',
              textShadow: '0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.2), 0 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '-0.02em',
            }}
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />

          {slide.desc && (
            <p style={{
              fontSize: '15px',
              color: 'rgba(200,220,200,0.85)',
              fontWeight: 300,
              maxWidth: '360px',
              marginLeft: isEven ? '0' : 'auto',
              marginRight: isEven ? 'auto' : '0',
              textShadow: '0 0 10px rgba(34,197,94,0.2)',
              lineHeight: 1.6,
            }}>
              {slide.desc}
            </p>
          )}

          {/* Línea decorativa sci-fi */}
          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, #22c55e, transparent)',
            marginTop: '20px',
            boxShadow: '0 0 15px rgba(34,197,94,0.5)',
            marginLeft: isEven ? '0' : 'auto',
            marginRight: isEven ? 'auto' : '0',
          }} />
        </div>
      </Html>

      {/* Imagen */}
      <Html
        center
        position={isEven ? [5.0, 0, 0] : [-5.0, 0, 0]}
        distanceFactor={10}
        transform
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          data-holo-idx={index}
          className="holo-content holo-image-wrap"
          style={{
            width: '420px',
            opacity: 0,
          }}
        >
          <div className="holo-scanlines" />
          <img
            src={slide.img}
            alt="Galo"
            style={{
              width: '100%',
              maxHeight: '55vh',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 40px rgba(34,197,94,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
            }}
          />
          {/* Reflejo holográfico */}
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
