import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import { Plus, Star, Trash2, ToggleLeft, ToggleRight, Edit2, MessageSquare } from "lucide-react";

const EMPTY = {
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  avatar: "",
  active: 1,
  sort_order: 0,
};

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="text-2xl leading-none transition-colors focus:outline-none"
          style={{ color: star <= value ? "#F59E0B" : "#D1D5DB" }}
          title={`${star} star${star !== 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value }) {
  return (
    <span className="text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= value ? "#F59E0B" : "#D1D5DB" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/testimonials?all=1").then(setItems).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!selected?.name || !selected?.content) return;
    setSaving(true);
    try {
      if (selected.id) await api.put(`/testimonials/${selected.id}`, selected);
      else await api.post("/testimonials", selected);
      load();
      setSelected(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await api.delete(`/testimonials/${id}`);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const toggleActive = async (item) => {
    await api.put(`/testimonials/${item.id}`, { ...item, active: item.active ? 0 : 1 });
    load();
  };

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.filter((i) => i.active).length} active testimonials
          </p>
        </div>
        <button
          onClick={() => setSelected(EMPTY)}
          className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Testimonial
        </button>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && (
            <Loader />
          )}
          {!loading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <MessageSquare size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No testimonials yet. Add your first one.</p>
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
                  className="min-w-0 flex-1 cursor-pointer"
                  onClick={() => setSelected({ ...item })}
                >
                  <div className="flex items-center gap-2">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
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
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">
                      {item.role}{item.company ? ` · ${item.company}` : ""}
                    </span>
                    <StarDisplay value={item.rating} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate">{item.content}</p>
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
          <div className="w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col shrink-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <p className="font-semibold text-gray-800 text-sm">
                {selected.id ? "Edit Testimonial" : "New Testimonial"}
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
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Name *
                </label>
                <input
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                  placeholder="e.g. Sarah Johnson"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role</label>
                  <input
                    value={selected.role}
                    onChange={(e) => setSelected({ ...selected, role: e.target.value })}
                    placeholder="CEO"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Company
                  </label>
                  <input
                    value={selected.company}
                    onChange={(e) => setSelected({ ...selected, company: e.target.value })}
                    placeholder="Acme Ltd"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Content *
                </label>
                <textarea
                  value={selected.content}
                  onChange={(e) => setSelected({ ...selected, content: e.target.value })}
                  rows={4}
                  placeholder="What did they say…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rating</label>
                <StarRating
                  value={selected.rating}
                  onChange={(r) => setSelected({ ...selected, rating: r })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Avatar URL
                </label>
                <input
                  value={selected.avatar || ""}
                  onChange={(e) => setSelected({ ...selected, avatar: e.target.value })}
                  placeholder="https://…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
                {selected.avatar && (
                  <img
                    src={selected.avatar}
                    alt="preview"
                    className="mt-2 w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Sort Order
                  </label>
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
                  onClick={() =>
                    setSelected({ ...selected, active: selected.active ? 0 : 1 })
                  }
                  className={`relative w-9 h-5 rounded-full transition-colors ${
                    selected.active ? "bg-[#0F4C8F]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      selected.active ? "translate-x-4" : ""
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-700">Active (visible on site)</span>
              </label>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex gap-2">
              <button
                onClick={save}
                disabled={saving || !selected.name || !selected.content}
                className="flex-1 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : selected.id ? "Save Changes" : "Create Testimonial"}
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
