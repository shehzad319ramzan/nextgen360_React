import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { whoWeAre } from "@/data/homeData";
import { ArrowRight, Users, Globe, Lightbulb, Award } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

// ─── Animated counter ───
const AnimCount = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const done = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !done.current) {
                    done.current = true;
                    const t0 = performance.now();
                    const tick = (now) => {
                        const p = Math.min((now - t0) / 1800, 1);
                        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
                        if (p < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const highlights = [
    { icon: Users, value: 50, suffix: "+", label: "Expert Team Members" },
    { icon: Globe, value: 2, suffix: "", label: "Global Offices" },
    { icon: Lightbulb, value: 150, suffix: "+", label: "Projects Delivered" },
    { icon: Award, value: 8, suffix: "+", label: "Years in Business" },
];

const WhoWeAre = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section ref={sectionRef} className="py-14 md:py-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                {/* ════ Left: Image + floating stat ════ */}
                <motion.div {...fadeUp(0)} className="w-full lg:w-[42%] relative">
                    <div className="relative rounded-2xl overflow-hidden group">
                        <img
                            src={whoWeAre.image}
                            alt="NextGen360 Team"
                            className="w-full h-auto max-h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 rounded-2xl"
                            style={{
                                background: `linear-gradient(to top, ${BRAND.darkBlue}40 0%, transparent 50%)`,
                            }} />
                    </div>

                    {/* Floating experience card */}
                    <motion.div
                        className="absolute -bottom-5 -right-3 md:right-4 z-10 rounded-xl px-5 py-4 flex items-center gap-3 shadow-lg"
                        style={{
                            background: "white",
                            border: `1px solid ${BRAND.mediumBlue}15`,
                            boxShadow: `0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px ${BRAND.mediumBlue}08`,
                        }}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center"
                            style={{ background: `${BRAND.orange}15` }}>
                            <Award size={22} style={{ color: BRAND.orange }} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold" style={{ color: BRAND.darkBlue }}>
                                <AnimCount target={8} suffix="+" />
                            </div>
                            <div className="text-[11px] text-gray-500 font-medium">Years of Excellence</div>
                        </div>
                    </motion.div>

                    {/* Accent line */}
                    <motion.div
                        className="absolute top-4 -left-2 md:-left-4 w-1 rounded-full"
                        style={{ background: `linear-gradient(to bottom, ${BRAND.mediumBlue}, ${BRAND.orange})`, height: 60 }}
                        initial={{ scaleY: 0 }}
                        animate={visible ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                </motion.div>

                {/* ════ Right: Content ════ */}
                <div className="w-full lg:w-[58%] flex flex-col gap-5 md:gap-6">
                    {/* Tag */}
                    <motion.div {...fadeUp(0.1)}>
                        <div className="inline-flex items-center gap-2">
                            <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                            <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
                                style={{ color: BRAND.mediumBlue }}>
                                Who We Are
                            </span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2 {...fadeUp(0.15)}
                        className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.2] tracking-tight"
                        style={{ color: BRAND.darkBlue }}>
                        {whoWeAre.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p {...fadeUp(0.2)}
                        className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-xl">
                        {whoWeAre.description}
                    </motion.p>

                    {/* Stats grid */}
                    <motion.div {...fadeUp(0.3)}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                className="group rounded-xl p-4 text-center cursor-default transition-all duration-300 hover:shadow-md"
                                style={{
                                    background: `${BRAND.darkBlue}04`,
                                    border: `1px solid ${BRAND.darkBlue}08`,
                                }}
                                whileHover={{
                                    y: -3,
                                    borderColor: `${BRAND.mediumBlue}25`,
                                }}
                            >
                                <item.icon
                                    size={20}
                                    className="mx-auto mb-2 transition-colors duration-300"
                                    style={{ color: BRAND.mediumBlue }}
                                />
                                <div className="text-xl md:text-2xl font-bold" style={{ color: BRAND.darkBlue }}>
                                    <AnimCount target={item.value} suffix={item.suffix} />
                                </div>
                                <div className="text-[10px] md:text-[11px] text-gray-400 font-medium mt-0.5 leading-tight">
                                    {item.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div {...fadeUp(0.35)}>
                        <motion.button
                            onClick={() => navigate("/contact")}
                            className="group relative inline-flex items-center gap-3 mt-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm overflow-hidden cursor-pointer"
                            style={{ background: BRAND.darkBlue }}
                            whileHover={{ scale: 1.02, boxShadow: `0 8px 24px ${BRAND.darkBlue}30` }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <span className="relative z-10">Get to Know Us</span>
                            <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
