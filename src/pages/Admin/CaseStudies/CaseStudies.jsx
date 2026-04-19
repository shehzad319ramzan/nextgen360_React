import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import {
  Plus, BookOpen, Trash2, ToggleLeft, ToggleRight, Edit2, Upload, Star, X,
} from "lucide-react";

const EMPTY = {
  title: "",
  slug: "",
  client: "",
  industry: "",
  duration: "",
  cover_image: "",
  summary: "",
  challenge: "",
  solution: "",
  results: "",
  metrics: "",
  tags: "",
  testimonial_quote: "",
  testimonial_author: "",
  featured: 0,
  active: 1,
  sort_order: 0,
};

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseMetrics(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function metricsToString(list) {
  return JSON.stringify(list.filter((m) => m.label || m.value));
}

export default function CaseStudies() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/case-studies?all=1")
      .then(setItems).catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!selected?.title) return;
    setSaving(true);
    try {
      const payload = { ...selected, slug: selected.slug || toSlug(selected.title) };
      if (selected.id) await api.put(`/case-studies/${selected.id}`, payload);
      else await api.post("/case-studies", payload);
      load();
      setSelected(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this case study?")) return;
    await api.delete(`/case-studies/${id}`);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const toggleActive = async (item) => {
    await api.put(`/case-studies/${item.id}`, { ...item, active: item.active ? 0 : 1 });
    load();
  };

  const toggleFeatured = async (item) => {
    await api.put(`/case-studies/${item.id}`, { ...item, featured: item.featured ? 0 : 1 });
    load();
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setSelected((prev) => ({
      ...prev,
      title,
      slug: prev.id ? prev.slug : toSlug(title),
    }));
  };

  const metrics = parseMetrics(selected?.metrics);

  const setMetrics = (list) =>
    setSelected((prev) => ({ ...prev, metrics: metricsToString(list) }));

  const addMetric = () => setMetrics([...metrics, { label: "", value: "" }]);
  const updateMetric = (i, key, val) => {
    const next = [...metrics];
    next[i] = { ...next[i], [key]: val };
    setMetrics(next);
  };
  const removeMetric = (i) => setMetrics(metrics.filter((_, idx) => idx !== i));

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.filter((i) => i.active).length} active · {items.filter((i) => i.featured).length} featured on homepage
          </p>
        </div>
        <button
          onClick={() => setSelected(EMPTY)}
          className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Case Study
        </button>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && <Loader />}
          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <BookOpen size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No case studies yet. Add your first one.</p>
            </div>
          )}
          <div className="overflow-y-auto divide-y divide-gray-50">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === item.id ? "bg-blue-50 border-l-2 border-l-[#0F4C8F]" : ""
                }`}
              >
                <div
                  className="min-w-0 flex-1 cursor-pointer flex items-center gap-3"
                  onClick={() => setSelected({ ...item })}
                >
                  {item.cover_image ? (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-12 h-10 rounded-lg object-cover shrink-0 border border-gray-200"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                      {item.featured ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium shrink-0">
                          Featured
                        </span>
                      ) : null}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                          item.active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      {item.client && (<span className="text-xs text-gray-400">{item.client}</span>)}
                      {item.industry && (<span className="text-xs text-gray-400">· {item.industry}</span>)}
                      <span className="text-xs text-gray-300 font-mono">/{item.slug}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
                      item.featured ? "text-amber-500" : "text-gray-400 hover:text-amber-500"
                    }`}
                    title={item.featured ? "Unfeature" : "Feature on homepage"}
                  >
                    <Star size={15} fill={item.featured ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => toggleActive(item)}
                    className="p-1.5 text-gray-400 hover:text-[#0F4C8F] rounded-lg hover:bg-gray-100 transition-colors"
                    title="Toggle active"
                  >
                    {item.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <button
                    onClick={() => setSelected({ ...item })}
                    className="p-1.5 text-gray-400 hover:text-[#388ECA] rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form panel */}
        {selected && (
          <div className="w-[440px] bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col shrink-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <p className="font-semibold text-gray-800 text-sm">
                {selected.id ? "Edit Case Study" : "New Case Study"}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 text-lg"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title *</label>
                <input
                  value={selected.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Migrating a Monolith to Kubernetes at Scale"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Slug <span className="ml-1 text-gray-400 font-normal">(auto-generated)</span>
                </label>
                <input
                  value={selected.slug}
                  onChange={(e) => setSelected({ ...selected, slug: toSlug(e.target.value) })}
                  placeholder="monolith-to-kubernetes"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Client</label>
                  <input
                    value={selected.client || ""}
                    onChange={(e) => setSelected({ ...selected, client: e.target.value })}
                    placeholder="Acme Ltd"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Industry</label>
                  <input
                    value={selected.industry || ""}
                    onChange={(e) => setSelected({ ...selected, industry: e.target.value })}
                    placeholder="Healthcare"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Duration</label>
                <input
                  value={selected.duration || ""}
                  onChange={(e) => setSelected({ ...selected, duration: e.target.value })}
                  placeholder="e.g. 6 months"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>

              {/* Cover image */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cover Image</label>
                <div className="flex gap-2 items-start">
                  <input
                    value={selected.cover_image || ""}
                    onChange={(e) => setSelected({ ...selected, cover_image: e.target.value })}
                    placeholder="Image URL or upload"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                  <label className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors shrink-0 ${uploading ? "bg-gray-200 text-gray-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    <Upload size={13} />
                    {uploading ? "..." : "Upload"}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const data = await api.upload("/media/upload", file);
                          setSelected((prev) => ({ ...prev, cover_image: data.url }));
                        } catch {}
                        setUploading(false);
                        e.target.value = "";
                      }} />
                  </label>
                </div>
                {selected.cover_image && (
                  <img
                    src={selected.cover_image}
                    alt="preview"
                    className="mt-2 w-full h-28 object-cover rounded-lg border border-gray-200"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Summary <span className="ml-1 text-gray-400 font-normal">(card preview, plain text)</span>
                </label>
                <textarea
                  value={selected.summary || ""}
                  onChange={(e) => setSelected({ ...selected, summary: e.target.value })}
                  rows={2}
                  placeholder="One-line hook shown on the homepage card…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Challenge</label>
                <RichTextEditor
                  value={selected.challenge}
                  onChange={(val) => setSelected({ ...selected, challenge: val })}
                  placeholder="What problem did the client have?"
                  minHeight={160}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Solution</label>
                <RichTextEditor
                  value={selected.solution}
                  onChange={(val) => setSelected({ ...selected, solution: val })}
                  placeholder="How did you solve it? Architecture, stack, approach…"
                  minHeight={200}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Results</label>
                <RichTextEditor
                  value={selected.results}
                  onChange={(val) => setSelected({ ...selected, results: val })}
                  placeholder="Outcomes and impact. Be specific."
                  minHeight={160}
                />
              </div>

              {/* Metrics */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-600">
                    Metrics <span className="ml-1 text-gray-400 font-normal">(numbers shown on the case study)</span>
                  </label>
                  <button type="button" onClick={addMetric} className="text-[11px] font-semibold text-[#388ECA] hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {metrics.map((m, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <input
                        value={m.value || ""}
                        onChange={(e) => updateMetric(i, "value", e.target.value)}
                        placeholder="99.99%"
                        className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                      />
                      <input
                        value={m.label || ""}
                        onChange={(e) => updateMetric(i, "label", e.target.value)}
                        placeholder="Uptime"
                        className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                      />
                      <button type="button" onClick={() => removeMetric(i)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {metrics.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No metrics yet.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Tags <span className="ml-1 text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  value={selected.tags || ""}
                  onChange={(e) => setSelected({ ...selected, tags: e.target.value })}
                  placeholder="Kubernetes, AWS, Microservices"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>

              {/* Testimonial */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#388ECA] mb-2">
                  Client Testimonial <span className="text-gray-400 font-medium normal-case tracking-normal">(optional)</span>
                </p>
                <textarea
                  value={selected.testimonial_quote || ""}
                  onChange={(e) => setSelected({ ...selected, testimonial_quote: e.target.value })}
                  rows={3}
                  placeholder="“They delivered exactly what we needed, on time.”"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] resize-none mb-2"
                />
                <input
                  value={selected.testimonial_author || ""}
                  onChange={(e) => setSelected({ ...selected, testimonial_author: e.target.value })}
                  placeholder="Jane Smith, CTO at Acme"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sort Order</label>
                  <input
                    type="number"
                    value={selected.sort_order}
                    onChange={(e) => setSelected({ ...selected, sort_order: +e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setSelected({ ...selected, featured: selected.featured ? 0 : 1 })}
                  className={`relative w-9 h-5 rounded-full transition-colors ${selected.featured ? "bg-amber-500" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${selected.featured ? "translate-x-4" : ""}`} />
                </div>
                <span className="text-sm text-gray-700">Featured on homepage</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setSelected({ ...selected, active: selected.active ? 0 : 1 })}
                  className={`relative w-9 h-5 rounded-full transition-colors ${selected.active ? "bg-[#0F4C8F]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${selected.active ? "translate-x-4" : ""}`} />
                </div>
                <span className="text-sm text-gray-700">Active (visible on site)</span>
              </label>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-2">
              <button
                onClick={save}
                disabled={saving || !selected.title}
                className="flex-1 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : selected.id ? "Save Changes" : "Create Case Study"}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
