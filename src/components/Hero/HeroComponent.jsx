import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Tech stack icons
import IconReact from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon07-React.svg";
import IconNode from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon16-Nodejs.svg";
import IconMongo from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon14-Mongodb.svg";
import IconAWS from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon04-AWS.svg";
import IconNext from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-nextjs.svg";
import IconTS from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-typescript.svg";
import IconDocker from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon13-Docker.svg";
import IconFigma from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon06-Figma.svg";

import IconAI from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/ai.svg";
import IconVue from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon02-Vue.svg";
import IconLaravel from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon12-Laravel.svg";
import IconKube from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon11-Kubernetes.svg";
import IconAzure from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon17-Azure.svg";
import IconFirebase from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-firebase.svg";
import IconTailwind from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-tailwindcss.svg";
import IconSwift from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-swift.svg";
import IconPython from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-tensorflow.svg";
import IconJS from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon05-JS.svg";
import IconGithub from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon10-Github.svg";
import IconChatGPT from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/chatgpt.svg";
import IconHTML from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/Icon09-HTML5.svg";
import IconShopify from "@/assets/images/ServicesSolutionsImgs/TechStackIcons/icons8-shopify.svg";

const BRAND = {
    darkBlue: "#0F4C8F",
    mediumBlue: "#388ECA",
    lightBlue: "#E8F4FD",
    accentBlue: "#1A6BB5",
};

const ROW1 = [
    { icon: IconReact, name: "React" },
    { icon: IconNode, name: "Node.js" },
    { icon: IconMongo, name: "MongoDB" },
    { icon: IconJS, name: "JavaScript" },
    { icon: IconAWS, name: "AWS" },
    { icon: IconNext, name: "Next.js" },
    { icon: IconTS, name: "TypeScript" },
    { icon: IconDocker, name: "Docker" },
    { icon: IconFigma, name: "Figma" },

    { icon: IconHTML, name: "HTML5" },
];

const ROW2 = [
    { icon: IconAI, name: "AI / ML" },
    { icon: IconChatGPT, name: "ChatGPT" },
    { icon: IconPython, name: "TensorFlow" },
    { icon: IconVue, name: "Vue.js" },
    { icon: IconLaravel, name: "Laravel" },
    { icon: IconKube, name: "Kubernetes" },
    { icon: IconAzure, name: "Azure" },
    { icon: IconFirebase, name: "Firebase" },
    { icon: IconTailwind, name: "Tailwind" },
    { icon: IconSwift, name: "Swift" },
    { icon: IconGithub, name: "GitHub" },
    { icon: IconShopify, name: "Shopify" },
];

// ─── Marquee Row ───
const Marquee = ({ items, direction = "left", speed = 35 }) => {
    const doubled = [...items, ...items];
    return (
        <div className="relative overflow-hidden w-full" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
            <motion.div
                className="flex gap-3 md:gap-4 w-max"
                animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={`${item.name}-${i}`}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg flex-shrink-0 group cursor-default transition-all duration-300 hover:!border-[rgba(15,76,143,0.3)]"
                        style={{
                            background: "rgba(15,76,143,0.04)",
                            border: "1px solid rgba(15,76,143,0.08)",
                        }}
                    >
                        <img src={item.icon} alt={item.name} className="w-5 h-5 md:w-6 md:h-6 object-contain transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-slate-500 text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-300 group-hover:text-slate-700">
                            {item.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

// ─── Interactive Particle Constellation ───
const Particles = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999, active: false });
    const ripples = useRef([]);

    // Expose mouse tracking to parent
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onEnter = () => { mouse.current.active = true; };
        const onLeave = () => { mouse.current.active = false; mouse.current.x = -9999; mouse.current.y = -9999; };
        const onMoveCanvas = (e) => {
            const r = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - r.left;
            mouse.current.y = e.clientY - r.top;
            mouse.current.active = true;
        };
        const onClick = () => {
            if (mouse.current.active) {
                ripples.current.push({ x: mouse.current.x, y: mouse.current.y, radius: 0, alpha: 0.5 });
            }
        };

        const parent = canvas.parentElement;
        parent.addEventListener("mouseenter", onEnter);
        parent.addEventListener("mouseleave", onLeave);
        parent.addEventListener("mousemove", onMoveCanvas);
        parent.addEventListener("click", onClick);
        return () => {
            parent.removeEventListener("mouseenter", onEnter);
            parent.removeEventListener("mouseleave", onLeave);
            parent.removeEventListener("mousemove", onMoveCanvas);
            parent.removeEventListener("click", onClick);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;
        let w, h;

        const particles = [];
        const COUNT = 70;
        const LINK_DIST = 130;
        const MOUSE_RADIUS = 180;
        const MOUSE_LINK_RADIUS = 220;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        };

        const init = () => {
            resize();
            particles.length = 0;
            for (let i = 0; i < COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    ox: 0, oy: 0, // original velocities
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.5 + 0.5,
                    baseR: Math.random() * 1.5 + 0.5,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            const mx = mouse.current.x;
            const my = mouse.current.y;
            const isActive = mouse.current.active;

            // ── Ripple waves ──
            for (let i = ripples.current.length - 1; i >= 0; i--) {
                const rp = ripples.current[i];
                rp.radius += 4;
                rp.alpha -= 0.008;
                if (rp.alpha <= 0) { ripples.current.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(15,76,143,${rp.alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // ── Mouse glow ──
            if (isActive) {
                const grd = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
                grd.addColorStop(0, "rgba(56,142,202,0.12)");
                grd.addColorStop(0.5, "rgba(15,76,143,0.06)");
                grd.addColorStop(1, "transparent");
                ctx.fillStyle = grd;
                ctx.fillRect(mx - MOUSE_RADIUS, my - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);
            }

            // ── Particle-to-particle links ──
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DIST) {
                        const alpha = (1 - dist / LINK_DIST) * 0.18;
                        ctx.strokeStyle = `rgba(15,76,143,${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // ── Update & draw particles ──
            for (const p of particles) {
                // Mouse interaction
                if (isActive) {
                    const dx = p.x - mx;
                    const dy = p.y - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Repel near cursor
                    if (dist < MOUSE_RADIUS && dist > 0) {
                        const force = (1 - dist / MOUSE_RADIUS) * 0.8;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                        p.r = p.baseR + (1 - dist / MOUSE_RADIUS) * 2; // grow near cursor
                    } else {
                        p.r += (p.baseR - p.r) * 0.05; // shrink back
                    }

                    // Draw lines from particle to cursor
                    if (dist < MOUSE_LINK_RADIUS) {
                        const alpha = (1 - dist / MOUSE_LINK_RADIUS) * 0.3;
                        ctx.strokeStyle = `rgba(56,142,202,${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mx, my);
                        ctx.stroke();
                    }
                } else {
                    p.r += (p.baseR - p.r) * 0.05;
                }

                // Friction to prevent runaway velocity
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Minimum drift speed
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed < 0.15) {
                    p.vx += (Math.random() - 0.5) * 0.1;
                    p.vy += (Math.random() - 0.5) * 0.1;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                if (p.x > w) { p.x = w; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                if (p.y > h) { p.y = h; p.vy *= -1; }

                // Draw particle
                const isNearMouse = isActive && Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2) < MOUSE_RADIUS;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = isNearMouse
                    ? `rgba(15,76,143,${0.4 + p.r * 0.1})`
                    : `rgba(56,142,202,${0.3 + p.r * 0.08})`;
                ctx.fill();

                // Glow on near-mouse particles
                if (isNearMouse) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(15,76,143,0.1)";
                    ctx.fill();
                }
            }

            // ── Mouse dot ──
            if (isActive) {
                ctx.beginPath();
                ctx.arc(mx, my, 3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(15,76,143,0.5)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(mx, my, 8, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(15,76,143,0.1)";
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        init();
        draw();
        const resizeHandler = () => resize();
        window.addEventListener("resize", resizeHandler);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: "none" }} />;
};

// ─── Main Hero ───
const Hero = () => {
    const heroRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Cursor glow
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothX = useSpring(cursorX, { stiffness: 30, damping: 30 });
    const smoothY = useSpring(cursorY, { stiffness: 30, damping: 30 });
    const glowX = useTransform(smoothX, (v) => `${v}px`);
    const glowY = useTransform(smoothY, (v) => `${v}px`);

    useEffect(() => { setIsMounted(true); }, []);

    const onMove = useCallback((e) => {
        if (!heroRef.current) return;
        const r = heroRef.current.getBoundingClientRect();
        cursorX.set(e.clientX - r.left);
        cursorY.set(e.clientY - r.top);
    }, [cursorX, cursorY]);

    return (
        <section
            ref={heroRef}
            onMouseMove={onMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden"
            style={{ background: "linear-gradient(180deg, #f0f7fd 0%, #ffffff 50%, #f5faff 100%)" }}
        >
            {/* Interactive particle constellation */}
            <Particles />

            {/* Cursor glow — intensifies on hover */}
            <motion.div
                className="absolute pointer-events-none z-[1]"
                style={{ left: glowX, top: glowY, x: "-50%", y: "-50%" }}
                animate={{
                    width: isHovering ? 800 : 500,
                    height: isHovering ? 800 : 500,
                    opacity: isHovering ? 1 : 0.5,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="w-full h-full rounded-full" style={{
                    background: isHovering
                        ? `radial-gradient(circle, rgba(56,142,202,0.15) 0%, rgba(15,76,143,0.05) 40%, transparent 70%)`
                        : `radial-gradient(circle, rgba(56,142,202,0.08) 0%, transparent 60%)`,
                    transition: "background 0.4s ease",
                }} />
            </motion.div>

            {/* Faint dot grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(rgba(15,76,143,0.5) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }} />

            {/* ─── Center content ─── */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">

                {/* Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span
                        className="inline-block md:pt-6 lg:pt-8 text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase mb-8 md:mb-10"
                        style={{ color: BRAND.mediumBlue }}
                    >
                        IT Solutions & Software Development Company
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-[2.1rem] sm:text-[2.9rem] md:text-[3.8rem] lg:text-[4.6rem] font-bold leading-[1.05] tracking-[-0.03em] max-w-[1100px]"
                    style={{ color: "#0c2d4a" }}
                    initial={{ opacity: 0, y: 25 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    We Build, Deploy &amp; Scale{" "}
                    <span className="relative inline-block">
                        <span className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}>
                            Production Software
                        </span>
                        <motion.span
                            className="absolute -bottom-1 md:-bottom-2 left-0 h-[2px] md:h-[3px] rounded-full"
                            style={{ background: `linear-gradient(90deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}
                            initial={{ width: "0%" }}
                            animate={isMounted ? { width: "100%" } : {}}
                            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </span>
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    className="text-slate-700 text-base md:text-lg lg:text-xl max-w-[780px] mt-5 md:mt-6 font-medium leading-snug"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    From MERN applications to Kubernetes-orchestrated platforms.
                </motion.p>

                {/* Supporting line */}
                <motion.p
                    className="text-slate-500 text-sm md:text-base max-w-[620px] mt-4 md:mt-5 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    Production-grade engineering for teams shipping real software — microservices,
                    containerised workloads, and cloud infrastructure that scales under load.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-wrap gap-4 mt-8 md:mt-10 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isMounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Link to="/contact">
                        <motion.button
                            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-white font-semibold text-sm overflow-hidden cursor-pointer"
                            style={{ background: BRAND.darkBlue }}
                            whileHover={{ scale: 1.02, boxShadow: `0 0 28px ${BRAND.darkBlue}50` }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <span className="relative z-10">Book a Free Infrastructure Review</span>
                            <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" />
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }} />
                        </motion.button>
                    </Link>
                    <Link to="/portfolio">
                        <motion.button
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-sm transition-colors duration-300 cursor-pointer"
                            style={{ border: `1px solid rgba(15,76,143,0.2)`, color: BRAND.darkBlue }}
                            whileHover={{ scale: 1.02, borderColor: "rgba(15,76,143,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            See Our Work
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* ─── Tech Stack Marquees ─── */}
            <motion.div
                className="relative z-10 mt-16 md:mt-24 flex flex-col gap-3 md:gap-4 pb-12"
                initial={{ opacity: 0 }}
                animate={isMounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <Marquee items={ROW1} direction="left" speed={40} />
                <Marquee items={ROW2} direction="right" speed={45} />
            </motion.div>

            {/* Scroll line */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={isMounted ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                {/* <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400">Scroll</span> */}
                <motion.div
                    className="w-[1px] h-6 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${BRAND.mediumBlue}40, transparent)` }}
                    animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 0.3, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
