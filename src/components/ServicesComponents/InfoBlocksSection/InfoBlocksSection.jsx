import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"];

const InfoBlocksSection = ({ blocks }) => {
    const [visible, setVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} id="services-info">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {blocks.map((block, i) => {
                    const isHovered = hoveredId === i;
                    const accent = COLORS[i % COLORS.length];

                    return (
                        <motion.div
                            key={i}
                            className="group relative rounded-2xl p-6 cursor-default overflow-hidden"
                            style={{
                                background: isHovered ? "white" : "#fafbfc",
                                border: `1px solid ${isHovered ? accent + "25" : "#f0f0f0"}`,
                                boxShadow: isHovered ? `0 12px 32px ${accent}10` : "0 1px 2px rgba(0,0,0,0.02)",
                                transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                            }}
                            onMouseEnter={() => setHoveredId(i)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ opacity: 0, y: 24 }}
                            animate={visible ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Corner glow */}
                            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)` }} />

                            {/* Step number */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300"
                                    style={{
                                        background: isHovered ? `${accent}12` : `${accent}06`,
                                        color: accent,
                                        border: `1px solid ${isHovered ? accent + "25" : accent + "08"}`,
                                    }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div className="flex-1 h-[1px] transition-all duration-400"
                                    style={{ background: isHovered ? `${accent}20` : "#f0f0f0" }} />
                            </div>

                            <h3 className="font-bold text-[15px] mb-2.5 transition-colors duration-300 leading-snug"
                                style={{ color: isHovered ? BRAND.darkBlue : "#1e293b" }}>
                                {block.title}
                            </h3>

                            <p className="text-xs leading-relaxed transition-colors duration-300"
                                style={{ color: isHovered ? "#64748b" : "#94a3b8" }}>
                                {block.description}
                            </p>

                            {/* Bottom accent */}
                            <div className="mt-4 h-[2px] rounded-full transition-all duration-400"
                                style={{
                                    width: isHovered ? 36 : 18,
                                    background: isHovered ? `linear-gradient(90deg, ${accent}, ${accent}50)` : `${accent}15`,
                                }} />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfoBlocksSection;
