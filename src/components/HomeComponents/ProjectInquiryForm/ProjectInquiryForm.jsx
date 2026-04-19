import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ArrowRight, Clock, Users, Zap, ShieldCheck } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
    deepBg: "#041225",
};

const STEPS = [
    { icon: Send, title: "Share Requirements", text: "Tell us your goals, timeline, and budget — we'll review everything." },
    { icon: Users, title: "Expert Assessment", text: "Our team will evaluate your project and identify the best approach." },
    { icon: Zap, title: "Get Your Solution", text: "We'll reach out with a tailored proposal and next steps." },
];

const CATEGORIES = {
    "General Inquiry": [],
    "Web Development": ["Frontend Development", "Backend Development", "Full Stack Development", "E-commerce Solutions"],
    "Mobile Development": ["iOS Development", "Android Development", "Cross Platform", "React Native / Flutter"],
    "AI & Machine Learning": ["Agentic AI", "Custom ML Models", "NLP & Chatbots", "Data Analytics"],
    "SaaS Development": ["MVP Development", "Multi-tenant Architecture", "API Development", "Product Scaling"],
    "Cloud & DevOps": ["AWS / Azure / GCP", "CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure Setup"],
    "UI/UX Design": ["Web Design", "Mobile App Design", "Design Systems", "Prototyping"],
    "Consulting": ["Technical Consulting", "Business Strategy", "Digital Transformation", "Architecture Review"],
    "Support": ["Technical Support", "Maintenance", "Bug Fixes", "Feature Requests"],
};

const TRUST = [
    { icon: Clock, text: "Response within 24hrs" },
    { icon: ShieldCheck, text: "100% Confidential" },
    { icon: Zap, text: "Free Consultation" },
];

const ProjectInquiryForm = () => {
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const validate = () => {
        const errs = {};
        if (!category) errs.category = "Please select a category.";
        if (!subCategory && category !== "General Inquiry") errs.subCategory = "Please select a sub-category.";
        if (!name) errs.name = "Name is required.";
        if (!email) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email is invalid.";
        if (!phoneNo) errs.phoneNo = "Phone number is required.";
        if (!description) errs.description = "Description is required.";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

        setErrors({});
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/contact-us`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: { Category: category, SubCategory: subCategory, Name: name, Email: email, PhoneNo: phoneNo, Description: description },
                }),
            });
            if (!response.ok) throw new Error("Failed");
            setShowThankYou(true);
            setCategory(""); setSubCategory(""); setName(""); setEmail(""); setPhoneNo(""); setDescription("");
        } catch { /* silently fail */ } finally { setLoading(false); }
    };

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    const inputClass = "w-full px-4 py-3 rounded-xl text-sm bg-white border border-gray-200 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#388ECA] focus:ring-2 focus:ring-[#388ECA20]";
    const errorClass = "text-red-500 text-[11px] mt-1";

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-5 md:px-10"
            style={{ background: `linear-gradient(160deg, #3498db 0%, #2980b9 50%, #3498db 100%)` }}>
            <div className="max-w-[1100px] mx-auto">

                {/* Header */}
                <div className="text-center max-w-[560px] mx-auto mb-12 md:mb-16">
                    <motion.div {...fadeUp(0)}>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="h-[2px] w-6 rounded-full bg-orange-500" />

                            <span className="text-black text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase">
                                Start a Project
                            </span>

                            <div className="h-[2px] w-6 rounded-full bg-orange-500" />
                        </div>
                    </motion.div>

                    <motion.h2 {...fadeUp(0.06)}
                        className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold leading-[1.15] tracking-tight text-white">
                        Tell Us About Your Project
                    </motion.h2>

                    <motion.p {...fadeUp(0.12)}
                        className="text-white/45 text-sm md:text-[15px] leading-relaxed mt-3">
                        Share your idea and our team will get back to you with a tailored plan within 24 hours.
                    </motion.p>
                </div>

                {/* Main card */}
                <motion.div {...fadeUp(0.18)}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>

                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

                        {/* ─── Left: Steps ─── */}
                        <div className="p-8 md:p-10 flex flex-col justify-between"
                            style={{ borderRight: "1px solid rgba(255,255,255,0.15)" }}>

                            <div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-6">How It Works</h3>

                                <div className="flex flex-col gap-1">
                                    {STEPS.map((step, i) => {
                                        const Icon = step.icon;
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                        style={{ background: `${BRAND.mediumBlue}15`, border: `1px solid ${BRAND.mediumBlue}20` }}>
                                                        <Icon size={18} style={{ color: BRAND.mediumBlue }} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-semibold text-sm mb-1">
                                                            <span className="mr-2" style={{ color: BRAND.orange }}>{String(i + 1).padStart(2, "0")}</span>
                                                            {step.title}
                                                        </h4>
                                                        <p className="text-white/40 text-xs leading-relaxed">{step.text}</p>
                                                    </div>
                                                </div>
                                                {i < STEPS.length - 1 && (
                                                    <div className="ml-5 w-[1px] h-6" style={{ background: `${BRAND.mediumBlue}20` }} />
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                                {TRUST.map((t, i) => {
                                    const Icon = t.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                                            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
                                            <Icon size={12} style={{ color: BRAND.orange }} />
                                            <span className="text-white/50 text-[10px] font-medium">{t.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── Right: Form ─── */}
                        <div className="p-8 md:p-10" style={{ background: "rgba(255,255,255,0.97)" }}>
                            <AnimatePresence mode="wait">
                                {showThankYou ? (
                                    <motion.div
                                        key="thanks"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center text-center py-10"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
                                            <CheckCircle2 size={56} style={{ color: "#10b981" }} />
                                        </motion.div>
                                        <h3 className="text-xl font-bold mt-5 mb-2" style={{ color: BRAND.darkBlue }}>
                                            Thank You for Reaching Out!
                                        </h3>
                                        <p className="text-gray-500 text-sm max-w-[340px] mb-6 leading-relaxed">
                                            Your message has been submitted successfully. Our team will review and get back to you within 24 hours.
                                        </p>
                                        <motion.button
                                            onClick={() => setShowThankYou(false)}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold cursor-pointer"
                                            style={{ background: BRAND.darkBlue }}
                                            whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${BRAND.darkBlue}30` }}
                                            whileTap={{ scale: 0.98 }}>
                                            Send Another Inquiry
                                            <ArrowRight size={14} />
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        {/* Row: Category + Sub */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <select value={category} className={inputClass}
                                                    onChange={(e) => {
                                                        const v = e.target.value;
                                                        setCategory(v);
                                                        setSubCategory(v === "General Inquiry" ? "none" : "");
                                                        setErrors({ ...errors, category: "", subCategory: "" });
                                                    }}>
                                                    <option value="" disabled>Select Category</option>
                                                    {Object.keys(CATEGORIES).map((c) => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                                {errors.category && <p className={errorClass}>{errors.category}</p>}
                                            </div>

                                            {category && category !== "General Inquiry" && (
                                                <div>
                                                    <select value={subCategory} className={inputClass}
                                                        onChange={(e) => setSubCategory(e.target.value)}>
                                                        <option value="" disabled>Select Sub-Category</option>
                                                        {(CATEGORIES[category] || []).map((s) => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                    {errors.subCategory && <p className={errorClass}>{errors.subCategory}</p>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Row: Name + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <input type="text" placeholder="Full Name" value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={inputClass} />
                                                {errors.name && <p className={errorClass}>{errors.name}</p>}
                                            </div>
                                            <div>
                                                <input type="email" placeholder="Email Address" value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={inputClass} />
                                                {errors.email && <p className={errorClass}>{errors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <input type="tel" placeholder="Phone Number" value={phoneNo}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                                className={inputClass} />
                                            {errors.phoneNo && <p className={errorClass}>{errors.phoneNo}</p>}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <textarea placeholder="Describe your project, goals, and timeline..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={4}
                                                className={`${inputClass} resize-none`} />
                                            {errors.description && <p className={errorClass}>{errors.description}</p>}
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            className="self-end inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold cursor-pointer disabled:opacity-60 overflow-hidden relative group"
                                            style={{ background: BRAND.darkBlue }}
                                            whileHover={{ scale: 1.02, boxShadow: `0 8px 24px ${BRAND.darkBlue}30` }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                                            <span className="relative z-10">
                                                {loading ? "Sending..." : "Send Message"}
                                            </span>
                                            {!loading && <Send size={14} className="relative z-10" />}
                                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectInquiryForm;
