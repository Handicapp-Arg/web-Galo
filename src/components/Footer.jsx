import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS_LEFT = [
  { name: 'Inicio', to: '/' },
  { name: 'Servicios', to: '/#servicios' },
  { name: 'Contacto', to: '/#contacto' },
];

const FOOTER_LINKS_RIGHT = [
  { name: 'Nosotros', to: '/nosotros' },
  { name: 'Blogs', to: '/blogs' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Contenido principal del footer */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="40" height="36" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 80L0 0H100L50 80Z" stroke="white" strokeWidth="4" fill="transparent" />
              <path d="M20 20L35 50L50 20L65 50L80 20" stroke="white" strokeWidth="4" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-xl tracking-tight text-white flex flex-col leading-none">
              GALO <span className="text-[0.6rem] font-light tracking-[0.2em] text-gray-400 mt-0.5">marketing</span>
            </span>
          </div>

          {/* Menú */}
          <div>
            <p className="text-[#22c55e] font-bold tracking-[0.2em] uppercase text-xs mb-5">MENÚ</p>
            <div className="flex gap-16">
              <ul className="space-y-3">
                {FOOTER_LINKS_LEFT.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {FOOTER_LINKS_RIGHT.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-600 text-xs tracking-wide">
            Copyright © 2025 GALO Marketing. Un desarrollo de GGF
          </p>
        </div>
      </div>
    </footer>
  );
}
