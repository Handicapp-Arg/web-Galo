import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BLOGS_DATA } from '../data/blogsData';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = BLOGS_DATA.find((b) => b.slug === slug);
  const sectionRef = useScrollReveal();

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <Layout>
      <article ref={sectionRef} className="px-6 md:px-12 py-12">
        <div className="max-w-[860px] mx-auto">

          {/* Breadcrumb */}
          <Link
            to="/blogs"
            className="reveal inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Categoría */}
          <p className="reveal text-[#22c55e] font-bold tracking-[0.2em] uppercase text-xs mb-4">
            {post.category}
          </p>

          {/* Título */}
          <h1 className="reveal delay-100 text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="reveal delay-200 text-gray-400 text-base mb-10 italic">
              {post.subtitle}
            </p>
          )}

          {/* Imagen */}
          {post.imgUrl && (
            <div className="reveal delay-200 rounded-2xl overflow-hidden mb-10 h-64">
              <img src={post.imgUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Cuerpo */}
          <div className="reveal delay-300 prose prose-invert prose-base max-w-none text-gray-300 leading-relaxed space-y-5">
            {post.body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Autor */}
          <div className="reveal delay-400 mt-16 pt-8 border-t border-white/10 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0 overflow-hidden">
              {post.author.avatarUrl ? (
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
            <div>
              <p className="text-white font-bold">{post.author.name}</p>
              <p className="text-gray-400 text-sm">{post.author.role}</p>
            </div>
          </div>

        </div>
      </article>
    </Layout>
  );
}
