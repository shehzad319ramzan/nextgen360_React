import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const HeroSection = ({ category, title, description, sideInfo }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [mounted, setMounted] = useState(false);
    const total = sideInfo?.length || 0;

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (total === 0) return;
        const t = setInterval(() => setCurrent((p) => (p + 1) % total), 5000);
        return () => clearInterval(t);
    }, [total]);

    if (!sideInfo || total === 0) return null;

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30, filter: "blur(8px)" },
        animate: mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
        transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section className="relative overflow-hidden min-h-[70vh] flex items-center"
            style={{ background: `linear-gradient(145deg, ${BRAND.darkBlue} 0%, #134f8c 35%, ${BRAND.mediumBlue} 100%)` }}>

            {/* Animated mesh background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Floating orbs */}
                {[
                    { w: 500, t: "-15%", l: "-10%", c: "rgba(255,157,0,0.08)", d: 12 },
                    { w: 350, t: "50%", l: "70%", c: "rgba(255,255,255,0.05)", d: 15 },
                    { w: 250, t: "20%", l: "40%", c: "rgba(255,255,255,0.04)", d: 10 },
                ].map((orb, i) => (
                    <motion.div key={i} className="absolute rounded-full"
                        style={{ width: orb.w, height: orb.w, top: orb.t, left: orb.l,
                            background: `radial-gradient(circle, ${orb.c} 0%, transparent 70%)` }}
                        animate={{ y: [0, -20, 0, 15, 0], x: [0, 10, -8, 5, 0] }}
                        transition={{ duration: orb.d, repeat: Infinity, ease: "easeInOut" }} />
                ))}
                {/* Grid dots */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 py-16 md:py-24 w-full">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

                    {/* Left */}
                    <div className="flex-1 lg:max-w-[58%]">
                        <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
                            <Sparkles size={14} style={{ color: BRAND.orange }} />
                            <span className="text-xs font-semibold tracking-[0.12em] uppercase"
                                style={{ color: "rgba(255,255,255,0.6)" }}>
                                {category}
                            </span>
                        </motion.div>

                        <motion.h1 {...fadeUp(0.1)}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-white mb-5">
                            {title}
                        </motion.h1>

                        <motion.div {...fadeUp(0.15)}
                            className="h-[3px] rounded-full mb-6"
                            style={{ width: 48, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.mediumBlue})` }} />

                        <motion.p {...fadeUp(0.2)}
                            className="text-white/55 text-sm md:text-base leading-relaxed max-w-xl mb-8">
                            {description}
                        </motion.p>

                        <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-3">
                            <motion.button
                                onClick={() => navigate("/contact")}
                                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold overflow-hidden cursor-pointer"
                                style={{ background: BRAND.orange, color: "white" }}
                                whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${BRAND.orange}40` }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                Let's Build Together
                                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const el = document.getElementById("services-info");
                                    el?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white/70 hover:text-white cursor-pointer transition-colors duration-300"
                                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}>
                                Explore Details
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right - Glass card carousel */}
                    <motion.div {...fadeUp(0.3)} className="w-full lg:w-[40%]">
                        <div className="rounded-2xl overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>

                            {/* Card header strip */}
                            <div className="px-6 pt-5 pb-0 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {sideInfo.map((_, i) => (
                                        <button key={i} onClick={() => setCurrent(i)}
                                            className="rounded-full transition-all duration-300 cursor-pointer"
                                            style={{
                                                width: i === current ? 22 : 6, height: 6,
                                                background: i === current ? BRAND.orange : "rgba(255,255,255,0.2)",
                                            }} />
                                    ))}
                                </div>
                                <span className="text-[10px] font-bold text-white/30 tracking-wider">
                                    {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 min-h-[200px] flex flex-col justify-between">
                                <AnimatePresence mode="wait">
                                    <motion.div key={current}
                                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.3 }}>
                                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-4"
                                            style={{ background: `${BRAND.orange}18`, color: BRAND.orange, border: `1px solid ${BRAND.orange}20` }}>
                                            {sideInfo[current]?.badge}
                                        </span>
                                        <h3 className="text-white font-bold text-lg mb-2.5 leading-tight">
                                            {sideInfo[current]?.title}
                                        </h3>
                                        <p className="text-white/45 text-sm leading-relaxed">
                                            {sideInfo[current]?.content}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Nav arrows */}
                                <div className="flex gap-2 mt-5">
                                    <motion.button
                                        onClick={() => setCurrent((p) => (p === 0 ? total - 1 : p - 1))}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                                        whileHover={{ background: "rgba(255,255,255,0.12)", color: "white" }}
                                        whileTap={{ scale: 0.9 }}>
                                        <ChevronLeft size={16} />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setCurrent((p) => (p + 1) % total)}
                                        className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
                                        whileHover={{ background: "rgba(255,255,255,0.12)", color: "white" }}
                                        whileTap={{ scale: 0.9 }}>
                                        <ChevronRight size={16} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
