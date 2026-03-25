/**
 * Cada enlace puede ser:
 * - isPage: true  → usa <Link to={href}> (react-router, SPA transition)
 * - isPage: false → usa <a href={href}> (anchor scroll en la home)
 *
 * activeOn: array de paths donde el link debe aparecer activo.
 */
export const NAV_LINKS = [
  {
    name: 'Inicio',
    href: '/',
    isPage: true,
    activeOn: ['/'],
  },
  {
    name: 'Servicios',
    href: '/servicios',
    isPage: true,
    activeOn: ['/servicios'],
  },
  {
    name: 'Nosotros',
    href: '/nosotros',
    isPage: true,
    activeOn: ['/nosotros'],
  },
  {
    name: 'Blogs',
    href: '/blogs',
    isPage: true,
    activeOn: ['/blogs'],
  },
  {
    name: 'Contacto',
    href: '/#contacto',
    isPage: false,
    anchor: 'contacto',
    activeOn: [],               // anchor puro, nunca se marca activo
  },
];
