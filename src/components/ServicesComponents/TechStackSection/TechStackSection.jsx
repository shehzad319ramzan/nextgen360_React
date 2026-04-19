import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const TechStackSection = ({ title, description, techLogos }) => {
    const [visible, setVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-16 md:py-20"
            style={{ background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 50%, #f8fbff 100%)" }}>
            <div className="max-w-[1100px] mx-auto px-5 md:px-10">
                <motion.div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: BRAND.mediumBlue }}>
                            Tech Stack
                        </span>
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight" style={{ color: BRAND.darkBlue }}>
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-3">{description}</p>
                </motion.div>

                {techLogos && techLogos.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                        {techLogos.map((logo, i) => {
                            const isHovered = hoveredId === logo.id;
                            return (
                                <motion.div
                                    key={logo.id}
                                    className="group rounded-2xl flex flex-col items-center justify-center gap-2 cursor-default relative overflow-hidden"
                                    style={{
                                        width: 90, height: 90,
                                        background: isHovered ? "white" : "#fafbfc",
                                        border: `1px solid ${isHovered ? BRAND.mediumBlue + "25" : "#f0f0f0"}`,
                                        boxShadow: isHovered ? `0 10px 28px ${BRAND.darkBlue}08` : "none",
                                        transition: "all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
                                    }}
                                    onMouseEnter={() => setHoveredId(logo.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: i * 0.03, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    whileHover={{ y: -4, scale: 1.06 }}
                                >
                                    {/* Glow */}
                                    <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                        style={{ background: `radial-gradient(circle, ${BRAND.mediumBlue}10 0%, transparent 70%)` }} />

                                    <img src={logo.src} alt={logo.alt || ""}
                                        className="w-9 h-9 object-contain relative z-10 transition-all duration-300"
                                        style={{
                                            filter: isHovered ? "none" : "grayscale(40%)",
                                            opacity: isHovered ? 1 : 0.6,
                                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                                        }} />

                                    {/* Label tooltip */}
                                    {logo.alt && isHovered && (
                                        <motion.span
                                            className="absolute -bottom-0.5 text-[8px] font-semibold tracking-wide uppercase"
                                            style={{ color: BRAND.mediumBlue }}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}>
                                            {logo.alt}
                                        </motion.span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TechStackSection;
