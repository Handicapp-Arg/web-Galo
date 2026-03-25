import { useEffect, useState } from 'react';

// ─── Constantes del motor ──────────────────────────────────────────────────────
// 12 000 unidades = vuelo frontal a través de los 3 slides × 400vh
const TOTAL_JOURNEY = 12000;

const SERVICES_ANCHOR_Z = 12000;

// Factor LERP: controla la suavidad del movimiento de cámara (menor = más suave)
const CAMERA_LERP = 0.08;

// Posiciones Z base de las 3 portadas en el espacio 3D
const SLIDE_BASE_Z = [0, -4000, -8000];

// Umbral a partir del cual las estrellas reciclan su posición Z
const STAR_Z_CEILING = 500;
const STAR_Z_CYCLE = 12000;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const safeNum = (n, fallback = 0) => (isNaN(n) ? fallback : n);

/**
 * Calcula la posición horizontal máxima para la fase de deslizamiento.
 * Es responsive: en móvil usa un multiplicador mayor para cubrir las cards.
 */
const getHorizontalMax = () =>
  window.innerWidth * (window.innerWidth < 768 ? 4 : 2.5);

// ─── Hook Principal ────────────────────────────────────────────────────────────
/**
 * Motor 3D completo, completamente desacoplado del JSX.
 * Recibe refs del DOM y los manipula directamente vía requestAnimationFrame
 * para evitar re-renders de React y mantener 60fps estables.
 *
 * @param {object} refs - Todas las referencias al DOM de la escena 3D.
 * @param {React.RefObject} refs.mainWrapperRef  - Div de 600vh para medir el scroll.
 * @param {React.RefObject} refs.slidesRef       - Array de refs a los 3 slides.
 * @param {React.RefObject} refs.textsRef        - Array de refs a los textos de cada slide.
 * @param {React.RefObject} refs.imgsRef         - Array de refs a las imágenes de cada slide.
 * @param {React.RefObject} refs.starsRef        - Array de refs a las partículas de estrellas.
 * @param {React.RefObject} refs.servicesRef     - Ref a la sección de servicios.
 * @param {React.RefObject} refs.footerRef       - Ref a la sección de contacto.
 * @param {{ x: number, y: number, z: number }[]} stars - Datos estáticos de posición de estrellas.
 *
 * @returns {{ scrollIndicatorOpacity: number }}
 */
export function use3DScrollEngine({
  mainWrapperRef,
  slidesRef,
  textsRef,
  imgsRef,
  starsRef,
  servicesRef,
  footerRef,
  stars,
}) {
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);

  useEffect(() => {
    // Progreso suavizado de la cámara (entre 0 y 1)
    let currentProgress = 0;
    let rafId;

    // ── Actualiza las 3 portadas en Z ────────────────────────────────────────
    const updateSlides = (camZ, camX) => {
      SLIDE_BASE_Z.forEach((zPos, i) => {
        const slideEl = slidesRef.current[i];
        const textEl = textsRef.current[i];
        const imgEl = imgsRef.current[i];
        if (!slideEl || !textEl || !imgEl) return;

        const distZ = camZ + zPos;

        let opacity = 1;
        let blur = 0;
        let flyLeft = 0;
        let flyRight = 0;

        if (distZ > 0) {
          // La cámara atraviesa el slide: efecto de desgarro
          opacity = Math.max(0, 1 - distZ / 800);
          flyLeft = -distZ * 1.5;
          flyRight = distZ * 1.5;
        } else {
          // La cámara se aproxima al slide desde atrás
          opacity = Math.max(0, 1 - Math.abs(distZ) / 2500);
          blur = Math.min(15, Math.abs(distZ) / 250);
        }

        const tiltY = Math.max(-45, Math.min(45, distZ * 0.01));
        const tiltX = Math.max(-20, Math.min(20, distZ * -0.005));

        slideEl.style.opacity = safeNum(opacity);
        slideEl.style.filter = `blur(${safeNum(blur)}px)`;
        slideEl.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
        slideEl.style.transform = `translate3d(${-camX}px, 0, ${distZ}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        textEl.style.transform = `translate3d(${flyLeft}px, 0, 0)`;
        imgEl.style.transform = `translate3d(${flyRight}px, 0, 0)`;
      });
    };

    // ── Actualiza la sección de Servicios ────────────────────────────────────
    const updateServices = (camZ, camX) => {
      if (!servicesRef.current) return;
      const distZ = camZ - SERVICES_ANCHOR_Z;
      const opacity = Math.max(0, 1 - Math.abs(distZ) / 2000);
      servicesRef.current.style.opacity = safeNum(opacity);
      servicesRef.current.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
      servicesRef.current.style.transform = `translate3d(${-camX}px, 0, ${distZ}px)`;
    };

    // ── Actualiza el Footer / Contacto ───────────────────────────────────────
    const updateFooter = (camZ, camX) => {
      if (!footerRef.current) return;
      const distZ = camZ - SERVICES_ANCHOR_Z;
      const horizontalMax = getHorizontalMax();
      footerRef.current.style.transform = `translate3d(${-camX + horizontalMax + window.innerWidth * 0.5}px, 0, ${distZ}px)`;
      footerRef.current.style.visibility = distZ > -1000 ? 'visible' : 'hidden';
    };

    // ── Actualiza las partículas de hiperespacio ──────────────────────────────
    const updateStars = (camZ) => {
      starsRef.current.forEach((starEl, i) => {
        if (!starEl) return;
        const star = stars[i];
        let z = star.z + camZ * 1.5;
        // Recicla la partícula cuando supera el techo visual
        if (z > STAR_Z_CEILING) z -= STAR_Z_CYCLE;
        const stretch = Math.max(1, z / 100);
        starEl.style.transform = `translate3d(${star.x}px, ${star.y}px, ${z}px) scaleZ(${safeNum(stretch, 1)})`;
      });
    };

    // ── Tick principal del RAF ────────────────────────────────────────────────
    const tick = () => {
      if (!mainWrapperRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Calcular el progreso objetivo basado en el scroll real del documento
      const rect = mainWrapperRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const targetProgress = maxScroll > 0
        ? Math.max(0, Math.min(1, -rect.top / maxScroll))
        : 0;

      // Interpolación cinemática (LERP)
      currentProgress += (targetProgress - currentProgress) * CAMERA_LERP;
      if (isNaN(currentProgress)) currentProgress = 0;

      // Indicador de scroll: desaparece al primer movimiento
      setScrollIndicatorOpacity(
        currentProgress > 0.01 ? 0 : Math.max(0, 1 - currentProgress * 100)
      );

      // ── Calcular posición de cámara ─────────────────────────────────────────
      const trackProgress = currentProgress * TOTAL_JOURNEY;
      let camZ = 0;
      let camX = 0;

      // Vuelo frontal en Z a través de los 3 slides
      camZ = trackProgress;
      camX = 0;

      // ── Actualizar todos los elementos de la escena ─────────────────────────
      updateSlides(camZ, camX);
      updateServices(camZ, camX);
      updateFooter(camZ, camX);
      updateStars(camZ);

      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [stars, mainWrapperRef, slidesRef, textsRef, imgsRef, starsRef, servicesRef, footerRef]);

  return { scrollIndicatorOpacity };
}
