import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Tag, Clock, Quote } from "lucide-react";
import { htmlProps, stripHtml } from "@/utils/html";

const BRAND = {
  darkBlue: "#0F4C8F",
  mediumBlue: "#388ECA",
  darkNavy: "#0a1f3f",
};

function parseMetrics(raw) {
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const proseClass = `prose prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed
  [&_h2]:text-[#0F4C8F] [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3
  [&_h3]:text-[#0F4C8F] [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
  [&_a]:text-[#388ECA] [&_a]:underline
  [&_img]:rounded-xl [&_img]:my-5 [&_img]:shadow-md
  [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1
  [&_blockquote]:border-l-4 [&_blockquote]:border-[#388ECA] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500
  [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.85em]
  [&_strong]:text-slate-800`;

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/case-studies/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || d.error) {
          setNotFound(true);
          setItem(null);
        } else {
          setItem(d);
        }
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!item) return;
    const title = `${item.title} · Case Study · NextGen360`;
    document.title = title;
    const desc = stripHtml(item.summary) || stripHtml(item.challenge) || item.title;
    setMeta("description", desc.slice(0, 160));
    setMeta("og:title", title, "property");
    setMeta("og:description", desc.slice(0, 200), "property");
    if (item.cover_image) setMeta("og:image", item.cover_image, "property");
  }, [item]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "#388ECA30", borderTopColor: "#388ECA" }}
        />
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5 py-20">
        <h2 className="text-2xl font-bold mb-2" style={{ color: BRAND.darkBlue }}>
          Case Study Not Found
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          This case study doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2 transition-all"
          style={{ color: BRAND.mediumBlue }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    );
  }

  const metrics = parseMetrics(item.metrics);
  const tags = item.tags
    ? item.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <article>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${BRAND.darkNavy} 0%, ${BRAND.darkBlue} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-20 md:pb-28">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> All case studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {item.industry && (
              <span
                className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-4"
                style={{ color: BRAND.mediumBlue }}
              >
                {item.industry}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] tracking-tight max-w-4xl">
              {item.title}
            </h1>
            {item.summary && (
              <p className="text-white/60 text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
                {stripHtml(item.summary)}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 md:gap-8 mt-10 pt-8 border-t border-white/10">
              {item.client && (
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-white/40" />
                  <div>
                    <div className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium">
                      Client
                    </div>
                    <div className="text-sm text-white font-semibold">{item.client}</div>
                  </div>
                </div>
              )}
              {item.duration && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-white/40" />
                  <div>
                    <div className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium">
                      Duration
                    </div>
                    <div className="text-sm text-white font-semibold">{item.duration}</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Cover image overlap */}
        {item.cover_image && (
          <motion.div
            className="relative max-w-[1100px] mx-auto px-5 md:px-10 -mb-20 md:-mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={item.cover_image}
              alt={item.title}
              className="w-full h-[260px] md:h-[420px] object-cover rounded-2xl border border-white/10 shadow-2xl"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </motion.div>
        )}
      </section>

      {/* Body */}
      <section
        className={`${item.cover_image ? "pt-32 md:pt-36" : "pt-16 md:pt-20"} pb-16 md:pb-24`}
        style={{ background: "#fbfdff" }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          {/* Metrics band */}
          {metrics.length > 0 && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-100"
                  style={{ boxShadow: "0 1px 2px rgba(15,76,143,0.04)" }}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[11px] md:text-xs text-slate-500 uppercase tracking-wider font-medium mt-2">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Content grid */}
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 md:gap-16">
            {/* Main body */}
            <div className="space-y-12 md:space-y-14">
              {item.challenge && (
                <div>
                  <SectionLabel n="01" label="The Challenge" />
                  <div className={proseClass} {...htmlProps(item.challenge)} />
                </div>
              )}
              {item.solution && (
                <div>
                  <SectionLabel n="02" label="The Solution" />
                  <div className={proseClass} {...htmlProps(item.solution)} />
                </div>
              )}
              {item.results && (
                <div>
                  <SectionLabel n="03" label="The Results" />
                  <div className={proseClass} {...htmlProps(item.results)} />
                </div>
              )}

              {/* Testimonial */}
              {item.testimonial_quote && (
                <motion.figure
                  className="mt-14 p-8 md:p-10 rounded-2xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote size={48} className="text-white/20 absolute top-6 right-6" />
                  <blockquote className="relative text-white text-lg md:text-xl font-medium leading-relaxed italic">
                    "{stripHtml(item.testimonial_quote)}"
                  </blockquote>
                  {item.testimonial_author && (
                    <figcaption className="text-white/70 text-sm mt-5 font-medium">
                      — {item.testimonial_author}
                    </figcaption>
                  )}
                </motion.figure>
              )}
            </div>

            {/* Aside */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                    Stack & Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                        style={{
                          background: `${BRAND.mediumBlue}10`,
                          color: BRAND.darkBlue,
                          border: `1px solid ${BRAND.mediumBlue}25`,
                        }}
                      >
                        <Tag size={10} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div
                className="p-6 rounded-2xl text-white relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.darkNavy}, ${BRAND.darkBlue})`,
                }}
              >
                <p className="text-sm font-semibold leading-snug mb-2">
                  Have a similar challenge?
                </p>
                <p className="text-white/70 text-xs leading-relaxed mb-4">
                  Let's talk about what production-grade looks like for your team.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold bg-white rounded-lg px-4 py-2 transition-all hover:gap-2.5"
                  style={{ color: BRAND.darkBlue }}
                >
                  Book a Review <ArrowRight size={13} />
                </Link>
              </div>
            </aside>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-20 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid #eef3f9" }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={13} /> Back to home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-lg text-white transition-all hover:gap-2"
              style={{ background: BRAND.darkBlue }}
            >
              Start a Project <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function SectionLabel({ n, label }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="text-xs font-bold tracking-[0.2em] px-2.5 py-1 rounded-md"
        style={{
          background: `${BRAND.mediumBlue}15`,
          color: BRAND.darkBlue,
        }}
      >
        {n}
      </span>
      <h2
        className="text-xl md:text-2xl font-bold tracking-tight"
        style={{ color: BRAND.darkNavy }}
      >
        {label}
      </h2>
    </div>
  );
}
