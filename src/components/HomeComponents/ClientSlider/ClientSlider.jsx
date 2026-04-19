import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { clientLogos } from "@/data/homeData";
import { Handshake } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", navy: "#0a1f3f" };

// ─── Single scrolling row ───
const ScrollRow = ({ logos, direction = "left", speed = 30 }) => {
    const tripled = [...logos, ...logos, ...logos];
    return (
        <div className="overflow-hidden w-full"
            style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
            <motion.div
                className="flex items-center gap-12 md:gap-16 w-max"
                animate={{ x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {tripled.map((logo, i) => (
                    <div key={i} className="flex-shrink-0 group cursor-default px-2 py-4">
                        <div className="h-10 md:h-12 flex items-center justify-center rounded-xl px-5 py-2 transition-all duration-500 group-hover:bg-white group-hover:shadow-md"
                            style={{ minWidth: 90 }}>
                            <img
                                src={logo}
                                alt={`Client ${(i % logos.length) + 1}`}
                                className="max-h-full max-w-[110px] md:max-w-[130px] object-contain opacity-25 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const ClientSlider = () => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const half = Math.ceil(clientLogos.length / 2);
    const row1 = clientLogos.slice(0, half);
    const row2 = clientLogos.slice(half);

    return (
        <section ref={ref} className="py-12 md:py-16 relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)" }}>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{ backgroundImage: "radial-gradient(#0F4C8F 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <motion.div
                className="relative z-10 max-w-[1300px] mx-auto px-5 md:px-10"
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
            >
                {/* Header bar */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 md:mb-10 pb-6"
                    style={{ borderBottom: `1px solid ${BRAND.darkBlue}08` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${BRAND.darkBlue}08`, border: `1px solid ${BRAND.darkBlue}08` }}>
                            <Handshake size={18} style={{ color: BRAND.darkBlue }} />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base font-bold" style={{ color: BRAND.darkBlue }}>
                                Trusted by Industry Leaders
                            </h3>
                            <p className="text-[11px] text-gray-400">
                                Partnering with businesses worldwide to deliver results
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {[{ n: "500+", l: "Clients" }, { n: "8+", l: "Years" }, { n: "98%", l: "Retention" }].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-lg md:text-xl font-bold" style={{ color: BRAND.darkBlue }}>{s.n}</div>
                                <div className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Logo rows */}
                <div className="flex flex-col gap-1">
                    <ScrollRow logos={row1} direction="left" speed={40} />
                    {row2.length > 0 && (
                        <ScrollRow logos={row2} direction="right" speed={45} />
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default ClientSlider;
