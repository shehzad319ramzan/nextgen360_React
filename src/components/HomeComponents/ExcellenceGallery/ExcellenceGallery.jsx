import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { excellenceGallery } from "@/data/homeData";
import { Bot, Cloud, Code2, Palette, Smartphone } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const CARDS = [
    {
        label: "Agentic AI",
        icon: Bot,
        stat: "AI-Powered",
        tagline: "Next-Gen Intelligence",
        description: "Building autonomous AI agents that reason, plan, and execute complex workflows — transforming how businesses operate with intelligent automation.",
    },
    {
        label: "SAAS Products",
        icon: Cloud,
        stat: "6+ Products",
        tagline: "Scalable Platforms",
        description: "End-to-end SaaS product development from ideation to launch — multi-tenant architectures, subscription billing, and seamless user experiences.",
    },
    {
        label: "Web Development",
        icon: Code2,
        stat: "150+ Projects",
        tagline: "Full-Stack Expertise",
        description: "High-performance web applications built with modern frameworks — React, Next.js, Node.js — optimized for speed, SEO, and conversion.",
    },
    {
        label: "Software Design",
        icon: Palette,
        stat: "Pixel Perfect",
        tagline: "Design That Converts",
        description: "Research-driven UI/UX design that balances aesthetics with usability — wireframes, prototypes, and design systems built in Figma.",
    },
    {
        label: "Mobile App",
        icon: Smartphone,
        stat: "iOS & Android",
        tagline: "Cross-Platform",
        description: "Native and cross-platform mobile apps with Flutter and React Native — delivering smooth performance and intuitive experiences on every device.",
    },
];

const ExcellenceGallery = () => {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState({});
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const handleLoad = (i) => setLoaded((prev) => ({ ...prev, [i]: true }));

    return (
        <section ref={sectionRef} className="py-14 md:py-20 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto">
                {/* ─── Header ─── */}
                <motion.div
                    className="text-center max-w-[600px] mx-auto mb-10 md:mb-14"
                    initial={{ opacity: 0, y: 24 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                        <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
                            style={{ color: BRAND.mediumBlue }}>
                            What We Excel At
                        </span>
                        <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight"
                        style={{ color: BRAND.darkBlue }}>
                        Excellence Gallery
                    </h2>
                    <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-3">
                        From intelligent AI agents to pixel-perfect mobile apps — explore the disciplines we've mastered.
                    </p>
                </motion.div>

                {/* ─── Gallery ─── */}
                <motion.div
                    className="flex gap-2.5 md:gap-4 h-[300px] sm:h-[340px] md:h-[400px] lg:h-[440px]"
                    onMouseLeave={() => setActive(0)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {excellenceGallery.map((item, i) => {
                        const isActive = i === active;
                        const card = CARDS[i];
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={i}
                                className="relative rounded-2xl overflow-hidden cursor-pointer"
                                style={{ willChange: "flex" }}
                                animate={{ flex: isActive ? 3 : 1 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                onMouseEnter={() => setActive(i)}
                            >
                                {/* Image */}
                                <img
                                    src={item.src}
                                    alt={card.label}
                                    onLoad={() => handleLoad(i)}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                                    style={{
                                        visibility: loaded[i] ? "visible" : "hidden",
                                        transform: isActive ? "scale(1.05)" : "scale(1)",
                                    }}
                                />

                                {/* Placeholder */}
                                {!loaded[i] && (
                                    <div className="absolute inset-0 flex items-center justify-center"
                                        style={{ background: `${BRAND.darkBlue}08` }}>
                                        <div className="w-6 h-6 border-2 rounded-full animate-spin"
                                            style={{ borderColor: `${BRAND.mediumBlue}30`, borderTopColor: BRAND.mediumBlue }} />
                                    </div>
                                )}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 transition-all duration-500"
                                    style={{
                                        background: isActive
                                            ? `linear-gradient(to top, ${BRAND.darkBlue}e8 0%, ${BRAND.darkBlue}70 40%, transparent 75%)`
                                            : `linear-gradient(to top, ${BRAND.darkBlue}a0 0%, ${BRAND.darkBlue}35 45%, transparent 75%)`,
                                    }} />

                                {/* ─── Content ─── */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                    {/* Top: label chip */}
                                    <div className="mb-auto mt-3 ml-1">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-semibold tracking-wide uppercase text-white/80"
                                            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                                            <Icon size={11} />
                                            {card.label}
                                        </span>
                                    </div>

                                    {/* Expanded content */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            >
                                                {/* Accent line */}
                                                <motion.div
                                                    className="h-[2px] rounded-full mb-3"
                                                    style={{ background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.mediumBlue})` }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: 40 }}
                                                    transition={{ duration: 0.4, delay: 0.1 }}
                                                />

                                                {/* Stat + tagline */}
                                                <div className="mb-2">
                                                    <span className="text-xl md:text-2xl font-bold text-white">
                                                        {card.stat}
                                                    </span>
                                                    <span className="text-white/50 text-[10px] md:text-xs font-medium ml-2">
                                                        — {card.tagline}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-[300px]">
                                                    {card.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Collapsed mini-info */}
                                    {!isActive && (
                                        <div>
                                            <Icon size={18} className="text-white/70 mb-1.5" />
                                            <p className="text-white font-bold text-sm md:text-base leading-tight">
                                                {card.label}
                                            </p>
                                            <p className="text-white/40 text-[9px] md:text-[10px] font-medium mt-0.5">
                                                {card.stat}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Active border glow */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl pointer-events-none"
                                        style={{
                                            boxShadow: `inset 0 0 0 1px ${BRAND.mediumBlue}30, 0 8px 32px ${BRAND.darkBlue}20`,
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ─── Bottom dots ─── */}
                <motion.div
                    className="flex items-center justify-center gap-1.5 mt-6"
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    {CARDS.map((card, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                                width: active === i ? 24 : 6,
                                height: 6,
                                background: active === i
                                    ? `linear-gradient(90deg, ${BRAND.mediumBlue}, ${BRAND.orange})`
                                    : `${BRAND.darkBlue}18`,
                            }}
                            aria-label={`Show ${card.label}`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExcellenceGallery;
