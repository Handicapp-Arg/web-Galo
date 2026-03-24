import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BLOGS_DATA } from '../data/blogsData';

function BlogCard({ post, index }) {
  const delay = `delay-${(index % 3) * 100 + 100}`;
  return (
    <div className={`reveal ${delay} group`}>
      <Link
        to={`/blogs/${post.slug}`}
        className="block bg-[#0d0d0d] border border-white/8 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2"
      >
        {/* Imagen */}
        <div className="h-40 bg-gradient-to-br from-[#0f1a0f] to-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
          {post.imgUrl ? (
            <img src={post.imgUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <svg viewBox="0 0 60 60" className="w-12 h-12 opacity-20" fill="none">
              <rect x="5" y="5" width="50" height="50" rx="4" stroke="white" strokeWidth="2" />
              <path d="M15 30 Q30 15 45 30" stroke="white" strokeWidth="2" />
              <circle cx="22" cy="22" r="4" stroke="white" strokeWidth="2" />
            </svg>
          )}
          {/* Chip categoría */}
          <span className="absolute top-3 left-3 bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-[#22c55e]/30">
            {post.category}
          </span>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <h3 className="text-[#eab308] font-bold text-base leading-snug mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <span className="text-[#22c55e] text-xs font-bold tracking-wider uppercase">
            + info
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function BlogsPage() {
  const sectionRef = useScrollReveal();

  return (
    <Layout>
      <section ref={sectionRef} className="px-6 md:px-12 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Título */}
          <div className="text-center mb-14">
            <p className="reveal text-[#eab308] font-bold tracking-[0.2em] uppercase text-xs mb-3">CONTENIDO</p>
            <h1 className="reveal delay-100 text-4xl md:text-6xl font-black tracking-tight text-white">
              Blog de <span className="text-[#22c55e]">Marketing Digital</span>
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS_DATA.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
