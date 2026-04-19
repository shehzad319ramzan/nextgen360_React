import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const DynamicHero = ({ title, description, image }) => {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();
    useEffect(() => { setMounted(true); }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 30, filter: "blur(8px)" },
        animate: mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
        transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden"
            style={{ background: `linear-gradient(145deg, ${BRAND.darkBlue} 0%, #134f8c 35%, ${BRAND.mediumBlue} 100%)` }}>

            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                    { w: 500, t: "-12%", l: "-8%", c: `${BRAND.orange}0a`, d: 12 },
                    { w: 400, t: "55%", l: "65%", c: "rgba(255,255,255,0.04)", d: 14 },
                    { w: 280, t: "15%", l: "45%", c: "rgba(255,255,255,0.03)", d: 10 },
                ].map((o, i) => (
                    <motion.div key={i} className="absolute rounded-full"
                        style={{ width: o.w, height: o.w, top: o.t, left: o.l,
                            background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)` }}
                        animate={{ y: [0, -25, 0, 18, 0], x: [0, 12, -10, 6, 0] }}
                        transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut" }} />
                ))}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text */}
                    <div>
                        <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-6">
                            <Sparkles size={14} style={{ color: BRAND.orange }} />
                            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50">
                                Our Solution
                            </span>
                        </motion.div>

                        <motion.h1 {...fadeUp(0.08)}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-white mb-5">
                            {title}
                        </motion.h1>

                        <motion.div {...fadeUp(0.13)}
                            className="h-[3px] rounded-full mb-6"
                            style={{ width: 48, background: `linear-gradient(90deg, ${BRAND.orange}, ${BRAND.mediumBlue})` }} />

                        <motion.div {...fadeUp(0.18)}
                            className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg mb-8 [&_a]:underline [&_strong]:text-white/70 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                            dangerouslySetInnerHTML={{ __html: description || "" }} />

                        <motion.div {...fadeUp(0.24)} className="flex flex-wrap gap-3">
                            <motion.button
                                onClick={() => navigate("/contact")}
                                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
                                style={{ background: BRAND.orange, color: "white" }}
                                whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${BRAND.orange}40` }}
                                whileTap={{ scale: 0.97 }}>
                                Get Started
                                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const el = document.getElementById("solution-features");
                                    el?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white/60 hover:text-white cursor-pointer transition-colors"
                                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}>
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Image */}
                    {image && (
                        <motion.div
                            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                            animate={mounted ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center relative"
                        >
                            {/* Glow behind image */}
                            <div className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                                style={{ background: `radial-gradient(ellipse at center, ${BRAND.orange}08 0%, transparent 60%)` }} />
                            <motion.img
                                src={image}
                                alt={title}
                                className="w-full max-w-md lg:max-w-lg object-contain relative z-10 drop-shadow-2xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DynamicHero;
