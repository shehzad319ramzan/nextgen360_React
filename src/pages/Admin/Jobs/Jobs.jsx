import { useEffect, useState } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Plus, Briefcase, MapPin, Trash2, ToggleLeft, ToggleRight, Edit2 } from "lucide-react";

const EMPTY = {
  title: "",
  type: "Full-time",
  location: "Nottingham, UK",
  description: "",
  requirements: "",
  active: 1,
  sort_order: 0,
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/jobs?all=1").then(setJobs).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!selected?.title) return;
    setSaving(true);
    try {
      if (selected.id) await api.put(`/jobs/${selected.id}`, selected);
      else await api.post("/jobs", selected);
      load();
      setSelected(null);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this job?")) return;
    await api.delete(`/jobs/${id}`);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const toggleActive = async (job) => {
    await api.put(`/jobs/${job.id}`, { ...job, active: job.active ? 0 : 1 });
    load();
  };

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {jobs.filter((j) => j.active).length} active positions
          </p>
        </div>
        <button
          onClick={() => setSelected(EMPTY)}
          className="flex items-center gap-2 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          New Job
        </button>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && (
            <Loader />
          )}
          {!loading && jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <Briefcase size={36} className="mb-3 opacity-30" />
              <p className="text-sm">No jobs yet. Add your first opening.</p>
            </div>
          )}
          <div className="overflow-y-auto divide-y divide-gray-50">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${
                  selected?.id === job.id ? "bg-blue-50 border-l-2 border-l-[#0F4C8F]" : ""
                }`}
              >
                <div
                  className="min-w-0 flex-1 cursor-pointer"
                  onClick={() => setSelected({ ...job })}
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 truncate">{job.title}</p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                        job.active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-400 border-gray-200"
                      }`}
                    >
                      {job.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{job.type}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin size={10} />
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button
                    onClick={() => toggleActive(job)}
                    className="p-1.5 text-gray-400 hover:text-[#0F4C8F] rounded-lg hover:bg-gray-100 transition-colors"
                    title="Toggle active"
                  >
                    {job.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  </button>
                  <button
                    onClick={() => setSelected({ ...job })}
                    className="p-1.5 text-gray-400 hover:text-[#388ECA] rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => remove(job.id)}
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
                {selected.id ? "Edit Job" : "New Job Opening"}
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
                  Job Title *
                </label>
                <input
                  value={selected.title}
                  onChange={(e) => setSelected({ ...selected, title: e.target.value })}
                  placeholder="e.g. Senior React Developer"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Type</label>
                  <select
                    value={selected.type}
                    onChange={(e) => setSelected({ ...selected, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
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
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location</label>
                <input
                  value={selected.location}
                  onChange={(e) => setSelected({ ...selected, location: e.target.value })}
                  placeholder="Nottingham, UK"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#388ECA]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Description
                </label>
                <RichTextEditor
                  value={selected.description}
                  onChange={(val) => setSelected({ ...selected, description: val })}
                  placeholder="Role overview, responsibilities…"
                  minHeight={180}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Requirements
                </label>
                <RichTextEditor
                  value={selected.requirements}
                  onChange={(val) => setSelected({ ...selected, requirements: val })}
                  placeholder="Skills, experience, qualifications…"
                  minHeight={180}
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
                disabled={saving || !selected.title}
                className="flex-1 bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : selected.id ? "Save Changes" : "Create Job"}
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
