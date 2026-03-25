import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

/**
 * Layout compartido para todas las páginas INTERNAS (no-home).
 * Incluye: Navbar + contenido + Footer + WhatsApp.
 * No tiene el túnel 3D ni el cursor personalizado.
 */
export default function Layout({ children }) {
  return (
    <div className="inner-page cursor-default selection:bg-green-500 selection:text-black">

      <Navbar />

      <main className="pt-24">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
