import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { NAV_LINKS } from '../data/navLinks';

function GaloLogo() {
  return (
    <Link to="/" className="flex-shrink-0 flex items-center gap-3">
      <svg width="45" height="40" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 80L0 0H100L50 80Z" stroke="white" strokeWidth="4" fill="transparent" />
        <path d="M20 20L35 50L50 20L65 50L80 20" stroke="white" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      <span className="font-bold text-2xl tracking-tight text-white flex flex-col leading-none">
        GALO{' '}
        <span className="text-[0.65rem] font-light tracking-[0.2em] text-gray-300 mt-1">marketing</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  /**
   * Determina si un link debe aparecer como "activo" basándose en el path actual.
   */
  const isActive = (link) => {
    return link.activeOn.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    );
  };

  /**
   * Para links con anchor (#): si estamos en la home, hace smooth scroll.
   * Si estamos en otra página, el href apunta a /#anchor y el browser navega.
   */
  const handleAnchorClick = (link, e) => {
    if (!link.anchor) return;
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(link.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    // Si no estamos en home, el href "/#anchor" navega al home + hash
  };

  return (
    <>
      <nav className="fixed w-full z-50 top-0 py-5 px-4 md:px-12 backdrop-blur-md bg-[#030303]/50 border-b border-white/5 pointer-events-auto">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <GaloLogo />

          {/* Desktop links */}
          <div className="hidden md:flex space-x-10 items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              const className = `text-sm font-medium transition-colors uppercase tracking-[0.1em] ${
                active ? 'text-[#22c55e]' : 'text-gray-300 hover:text-green-400'
              }`;

              if (link.isPage) {
                return (
                  <Link key={link.name} to={link.href} className={className}>
                    {link.name}
                  </Link>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={className}
                  onClick={(e) => handleAnchorClick(link, e)}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center text-white hover:bg-green-400 hover:text-black transition-all border border-white/10"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/8 rounded-full flex items-center justify-center text-white hover:bg-green-400 hover:text-black transition-all border border-white/10"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white z-50 pointer-events-auto"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030303]/98 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              const className = `text-2xl font-black uppercase tracking-[0.15em] transition-colors ${
                active ? 'text-[#22c55e]' : 'text-white hover:text-green-400'
              }`;
              if (link.isPage) {
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={className}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={className}
                  onClick={(e) => {
                    handleAnchorClick(link, e);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="flex gap-5 mt-12">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-green-400 hover:text-green-400 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-green-400 hover:text-green-400 transition-all">
              <Facebook className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
