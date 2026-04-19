import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, PenTool, Code2, CheckCircle2 } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", dark: "#0a1f3f" };
const STEP_ICONS = [Rocket, PenTool, Code2, CheckCircle2];

const ProcessStepsSection = ({ title, description, steps }) => {
    const [active, setActive] = useState(0);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    const total = steps?.length || 0;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (total === 0) return;
        const t = setInterval(() => setActive((p) => (p + 1) % total), 4500);
        return () => clearInterval(t);
    }, [total]);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section ref={ref} className="py-14 md:py-20 px-5 md:px-10 overflow-hidden relative"
            style={{ background: `linear-gradient(160deg, ${BRAND.darkBlue} 0%, ${BRAND.dark} 60%, ${BRAND.darkBlue} 100%)` }}>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, ${BRAND.mediumBlue}08 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${BRAND.mediumBlue}06 0%, transparent 50%)`,
                }} />

            <div className="max-w-[1100px] mx-auto relative z-10">
                {/* Header */}
                <motion.div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14" {...fadeUp(0)}>
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="h-[2px] w-5 rounded-full" style={{ background: BRAND.mediumBlue }} />
                        <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase"
                            style={{ color: BRAND.mediumBlue }}>
                            Our Process
                        </span>
                        <div className="h-[2px] w-5 rounded-full" style={{ background: BRAND.mediumBlue }} />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[1.85rem] font-bold leading-[1.15] tracking-tight text-white mb-2.5">
                        {title}
                    </h2>
                    <p className="text-sm md:text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {description}
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    {/* Left: Step tabs */}
                    <motion.div className="lg:w-[38%] flex flex-col gap-1.5" {...fadeUp(0.12)}>
                        {steps?.map((step, i) => {
                            const isActive = i === active;
                            const Icon = STEP_ICONS[i % STEP_ICONS.length];

                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-left cursor-pointer w-full"
                                    animate={{
                                        background: isActive ? `${BRAND.mediumBlue}12` : "transparent",
                                        borderColor: isActive ? `${BRAND.mediumBlue}25` : "transparent",
                                    }}
                                    style={{ border: "1px solid transparent" }}
                                    whileHover={{ background: `${BRAND.mediumBlue}08` }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {/* Step number + icon */}
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                        style={{
                                            background: isActive ? BRAND.mediumBlue : "rgba(255,255,255,0.04)",
                                            boxShadow: isActive ? `0 4px 12px ${BRAND.mediumBlue}30` : "none",
                                        }}>
                                        <Icon size={16} style={{ color: isActive ? "white" : "rgba(255,255,255,0.2)" }} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <span className="text-[9px] font-bold tracking-wider transition-colors duration-300 block"
                                            style={{ color: isActive ? BRAND.mediumBlue : "rgba(255,255,255,0.15)" }}>
                                            STEP {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h4 className="font-semibold text-[13px] transition-colors duration-300 truncate"
                                            style={{ color: isActive ? "white" : "rgba(255,255,255,0.3)" }}>
                                            {step.title}
                                        </h4>
                                    </div>

                                    {/* Active bar */}
                                    {isActive && (
                                        <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full"
                                            style={{ background: BRAND.mediumBlue }}
                                            layoutId="activeBar"
                                            transition={{ type: "spring", stiffness: 350, damping: 28 }} />
                                    )}
                                </motion.button>
                            );
                        })}

                        {/* Progress bar */}
                        <div className="mt-3 mx-4">
                            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                                <motion.div className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${BRAND.mediumBlue}, ${BRAND.darkBlue})` }}
                                    animate={{ width: `${((active + 1) / total) * 100}%` }}
                                    transition={{ duration: 0.4, ease: "easeOut" }} />
                            </div>
                            <div className="flex justify-between mt-1.5">
                                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.15)" }}>Start</span>
                                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.15)" }}>{active + 1}/{total}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Active content */}
                    <motion.div className="lg:w-[62%]" {...fadeUp(0.18)}>
                        <div className="rounded-2xl p-7 md:p-9 min-h-[260px] flex flex-col justify-center relative overflow-hidden"
                            style={{
                                background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                                border: `1px solid ${BRAND.mediumBlue}15`,
                            }}>

                            {/* Accent glow */}
                            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none transition-all duration-700"
                                style={{ background: `radial-gradient(circle, ${BRAND.mediumBlue}10 0%, transparent 70%)` }} />

                            <AnimatePresence mode="wait">
                                <motion.div key={active}
                                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3 }}>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl md:text-4xl font-black" style={{ color: BRAND.mediumBlue }}>
                                            {String(active + 1).padStart(2, "0")}
                                        </span>
                                        <motion.div className="h-[2px] rounded-full" style={{ background: BRAND.mediumBlue }}
                                            initial={{ width: 0 }} animate={{ width: 28 }}
                                            transition={{ duration: 0.35, delay: 0.1 }} />
                                    </div>

                                    <h3 className="text-white text-lg md:text-xl font-bold mb-3 leading-tight">
                                        {steps?.[active]?.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
                                        {steps?.[active]?.description}
                                    </p>

                                    {/* Step dots */}
                                    <div className="flex gap-1.5 mt-7">
                                        {steps?.map((_, i) => (
                                            <motion.button key={i} onClick={() => setActive(i)}
                                                className="rounded-full cursor-pointer"
                                                animate={{
                                                    width: i === active ? 22 : 6,
                                                    height: 6,
                                                    background: i === active
                                                        ? BRAND.mediumBlue
                                                        : "rgba(255,255,255,0.08)",
                                                }}
                                                whileHover={{ background: i === active ? BRAND.mediumBlue : "rgba(255,255,255,0.15)" }}
                                                transition={{ duration: 0.25 }} />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProcessStepsSection;
