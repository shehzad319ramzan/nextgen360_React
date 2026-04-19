import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { industriesIcons, industryShowcase } from "@/data/homeData";
import { ArrowRight } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const IndustryShowcase = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 overflow-hidden"
            style={{ background: `linear-gradient(170deg, #f8fbff 0%, #edf4fc 40%, #f0f6fd 100%)` }}
        >
            {/* Subtle background shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
                style={{
                    background: `radial-gradient(circle, ${BRAND.mediumBlue}12 0%, transparent 70%)`,
                    transform: "translate(30%, -40%)",
                }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
                style={{
                    background: `radial-gradient(circle, ${BRAND.darkBlue}10 0%, transparent 70%)`,
                    transform: "translate(-30%, 40%)",
                }} />

            <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10">
                {/* ─── Header ─── */}
                <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
                    <motion.div {...fadeUp(0)}>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                            <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
                                style={{ color: BRAND.mediumBlue }}>
                                Industries We Serve
                            </span>
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        </div>
                    </motion.div>

                    <motion.h2 {...fadeUp(0.08)}
                        className="text-2xl sm:text-3xl md:text-[2.3rem] font-bold leading-[1.15] tracking-tight mb-4"
                        style={{ color: BRAND.darkBlue }}>
                        {industryShowcase.heading}
                    </motion.h2>

                    <motion.p {...fadeUp(0.14)}
                        className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                        {industryShowcase.description}
                    </motion.p>
                </div>

                {/* ─── Industry Cards Grid ─── */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
                    {...fadeUp(0.2)}
                >
                    {industriesIcons.map((industry, i) => {
                        const isHovered = hoveredId === industry.id;
                        return (
                            <motion.div
                                key={industry.id}
                                className="relative rounded-2xl p-5 md:p-6 cursor-default group overflow-hidden"
                                style={{
                                    background: isHovered ? "white" : "rgba(255,255,255,0.6)",
                                    border: `1px solid ${isHovered ? `${BRAND.mediumBlue}30` : "rgba(15,76,143,0.06)"}`,
                                    backdropFilter: "blur(8px)",
                                    boxShadow: isHovered
                                        ? `0 12px 32px ${BRAND.darkBlue}12, 0 0 0 1px ${BRAND.mediumBlue}08`
                                        : "0 1px 3px rgba(0,0,0,0.03)",
                                    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                                }}
                                onMouseEnter={() => setHoveredId(industry.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -6 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Hover glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle, ${BRAND.mediumBlue}10 0%, transparent 70%)` }} />

                                {/* Icon */}
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-400 group-hover:scale-105"
                                    style={{
                                        background: isHovered
                                            ? `linear-gradient(135deg, ${BRAND.darkBlue}10, ${BRAND.mediumBlue}10)`
                                            : `${BRAND.darkBlue}06`,
                                        border: `1px solid ${isHovered ? `${BRAND.mediumBlue}18` : `${BRAND.darkBlue}06`}`,
                                    }}>
                                    <img
                                        src={industry.icon}
                                        alt={industry.title}
                                        className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-sm md:text-[15px] leading-snug transition-colors duration-300"
                                    style={{ color: isHovered ? BRAND.darkBlue : "#374151" }}>
                                    {industry.title}
                                </h3>

                                {/* Accent line */}
                                <div className="mt-3 h-[2px] rounded-full transition-all duration-400"
                                    style={{
                                        width: isHovered ? 32 : 16,
                                        background: isHovered
                                            ? `linear-gradient(90deg, ${BRAND.mediumBlue}, ${BRAND.orange})`
                                            : `${BRAND.darkBlue}15`,
                                    }} />
                            </motion.div>
                        );
                    })}

                    {/* CTA card */}
                    <motion.div
                        className="relative rounded-2xl p-5 md:p-6 flex flex-col justify-center items-center text-center cursor-pointer group overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})`,
                            border: `1px solid ${BRAND.mediumBlue}30`,
                        }}
                        onClick={() => navigate("/contact")}
                        whileHover={{ y: -6, boxShadow: `0 16px 40px ${BRAND.darkBlue}25` }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: `linear-gradient(135deg, ${BRAND.mediumBlue}, ${BRAND.orange}dd)` }} />

                        <div className="relative z-10">
                            <p className="text-white/80 text-xs font-medium mb-2">Don't see your industry?</p>
                            <p className="text-white font-bold text-sm md:text-base mb-3">We've Got You Covered</p>
                            <div className="inline-flex items-center gap-1.5 text-white/90 text-xs font-medium group-hover:gap-2.5 transition-all duration-300">
                                Contact Us <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default IndustryShowcase;
