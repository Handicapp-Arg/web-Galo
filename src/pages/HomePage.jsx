import React, { useRef, useEffect, useState } from 'react';

import { useCustomCursor } from '../hooks/useCustomCursor';
import { SLIDES_DATA } from '../data/slidesData';

import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import ScrollIndicator from '../components/ScrollIndicator';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import TunnelCanvas from '../components/three/TunnelCanvas';

import ClientsSection from '../components/home/ClientsSection';
import FounderSection from '../components/home/FounderSection';
import HomeContact from '../components/home/HomeContact';

const SECTION_LABELS = ['Intro', 'Estrategia', 'Propósito', 'Clientes', 'Nosotros', 'Contacto'];

export default function HomePage() {
  const mainWrapperRef = useRef(null);
  const scrollProgressRef = useRef(0);

  const [tunnelOpacity, setTunnelOpacity] = useState(1);
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState(0);
  const [flashLabel, setFlashLabel] = useState(false);
  const prevSection = useRef(0);

  const { cursorRef, cursorFollowerRef } = useCustomCursor();

  // ── Calcular scroll progress del túnel ─────────────────────────────────────
  useEffect(() => {
    let rafId;

    const tick = () => {
      if (mainWrapperRef.current) {
        const rect = mainWrapperRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        const progress = maxScroll > 0
          ? Math.max(0, Math.min(1, -rect.top / maxScroll))
          : 0;
        scrollProgressRef.current = progress;

        // Ocultar indicador de scroll
        setScrollIndicatorOpacity(progress > 0.01 ? 0 : 1);
      }
      rafId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Scroll guiado: un giro de rueda = siguiente sección ──────────────────
  useEffect(() => {
    let locked = false;
    let fallbackTimeout;

    const getSnapPoints = () => {
      const vh = window.innerHeight;
      const points = [0, vh, 2 * vh, 3 * vh];
      const website = document.getElementById('website');
      if (website) {
        Array.from(website.children).forEach(child => {
          if (child.offsetHeight < 10) return;
          const top = Math.round(child.getBoundingClientRect().top + window.scrollY);
          if (top > vh * 4 + 20) points.push(top);
        });
      }
      return points;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (locked) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const y = window.scrollY;
      const points = getSnapPoints();

      const target = dir > 0
        ? points.find(p => p > y + 20)
        : [...points].reverse().find(p => p < y - 20);

      if (target == null) return;

      locked = true;
      window.scrollTo({ top: target, behavior: 'smooth' });
      fallbackTimeout = setTimeout(() => { locked = false; }, 1100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  // ── Indicador de sección activa ───────────────────────────────────────────
  useEffect(() => {
    let flashTimeout;

    const calcSection = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      let s = 0;

      if (y < vh * 0.67)       s = 0;
      else if (y < vh * 2)     s = 1;
      else if (y < vh * 3.33)  s = 2;
      else {
        const website = document.getElementById('website');
        if (website) {
          const kids = Array.from(website.children).filter(c => c.offsetHeight > 10);
          s = 3;
          for (let i = 0; i < kids.length; i++) {
            const top = kids[i].getBoundingClientRect().top + y;
            if (y >= top - vh * 0.3) s = 3 + i;
          }
          s = Math.min(s, SECTION_LABELS.length - 1);
        }
      }

      if (s !== prevSection.current) {
        prevSection.current = s;
        setActiveSection(s);
        setFlashLabel(true);
        clearTimeout(flashTimeout);
        flashTimeout = setTimeout(() => setFlashLabel(false), 1200);
      }
    };

    window.addEventListener('scroll', calcSection, { passive: true });
    return () => { window.removeEventListener('scroll', calcSection); clearTimeout(flashTimeout); };
  }, []);

  // ── Fade del túnel al entrar en las secciones post-túnel ──────────────────
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const fadeStart = window.innerHeight * 3.6;
      const fadeEnd = window.innerHeight * 4.2;
      if (y <= fadeStart) {
        setTunnelOpacity(1);
      } else if (y >= fadeEnd) {
        setTunnelOpacity(0);
      } else {
        setTunnelOpacity(1 - (y - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#030303] text-white font-sans selection:bg-green-500 selection:text-black cursor-none">

      {/* ── Anchor de scroll para el túnel (400vh) ──────────────────────────────── */}
      <div
        ref={mainWrapperRef}
        className="w-full pointer-events-none"
        style={{ height: '400vh' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-screen w-full" />
        ))}
      </div>

      <CustomCursor cursorRef={cursorRef} cursorFollowerRef={cursorFollowerRef} />
      <Navbar />

      {/* ── Escena 3D inmersiva sci-fi (React Three Fiber) ─────────────────────── */}
      <TunnelCanvas
        scrollProgressRef={scrollProgressRef}
        slides={SLIDES_DATA}
        opacity={tunnelOpacity}
      />

      <ScrollIndicator opacity={scrollIndicatorOpacity} />

      {/* ── Indicador de sección (dots laterales) ──────────────────────────────── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <div
          className="mb-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-green-400 transition-all duration-500"
          style={{ opacity: flashLabel ? 1 : 0, transform: flashLabel ? 'translateX(0)' : 'translateX(8px)' }}
        >
          {SECTION_LABELS[activeSection]}
        </div>

        {SECTION_LABELS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-400"
            style={{
              width:  activeSection === i ? '8px' : '5px',
              height: activeSection === i ? '8px' : '5px',
              background: activeSection === i ? '#22c55e' : 'rgba(255,255,255,0.25)',
              boxShadow: activeSection === i ? '0 0 8px 2px rgba(34,197,94,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Secciones post-túnel ──────────────────────────────────────────────── */}
      <div
        id="website"
        className="relative z-20 bg-[#030303]"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        <ClientsSection />
        <FounderSection />
        <HomeContact />
        <Footer />
        <WhatsAppButton />
      </div>

    </div>
  );
}
