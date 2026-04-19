import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, BadgeCheck, Trophy } from "lucide-react";
import { awardsCertificationsHeader } from "@/data/homeData";
import awsImage from "@/assets/images/Award&Certification/awsImage.png";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const certifications = [
    {
        image: awsImage,
        title: "AWS Certified",
        subtitle: "Cloud Solutions Partner",
        icon: ShieldCheck,
        color: "#f59e0b",
    },
    
    {
        image: null,
        title: "Quality Assured",
        subtitle: "Agile Development Process",
        icon: Trophy,
        color: "#10b981",
    },
    {
        image: null,
        title: "Data Protection",
        subtitle: "GDPR Compliant",
        icon: ShieldCheck,
        color: "#8b5cf6",
    },
];

const AwardsCertifications = () => {
    const [visible, setVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section ref={ref} className="py-16 md:py-24 px-5 md:px-10"
            style={{ background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)" }}>
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="text-center max-w-[600px] mx-auto mb-12 md:mb-16">
                    <motion.div {...fadeUp(0)}>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                            <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
                                style={{ color: BRAND.mediumBlue }}>
                                Trust & Quality
                            </span>
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        </div>
                    </motion.div>

                    <motion.h2 {...fadeUp(0.06)}
                        className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight"
                        style={{ color: BRAND.darkBlue }}>
                        {awardsCertificationsHeader.title}
                    </motion.h2>

                    <motion.p {...fadeUp(0.12)}
                        className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-3">
                        {awardsCertificationsHeader.description}
                    </motion.p>
                </div>

                {/* Cards grid */}
                <motion.div {...fadeUp(0.18)}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                    {certifications.map((cert, i) => {
                        const Icon = cert.icon;
                        const isHovered = hoveredId === i;

                        return (
                            <motion.div
                                key={i}
                                className="group relative rounded-2xl p-6 text-center cursor-default overflow-hidden"
                                style={{
                                    background: "white",
                                    border: `1px solid ${isHovered ? cert.color + "30" : "#f0f0f0"}`,
                                    boxShadow: isHovered
                                        ? `0 12px 32px ${cert.color}12`
                                        : "0 1px 3px rgba(0,0,0,0.03)",
                                    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                                }}
                                onMouseEnter={() => setHoveredId(i)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Corner glow */}
                                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle, ${cert.color}12 0%, transparent 70%)` }} />

                                {/* Icon or image */}
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-400"
                                    style={{
                                        background: isHovered ? `${cert.color}10` : `${cert.color}06`,
                                        border: `1px solid ${isHovered ? cert.color + "20" : cert.color + "08"}`,
                                    }}>
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.title}
                                            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                                    ) : (
                                        <Icon size={26}
                                            className="transition-transform duration-300 group-hover:scale-110"
                                            style={{ color: cert.color }} />
                                    )}
                                </div>

                                <h3 className="font-bold text-sm md:text-[15px] mb-1 transition-colors duration-300"
                                    style={{ color: isHovered ? BRAND.darkBlue : "#1e293b" }}>
                                    {cert.title}
                                </h3>
                                <p className="text-gray-400 text-[11px] md:text-xs">
                                    {cert.subtitle}
                                </p>

                                {/* Accent */}
                                <div className="mx-auto mt-4 h-[2px] rounded-full transition-all duration-400"
                                    style={{
                                        width: isHovered ? 32 : 16,
                                        background: isHovered
                                            ? `linear-gradient(90deg, ${cert.color}, ${cert.color}60)`
                                            : `${cert.color}18`,
                                    }} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default AwardsCertifications;
