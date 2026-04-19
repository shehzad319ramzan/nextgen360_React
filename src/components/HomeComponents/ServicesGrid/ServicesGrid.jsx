import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Code2, Smartphone, Palette, Brain, Cloud, Bot, Layers, Server, ArrowRight
} from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const SERVICES = [
    {
        icon: Code2,
        title: "Web Development",
        category: "Full-Stack",
        description: "High-performance web apps with React, Next.js, and Node.js — optimized for speed, scalability, and SEO.",
        color: "#3b82f6",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        category: "Cross-Platform",
        description: "Native and cross-platform mobile apps with Flutter and React Native that deliver seamless experiences on every device.",
        color: "#10b981",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        category: "Design Systems",
        description: "Research-driven interfaces and design systems in Figma — wireframes, prototypes, and pixel-perfect handoffs that convert.",
        color: "#f59e0b",
    },
    {
        icon: Brain,
        title: "AI & Machine Learning",
        category: "Intelligent Systems",
        description: "Custom ML models, NLP pipelines, computer vision, and predictive analytics that unlock smart insights from your data.",
        color: "#8b5cf6",
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        category: "Infrastructure",
        description: "AWS, Azure, and GCP infrastructure with CI/CD pipelines, Docker, Kubernetes, and auto-scaling for reliable deployments.",
        color: "#06b6d4",
    },
    {
        icon: Bot,
        title: "Agentic AI Solutions",
        category: "Autonomous Agents",
        description: "Building autonomous AI agents that reason, plan, and execute — from RAG pipelines to multi-agent orchestration systems.",
        color: "#ec4899",
    },
    {
        icon: Layers,
        title: "SaaS Product Development",
        category: "End-to-End",
        description: "Full lifecycle SaaS development — multi-tenant architecture, subscription billing, dashboards, and seamless onboarding flows.",
        color: "#f97316",
    },
    {
        icon: Server,
        title: "API & Backend Engineering",
        category: "Microservices",
        description: "Robust REST and GraphQL APIs, microservice architectures, database design, and third-party integrations at scale.",
        color: "#14b8a6",
    },
];

const ServicesGrid = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
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
        <section ref={sectionRef} className="py-16 md:py-24 px-5 md:px-10"
            style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)" }}>
            <div className="max-w-[1200px] mx-auto">

                {/* ─── Header ─── */}
                <div className="text-center max-w-[620px] mx-auto mb-12 md:mb-16">
                    <motion.div {...fadeUp(0)}>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                            <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
                                style={{ color: BRAND.mediumBlue }}>
                                What We Do
                            </span>
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        </div>
                    </motion.div>

                    <motion.h2 {...fadeUp(0.06)}
                        className="text-2xl sm:text-3xl md:text-[2.3rem] font-bold leading-[1.15] tracking-tight"
                        style={{ color: BRAND.darkBlue }}>
                        Our Services
                    </motion.h2>

                    <motion.p {...fadeUp(0.12)}
                        className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-3">
                        We deliver end-to-end technology solutions — from intelligent AI systems to cloud infrastructure — built to scale your business.
                    </motion.p>
                </div>

                {/* ─── Grid ─── */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
                    {...fadeUp(0.18)}
                >
                    {SERVICES.map((service, i) => {
                        const Icon = service.icon;
                        const isHovered = hoveredId === i;

                        return (
                            <motion.div
                                key={i}
                                className="group relative rounded-2xl p-6 cursor-default overflow-hidden"
                                style={{
                                    background: isHovered ? "white" : "#ffffff",
                                    border: `1px solid ${isHovered ? service.color + "30" : "#f0f0f0"}`,
                                    boxShadow: isHovered
                                        ? `0 16px 40px ${service.color}12, 0 0 0 1px ${service.color}08`
                                        : "0 1px 3px rgba(0,0,0,0.02)",
                                    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                                }}
                                onMouseEnter={() => setHoveredId(i)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -6 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Corner glow */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle, ${service.color}10 0%, transparent 70%)` }} />

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-400"
                                    style={{
                                        background: isHovered ? `${service.color}12` : `${service.color}08`,
                                        border: `1px solid ${isHovered ? service.color + "20" : service.color + "08"}`,
                                    }}>
                                    <Icon size={22}
                                        className="transition-all duration-300 group-hover:scale-110"
                                        style={{ color: service.color }} />
                                </div>

                                {/* Category tag */}
                                <span className="text-[10px] font-semibold tracking-wide uppercase mb-2 block transition-colors duration-300"
                                    style={{ color: isHovered ? service.color : "#94a3b8" }}>
                                    {service.category}
                                </span>

                                {/* Title */}
                                <h3 className="font-bold text-[15px] md:text-base leading-snug mb-2.5 transition-colors duration-300"
                                    style={{ color: isHovered ? BRAND.darkBlue : "#1e293b" }}>
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-xs md:text-[13px] leading-relaxed mb-4"
                                    style={{ color: isHovered ? "#64748b" : "#94a3b8" }}>
                                    {service.description}
                                </p>

                                {/* Accent bar */}
                                <div className="h-[2px] rounded-full transition-all duration-400"
                                    style={{
                                        width: isHovered ? 40 : 20,
                                        background: isHovered
                                            ? `linear-gradient(90deg, ${service.color}, ${service.color}60)`
                                            : `${service.color}20`,
                                    }} />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ─── Bottom CTA ─── */}
                <motion.div {...fadeUp(0.3)} className="text-center mt-10 md:mt-14">
                    <motion.button
                        onClick={() => navigate("/contact")}
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-semibold text-sm cursor-pointer overflow-hidden relative"
                        style={{ background: BRAND.darkBlue }}
                        whileHover={{ scale: 1.02, boxShadow: `0 8px 28px ${BRAND.darkBlue}30` }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <span className="relative z-10">Discuss Your Project</span>
                        <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                    </motion.button>
                    <p className="text-gray-400 text-xs mt-3">
                        Free consultation — tell us what you need
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesGrid;
