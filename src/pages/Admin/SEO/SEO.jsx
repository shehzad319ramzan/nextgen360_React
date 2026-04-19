import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { CheckCircle, AlertCircle, XCircle, ExternalLink } from "lucide-react";

const PAGE_LABELS_ORDER = [
  { page: "home", label: "Home" },
  { page: "services", label: "Services" },
  { page: "solutions", label: "Solutions" },
  { page: "portfolio", label: "Portfolio" },
  { page: "blog", label: "Blog" },
  { page: "careers", label: "Join TSP" },
  { page: "about", label: "About" },
  { page: "contact", label: "Contact Us" },
];

const PAGE_LABELS = PAGE_LABELS_ORDER.reduce((acc, p) => ({ ...acc, [p.page]: p.label }), {});

const SERVICE_PAGES = {
  "Custom Development": [
    { page: "service-web-development", label: "Web Development" },
    { page: "service-mobile-app-development", label: "Mobile App Development" },
    { page: "service-saas-development", label: "SaaS Development" },
    { page: "service-mvp-development", label: "MVP Development" },
  ],
  "Creative Design Studio": [
    { page: "service-ui-ux-design", label: "UI/UX Design" },
    { page: "service-product-design", label: "Product Design" },
    { page: "service-saas-application-design", label: "SaaS Application Design" },
  ],
  "Cloud & Automation": [
    { page: "service-cloud-devops", label: "Cloud & DevOps" },
    { page: "service-ai-machine-learning", label: "AI & Machine Learning" },
  ],
};

const ALL_SERVICE_LABELS = Object.values(SERVICE_PAGES).flat().reduce((acc, s) => ({ ...acc, [s.page]: s.label }), {});

const TABS = ["Basic SEO", "Open Graph", "Twitter Card", "Technical", "Schema"];

const ScoreBadge = ({ score }) => {
  const color = score >= 80 ? "bg-green-100 text-green-700" : score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${color}`}>{score}%</span>;
};

const CharCount = ({ value = "", min, max }) => {
  const len = value.length;
  const color = len === 0 ? "text-gray-400" : len >= min && len <= max ? "text-green-600" : "text-orange-500";
  return <span className={`text-xs ${color}`}>{len}/{max} chars</span>;
};

const SerpPreview = ({ title, description, url }) => (
  <div className="bg-white border rounded-xl p-4 mt-4">
    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Google Preview</p>
    <div className="text-sm text-gray-500 mb-0.5">{url || "https://tech-solutionspro.com"}</div>
    <div className="text-[#1a0dab] text-lg font-medium leading-tight hover:underline cursor-pointer truncate">
      {title || <span className="text-gray-300 italic">No title set</span>}
    </div>
    <div className="text-sm text-gray-600 mt-0.5 line-clamp-2">
      {description || <span className="text-gray-300 italic">No description set</span>}
    </div>
  </div>
);

const SocialPreview = ({ title, description, image, url }) => (
  <div className="bg-white border rounded-xl overflow-hidden mt-4">
    <p className="text-xs text-gray-400 uppercase tracking-wider p-3 pb-0 font-semibold">Social Preview</p>
    {image ? (
      <img src={image} alt="OG" className="w-full h-32 object-cover mt-2" onError={(e) => e.target.style.display = "none"} />
    ) : (
      <div className="w-full h-24 bg-gray-100 flex items-center justify-center mt-2">
        <span className="text-gray-300 text-xs">No OG image set</span>
      </div>
    )}
    <div className="p-3 border-t bg-gray-50">
      <p className="text-xs text-gray-400 uppercase">{url || "tech-solutionspro.com"}</p>
      <p className="font-semibold text-sm text-gray-800 mt-0.5 truncate">{title || "No title"}</p>
      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{description || "No description"}</p>
    </div>
  </div>
);

const SCHEMA_TEMPLATES = {
  Organization: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tech Solutions Pro",
    "url": "https://tech-solutionspro.com",
    "logo": "https://tech-solutionspro.com/tsp.ico",
    "contactPoint": { "@type": "ContactPoint", "telephone": "+44-115-990-3394", "contactType": "customer service" },
    "address": { "@type": "PostalAddress", "streetAddress": "Unit 5D+E", "addressLocality": "Nottingham", "postalCode": "NG3 4GQ", "addressCountry": "GB" }
  }, null, 2),
  LocalBusiness: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tech Solutions Pro",
    "image": "https://tech-solutionspro.com/og-image.jpg",
    "telephone": "+44-115-990-3394",
    "address": { "@type": "PostalAddress", "streetAddress": "Unit 5D+E", "addressLocality": "Nottingham", "postalCode": "NG3 4GQ", "addressCountry": "GB" },
    "geo": { "@type": "GeoCoordinates", "latitude": 52.9548, "longitude": -1.1581 },
    "openingHours": "Mo-Fr 09:00-17:00",
    "url": "https://tech-solutionspro.com"
  }, null, 2),
  WebPage: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Name",
    "description": "Page description",
    "url": "https://tech-solutionspro.com/page"
  }, null, 2),
  FAQPage: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What services does Tech Solutions Pro offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer web development, digital marketing, SEO, PPC, mobile app development and more." } }
    ]
  }, null, 2),
};

const empty = { title: "", description: "", keywords: "", og_title: "", og_description: "", og_image: "", twitter_title: "", twitter_description: "", twitter_image: "", twitter_card: "summary_large_image", canonical: "", robots: "index, follow", schema_json: "" };

export default function SEO() {
  const [pages, setPages] = useState([]);
  const [health, setHealth] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(empty);
  const [activeTab, setActiveTab] = useState("Basic SEO");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [schemaError, setSchemaError] = useState("");
  const [view, setView] = useState("pages"); // pages | redirects | robots | htaccess | custom-code
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    api.get("/seo").then(setPages).catch(() => {});
    api.get("/seo/_health").then(setHealth).catch(() => {});
  }, []);

  const selectPage = (p) => {
    setSelected(p);
    setForm({ ...empty, ...Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v ?? ""])) });
    setActiveTab("Basic SEO");
    setSaved(false);
    setSchemaError("");
  };

  const f = (key) => ({
    value: form[key] || "",
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  const validateSchema = () => {
    if (!form.schema_json) return true;
    try { JSON.parse(form.schema_json); setSchemaError(""); return true; }
    catch (e) { setSchemaError(e.message); return false; }
  };

  const handleSave = async () => {
    if (!validateSchema()) return;
    setSaving(true);
    try {
      await api.put(`/seo/${selected.page}`, form);
      setPages(prev => prev.map(p => p.page === selected.page ? { ...p, ...form } : p));
      api.get("/seo/_health").then(setHealth).catch(() => {});
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  const pageHealth = health.find(h => h.page === selected?.page);

  return (
    <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">SEO Management</h1>
        <div className="flex gap-2">
          {["pages", "redirects", "robots", "htaccess", "custom-code"].map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === v ? "bg-[#0F4C8F] text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}>
              {v === "pages" ? "Pages" : v === "redirects" ? "Redirects" : v === "robots" ? "Robots.txt" : v === "htaccess" ? ".htaccess" : "Custom Code"}
            </button>
          ))}
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border text-gray-600 hover:bg-gray-50 transition-colors">
            Sitemap <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {view === "redirects" ? <Redirects /> : view === "robots" ? <RobotsTxt /> : view === "htaccess" ? <HtAccess /> : view === "custom-code" ? <CustomCode /> : (
        <div className="flex gap-5">
          {/* Page list + health */}
          <div className="w-56 shrink-0 space-y-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {PAGE_LABELS_ORDER.map(({ page: pageKey }) => {
                const p = pages.find(pp => pp.page === pageKey);
                if (!p) return null;
                const h = health.find(x => x.page === p.page);
                const isServices = p.page === "services";
                return (
                  <div key={p.page}>
                    <button onClick={() => { selectPage(p); if (isServices) setShowServices(prev => !prev); }}
                      className={`w-full text-left px-4 py-3 text-sm border-b transition-colors flex items-center justify-between gap-2 ${selected?.page === p.page && !showServices ? "bg-[#0F4C8F] text-white font-medium" : "hover:bg-gray-50 text-gray-700"}`}>
                      <span className="truncate flex items-center gap-1.5">
                        {PAGE_LABELS[p.page] || p.page}
                        {isServices && <span className="text-[10px]">{showServices ? "▲" : "▼"}</span>}
                      </span>
                      {h && <ScoreBadge score={h.score} />}
                    </button>
                    {isServices && showServices && (
                      <div className="bg-gray-50 border-b">
                        {Object.entries(SERVICE_PAGES).map(([cat, svcs]) => (
                          <div key={cat}>
                            <p className="px-4 pt-2.5 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{cat}</p>
                            {svcs.map(s => {
                              const sp = pages.find(pp => pp.page === s.page);
                              const sh = health.find(x => x.page === s.page);
                              return (
                                <button key={s.page} onClick={() => { if (sp) selectPage(sp); }}
                                  className={`w-full text-left pl-6 pr-4 py-2 text-xs border-t border-gray-100 transition-colors flex items-center justify-between gap-2 ${selected?.page === s.page ? "bg-[#0F4C8F] text-white font-medium" : "hover:bg-gray-100 text-gray-600"}`}>
                                  <span className="truncate">{s.label}</span>
                                  {sh && <ScoreBadge score={sh.score} />}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Health overview */}
            {health.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Health</p>
                <div className="space-y-1.5">
                  {health.map(h => (
                    <div key={h.page} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{PAGE_LABELS[h.page] || ALL_SERVICE_LABELS[h.page] || h.page}</span>
                      <div className="flex items-center gap-1">
                        {h.score >= 80 ? <CheckCircle size={13} className="text-green-500" /> : h.score >= 50 ? <AlertCircle size={13} className="text-yellow-500" /> : <XCircle size={13} className="text-red-400" />}
                        <span className="text-xs text-gray-500">{h.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Edit panel */}
          {selected ? (
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-gray-800">{PAGE_LABELS[selected.page] || ALL_SERVICE_LABELS[selected.page] || selected.page}</h2>
                    {pageHealth && <ScoreBadge score={pageHealth.score} />}
                  </div>
                  <div className="flex items-center gap-3">
                    {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
                    <button onClick={handleSave} disabled={saving}
                      className="bg-[#0F4C8F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                {/* Missing fields warning */}
                {pageHealth?.missing?.length > 0 && (
                  <div className="mx-6 mt-4 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 flex gap-2">
                    <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-700">Missing: {pageHealth.missing.join(", ")}</p>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex border-b px-6 mt-4 gap-1">
                  {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-[#0F4C8F] text-[#0F4C8F]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-6 grid grid-cols-2 gap-6">
                  {/* Left — form fields */}
                  <div className="space-y-4">
                    {activeTab === "Basic SEO" && <>
                      <Field label="Meta Title" hint={<CharCount value={form.title} min={50} max={60} />}>
                        <input {...f("title")} placeholder="50–60 characters recommended" className={input} />
                      </Field>
                      <Field label="Meta Description" hint={<CharCount value={form.description} min={150} max={160} />}>
                        <textarea {...f("description")} rows={3} placeholder="150–160 characters recommended" className={`${input} resize-none`} />
                      </Field>
                      <Field label="Keywords" hint="comma separated">
                        <input {...f("keywords")} placeholder="seo, digital marketing, web development" className={input} />
                      </Field>
                      <Field label="Canonical URL">
                        <input {...f("canonical")} placeholder="https://tech-solutionspro.com/page" className={input} />
                      </Field>
                    </>}

                    {activeTab === "Open Graph" && <>
                      <Field label="OG Title" hint={<CharCount value={form.og_title} min={40} max={60} />}>
                        <input {...f("og_title")} placeholder="Title for Facebook, LinkedIn sharing" className={input} />
                      </Field>
                      <Field label="OG Description" hint={<CharCount value={form.og_description} min={100} max={200} />}>
                        <textarea {...f("og_description")} rows={3} placeholder="Description for social sharing" className={`${input} resize-none`} />
                      </Field>
                      <Field label="OG Image URL">
                        <input {...f("og_image")} placeholder="https://... (1200×630px recommended)" className={input} />
                      </Field>
                    </>}

                    {activeTab === "Twitter Card" && <>
                      <Field label="Card Type">
                        <select {...f("twitter_card")} className={input}>
                          <option value="summary_large_image">Summary Large Image</option>
                          <option value="summary">Summary</option>
                        </select>
                      </Field>
                      <Field label="Twitter Title" hint={<CharCount value={form.twitter_title} min={40} max={70} />}>
                        <input {...f("twitter_title")} placeholder="Leave blank to use OG title" className={input} />
                      </Field>
                      <Field label="Twitter Description" hint={<CharCount value={form.twitter_description} min={100} max={200} />}>
                        <textarea {...f("twitter_description")} rows={3} placeholder="Leave blank to use OG description" className={`${input} resize-none`} />
                      </Field>
                      <Field label="Twitter Image URL">
                        <input {...f("twitter_image")} placeholder="Leave blank to use OG image" className={input} />
                      </Field>
                    </>}

                    {activeTab === "Technical" && <>
                      <Field label="Robots" hint="Controls search engine indexing">
                        <select {...f("robots")} className={input}>
                          <option value="index, follow">index, follow (default — fully indexed)</option>
                          <option value="noindex, follow">noindex, follow (exclude from index)</option>
                          <option value="index, nofollow">index, nofollow (don't follow links)</option>
                          <option value="noindex, nofollow">noindex, nofollow (block completely)</option>
                        </select>
                      </Field>
                      <Field label="Canonical URL">
                        <input {...f("canonical")} placeholder="https://tech-solutionspro.com/page" className={input} />
                      </Field>
                      <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700 space-y-1">
                        <p className="font-semibold">Indexing Guide</p>
                        <p>• Use <strong>index, follow</strong> for all main pages</p>
                        <p>• Use <strong>noindex</strong> for thank-you, login, admin pages</p>
                        <p>• Canonical prevents duplicate content penalties</p>
                      </div>
                    </>}

                    {activeTab === "Schema" && <>
                      <Field label="Structured Data (JSON-LD)" hint={<span className="text-red-500">{schemaError}</span>}>
                        <textarea {...f("schema_json")} onBlur={validateSchema} rows={12}
                          placeholder='{"@context": "https://schema.org", "@type": "..."}'
                          className={`${input} resize-none font-mono text-xs ${schemaError ? "border-red-400" : ""}`} />
                      </Field>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(SCHEMA_TEMPLATES).map(t => (
                          <button key={t} onClick={() => setForm({ ...form, schema_json: SCHEMA_TEMPLATES[t] })}
                            className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                            {t}
                          </button>
                        ))}
                      </div>
                    </>}
                  </div>

                  {/* Right — previews */}
                  <div>
                    {(activeTab === "Basic SEO") && (
                      <SerpPreview title={form.title} description={form.description} url={form.canonical || `https://tech-solutionspro.com${selected.page === "home" ? "" : `/${selected.page}`}`} />
                    )}
                    {(activeTab === "Open Graph" || activeTab === "Twitter Card") && (
                      <SocialPreview
                        title={form.og_title || form.title}
                        description={form.og_description || form.description}
                        image={form.og_image}
                        url={`tech-solutionspro.com`}
                      />
                    )}
                    {activeTab === "Technical" && (
                      <div className="bg-gray-900 rounded-xl p-4 mt-0 font-mono text-xs text-green-400 space-y-1">
                        <p className="text-gray-400 mb-2">// Generated meta tags</p>
                        <p>{`<meta name="robots" content="${form.robots || 'index, follow'}" />`}</p>
                        {form.canonical && <p>{`<link rel="canonical" href="${form.canonical}" />`}</p>}
                        {form.title && <p>{`<title>${form.title}</title>`}</p>}
                        {form.description && <p>{`<meta name="description" content="${form.description.slice(0,50)}..." />`}</p>}
                      </div>
                    )}
                    {activeTab === "Schema" && form.schema_json && !schemaError && (
                      <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-yellow-300 overflow-auto max-h-72">
                        <p className="text-gray-400 mb-2">// JSON-LD preview</p>
                        <pre>{form.schema_json}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 text-sm">
              Select a page to edit its SEO
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Shared field wrapper ──────────────────────────────────────────────────────
const input = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8F]";

function Field({ label, hint, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        {hint && <span>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Redirects sub-panel ───────────────────────────────────────────────────────
function CustomCode() {
  const [form, setForm] = useState({
    custom_head_scripts: "",
    custom_footer_scripts: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/seo/_custom-code")
      .then((data) => setForm({
        custom_head_scripts: data.custom_head_scripts || "",
        custom_footer_scripts: data.custom_footer_scripts || "",
      }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/seo/_custom-code", form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="font-semibold text-gray-800">Custom Header & Footer Code</h2>
          <p className="text-xs text-gray-500 mt-0.5">Add verification tags, schema, tracking snippets, or widgets without editing other files.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
          <button onClick={handleSave} disabled={saving}
            className="bg-[#0F4C8F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Field label="Header Code" hint={<span className="text-[11px] text-gray-400">Injected in &lt;head&gt;</span>}>
            <textarea
              value={form.custom_head_scripts}
              onChange={(e) => setForm({ ...form, custom_head_scripts: e.target.value })}
              rows={16}
              placeholder={'<!-- Google verification, schema, meta tags, tracking code -->\n<meta name="google-site-verification" content="..." />\n<script>...</script>'}
              className={`${input} resize-none font-mono text-xs`}
            />
          </Field>
          <p className="text-xs text-gray-400">Use this for SEO verification tags, structured data, tracking loaders, and extra meta markup.</p>
        </div>

        <div className="space-y-3">
          <Field label="Footer Code" hint={<span className="text-[11px] text-gray-400">Injected before &lt;/body&gt;</span>}>
            <textarea
              value={form.custom_footer_scripts}
              onChange={(e) => setForm({ ...form, custom_footer_scripts: e.target.value })}
              rows={16}
              placeholder={'<!-- Chat widgets, event code, body-end scripts -->\n<script>...</script>'}
              className={`${input} resize-none font-mono text-xs`}
            />
          </Field>
          <p className="text-xs text-gray-400">Use this for widgets or scripts that should load after page content without affecting the rest of the SEO code.</p>
        </div>
      </div>
    </div>
  );
}

function Redirects() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ from_path: "", to_path: "", type: 301 });
  const [error, setError] = useState("");

  const fetch_ = () => api.get("/redirects").then(setRows).catch(() => {});
  useEffect(() => { fetch_(); }, []);

  const add = async () => {
    if (!form.from_path || !form.to_path) return setError("Both paths required");
    setError("");
    try {
      await api.post("/redirects", form);
      setForm({ from_path: "", to_path: "", type: 301 });
      fetch_();
    } catch (e) { setError(e.message); }
  };

  const toggle = (r) => api.put(`/redirects/${r.id}`, { active: !r.active }).then(fetch_);
  const del = (id) => { if (confirm("Delete this redirect?")) api.delete(`/redirects/${id}`).then(fetch_); };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="font-semibold text-gray-800">301 / 302 Redirects</h2>
        <p className="text-xs text-gray-500 mt-0.5">Manage URL redirects. These are handled at the API level and require Nginx config for production.</p>
      </div>

      <div className="p-6 border-b">
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 block mb-1">From Path</label>
            <input value={form.from_path} onChange={e => setForm({ ...form, from_path: e.target.value })}
              placeholder="/old-page" className={input} />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-600 block mb-1">To Path / URL</label>
            <input value={form.to_path} onChange={e => setForm({ ...form, to_path: e.target.value })}
              placeholder="/new-page or https://..." className={input} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: parseInt(e.target.value) })} className={input}>
              <option value={301}>301 Permanent</option>
              <option value={302}>302 Temporary</option>
            </select>
          </div>
          <button onClick={add} className="bg-[#0F4C8F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] transition-colors whitespace-nowrap">
            Add Redirect
          </button>
        </div>
      </div>

      <div className="divide-y">
        {rows.length === 0 && <p className="px-6 py-8 text-sm text-gray-400 text-center">No redirects yet</p>}
        {rows.map(r => (
          <div key={r.id} className="flex items-center gap-4 px-6 py-3">
            <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${r.type === 301 ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>{r.type}</span>
            <span className="font-mono text-sm text-gray-700 flex-1">{r.from_path}</span>
            <span className="text-gray-400">→</span>
            <span className="font-mono text-sm text-gray-700 flex-1 truncate">{r.to_path}</span>
            <span className="text-xs text-gray-400">{r.hits} hits</span>
            <button onClick={() => toggle(r)}
              className={`text-xs px-2 py-1 rounded font-medium ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {r.active ? "Active" : "Paused"}
            </button>
            <button onClick={() => del(r.id)} className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Robots.txt editor ───────────────────────────────────────────────────────
function RobotsTxt() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seo/_robots").then(d => setContent(d.content)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/seo/_robots", { content });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="font-semibold text-gray-800">Robots.txt</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controls which pages search engines can crawl. Changes are served live at /robots.txt</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
          <a href={`${import.meta.env.VITE_BACKEND_URL}/robots.txt`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            Preview <ExternalLink size={12} />
          </a>
          <button onClick={handleSave} disabled={saving}
            className="bg-[#0F4C8F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={18}
            className={`${input} resize-none font-mono text-xs`}
            placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /admin/" />
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700 space-y-2">
            <p className="font-semibold text-sm">Robots.txt Guide</p>
            <p><strong>User-agent: *</strong> — applies to all crawlers</p>
            <p><strong>Allow: /</strong> — allow crawling of all pages</p>
            <p><strong>Disallow: /admin/</strong> — block admin pages</p>
            <p><strong>Disallow: /api/</strong> — block API endpoints</p>
            <p><strong>Sitemap:</strong> — tell crawlers where your sitemap is</p>
            <p><strong>Crawl-delay: 10</strong> — seconds between requests (optional)</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-auto max-h-48">
            <p className="text-gray-400 mb-2"># Live preview</p>
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── .htaccess editor ────────────────────────────────────────────────────────
function HtAccess() {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seo/_htaccess").then(d => setContent(d.content)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/seo/_htaccess", { content });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="font-semibold text-gray-800">.htaccess</h2>
          <p className="text-xs text-gray-500 mt-0.5">Apache server configuration for redirects, security headers, and URL rewriting. Export when deploying.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Saved</span>}
          <button onClick={() => { const blob = new Blob([content], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = ".htaccess"; a.click(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            Download
          </button>
          <button onClick={handleSave} disabled={saving}
            className="bg-[#0F4C8F] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0d3d75] disabled:opacity-60 transition-colors">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={18}
            className={`${input} resize-none font-mono text-xs`}
            placeholder="RewriteEngine On&#10;RewriteCond %{HTTPS} off&#10;RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]" />
        </div>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 text-xs text-blue-700 space-y-2">
            <p className="font-semibold text-sm">.htaccess Guide</p>
            <p><strong>RewriteEngine On</strong> — enable URL rewriting</p>
            <p><strong>Force HTTPS</strong> — redirect HTTP to HTTPS</p>
            <p><strong>www redirect</strong> — redirect www to non-www (or vice versa)</p>
            <p><strong>Security headers</strong> — X-Frame-Options, HSTS, etc.</p>
            <p><strong>Caching</strong> — set browser cache durations for assets</p>
            <p><strong>Compression</strong> — enable GZIP for faster loading</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-700 flex gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <p>Changes are saved to database. Download the file and deploy it to your Apache server root for the rules to take effect.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-auto max-h-48">
            <p className="text-gray-400 mb-2"># Live preview</p>
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
