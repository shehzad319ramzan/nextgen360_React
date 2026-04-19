import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Layers } from "lucide-react";
import PortfolioSEO from "./PortfolioSEO";
import { htmlProps } from "@/utils/html";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const PortfolioDetail = () => {
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/portfolio/${slug}`)
            .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
            .then((data) => { setItem(data); setLoading(false); })
            .catch(() => { setItem(null); setLoading(false); });
    }, [slug]);

    const getImgUrl = (img) => {
        if (!img) return null;
        return img.startsWith("http") ? img : `${import.meta.env.VITE_BACKEND_URL}${img}`;
    };

    const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 rounded-full animate-spin"
                    style={{ borderColor: `${BRAND.mediumBlue}30`, borderTopColor: BRAND.mediumBlue }} />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
                <Layers size={40} className="mb-4 text-gray-200" />
                <h2 className="text-2xl font-bold mb-2" style={{ color: BRAND.darkBlue }}>Project Not Found</h2>
                <p className="text-gray-500 text-sm mb-6">This portfolio item doesn't exist or has been removed.</p>
                <Link to="/portfolio" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium"
                    style={{ background: BRAND.darkBlue }}>
                    <ArrowLeft size={14} /> Back to Portfolio
                </Link>
            </div>
        );
    }

    const coverUrl = getImgUrl(item.cover_image);
    const tags = item.tags ? item.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

    return (
        <>
            <PortfolioSEO item={item} slug={slug} coverUrl={coverUrl} />

            {/* ─── Hero banner ─── */}
            {coverUrl && (
                <motion.section
                    className="relative overflow-hidden"
                    style={{ minHeight: "45vh" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src={coverUrl} alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, #0F4C8Fee 0%, #3498dbaa 40%, #3498db60 100%)` }} />

                    <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col justify-end min-h-[45vh]">
                        <Link to="/portfolio"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors mb-6 self-start">
                            <ArrowLeft size={13} /> All Projects
                        </Link>

                        {item.category && (
                            <motion.span
                                className="inline-block self-start px-3 py-1 rounded-md text-[10px] font-semibold tracking-wide uppercase mb-3"
                                style={{ background: `${BRAND.orange}20`, color: BRAND.orange }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                {item.category}
                            </motion.span>
                        )}

                        <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
                            {item.title}
                        </motion.h1>

                        {item.description && (
                            <motion.div
                                className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed [&_a]:underline [&_strong]:text-white/80"
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
                                {...htmlProps(item.description)}
                            />
                        )}
                    </div>
                </motion.section>
            )}

            {/* ─── Content ─── */}
            <section className="py-12 md:py-20 px-5 md:px-10">
                <div className="max-w-[900px] mx-auto">

                    {/* No-cover fallback header */}
                    {!coverUrl && (
                        <div className="mb-10">
                            <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:gap-2.5 transition-all"
                                style={{ color: BRAND.mediumBlue }}>
                                <ArrowLeft size={14} /> All Projects
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: BRAND.darkBlue }}>
                                {item.title}
                            </h1>
                            {item.description && <div className="text-gray-500 text-sm md:text-base leading-relaxed [&_a]:text-[#388ECA] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5" {...htmlProps(item.description)} />}
                        </div>
                    )}

                    {/* Meta row */}
                    <motion.div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10 pb-6"
                        style={{ borderBottom: "1px solid #f0f0f0" }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        {item.client && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <User size={13} style={{ color: BRAND.mediumBlue }} />
                                <span>Client: <strong className="text-gray-700">{item.client}</strong></span>
                            </div>
                        )}
                        {item.category && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Layers size={13} style={{ color: BRAND.mediumBlue }} />
                                <span>{item.category}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={13} style={{ color: BRAND.mediumBlue }} />
                            <span>{formatDate(item.created_at)}</span>
                        </div>
                        {item.url && (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white ml-auto cursor-pointer"
                                style={{ background: BRAND.darkBlue }}>
                                Visit Live Site <ExternalLink size={12} />
                            </a>
                        )}
                    </motion.div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <motion.div className="flex flex-wrap gap-2 mb-8"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <Tag size={13} className="text-gray-400 mt-0.5" />
                            {tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-medium"
                                    style={{ background: `${BRAND.mediumBlue}08`, color: BRAND.mediumBlue, border: `1px solid ${BRAND.mediumBlue}15` }}>
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* HTML content */}
                    {item.content && (
                        <motion.div
                            className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed
                                [&_h2]:text-[#0F4C8F] [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3
                                [&_h3]:text-[#0F4C8F] [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
                                [&_a]:text-[#388ECA] [&_a]:underline
                                [&_img]:rounded-xl [&_img]:my-6 [&_img]:shadow-md
                                [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                                [&_blockquote]:border-l-4 [&_blockquote]:border-[#388ECA] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        />
                    )}

                    {/* Bottom CTA */}
                    <motion.div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ borderTop: "1px solid #f0f0f0" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                        <Link to="/portfolio"
                            className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all"
                            style={{ color: BRAND.mediumBlue }}>
                            <ArrowLeft size={14} /> Back to Portfolio
                        </Link>
                        <Link to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
                            style={{ background: BRAND.darkBlue }}>
                            Start Your Project <ArrowLeft size={14} className="rotate-180" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default PortfolioDetail;
