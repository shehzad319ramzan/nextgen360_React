import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const StatsSection = ({ data }) => {
    const text_descriptions = data?.text_with_description || [];
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-16 md:py-20 px-5 md:px-10"
            style={{ background: `linear-gradient(135deg, #3498db 0%, #2980b9 50%, #3498db 100%)` }}>
            <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Left: title + CTA */}
                    <motion.div className="lg:w-[45%] text-center lg:text-left"
                        initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}>
                        <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-bold leading-[1.15] tracking-tight text-white mb-6">
                            {data.title}
                        </h2>
                        <motion.button
                            onClick={() => navigate("/contact")}
                            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer overflow-hidden relative"
                            style={{ background: "white", color: BRAND.darkBlue }}
                            whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(0,0,0,0.12)" }}
                            whileTap={{ scale: 0.98 }}>
                            <span className="relative z-10">Contact Us Now</span>
                            <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>

                    {/* Right: stats grid */}
                    <motion.div className="lg:w-[55%] grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}>
                        {text_descriptions.map((stat, i) => (
                            <motion.div key={i}
                                className="rounded-xl p-5 text-center"
                                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}
                                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.18)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.title}</div>
                                <div className="text-white/55 text-xs font-medium">{stat.description}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
