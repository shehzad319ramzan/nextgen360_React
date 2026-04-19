import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ChevronLeft, ChevronRight, Quote, Star, ExternalLink, MessageSquarePlus, Send, X, CheckCircle } from "lucide-react";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    orange: "#0a1f3f",
};

const GOOGLE_REVIEW_URL_FALLBACK = "https://share.google/oggp725jGfFTccHbk";

const Stars = ({ rating, size = 14 }) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<FaStar key={`f-${i}`} size={size} color="#FFB400" style={{ filter: "drop-shadow(0 0 4px rgba(255,180,0,0.55))" }} />);
    if (half) stars.push(<FaStarHalfAlt key="h" size={size} color="#FFB400" style={{ filter: "drop-shadow(0 0 4px rgba(255,180,0,0.55))" }} />);
    while (stars.length < 5) stars.push(<FaRegStar key={`e-${stars.length}`} size={size} color="#FFB400" style={{ filter: "drop-shadow(0 0 4px rgba(255,180,0,0.55))" }} />);
    return <div className="flex items-center gap-0.5">{stars}</div>;
};

// ─── Compact Review Card ───
const ReviewCard = ({ review, isActive }) => {
    const [expanded, setExpanded] = useState(false);
    const text = review.text || "";
    const isLong = text.length > 150;

    return (
        <motion.div
            className="rounded-xl p-5 h-full flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                background: "white",
                border: `1px solid ${isActive ? BRAND.mediumBlue + "30" : "#f0f0f0"}`,
                boxShadow: isActive ? `0 8px 24px ${BRAND.darkBlue}08` : "0 1px 4px rgba(0,0,0,0.03)",
            }}
        >
            <div className="flex items-center justify-between mb-2.5">
                <Stars rating={review.rating} size={12} />
                <Quote size={18} style={{ color: `${BRAND.mediumBlue}25` }} />
            </div>

            <p className="text-gray-600 text-[13px] leading-relaxed flex-1 mb-3">
                "{isLong && !expanded ? text.slice(0, 150) + "..." : text}"
                {isLong && (
                    <button onClick={() => setExpanded(!expanded)}
                        className="ml-1 font-semibold text-[11px] cursor-pointer"
                        style={{ color: BRAND.mediumBlue }}>
                        {expanded ? "less" : "more"}
                    </button>
                )}
            </p>

            <div className="flex items-center gap-2.5 pt-3" style={{ borderTop: "1px solid #f7f7f7" }}>
                <img src={review.profile_photo_url} alt={review.author_name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    style={{ border: `1.5px solid ${BRAND.mediumBlue}15` }} />
                <div className="min-w-0">
                    <p className="font-semibold text-xs truncate" style={{ color: BRAND.darkBlue }}>{review.author_name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{review.relative_time_description}</p>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Review Form Modal ───
const ReviewFormModal = ({ open, onClose, googleUrl }) => {
    const [form, setForm] = useState({ name: "", company: "", content: "", rating: 5 });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.content) return setError("Name and review are required");
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/testimonials/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSubmitted(true);
            setTimeout(() => { onClose(); setSubmitted(false); setForm({ name: "", company: "", content: "", rating: 5 }); }, 2500);
        } catch (err) { setError(err.message || "Something went wrong"); }
        setSubmitting(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}>

                        {/* Header */}
                        <div className="px-6 pt-5 pb-4 flex items-center justify-between"
                            style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}>
                            <div>
                                <h3 className="text-white font-bold text-lg">Write a Review</h3>
                                <p className="text-white/50 text-xs mt-0.5">Share your experience with us</p>
                            </div>
                            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        {submitted ? (
                            <motion.div className="px-6 py-12 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", damping: 20 }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.1, damping: 15 }}>
                                    <CheckCircle size={48} className="mx-auto mb-3" style={{ color: "#22c55e" }} />
                                </motion.div>
                                <h4 className="font-bold text-gray-800 text-lg">Thank You!</h4>
                                <p className="text-gray-500 text-sm mt-1">Your review will appear after approval.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                                {error && (
                                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        className="text-red-600 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</motion.p>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Name *</label>
                                        <input type="text" value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Company</label>
                                        <input type="text" value={form.company}
                                            onChange={e => setForm({ ...form, company: e.target.value })}
                                            placeholder="Optional"
                                            className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" />
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Your Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <motion.button key={star} type="button"
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setForm({ ...form, rating: star })}
                                                className="cursor-pointer p-0.5"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}>
                                                <FaStar size={22} color={(hoverRating || form.rating) >= star ? "#facc15" : "#e5e7eb"}
                                                    style={{ transition: "color 0.15s", filter: (hoverRating || form.rating) >= star ? "drop-shadow(0 1px 2px rgba(250,204,21,0.4))" : "none" }} />
                                            </motion.button>
                                        ))}
                                        <span className="text-xs text-gray-400 ml-2 self-center">{form.rating}/5</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-gray-500 mb-1">Your Review *</label>
                                    <textarea value={form.content}
                                        onChange={e => setForm({ ...form, content: e.target.value })}
                                        rows={3} placeholder="Tell us about your experience..."
                                        className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none transition-all" />
                                </div>

                                <div className="flex items-center gap-3 pt-1">
                                    <motion.button type="submit" disabled={submitting}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
                                        style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}
                                        whileHover={{ scale: 1.02, boxShadow: `0 4px 16px ${BRAND.darkBlue}30` }}
                                        whileTap={{ scale: 0.98 }}>
                                        <Send size={14} />
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </motion.button>
                                    <motion.a href={googleUrl || GOOGLE_REVIEW_URL_FALLBACK} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 cursor-pointer"
                                        whileHover={{ scale: 1.02, borderColor: "#d1d5db" }}
                                        whileTap={{ scale: 0.98 }}>
                                        <FcGoogle size={16} />
                                        <span className="text-gray-600 text-xs">Google</span>
                                    </motion.a>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ─── Main Testimonials ───
const Testimonials = ({ googleReviews = [], googleRating, googleReviewUrl = "", googleTotal = 0, businessName = "" }) => {
    const effectiveRating = googleRating ?? 4.5;
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [backendReviews, setBackendReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL_API}/testimonials`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setBackendReviews(data.map((t) => ({
                        author_name: t.name,
                        text: t.content,
                        rating: t.rating || 5,
                        profile_photo_url: t.avatar
                            ? (t.avatar.startsWith("http") ? t.avatar : `${import.meta.env.VITE_BACKEND_URL}${t.avatar}`)
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=388ECA&color=fff&size=80`,
                        author_url: "#",
                        relative_time_description: t.company ? `${t.role} at ${t.company}` : (t.role || "Client"),
                    })));
                }
            } catch { /* silent */ }
        })();
    }, []);

    const reviews = googleReviews.length > 0 ? googleReviews : backendReviews;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!autoplay || reviews.length === 0) return;
        const t = setInterval(() => setCurrent((p) => (p + 1) % reviews.length), 4000);
        return () => clearInterval(t);
    }, [autoplay, reviews.length]);

    const itemsPerPage = typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1;
    const maxPage = Math.max(0, reviews.length - itemsPerPage);
    const next = () => setCurrent((p) => Math.min(p + 1, maxPage));
    const prev = () => setCurrent((p) => Math.max(p - 1, 0));

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: visible ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    return (
        <>
            <section ref={sectionRef}
                className="py-12 md:py-16 px-5 md:px-10 overflow-hidden"
                style={{ background: `linear-gradient(170deg, ${BRAND.darkBlue} 0%, #1a5da8 50%, ${BRAND.darkBlue} 100%)` }}>
                <div className="max-w-[1200px] mx-auto">

                    {/* ─── Header ─── */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-10">
                        <div>
                            <motion.div {...fadeUp(0)}>
                                <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.15em] uppercase"
                                    style={{ color: `${BRAND.mediumBlue}` }}>
                                    Testimonials
                                </span>
                            </motion.div>
                            <motion.h2 {...fadeUp(0.05)}
                                className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-tight tracking-tight text-white mt-1.5">
                                What Our Clients Say
                            </motion.h2>
                        </div>

                        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
                            {/* Google badge */}
                            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg"
                                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
                                <FcGoogle size={20} />
                                <span className="text-white font-bold text-sm">{effectiveRating.toFixed(1)}</span>
                                <Stars rating={effectiveRating} size={13} />
                                {googleTotal > 0 && (
                                    <span className="text-white/60 text-[11px] ml-1">({googleTotal})</span>
                                )}
                            </div>

                            {/* Write review button */}
                            <motion.button onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                                style={{
                                    background: "rgba(255,255,255,0.12)",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    color: "white",
                                }}
                                whileHover={{ background: "rgba(255,255,255,0.2)", scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}>
                                <MessageSquarePlus size={14} />
                                Write a Review
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* ─── Reviews Carousel ─── */}
                    {reviews.length > 0 && (
                        <motion.div {...fadeUp(0.15)}
                            onMouseEnter={() => setAutoplay(false)}
                            onMouseLeave={() => setAutoplay(true)}>
                            <div className="overflow-hidden">
                                <motion.div className="flex gap-4"
                                    animate={{ x: `-${current * (100 / itemsPerPage + (itemsPerPage === 2 ? 1.8 : 0))}%` }}
                                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}>
                                    {reviews.map((review, i) => (
                                        <div key={i} className="flex-shrink-0"
                                            style={{ width: itemsPerPage === 2 ? "calc(50% - 8px)" : "100%" }}>
                                            <ReviewCard review={review} isActive={i >= current && i < current + itemsPerPage} />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-5">
                                <div className="flex gap-1">
                                    {Array.from({ length: maxPage + 1 }).map((_, i) => (
                                        <button key={i} onClick={() => setCurrent(i)}
                                            className="rounded-full transition-all duration-300 cursor-pointer"
                                            style={{
                                                width: current === i ? 20 : 5,
                                                height: 5,
                                                background: current === i
                                                    ? "white"
                                                    : "rgba(255,255,255,0.15)",
                                            }} />
                                    ))}
                                </div>
                                <div className="flex gap-1.5">
                                    <motion.button onClick={prev}
                                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                                        whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "white", scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <ChevronLeft size={15} />
                                    </motion.button>
                                    <motion.button onClick={next}
                                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                                        whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "white", scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <ChevronRight size={15} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Fallback */}
                    {reviews.length === 0 && (
                        <motion.div {...fadeUp(0.15)}
                            className="text-center py-10 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <Star size={24} className="mx-auto mb-2" style={{ color: "rgba(255,255,255,0.2)" }} />
                            <p className="text-white/40 text-sm">Reviews loading...</p>
                        </motion.div>
                    )}

                    {/* ─── Bottom CTA bar ─── */}
                    <motion.div {...fadeUp(0.25)}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 rounded-xl"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                        <p className="text-white/40 text-sm">
                            Loved working with us? <span className="text-white/60 font-medium">Share your experience</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <motion.button onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
                                style={{ background: BRAND.mediumBlue }}
                                whileHover={{ scale: 1.03, boxShadow: `0 4px 12px ${BRAND.mediumBlue}40` }}
                                whileTap={{ scale: 0.97 }}>
                                <MessageSquarePlus size={13} />
                                Write a Review
                            </motion.button>
                            <motion.a href={googleReviewUrl || GOOGLE_REVIEW_URL_FALLBACK} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium cursor-pointer"
                                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
                                whileHover={{ background: "rgba(255,255,255,0.18)", scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}>
                                <FcGoogle size={14} />
                                Google Review
                                <ExternalLink size={10} className="opacity-40" />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Review Form Modal */}
            <ReviewFormModal open={showForm} onClose={() => setShowForm(false)} googleUrl={googleReviewUrl} />
        </>
    );
};

export default Testimonials;
