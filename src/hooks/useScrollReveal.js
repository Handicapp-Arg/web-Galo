import { useEffect, useRef } from 'react';

/**
 * Hook de reveal on scroll.
 * Observa el elemento apuntado por el ref y, cuando entra en el viewport,
 * añade la clase "visible" a TODOS los hijos con clases reveal, reveal-left,
 * reveal-right o reveal-scale.
 *
 * Uso:
 *   const sectionRef = useScrollReveal();
 *   <section ref={sectionRef}>
 *     <h2 className="reveal delay-100">Título</h2>
 *     <p  className="reveal delay-200">Descripción</p>
 *   </section>
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = {}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(
            (child) => child.classList.add('visible')
          );
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return sectionRef;
}
