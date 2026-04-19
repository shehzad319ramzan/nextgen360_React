import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Plus, UserCircle, Trash2, ToggleLeft, ToggleRight, Edit2 } from "lucide-react";

const EMPTY = {
  name: "",
  role: "",
  bio: "",
  photo: "",
  sort_order: 0,
  active: 1,
};

export default function Team() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/team?all=1").then(setMembers).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!selected?.name) return;
    setSaving(true);
    try {
      if (selected.id) await api.put(`/team/${selected.id}`, selected);
      else await api.post("/team", selected);
      load();
      setSelected(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this team member?")) return;
    await api.delete(`/team/${id}`);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const toggleActive = async (member) => {
    await api.put(`/team/${member.id}`, { ...member, active: member.active ? 0 : 1 });
    load();
  };

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {members.filter((m) => m.active).length} active members
          </p>
        </div>
        <button
          onClick={() => setSelected(EMPTY)}
          className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Member
        </button>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && (
            <Loader />
          )}
          {!loading && members.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <UserCircle size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No team members yet. Add your first one.</p>
            </div>
          )}
          <div className="overflow-y-auto divide-y divide-gray-50">
            {members.map((member) => (
              <div
                key={member.id}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === member.id ? "bg-blue-50 border-l-2 border-l-[#0F4C8F]" : ""
                }`}
              >
                <div
                  className="min-w-0 flex-1 cursor-pointer flex items-center gap-3"
                  onClick={() => setSelected({ ...member })}
                >
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <UserCircle size={20} className="text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{member.name}</p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                          member.active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                        }`}
                      >
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => toggleActive(member)}
                    className="p-1.5 text-gray-400 hover:text-[#0F4C8F] rounded-lg hover:bg-gray-100 transition-colors"
                    title="Toggle active"
                  >
                    {member.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <button
                    onClick={() => setSelected({ ...member })}
                    className="p-1.5 text-gray-400 hover:text-[#388ECA] rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => remove(member.id)}
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
                {selected.id ? "Edit Team Member" : "New Team Member"}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 text-lg"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Photo preview */}
              <div className="flex justify-center">
                {selected.photo ? (
                  <img
                    src={selected.photo}
                    alt="preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <UserCircle size={28} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
                <input
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                  placeholder="e.g. James Smith"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role / Title</label>
                <input
                  value={selected.role}
                  onChange={(e) => setSelected({ ...selected, role: e.target.value })}
                  placeholder="e.g. Lead Developer"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Bio</label>
                <RichTextEditor
                  value={selected.bio}
                  onChange={(val) => setSelected({ ...selected, bio: val })}
                  placeholder="Short biography…"
                  minHeight={160}
                  variant="compact"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Photo URL
                </label>
                <input
                  value={selected.photo || ""}
                  onChange={(e) => setSelected({ ...selected, photo: e.target.value })}
                  placeholder="https://…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
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
                disabled={saving || !selected.name}
                className="flex-1 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : selected.id ? "Save Changes" : "Add Member"}
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
