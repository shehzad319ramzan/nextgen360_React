import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/ui/loader";
import { Trash2, Mail, MessageSquare, ChevronDown } from "lucide-react";

const STATUSES = ["new", "read", "in-progress", "replied", "closed"];

const STATUS_STYLES = {
  new: "bg-orange-100 text-orange-700 border-orange-200",
  read: "bg-blue-50 text-blue-600 border-blue-200",
  "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
  replied: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-500 border-gray-200",
};

const StatusBadge = ({ status }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border capitalize ${STATUS_STYLES[status] || "bg-gray-100 text-gray-500"}`}>
    {status}
  </span>
);

export default function Inquiries() {
  const { user } = useAuth();
  const [data, setData] = useState({ inquiries: [], total: 0 });
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/contact-us${filter ? `?status=${filter}` : ""}`);
      const list = Array.isArray(res) ? res : (res.inquiries || []);
      setData({ inquiries: list, total: list.length });
    } catch {
      setData({ inquiries: [], total: 0 });
    }
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, [filter]);

  const selectInquiry = async (inq) => {
    setSelected(inq);
    setNotes(inq.notes || "");
    // Auto-mark new as read
    if (inq.status === "new") {
      await api.put(`/contact-us/${inq.id}`, { status: "read" });
      setSelected((prev) => prev?.id === inq.id ? { ...inq, status: "read" } : prev);
      setData((d) => ({
        ...d,
        inquiries: d.inquiries.map((i) => i.id === inq.id ? { ...i, status: "read" } : i),
      }));
    }
  };

  const updateStatus = async (id, status) => {
    await api.put(`/contact-us/${id}`, { status });
    setSelected((prev) => prev?.id === id ? { ...prev, status } : prev);
    setData((d) => ({
      ...d,
      inquiries: d.inquiries.map((i) => i.id === id ? { ...i, status } : i),
    }));
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    await api.put(`/contact-us/${selected.id}`, { notes });
    setSelected((prev) => prev ? { ...prev, notes } : prev);
    setSavingNotes(false);
  };

  const deleteInquiry = async (id) => {
    if (!confirm("Delete this inquiry permanently?")) return;
    await api.delete(`/contact-us/${id}`);
    setSelected(null);
    fetchInquiries();
  };

  const newCount = data.inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-sm text-gray-500 mt-0.5">{data.total} total{newCount > 0 ? ` · ${newCount} new` : ""}</p>
        </div>
        {/* Filter tabs */}
        <div className="flex items-center gap-1.5 bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
          {["", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s ? "bg-[#0F4C8F] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {loading && (
            <Loader />
          )}
          {!loading && data.inquiries.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 p-10 text-gray-400">
              <MessageSquare size={32} className="mb-3 opacity-40" />
              <p className="text-sm">No inquiries found</p>
            </div>
          )}
          <div className="overflow-y-auto divide-y divide-gray-50">
            {data.inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => selectInquiry(inq)}
                className={`w-full text-left px-5 py-4 transition-colors hover:bg-gray-50 ${selected?.id === inq.id ? "bg-blue-50 border-l-2 border-l-[#0F4C8F]" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-sm truncate ${inq.status === "new" ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                        {inq.name}
                      </p>
                      {inq.status === "new" && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{inq.email}</p>
                    {inq.category && (
                      <p className="text-xs text-gray-400 mt-1 truncate">{inq.category}{inq.sub_category ? ` · ${inq.sub_category}` : ""}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <StatusBadge status={inq.status} />
                    <span className="text-[11px] text-gray-400">{new Date(inq.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden shrink-0">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-gray-400"># {selected.id}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-lg leading-none">×</button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Contact info */}
              <div className="space-y-3">
                {[
                  ["Name", selected.name],
                  ["Email", selected.email],
                  ["Phone", selected.phone || "—"],
                  ["Category", selected.category || "—"],
                  ["Sub-Category", selected.sub_category || "—"],
                  ["Received", new Date(selected.created_at).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-xs text-gray-400 shrink-0 w-24">{label}</span>
                    <span className="text-xs text-gray-800 text-right font-medium break-all">{value}</span>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-gray-400 mb-1.5">Message</p>
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100">
                  {selected.description || "—"}
                </div>
              </div>

              {/* Status selector */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Status</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize transition-all border ${
                        selected.status === s
                          ? "bg-[#0F4C8F] text-white border-[#0F4C8F] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#388ECA] hover:text-[#388ECA]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal notes */}
              <div>
                <p className="text-xs text-gray-400 mb-1.5">Internal Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add private notes visible only to admins…"
                  className="w-full text-xs border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#388ECA] focus:border-transparent"
                />
                <button
                  onClick={saveNotes}
                  disabled={savingNotes || notes === (selected.notes || "")}
                  className="mt-1.5 text-xs text-[#0F4C8F] font-medium hover:underline disabled:opacity-40 disabled:no-underline"
                >
                  {savingNotes ? "Saving…" : "Save notes"}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 pt-3 border-t border-gray-100 space-y-2">
              <a
                href={`mailto:${selected.email}?subject=Re: Your inquiry — ${selected.category || "Tech Solutions Pro"}`}
                onClick={() => updateStatus(selected.id, "replied")}
                className="flex items-center justify-center gap-2 w-full bg-[#0F4C8F] hover:bg-[#0d3d75] text-white py-2.5 rounded-xl text-xs font-semibold transition-colors"
              >
                <Mail size={13} />
                Reply via Email
              </a>
              {user?.role === "admin" && (
                <button
                  onClick={() => deleteInquiry(selected.id)}
                  className="flex items-center justify-center gap-2 w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl text-xs font-medium transition-colors border border-red-100"
                >
                  <Trash2 size={13} />
                  Delete Inquiry
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-96 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center shrink-0 text-gray-400">
            <MessageSquare size={36} className="mb-3 opacity-30" />
            <p className="text-sm">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
