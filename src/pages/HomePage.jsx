import React, { useRef, useMemo, useEffect } from 'react';

import { useCustomCursor } from '../hooks/useCustomCursor';
import { use3DScrollEngine } from '../hooks/use3DScrollEngine';

import { generateStars } from '../data/starsData';
import { SLIDES_DATA } from '../data/slidesData';

import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import StarsField from '../components/StarsField';
import HeroSlides from '../components/HeroSlides';
import ScrollIndicator from '../components/ScrollIndicator';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import ClientsSection from '../components/home/ClientsSection';
import FounderSection from '../components/home/FounderSection';
import HomeContact from '../components/home/HomeContact';

const GRAIN_SVG_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function HomePage() {
  // ── Scroll anchor (600vh = 6 snap points del túnel) ───────────────────────
  const mainWrapperRef = useRef(null);
  const tunnelSceneRef = useRef(null);

  // ── Refs de la escena 3D ──────────────────────────────────────────────────
  const slidesRef = useRef([]);
  const textsRef = useRef([]);
  const imgsRef = useRef([]);
  const starsRef = useRef([]);
  const servicesRef = useRef(null);
  const footerRef = useRef(null);

  const stars = useMemo(() => generateStars(60), []);

  const { cursorRef, cursorFollowerRef } = useCustomCursor();
  const { scrollIndicatorOpacity } = use3DScrollEngine({
    mainWrapperRef,
    slidesRef,
    textsRef,
    imgsRef,
    starsRef,
    servicesRef,
    footerRef,
    stars,
  });

  // ── Fade del túnel al entrar en las secciones post-túnel ──────────────────
  useEffect(() => {
    const tunnel = tunnelSceneRef.current;
    if (!tunnel) return;

    const handleScroll = () => {
      const y = window.scrollY;
      const fadeStart = window.innerHeight * 3.6;
      const fadeEnd = window.innerHeight * 4.2;
      if (y <= fadeStart) {
        tunnel.style.opacity = '1';
      } else if (y >= fadeEnd) {
        tunnel.style.opacity = '0';
      } else {
        tunnel.style.opacity = String(1 - (y - fadeStart) / (fadeEnd - fadeStart));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#030303] text-white font-sans selection:bg-green-500 selection:text-black cursor-none">

      {/* ── Anchor de scroll para el túnel (600vh) ──────────────────────────────
          DEBE estar en el flujo normal (no absolute) para que el documento
          tenga altura scrollable. El túnel 3D es fixed encima de esto.     */}
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

      {/* ── Túnel 3D (se desvanece al pasar de 600vh) ───────────────────────── */}
      <div
        ref={tunnelSceneRef}
        id="tunnel-scene"
        className="fixed inset-0 w-full h-full bg-[#020202] z-10 pointer-events-none"
        style={{ perspective: '1200px', overflow: 'hidden' }}
      >
        <div className="absolute inset-0 w-full h-full preserve-3d">
          <StarsField stars={stars} starsRef={starsRef} />
          <HeroSlides slides={SLIDES_DATA} slidesRef={slidesRef} textsRef={textsRef} imgsRef={imgsRef} />
        </div>
      </div>

      <ScrollIndicator opacity={scrollIndicatorOpacity} />

      {/* ── Secciones post-túnel (aparecen al pasar 600vh) ──────────────────── */}
      {/*
        position: relative + z-index: 20 + fondo opaco = cubre el túnel fijo cuando se hace scroll.
        snap-start: le da al scroll-snap un punto de anclaje al final del túnel.
      */}
      {/* El anchor ya ocupa 600vh en el flujo — no se necesita marginTop */}
      <div
        id="website"
        className="relative z-20 bg-[#030303]"
      >
        {/* Línea de transición sutil */}
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
