import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Layers, ArrowRight, Eye, Sparkles, ChevronDown, ArrowUpRight } from "lucide-react";
import PageSEO from "@/components/common/PageSEO/PageSEO";
import { stripHtml } from "@/utils/html";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

// ─── Animated counter ───
const AnimCount = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const done = useRef(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done.current) {
                done.current = true;
                const t0 = performance.now();
                const tick = (now) => {
                    const p = Math.min((now - t0) / 1600, 1);
                    setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Project card with scroll reveal ───
const ProjectCard = ({ item, index, getImgUrl }) => {
    const [isHovered, setIsHovered] = useState(false);
    const coverUrl = getImgUrl(item.cover_image);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: (index % 3) * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative rounded-2xl overflow-hidden"
            style={{
                background: "white",
                border: `1px solid ${isHovered ? BRAND.mediumBlue + "30" : "#f0f0f0"}`,
                boxShadow: isHovered ? `0 20px 50px ${BRAND.darkBlue}12` : "0 1px 3px rgba(0,0,0,0.03)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8 }}
        >
            {/* Image */}
            {coverUrl ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                    <motion.img
                        src={coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}bb, ${BRAND.mediumBlue}88)` }}
                    >
                        <motion.div initial={{ scale: 0 }} animate={{ scale: isHovered ? 1 : 0 }} transition={{ delay: 0.05, type: "spring", stiffness: 300 }}>
                            <Link to={`/portfolio/${item.slug}`}
                                className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                style={{ color: BRAND.darkBlue }}>
                                <Eye size={18} />
                            </Link>
                        </motion.div>
                        {item.url && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: isHovered ? 1 : 0 }} transition={{ delay: 0.1, type: "spring", stiffness: 300 }}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                    style={{ color: BRAND.darkBlue }}>
                                    <ExternalLink size={18} />
                                </a>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Category badge */}
                    {item.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[9px] font-semibold tracking-wide uppercase text-white"
                            style={{ background: `${BRAND.darkBlue}cc`, backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            {item.category}
                        </span>
                    )}
                </div>
            ) : (
                <div className="aspect-[16/10] flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}06, ${BRAND.mediumBlue}06)` }}>
                    <Layers size={32} style={{ color: `${BRAND.mediumBlue}25` }} />
                </div>
            )}

            {/* Content */}
            <div className="p-5 md:p-6">
                <h3 className="font-bold text-[15px] md:text-base mb-1.5 leading-snug transition-colors duration-300"
                    style={{ color: isHovered ? BRAND.darkBlue : "#1e293b" }}>
                    {item.title}
                </h3>

                {item.client && (
                    <p className="text-[11px] text-gray-400 mb-2">
                        Client: <span className="font-medium text-gray-500">{item.client}</span>
                    </p>
                )}

                {item.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">{stripHtml(item.description)}</p>
                )}

                {item.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.split(",").slice(0, 4).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-medium transition-all duration-300"
                                style={{
                                    background: isHovered ? `${BRAND.mediumBlue}08` : "#f8f8f8",
                                    color: isHovered ? BRAND.mediumBlue : "#94a3b8",
                                    border: `1px solid ${isHovered ? BRAND.mediumBlue + "15" : "#f0f0f0"}`,
                                }}>
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                <Link to={`/portfolio/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300"
                    style={{ color: BRAND.mediumBlue }}>
                    View Case Study <ArrowUpRight size={12} />
                </Link>
            </div>

            {/* Bottom accent bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                    background: `linear-gradient(90deg, ${BRAND.mediumBlue}, ${BRAND.orange})`,
                    transformOrigin: "left",
                }}
            />
        </motion.div>
    );
};

// ─── Main Page ───
const PortfolioList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [mounted, setMounted] = useState(false);
    const heroRef = useRef(null);
    const gridRef = useRef(null);

    // Cursor glow
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothX = useSpring(cursorX, { stiffness: 30, damping: 30 });
    const smoothY = useSpring(cursorY, { stiffness: 30, damping: 30 });
    const glowX = useTransform(smoothX, (v) => `${v}px`);
    const glowY = useTransform(smoothY, (v) => `${v}px`);

    // Parallax for hero
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const onHeroMove = useCallback((e) => {
        if (!heroRef.current) return;
        const r = heroRef.current.getBoundingClientRect();
        cursorX.set(e.clientX - r.left);
        cursorY.set(e.clientY - r.top);
    }, [cursorX, cursorY]);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/portfolio`)
            .then((r) => r.json())
            .then((data) => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => { setItems([]); setLoading(false); });
    }, []);

    const categories = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];
    const filtered = activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

    const getImgUrl = (img) => {
        if (!img) return null;
        return img.startsWith("http") ? img : `${import.meta.env.VITE_BACKEND_URL}${img}`;
    };

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30, filter: "blur(8px)" },
        animate: mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
        transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <>
            <PageSEO page="portfolio" fallback={{ path: "/portfolio" }} />

            {/* ═══ HERO ═══ */}
            <section
                ref={heroRef}
                onMouseMove={onHeroMove}
                className="relative min-h-[65vh] flex items-center overflow-hidden"
                style={{ background: `linear-gradient(145deg, ${BRAND.darkBlue} 0%, #1a6bc4 35%, #3498db 100%)` }}
            >
                {/* Cursor glow */}
                <motion.div className="absolute pointer-events-none z-0"
                    style={{ left: glowX, top: glowY, width: 700, height: 700, x: "-50%", y: "-50%",
                        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 55%)" }} />

                {/* Grid dots */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* Animated orbs */}
                {[
                    { w: 450, t: "-12%", l: "-6%", c: `${BRAND.orange}0d`, d: 11 },
                    { w: 350, t: "55%", l: "72%", c: "rgba(255,255,255,0.06)", d: 14 },
                    { w: 220, t: "18%", l: "35%", c: "rgba(255,255,255,0.04)", d: 9 },
                ].map((o, i) => (
                    <motion.div key={i} className="absolute rounded-full pointer-events-none"
                        style={{ width: o.w, height: o.w, top: o.t, left: o.l,
                            background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)` }}
                        animate={{ y: [0, -25, 0, 18, 0], x: [0, 12, -10, 6, 0] }}
                        transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }} />
                ))}

                {/* Decorative */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
                    style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(25%, -35%)" }} />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.05]"
                    style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 40%)" }} />

                {/* Parallax content */}
                <motion.div style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center w-full">

                    <motion.div {...fadeUp(0)}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                            <Sparkles size={13} style={{ color: BRAND.orange }} />
                            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Our Work</span>
                        </div>
                    </motion.div>

                    <motion.h1 {...fadeUp(0.08)}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold leading-[1.05] tracking-[-0.02em] text-white mb-6">
                        Projects That{" "}
                        <span className="relative inline-block">
                            <span style={{ color: BRAND.orange }}>Speak</span>
                            <motion.span className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                                style={{ background: `linear-gradient(90deg, ${BRAND.orange}, white)` }}
                                initial={{ width: "0%" }}
                                animate={mounted ? { width: "100%" } : {}}
                                transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} />
                        </span>
                        <br className="hidden sm:block" />
                        For Themselves
                    </motion.h1>

                    <motion.p {...fadeUp(0.15)}
                        className="text-white/50 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Real projects. Real results. Explore how we've helped businesses transform with technology.
                    </motion.p>

                    {/* Stats */}
                    <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {[{ n: items.length || 50, s: "+", l: "Projects Delivered" },
                          { n: 8, s: "+", l: "Industries Served" },
                          { n: 98, s: "%", l: "Client Satisfaction" }].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl"
                                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}>
                                <span className="text-2xl md:text-3xl font-bold text-white">
                                    <AnimCount target={stat.n} suffix={stat.s} />
                                </span>
                                <span className="text-[10px] md:text-xs text-white/40 font-medium text-left leading-tight max-w-[80px]">{stat.l}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
                    initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
                    onClick={() => gridRef.current?.scrollIntoView({ behavior: "smooth" })}>
                    <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 cursor-pointer">Explore</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                        <ChevronDown size={16} className="text-white/30" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ FILTER + GRID ═══ */}
            <section ref={gridRef} className="py-12 md:py-20 px-5 md:px-10">
                <div className="max-w-[1200px] mx-auto">

                    {/* Section title */}
                    <motion.div className="text-center mb-8 md:mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: BRAND.darkBlue }}>
                            Featured Work
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                            {filtered.length} project{filtered.length !== 1 ? "s" : ""} {activeCategory !== "All" ? `in ${activeCategory}` : ""}
                        </p>
                    </motion.div>

                    {/* Category filter */}
                    {categories.length > 1 && (
                        <motion.div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-14"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}>
                            {categories.map((cat) => (
                                <motion.button key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className="px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300"
                                    style={{
                                        background: activeCategory === cat ? `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` : "transparent",
                                        color: activeCategory === cat ? "white" : "#64748b",
                                        border: `1px solid ${activeCategory === cat ? BRAND.darkBlue : "#e2e8f0"}`,
                                        boxShadow: activeCategory === cat ? `0 4px 12px ${BRAND.darkBlue}20` : "none",
                                    }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}>
                                    {cat}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-24">
                            <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto"
                                style={{ borderColor: `${BRAND.mediumBlue}30`, borderTopColor: BRAND.mediumBlue }} />
                            <p className="text-gray-400 text-sm mt-4">Loading projects...</p>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && filtered.length === 0 && (
                        <motion.div className="text-center py-24 rounded-2xl"
                            style={{ background: "#fafbfc", border: "1px solid #f0f0f0" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}>
                            <Layers size={40} className="mx-auto mb-4 text-gray-200" />
                            <h3 className="font-bold text-lg mb-1" style={{ color: BRAND.darkBlue }}>
                                {activeCategory !== "All" ? `No ${activeCategory} projects yet` : "Portfolio Coming Soon"}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {activeCategory !== "All" ? "Try a different category." : "We're adding our best work. Check back soon!"}
                            </p>
                        </motion.div>
                    )}

                    {/* Grid with scroll-triggered cards */}
                    {!loading && filtered.length > 0 && (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((item, i) => (
                                    <ProjectCard key={item.id} item={item} index={i} getImgUrl={getImgUrl} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Bottom CTA */}
                    {!loading && items.length > 0 && (
                        <motion.div className="text-center mt-14 md:mt-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}>
                            <p className="text-gray-400 text-sm mb-4">Have a project in mind?</p>
                            <Link to="/contact">
                                <motion.button
                                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm cursor-pointer overflow-hidden relative"
                                    style={{ background: BRAND.darkBlue }}
                                    whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${BRAND.darkBlue}30` }}
                                    whileTap={{ scale: 0.98 }}>
                                    <span className="relative z-10">Start Your Project</span>
                                    <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
};

export default PortfolioList;
