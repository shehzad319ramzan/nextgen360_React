import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const BRAND = { darkBlue: "#0F4C8F", mediumBlue: "#388ECA", orange: "#0a1f3f" };

const FeaturesComponent = ({ title, image = [], description, why = [] }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    const hasImage = image.length > 0 && image[0]?.images?.url;

    return (
        <section ref={ref} id="solution-features" className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className={`flex flex-col ${hasImage ? "lg:flex-row" : ""} items-center gap-12 md:gap-16`}>

                    {/* Text */}
                    <div className={hasImage ? "lg:w-1/2" : "max-w-2xl mx-auto text-center"}>
                        <motion.div {...fadeUp(0)}>
                            <div className={`inline-flex items-center gap-2 mb-5 ${hasImage ? "" : "justify-center"}`}>
                                <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: BRAND.mediumBlue }}>
                                    Why Choose This Solution
                                </span>
                                <div className="h-[2px] w-6 rounded-full" style={{ background: BRAND.orange }} />
                            </div>
                        </motion.div>

                        <motion.h2 {...fadeUp(0.06)}
                            className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.12] tracking-tight mb-5"
                            style={{ color: BRAND.darkBlue }}>
                            {title}
                        </motion.h2>

                        <motion.div {...fadeUp(0.12)}
                            className={`text-gray-500 text-sm md:text-base leading-relaxed mb-6 [&_a]:text-[#388ECA] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ${hasImage ? "" : "max-w-xl mx-auto"}`}
                            dangerouslySetInnerHTML={{ __html: description || "" }} />

                        {why.length > 0 && (
                            <div className={`grid gap-2.5 ${why.length > 4 ? "sm:grid-cols-2" : "grid-cols-1"} ${hasImage ? "" : "max-w-xl mx-auto"}`}>
                                {why.map((item, i) => (
                                    <motion.div key={i}
                                        className="flex items-start gap-3 group rounded-xl p-3 -ml-3 transition-colors duration-300 hover:bg-blue-50/50"
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={visible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}>
                                        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                                            style={{ background: `${BRAND.mediumBlue}10`, border: `1px solid ${BRAND.mediumBlue}15` }}>
                                            <CheckCircle2 size={13} style={{ color: BRAND.mediumBlue }} />
                                        </div>
                                        <span className="text-gray-600 text-sm font-medium leading-snug">{item.title}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Image */}
                    {hasImage && (
                        <motion.div className="lg:w-1/2"
                            initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                            animate={visible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                            transition={{ duration: 0.7, delay: 0.15 }}>
                            <div className="relative">
                                {/* Glow */}
                                <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at 50% 50%, ${BRAND.mediumBlue}08 0%, transparent 60%)` }} />
                                <motion.div className="rounded-2xl overflow-hidden relative z-10"
                                    style={{ boxShadow: `0 24px 56px ${BRAND.darkBlue}10` }}
                                    whileHover={{ y: -4, boxShadow: `0 28px 64px ${BRAND.darkBlue}14` }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                                    {image.map((imgObj, index) => (
                                        <img key={index}
                                            src={imgObj.images?.url || ""}
                                            alt={`Feature ${index}`}
                                            className="w-full h-auto" />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturesComponent;
