/**
 * Genera un array de partículas con posiciones aleatorias para el campo de estrellas.
 * Se llama UNA sola vez con useMemo en App para evitar re-generación en cada render.
 *
 * @param {number} count - Número de partículas a generar.
 * @returns {{ x: number, y: number, z: number }[]}
 */
export function generateStars(count = 60) {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 4000,
    y: (Math.random() - 0.5) * 3000,
    z: -Math.random() * 12000,
  }));
}
