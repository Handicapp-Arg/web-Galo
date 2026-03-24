import { useRef, useEffect } from 'react';

/**
 * Maneja la lógica del cursor personalizado:
 * - El punto central sigue al mouse de forma inmediata (sin lag).
 * - El anillo exterior sigue al punto con interpolación LERP (efecto "elástico").
 *
 * Retorna refs para adjuntar al DOM desde el componente CustomCursor.
 */
export function useCustomCursor() {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // El punto central se actualiza de forma síncrona al evento para ser instantáneo
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animationLoop = () => {
      // LERP: interpolación lineal para el anillo seguidor
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }
      rafId = requestAnimationFrame(animationLoop);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { cursorRef, cursorFollowerRef };
}
