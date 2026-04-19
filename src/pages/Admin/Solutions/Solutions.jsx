import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Plus, Zap, Trash2, ToggleLeft, ToggleRight, Edit2, Upload, X } from "lucide-react";

const EMPTY = {
  title: "",
  slug: "",
  tagline: "",
  logo: "",
  active_logo: "",
  hero_title: "",
  hero_description: "",
  hero_image: "",
  features_title: "",
  features_description: "",
  features_points: [],
  features_image: "",
  key_features_title: "",
  key_features_image: "",
  key_features: [],
  website_link: "",
  active: 1,
  sort_order: 0,
};

function toSlug(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const FIELD = "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]";
const LABEL = "block text-xs font-semibold text-gray-600 mb-1.5";

// Reusable upload button
function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex gap-2 items-start">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload"
          className={`flex-1 ${FIELD}`}
        />
        <label className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors shrink-0 ${uploading ? "bg-gray-200 text-gray-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          <Upload size={13} />
          {uploading ? "..." : "Upload"}
          <input
            type="file"
            accept="image/*,.svg"
            className="hidden"
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const data = await api.upload("/media/upload", file);
                onChange(data.url);
              } catch {}
              setUploading(false);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-2 max-h-24 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
    </div>
  );
}

export default function Solutions() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/solutions?all=1").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!selected?.title) return;
    setSaving(true);
    try {
      const payload = {
        ...selected,
        features_points: Array.isArray(selected.features_points) ? selected.features_points : [],
        key_features: Array.isArray(selected.key_features) ? selected.key_features : [],
      };
      if (selected.id) await api.put(`/solutions/${selected.id}`, payload);
      else await api.post("/solutions", payload);
      load();
      setSelected(null);
    } catch (err) {
      alert(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this solution?")) return;
    await api.delete(`/solutions/${id}`);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const toggleActive = async (item) => {
    await api.put(`/solutions/${item.id}`, { ...item, active: item.active ? 0 : 1 });
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

  // ── Bullet point editing for features_points ──
  const setPoint = (i, v) => {
    const next = [...(selected.features_points || [])];
    next[i] = v;
    setSelected({ ...selected, features_points: next });
  };
  const addPoint = () => setSelected({ ...selected, features_points: [...(selected.features_points || []), ""] });
  const removePoint = (i) => {
    const next = [...(selected.features_points || [])];
    next.splice(i, 1);
    setSelected({ ...selected, features_points: next });
  };

  // ── Key features (array of {title, description}) ──
  const setKf = (i, key, v) => {
    const next = [...(selected.key_features || [])];
    next[i] = { ...next[i], [key]: v };
    setSelected({ ...selected, key_features: next });
  };
  const addKf = () => setSelected({ ...selected, key_features: [...(selected.key_features || []), { title: "", description: "" }] });
  const removeKf = (i) => {
    const next = [...(selected.key_features || [])];
    next.splice(i, 1);
    setSelected({ ...selected, key_features: next });
  };

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Solutions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.filter((i) => i.active).length} active solutions
          </p>
        </div>
        <button
          onClick={() => setSelected(EMPTY)}
          className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Solution
        </button>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && <Loader />}
          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <Zap size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No solutions yet. Add your first one.</p>
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
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="w-12 h-10 rounded-lg object-contain shrink-0 border border-gray-200 bg-gray-50 p-1"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-12 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Zap size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
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
                      {item.tagline && <span className="text-xs text-gray-400 truncate">{item.tagline}</span>}
                      <span className="text-xs text-gray-300 font-mono">/{item.slug}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-3">
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
          <div className="w-[450px] bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col shrink-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <p className="font-semibold text-gray-800 text-sm">
                {selected.id ? "Edit Solution" : "New Solution"}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 text-lg"
              >×</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Basic */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#388ECA]">Basic</p>

                <div>
                  <label className={LABEL}>Title *</label>
                  <input value={selected.title} onChange={handleTitleChange} placeholder="WorkzenPro" className={FIELD} />
                </div>
                <div>
                  <label className={LABEL}>Slug <span className="text-gray-400 font-normal">(URL)</span></label>
                  <input
                    value={selected.slug}
                    onChange={(e) => setSelected({ ...selected, slug: toSlug(e.target.value) })}
                    placeholder="workzenpro"
                    className={`${FIELD} font-mono`}
                  />
                </div>
                <div>
                  <label className={LABEL}>Tagline</label>
                  <input
                    value={selected.tagline || ""}
                    onChange={(e) => setSelected({ ...selected, tagline: e.target.value })}
                    placeholder="Plan Better. Work Smarter."
                    className={FIELD}
                  />
                </div>
                <div>
                  <label className={LABEL}>Website Link</label>
                  <input
                    value={selected.website_link || ""}
                    onChange={(e) => setSelected({ ...selected, website_link: e.target.value })}
                    placeholder="https://workzenpro.com"
                    className={FIELD}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ImageField label="Header Logo (default)" value={selected.logo} onChange={(v) => setSelected({ ...selected, logo: v })} />
                  <ImageField label="Header Logo (hover)" value={selected.active_logo} onChange={(v) => setSelected({ ...selected, active_logo: v })} />
                </div>
              </div>

              {/* Hero */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#388ECA]">Section 1 — Hero</p>
                <div>
                  <label className={LABEL}>Hero Title</label>
                  <input
                    value={selected.hero_title || ""}
                    onChange={(e) => setSelected({ ...selected, hero_title: e.target.value })}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label className={LABEL}>Hero Description</label>
                  <RichTextEditor
                    value={selected.hero_description}
                    onChange={(val) => setSelected({ ...selected, hero_description: val })}
                    minHeight={140}
                    variant="compact"
                  />
                </div>
                <ImageField label="Hero Image" value={selected.hero_image} onChange={(v) => setSelected({ ...selected, hero_image: v })} />
              </div>

              {/* Features overview */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#388ECA]">Section 2 — Why Choose</p>
                <div>
                  <label className={LABEL}>Section Title</label>
                  <input
                    value={selected.features_title || ""}
                    onChange={(e) => setSelected({ ...selected, features_title: e.target.value })}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label className={LABEL}>Section Description</label>
                  <RichTextEditor
                    value={selected.features_description}
                    onChange={(val) => setSelected({ ...selected, features_description: val })}
                    minHeight={140}
                    variant="compact"
                  />
                </div>
                <ImageField label="Section Image" value={selected.features_image} onChange={(v) => setSelected({ ...selected, features_image: v })} />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`${LABEL} mb-0`}>Bullet Points</label>
                    <button type="button" onClick={addPoint} className="text-[11px] font-semibold text-[#388ECA] hover:underline">+ Add</button>
                  </div>
                  <div className="space-y-2">
                    {(selected.features_points || []).map((p, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={p} onChange={(e) => setPoint(i, e.target.value)} placeholder={`Point ${i + 1}`} className={FIELD} />
                        <button type="button" onClick={() => removePoint(i)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {(!selected.features_points || selected.features_points.length === 0) && (
                      <p className="text-xs text-gray-400 italic">No bullet points yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#388ECA]">Section 3 — Key Features</p>
                <div>
                  <label className={LABEL}>Heading</label>
                  <input
                    value={selected.key_features_title || ""}
                    onChange={(e) => setSelected({ ...selected, key_features_title: e.target.value })}
                    placeholder="Key Features"
                    className={FIELD}
                  />
                </div>
                <ImageField label="Section Image" value={selected.key_features_image} onChange={(v) => setSelected({ ...selected, key_features_image: v })} />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`${LABEL} mb-0`}>Feature Blocks</label>
                    <button type="button" onClick={addKf} className="text-[11px] font-semibold text-[#388ECA] hover:underline">+ Add</button>
                  </div>
                  <div className="space-y-3">
                    {(selected.key_features || []).map((kf, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2 relative bg-gray-50">
                        <button type="button" onClick={() => removeKf(i)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded">
                          <X size={13} />
                        </button>
                        <input
                          value={kf.title || ""}
                          onChange={(e) => setKf(i, "title", e.target.value)}
                          placeholder="Feature title"
                          className={`${FIELD} bg-white`}
                        />
                        <textarea
                          rows={2}
                          value={kf.description || ""}
                          onChange={(e) => setKf(i, "description", e.target.value)}
                          placeholder="Feature description"
                          className={`${FIELD} bg-white resize-none`}
                        />
                      </div>
                    ))}
                    {(!selected.key_features || selected.key_features.length === 0) && (
                      <p className="text-xs text-gray-400 italic">No feature blocks yet.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div>
                  <label className={LABEL}>Sort Order</label>
                  <input
                    type="number"
                    value={selected.sort_order}
                    onChange={(e) => setSelected({ ...selected, sort_order: +e.target.value })}
                    className={FIELD}
                  />
                </div>
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
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-2">
              <button
                onClick={save}
                disabled={saving || !selected.title}
                className="flex-1 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : selected.id ? "Save Changes" : "Create Solution"}
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
