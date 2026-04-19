import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { bottomLogos, registeredHeader, topLogos } from "@/data/homeData";
import { Verified } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const allLogos = [...topLogos, ...bottomLogos];

const Registered = () => {
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

    // return (
    //     <section ref={ref} className="py-14 md:py-20 px-5 md:px-10">
    //         <div className="max-w-[1200px] mx-auto">
    //             {/* Header */}
    //             <div className="text-center max-w-[560px] mx-auto mb-10 md:mb-14">
    //                 <motion.div {...fadeUp(0)}>
    //                     <div className="inline-flex items-center gap-2 mb-4">
    //                         <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
    //                         <span className="text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase"
    //                             style={{ color: BRAND.mediumBlue }}>
    //                             Compliance & Trust
    //                         </span>
    //                         <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
    //                     </div>
    //                 </motion.div>

    //                 <motion.h2 {...fadeUp(0.06)}
    //                     className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight"
    //                     style={{ color: BRAND.darkBlue }}>
    //                     {registeredHeader.title}
    //                 </motion.h2>

    //                 <motion.p {...fadeUp(0.12)}
    //                     className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-3">
    //                     {registeredHeader.description}
    //                 </motion.p>
    //             </div>

    //             {/* Logos */}
    //             <motion.div {...fadeUp(0.18)}
    //                 className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
    //                 {allLogos.map((logo, i) => {
    //                     const isHovered = hoveredId === logo.id + "-" + i;
    //                     return (
    //                         <motion.div
    //                             key={logo.id + "-" + i}
    //                             className="group relative rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center cursor-default overflow-hidden"
    //                             style={{
    //                                 width: 180,
    //                                 height: 160,
    //                                 background: "white",
    //                                 border: `1px solid ${isHovered ? BRAND.mediumBlue + "30" : "#f0f0f0"}`,
    //                                 boxShadow: isHovered
    //                                     ? `0 10px 28px ${BRAND.darkBlue}10`
    //                                     : "0 1px 3px rgba(0,0,0,0.03)",
    //                                 transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
    //                             }}
    //                             onMouseEnter={() => setHoveredId(logo.id + "-" + i)}
    //                             onMouseLeave={() => setHoveredId(null)}
    //                             whileHover={{ y: -4 }}
    //                             transition={{ type: "spring", stiffness: 300, damping: 20 }}
    //                         >
    //                             {/* Glow */}
    //                             <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    //                                 style={{ background: `radial-gradient(circle, ${BRAND.mediumBlue}10 0%, transparent 70%)` }} />

    //                             {/* Logo */}
    //                             <div className="flex-1 flex items-center justify-center w-full">
    //                                 <img
    //                                     src={logo.icon}
    //                                     alt={logo.altText}
    //                                     className="w-full h-full max-w-[130px] max-h-[90px] object-contain transition-all duration-400"
    //                                     style={{
    //                                         opacity: isHovered ? 1 : 0.8,
    //                                         transform: isHovered ? "scale(1.08)" : "scale(1)",
    //                                     }}
    //                                 />
    //                             </div>

    //                             {/* Verified badge */}
    //                             <div className="flex items-center gap-1 mt-2">
    //                                 <Verified size={12}
    //                                     className="transition-colors duration-300"
    //                                     style={{ color: isHovered ? BRAND.mediumBlue : "#cbd5e1" }} />
    //                                 <span className="text-[10px] font-medium transition-colors duration-300"
    //                                     style={{ color: isHovered ? BRAND.darkBlue : "#94a3b8" }}>
    //                                     Verified
    //                                 </span>
    //                             </div>

    //                             {/* Bottom accent */}
    //                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-400"
    //                                 style={{
    //                                     width: isHovered ? 40 : 0,
    //                                     background: `linear-gradient(90deg, ${BRAND.mediumBlue}, ${BRAND.orange})`,
    //                                 }} />
    //                         </motion.div>
    //                     );
    //                 })}
    //             </motion.div>
    //         </div>
    //     </section>
    // );
};

export default Registered;
