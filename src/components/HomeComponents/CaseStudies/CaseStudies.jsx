import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Quote } from "lucide-react";
import { stripHtml } from "@/utils/html";

const BRAND = {
  darkBlue: "#0F4C8F",
  mediumBlue: "#388ECA",
  darkNavy: "#0a1f3f",
};

function parseMetrics(raw) {
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed.slice(0, 3) : [];
  } catch {
    return [];
  }
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_API}/case-studies?featured=1`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        setItems(Array.isArray(d) ? d.slice(0, 3) : []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Don't render the section at all if there's nothing featured
  if (loaded && items.length === 0) return null;

  const [hero, ...rest] = items;

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: `radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(56,142,202,0.08), transparent 60%), linear-gradient(180deg, #fbfdff 0%, #f4f8fc 100%)`,
      }}
    >
      {/* Dot grid accent */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(15,76,143,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div {...fadeUp(0)}>
            <span
              className="inline-block text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: BRAND.mediumBlue }}
            >
              Case Studies
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight max-w-2xl"
              style={{ color: BRAND.darkNavy }}
            >
              Real work.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}
              >
                Measurable outcomes.
              </span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
              A few production systems we've built, shipped, and scaled — with the numbers to back them up.
            </p>
          </motion.div>
        </div>

        {!loaded ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[420px] rounded-2xl bg-white/60 border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
            {/* Hero card — spans 2 columns on lg */}
            {hero && (
              <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
                <Link to={`/case-studies/${hero.slug}`} className="group block h-full">
                  <article
                    className="relative h-full rounded-2xl overflow-hidden border border-slate-200/60 bg-white transition-all duration-500 flex flex-col"
                    style={{ boxShadow: "0 1px 2px rgba(15,76,143,0.04)" }}
                  >
                    {/* Cover */}
                    <div className="relative h-[240px] md:h-[320px] overflow-hidden">
                      {hero.cover_image ? (
                        <img
                          src={hero.cover_image}
                          alt={hero.title}
                          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div
                          className="w-full h-full"
                          style={{ background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})` }}
                        />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,31,63,0) 40%, rgba(10,31,63,0.65) 100%)",
                        }}
                      />
                      {/* Industry chip */}
                      {hero.industry && (
                        <span
                          className="absolute top-5 left-5 inline-flex items-center text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.92)", color: BRAND.darkBlue }}
                        >
                          {hero.industry}
                        </span>
                      )}
                      {/* Title on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                        {hero.client && (
                          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/70 mb-2">
                            {hero.client}
                          </p>
                        )}
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-xl">
                          {hero.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col gap-5">
                      {hero.summary && (
                        <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed line-clamp-3">
                          {stripHtml(hero.summary)}
                        </p>
                      )}

                      {/* Metrics row */}
                      {parseMetrics(hero.metrics).length > 0 && (
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                          {parseMetrics(hero.metrics).map((m, i) => (
                            <div key={i}>
                              <div
                                className="text-xl md:text-2xl font-bold tracking-tight"
                                style={{
                                  backgroundImage: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})`,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {m.value}
                              </div>
                              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium mt-0.5">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                          style={{ color: BRAND.darkBlue }}
                        >
                          Read case study
                          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-0.5" />
                        </span>
                        {hero.duration && (
                          <span className="text-[11px] text-slate-400 font-medium">{hero.duration}</span>
                        )}
                      </div>
                    </div>

                    {/* Gradient hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: `0 30px 80px -30px ${BRAND.darkBlue}40`,
                      }}
                    />
                  </article>
                </Link>
              </motion.div>
            )}

            {/* Side column — smaller cards */}
            <div className="flex flex-col gap-5 md:gap-6">
              {rest.map((item, idx) => (
                <motion.div key={item.id} {...fadeUp(0.2 + idx * 0.08)}>
                  <Link to={`/case-studies/${item.slug}`} className="group block">
                    <article
                      className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-white transition-all duration-500"
                      style={{ boxShadow: "0 1px 2px rgba(15,76,143,0.04)" }}
                    >
                      <div className="relative h-[160px] overflow-hidden">
                        {item.cover_image ? (
                          <img
                            src={item.cover_image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{ background: `linear-gradient(135deg, ${BRAND.mediumBlue}, ${BRAND.darkBlue})` }}
                          />
                        )}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(10,31,63,0) 30%, rgba(10,31,63,0.55) 100%)",
                          }}
                        />
                        {item.industry && (
                          <span
                            className="absolute top-3 left-3 inline-flex items-center text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(255,255,255,0.92)", color: BRAND.darkBlue }}
                          >
                            {item.industry}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        {item.client && (
                          <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1.5">
                            {item.client}
                          </p>
                        )}
                        <h3
                          className="text-base md:text-lg font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-[#0F4C8F]"
                          style={{ color: BRAND.darkNavy }}
                        >
                          {item.title}
                        </h3>
                        {item.summary && (
                          <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2">
                            {stripHtml(item.summary)}
                          </p>
                        )}
                        <span
                          className="inline-flex items-center gap-1 text-[13px] font-semibold mt-3 transition-all duration-300 group-hover:gap-2"
                          style={{ color: BRAND.darkBlue }}
                        >
                          View <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}

              {/* If only one item total, show a CTA card in the empty slot */}
              {rest.length < 2 && (
                <motion.div {...fadeUp(0.3)}>
                  <Link
                    to="/contact"
                    className="group relative block rounded-2xl overflow-hidden p-6 md:p-7 h-full min-h-[180px]"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND.darkBlue}, ${BRAND.mediumBlue})`,
                    }}
                  >
                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                      <Quote size={28} className="opacity-40" />
                      <div>
                        <p className="text-base font-semibold leading-snug mb-3">
                          Want a write-up like this for your team's next launch?
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5">
                          Start a conversation <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                    <div
                      className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-30 blur-2xl"
                      style={{ background: "rgba(255,255,255,0.3)" }}
                    />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
