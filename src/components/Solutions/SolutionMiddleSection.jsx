import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, ChevronRight } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899", "#f97316", "#14b8a6"];

const SolutionMiddleSection = ({ name, title, blocks = [], image = [], websiteLink }) => {
    const [visible, setVisible] = useState(false);
    const [activeBlock, setActiveBlock] = useState(null);
    const ref = useRef(null);
    const formattedName = name ? name.replace(/([a-z])([A-Z])/g, "$1 $2") : name;
    const hasImage = image.length > 0 && image[0]?.images?.url;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
            style={{ background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 50%, #f8fbff 100%)" }}>
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <motion.div className={`mb-10 md:mb-14 ${hasImage ? "" : "text-center max-w-2xl mx-auto"}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}>
                    <div className={`inline-flex items-center gap-2 mb-4 ${hasImage ? "" : "justify-center"}`}>
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: BRAND.mediumBlue }}>
                            Key Features
                        </span>
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.12] tracking-tight"
                        style={{ color: BRAND.darkBlue }}>
                        {title}
                    </h2>
                </motion.div>

                <div className={`flex flex-col ${hasImage ? "lg:flex-row" : ""} gap-12 lg:gap-16 items-start`}>

                    {/* Image (sticky) */}
                    {hasImage && (
                        <motion.div className="lg:w-[42%] lg:sticky lg:top-24"
                            initial={{ opacity: 0, x: -24 }}
                            animate={visible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 }}>
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse, ${BRAND.mediumBlue}06 0%, transparent 60%)` }} />
                                <motion.div className="rounded-2xl overflow-hidden relative z-10"
                                    style={{ boxShadow: `0 20px 50px ${BRAND.darkBlue}10` }}
                                    whileHover={{ y: -4, boxShadow: `0 24px 56px ${BRAND.darkBlue}14` }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                                    <img src={image[0].images.url} alt={title} className="w-full h-auto" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Features */}
                    <div className={hasImage ? "lg:w-[58%]" : "w-full"}>
                        <div className={`grid gap-3 ${hasImage ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                            {blocks.map((block, i) => {
                                const isActive = activeBlock === i;
                                const accent = COLORS[i % COLORS.length];

                                return (
                                    <motion.div
                                        key={i}
                                        className="group relative rounded-xl p-5 cursor-pointer overflow-hidden"
                                        style={{
                                            background: isActive ? "white" : "#fafbfc",
                                            border: `1px solid ${isActive ? accent + "25" : "#f0f0f0"}`,
                                            boxShadow: isActive ? `0 8px 24px ${accent}08` : "none",
                                            transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
                                        }}
                                        onMouseEnter={() => setActiveBlock(i)}
                                        onMouseLeave={() => setActiveBlock(null)}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={visible ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.12 + i * 0.05, duration: 0.45 }}
                                        whileHover={{ y: -3 }}
                                    >
                                        {/* Glow */}
                                        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)` }} />

                                        <div className="flex items-start gap-3.5 relative z-10">
                                            {/* Number badge */}
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-all duration-300"
                                                style={{
                                                    background: isActive ? `${accent}12` : `${accent}06`,
                                                    color: accent,
                                                    border: `1px solid ${isActive ? accent + "25" : accent + "08"}`,
                                                }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm mb-1 transition-colors duration-300 leading-snug"
                                                    style={{ color: isActive ? BRAND.darkBlue : "#1e293b" }}>
                                                    {block.title}
                                                </h4>
                                                {block.description && (
                                                    <p className="text-xs leading-relaxed transition-colors duration-300"
                                                        style={{ color: isActive ? "#64748b" : "#94a3b8" }}>
                                                        {block.description}
                                                    </p>
                                                )}
                                            </div>
                                            <ChevronRight size={14} className="flex-shrink-0 mt-1 transition-all duration-300"
                                                style={{
                                                    color: isActive ? accent : "#d1d5db",
                                                    transform: isActive ? "translateX(2px)" : "translateX(0)",
                                                }} />
                                        </div>

                                        {/* Bottom bar */}
                                        <div className="mt-3 h-[2px] rounded-full transition-all duration-400"
                                            style={{
                                                width: isActive ? 32 : 0,
                                                background: `linear-gradient(90deg, ${accent}, ${accent}50)`,
                                            }} />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        {websiteLink && (
                            <motion.div className="mt-8"
                                initial={{ opacity: 0, y: 16 }}
                                animate={visible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + blocks.length * 0.05, duration: 0.5 }}>
                                <motion.a
                                    href={websiteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm cursor-pointer overflow-hidden relative"
                                    style={{ background: BRAND.darkBlue }}
                                    whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${BRAND.darkBlue}30` }}
                                    whileTap={{ scale: 0.98 }}>
                                    <span className="relative z-10">Discover {formattedName}</span>
                                    <ExternalLink size={14} className="relative z-10" />
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                                </motion.a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionMiddleSection;
