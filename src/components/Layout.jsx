import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const GRAIN_SVG_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

/**
 * Layout compartido para todas las páginas INTERNAS (no-home).
 * Incluye: Navbar + contenido + Footer + WhatsApp.
 * No tiene el túnel 3D ni el cursor personalizado.
 */
export default function Layout({ children }) {
  return (
    <div className="inner-page cursor-default selection:bg-green-500 selection:text-black">
      {/* Grano cinematográfico */}
      <div
        className="fixed inset-0 z-[9990] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: GRAIN_SVG_URL }}
      />

      <Navbar />

      <main className="pt-24">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
