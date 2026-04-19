import React, { useState, useEffect } from "react";
import { api } from "@/api/client";
import Loader from "@/components/ui/loader";

const STATUS_OPTIONS = ["new", "reviewing", "shortlisted", "interviewed", "hired", "rejected"];
const STATUS_COLORS = {
    new: "#3b82f6", reviewing: "#f59e0b", shortlisted: "#8b5cf6",
    interviewed: "#06b6d4", hired: "#10b981", rejected: "#ef4444",
};

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [selected, setSelected] = useState(null);
    const [notes, setNotes] = useState("");

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ limit: "50" });
            if (filter) params.set("status", filter);
            const data = await api.get(`/job-applications?${params}`);
            const list = Array.isArray(data) ? data : (data.applications || []);
            setApplications(list);
            setTotal(Array.isArray(data) ? list.length : (data.total || list.length));
        } catch { setApplications([]); }
        setLoading(false);
    };

    useEffect(() => { fetchApplications(); }, [filter]);

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/job-applications/${id}`, { status, notes });
            fetchApplications();
            if (selected?.id === id) setSelected((p) => ({ ...p, status }));
        } catch { /* silent */ }
    };

    const deleteApp = async (id) => {
        if (!confirm("Delete this application?")) return;
        try {
            await api.delete(`/job-applications/${id}`);
            fetchApplications();
            if (selected?.id === id) setSelected(null);
        } catch { /* silent */ }
    };

    const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    return (
        <div className="p-6 lg:p-8" style={{ fontFamily: "Poppins, sans-serif" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Job Applications</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{total} total application{total !== 1 ? "s" : ""}</p>
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none">
                    <option value="">All Statuses</option>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* List */}
                <div className={`${selected ? "lg:w-1/2" : "w-full"} flex flex-col gap-2`}>
                    {loading ? (
                        <Loader />
                    ) : applications.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm bg-gray-50 rounded-xl">No applications found</div>
                    ) : (
                        applications.map((app) => (
                            <div key={app.id}
                                onClick={() => { setSelected(app); setNotes(app.notes || ""); }}
                                className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${selected?.id === app.id ? "border-blue-300 bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-sm text-gray-800">{app.name}</h3>
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-white"
                                        style={{ background: STATUS_COLORS[app.status] || "#6b7280" }}>
                                        {app.status}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">{app.email}</p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                                    {app.job_title && <span>Applied for: <strong>{app.job_title}</strong></span>}
                                    <span>{formatDate(app.created_at)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Detail panel */}
                {selected && (
                    <div className="lg:w-1/2 bg-white rounded-xl border border-gray-100 p-6 lg:sticky lg:top-4 self-start">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">{selected.name}</h2>
                            <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">Close</button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="text-gray-400 min-w-[80px]">Email:</span>
                                <a href={`mailto:${selected.email}`} className="text-blue-600">{selected.email}</a>
                            </div>
                            {selected.phone && (
                                <div className="flex gap-2">
                                    <span className="text-gray-400 min-w-[80px]">Phone:</span>
                                    <span className="text-gray-700">{selected.phone}</span>
                                </div>
                            )}
                            {selected.job_title && (
                                <div className="flex gap-2">
                                    <span className="text-gray-400 min-w-[80px]">Position:</span>
                                    <span className="text-gray-700 font-medium">{selected.job_title}</span>
                                </div>
                            )}
                            {selected.experience && (
                                <div className="flex gap-2">
                                    <span className="text-gray-400 min-w-[80px]">Experience:</span>
                                    <span className="text-gray-700">{selected.experience} years</span>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <span className="text-gray-400 min-w-[80px]">Applied:</span>
                                <span className="text-gray-700">{formatDate(selected.created_at)}</span>
                            </div>

                            {selected.resume_url && (
                                <div className="flex gap-2">
                                    <span className="text-gray-400 min-w-[80px]">Resume:</span>
                                    <a href={`${import.meta.env.VITE_BACKEND_URL}${selected.resume_url.replace("/uploads/", "/storage/")}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="text-blue-600 underline text-xs">
                                        Download Resume
                                    </a>
                                </div>
                            )}
                        </div>

                        {selected.cover_letter && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cover Letter</h4>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{selected.cover_letter}</p>
                            </div>
                        )}

                        {/* Status update */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Update Status</h4>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {STATUS_OPTIONS.map((s) => (
                                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                                        className="px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-all"
                                        style={{
                                            background: selected.status === s ? STATUS_COLORS[s] : "#f5f5f5",
                                            color: selected.status === s ? "white" : "#6b7280",
                                            border: `1px solid ${selected.status === s ? STATUS_COLORS[s] : "#e5e5e5"}`,
                                        }}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                                placeholder="Internal notes..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none resize-none focus:border-blue-300"
                                rows={3} />
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => updateStatus(selected.id, selected.status)}
                                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-blue-700">
                                    Save Notes
                                </button>
                                <button onClick={() => deleteApp(selected.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg cursor-pointer hover:bg-red-100">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplications;
