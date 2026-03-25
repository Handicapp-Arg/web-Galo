import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ServiciosPage from './pages/ServiciosPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
        {/* Fallback: redirige al inicio */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
